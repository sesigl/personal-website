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

  const getStatusTone = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'danger';
      case 'in_progress':
        return 'info';
      default:
        return 'neutral';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      case 'in_progress':
        return 'In progress';
      default:
        return 'Pending';
    }
  };

  return (
    <section className={`ss-card ${className}`} data-testid="progress-display" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div>
          <div className="ss-meta" style={{ display: 'block' }}>Campaign</div>
          <div
            data-testid="campaign-title"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text-strong)' }}
          >
            Campaign: {progress.campaignTitle}
          </div>
        </div>
        <span
          className={`ss-badge ss-badge--${getStatusTone(progress.status)}`}
          data-testid="status-badge"
        >
          {getStatusLabel(progress.status)}
        </span>
      </div>
      <div
        className="ss-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress.progressPercentage}
        aria-label="Delivery progress"
        data-testid="progress-bar-container"
      >
        <div
          className="ss-progress__bar"
          style={{ width: `${progress.progressPercentage}%` }}
          data-testid="progress-bar"
        ></div>
      </div>
      <div
        data-testid="progress-text"
        style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}
      >
        Progress: {progress.processedCount}/{progress.totalRecipients} ({progress.progressPercentage}%)
      </div>
      {progress.hasFailures && (
        <div className="ss-alert ss-alert--danger" role="alert" data-testid="failure-warning">
          Some deliveries failed.
        </div>
      )}
    </section>
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
    <div className={className} data-testid="progress-tracker" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Test mode indicator */}
      {isTestMode && (
        <div className="ss-alert ss-alert--warning" role="status" data-testid="test-mode-indicator">
          <div>
            <strong>Test mode:</strong>{' '}
            {progress
              ? 'Sending to akrillo89@gmail.com only'
              : 'Simulating realistic progress for demo purposes'}
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="ss-alert ss-alert--danger" role="alert" data-testid="error-message">
          <div>
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {/* Starting/polling state */}
      {isPolling && !progress && (
        <div className="ss-alert ss-alert--info" role="status" data-testid="polling-indicator" style={{ alignItems: 'center' }}>
          <span className="ss-btn__spinner" aria-hidden="true" />
          <div>{isTestMode ? 'Starting test newsletter campaign...' : 'Checking progress...'}</div>
        </div>
      )}

      {/* Campaign status when we have a title but no progress yet */}
      {shouldShowStatus && !progress && !isPolling && !error && (
        <div className="ss-alert ss-alert--neutral" role="status" data-testid="waiting-indicator">
          <div>
            <strong>Campaign:</strong> {campaignTitle} - Waiting to start...
          </div>
        </div>
      )}

      {/* Progress display */}
      <ProgressDisplay progress={progress} />

      {/* Additional test mode info */}
      {isTestMode && progress && (
        <div
          style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}
          data-testid="test-mode-info"
        >
          Test mode: Real email sent to <strong>akrillo89@gmail.com</strong>
        </div>
      )}
    </div>
  );
}