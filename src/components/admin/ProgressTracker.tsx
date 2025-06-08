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
  autoStart = true
}: UseProgressTrackerParams = {}): UseProgressTrackerReturn {
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentCampaignRef = useRef<string | null>(null);

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

  const startPolling = (title: string) => {
    if (!title.trim()) {
      setError('Campaign title is required');
      return;
    }

    stopPolling(); // Stop any existing polling
    setIsPolling(true);
    currentCampaignRef.current = title;

    const poll = async () => {
      // Check if polling was stopped while waiting
      if (currentCampaignRef.current !== title) {
        return;
      }

      try {
        const progressData = await getProgress(title);
        
        // Check again if polling was stopped while fetching
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
          timeoutRef.current = setTimeout(poll, pollInterval);
        } else {
          setIsPolling(false);
          currentCampaignRef.current = null;
        }
      } catch (err) {
        console.error('Error during polling:', err);
        setIsPolling(false);
        currentCampaignRef.current = null;
      }
    };

    poll();
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
  className = ''
}: ProgressTrackerProps): JSX.Element {
  const { progress, isPolling, error, actions } = useProgressTracker({
    campaignTitle,
    onProgressUpdate,
    pollInterval,
    autoStart
  });

  return (
    <div className={className} data-testid="progress-tracker">
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded" data-testid="error-message">
          Error: {error}
        </div>
      )}
      
      {isPolling && !progress && (
        <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded" data-testid="polling-indicator">
          Checking progress...
        </div>
      )}

      <ProgressDisplay progress={progress} />
    </div>
  );
}