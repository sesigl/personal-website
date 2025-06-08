import type { ReactElement, JSX } from 'react';
import { useState, useEffect, useRef } from 'react';
import { actions } from 'astro:actions';

export interface ProgressData {
  isNewCampaign: boolean;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  totalRecipients: number;
  processedCount: number;
  progressPercentage: number;
  hasFailures: boolean;
  campaignTitle: string;
  isTest: boolean;
}

export interface ProgressDisplayProps {
  progress: ProgressData | null;
  className?: string;
}

export interface ProgressTrackerProps {
  campaignTitle?: string;
  onProgressUpdate?: (progress: ProgressData | null) => void;
  pollInterval?: number;
  autoStart?: boolean;
  className?: string;
  testMode?: boolean; // New prop for enhanced testing visualization
}

export interface ProgressTrackerActions {
  startPolling: (campaignTitle: string) => void;
  stopPolling: () => void;
  getProgress: (campaignTitle: string) => Promise<ProgressData | null>;
  isPolling: () => boolean;
}

interface UseProgressTrackerParams {
  campaignTitle?: string;
  onProgressUpdate?: (progress: ProgressData | null) => void;
  pollInterval?: number;
  autoStart?: boolean;
  testMode?: boolean;
}

interface UseProgressTrackerReturn {
  progress: ProgressData | null;
  isPolling: boolean;
  error: string | null;
  actions: ProgressTrackerActions;
}

export function useProgressTracker({
  campaignTitle,
  onProgressUpdate,
  pollInterval = 2000,
  autoStart = true,
  testMode = false
}: UseProgressTrackerParams = {}): UseProgressTrackerReturn {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentCampaignRef = useRef<string | null>(null);
  const simulatedProgressRef = useRef<number>(0);
  const simulatedStepsRef = useRef<number[]>([]);

  const stopPolling = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPolling(false);
    currentCampaignRef.current = null;
  };

  const getProgress = async (title: string): Promise<ProgressData | null> => {
    try {
      setError(null);
      const result = await actions.admin.getNewsletterProgress({ campaignTitle: title });
      return result?.data || null;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get progress';
      setError(errorMessage);
      console.error('Error getting newsletter progress:', err);
      return null;
    }
  };

  const createSimulatedProgress = (title: string, step: number): ProgressData => {
    const steps = simulatedStepsRef.current;
    const totalSteps = steps.length;
    const currentStep = Math.min(step, totalSteps - 1);
    const progressPercentage = steps[currentStep];
    
    return {
      isNewCampaign: step === 0,
      status: progressPercentage >= 100 ? 'completed' : 
              progressPercentage === 0 ? 'pending' : 'in_progress',
      totalRecipients: 1,
      processedCount: progressPercentage >= 100 ? 1 : 0,
      progressPercentage,
      hasFailures: false,
      campaignTitle: title,
      isTest: testMode
    };
  };

  const startPolling = (title: string) => {
    if (!title.trim()) {
      setError('Campaign title is required');
      return;
    }

    stopPolling(); // Stop any existing polling
    setIsPolling(true);
    currentCampaignRef.current = title;
    
    // Initialize simulation for test mode
    if (testMode) {
      simulatedProgressRef.current = 0;
      simulatedStepsRef.current = [0, 25, 50, 75, 100]; // Realistic progress steps
      
      // Start with initial progress
      const initialProgress = createSimulatedProgress(title, 0);
      setProgress(initialProgress);
      onProgressUpdate?.(initialProgress);
    }

    const poll = async () => {
      // Check if polling was stopped while waiting
      if (currentCampaignRef.current !== title) {
        return;
      }

      try {
        let progressData: ProgressData | null;
        
        if (testMode) {
          // In test mode, always simulate progress regardless of backend state
          simulatedProgressRef.current += 1;
          progressData = createSimulatedProgress(title, simulatedProgressRef.current);
          
          // Add some visual feedback logs
          console.log(`📧 Newsletter Progress: ${progressData.progressPercentage}% - ${progressData.status}`);
        } else {
          // Real API call
          progressData = await getProgress(title);
        }
        
        // Check again if polling was stopped while processing
        if (currentCampaignRef.current !== title) {
          return;
        }

        setProgress(progressData);
        onProgressUpdate?.(progressData);

        // Continue polling if not completed and still polling the same campaign
        if (progressData && 
            progressData.status !== 'completed' && 
            progressData.status !== 'failed' &&
            currentCampaignRef.current === title) {
          timeoutRef.current = setTimeout(poll, testMode ? 1500 : pollInterval); // Faster polling in test mode
        } else {
          setIsPolling(false);
          currentCampaignRef.current = null;
          
          if (testMode && progressData?.status === 'completed') {
            console.log('✅ Newsletter sending completed!');
          }
        }
      } catch (err) {
        console.error('Error during polling:', err);
        setIsPolling(false);
        currentCampaignRef.current = null;
      }
    };

    // Start polling immediately, or with small delay in test mode for better UX
    if (testMode) {
      timeoutRef.current = setTimeout(poll, 1000); // 1 second delay to see the "Starting..." state
    } else {
      poll();
    }
  };

  // Auto-start polling if campaignTitle is provided and autoStart is true
  useEffect(() => {
    if (campaignTitle && autoStart) {
      startPolling(campaignTitle);
    }

    return () => {
      stopPolling();
    };
  }, [campaignTitle, autoStart, pollInterval]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, []);

  return {
    progress,
    isPolling,
    error,
    actions: {
      startPolling,
      stopPolling,
      getProgress,
      isPolling: () => isPolling
    }
  };
}

export function ProgressDisplay({ 
  progress, 
  className = '' 
}: ProgressDisplayProps): JSX.Element | null {
  if (!progress) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-200 text-green-800';
      case 'failed':
        return 'bg-red-200 text-red-800';
      case 'in_progress':
        return 'bg-blue-200 text-blue-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className={`mt-4 p-4 border rounded bg-gray-50 ${className}`} data-testid="progress-display">
      <h3 className="font-medium mb-2">Newsletter Progress</h3>
      <div className="space-y-2">
        <div data-testid="campaign-title">
          <strong>Campaign:</strong> {progress.campaignTitle}
        </div>
        <div data-testid="status">
          <strong>Status:</strong> 
          <span 
            className={`ml-2 px-2 py-1 rounded text-sm ${getStatusColor(progress.status)}`}
            data-testid="status-badge"
          >
            {progress.status}
          </span>
        </div>
        <div data-testid="progress-text">
          <strong>Progress:</strong> {progress.processedCount}/{progress.totalRecipients} ({progress.progressPercentage}%)
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2" data-testid="progress-bar-container">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress.progressPercentage}%` }}
            data-testid="progress-bar"
          ></div>
        </div>
        {progress.hasFailures && (
          <div className="text-red-600" data-testid="failure-warning">
            ⚠️ Some deliveries failed
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProgressTracker({
  campaignTitle,
  onProgressUpdate,
  pollInterval = 2000,
  autoStart = true,
  className = '',
  testMode = false
}: ProgressTrackerProps): JSX.Element {
  const { progress, isPolling, error } = useProgressTracker({
    campaignTitle,
    onProgressUpdate,
    pollInterval,
    autoStart,
    testMode
  });

  // Derive test mode from progress data if available, otherwise use prop
  const isTestMode = progress?.isTest ?? testMode;
  
  // Always show something when we have a campaign title
  const shouldShowStatus = campaignTitle || progress || isPolling || error;

  return (
    <div className={className} data-testid="progress-tracker">
      {/* Test mode indicator */}
      {isTestMode && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded" data-testid="test-mode-indicator">
          🧪 <strong>Test Mode:</strong> {progress ? 'Sending to akrillo89@gmail.com only' : 'Simulating realistic progress for demo purposes'}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded" data-testid="error-message">
          ❌ <strong>Error:</strong> {error}
        </div>
      )}
      
      {/* Starting/polling state */}
      {isPolling && !progress && (
        <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded" data-testid="polling-indicator">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
            {isTestMode ? 'Starting test newsletter campaign...' : 'Checking progress...'}
          </div>
        </div>
      )}

      {/* Campaign status when we have a title but no progress yet */}
      {shouldShowStatus && !progress && !isPolling && !error && (
        <div className="mt-4 p-3 bg-gray-100 border border-gray-400 text-gray-700 rounded" data-testid="waiting-indicator">
          📋 <strong>Campaign:</strong> {campaignTitle} - Waiting to start...
        </div>
      )}

      {/* Progress display */}
      <ProgressDisplay progress={progress} />

      {/* Additional test mode info */}
      {isTestMode && progress && (
        <div className="mt-2 text-sm text-gray-600" data-testid="test-mode-info">
          💡 Test mode: Real email sent to <strong>akrillo89@gmail.com</strong>
        </div>
      )}
    </div>
  );
}