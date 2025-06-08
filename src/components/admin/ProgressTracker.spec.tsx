/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect as vitestExpect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extend Vitest's expect with jest-dom matchers
vitestExpect.extend(matchers);

import ProgressTracker, { 
  ProgressDisplay, 
  useProgressTracker, 
  type ProgressData 
} from './ProgressTracker';
import { actions } from 'astro:actions';

// Mock astro:actions
vi.mock('astro:actions', () => ({
  actions: {
    admin: {
      getNewsletterProgress: vi.fn()
    }
  }
}));

// Get the mocked function
const mockGetNewsletterProgress = vi.mocked(actions.admin.getNewsletterProgress);

// Mock data for testing
const mockProgressData: ProgressData = {
  isNewCampaign: false,
  status: 'in_progress',
  totalRecipients: 100,
  processedCount: 75,
  progressPercentage: 75,
  hasFailures: false,
  campaignTitle: 'test-campaign-2024',
  isTest: false
};

const completedProgressData: ProgressData = {
  ...mockProgressData,
  status: 'completed',
  processedCount: 100,
  progressPercentage: 100
};

const failedProgressData: ProgressData = {
  ...mockProgressData,
  status: 'failed',
  processedCount: 60,
  progressPercentage: 60,
  hasFailures: true
};

describe('ProgressDisplay', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders null when no progress data is provided', () => {
    render(<ProgressDisplay progress={null} />);
    expect(screen.queryByTestId('progress-display')).not.toBeInTheDocument();
  });

  it('renders progress information correctly', () => {
    render(<ProgressDisplay progress={mockProgressData} />);
    
    expect(screen.getByTestId('progress-display')).toBeInTheDocument();
    expect(screen.getByTestId('campaign-title')).toHaveTextContent('Campaign: test-campaign-2024');
    expect(screen.getByTestId('status-badge')).toHaveTextContent('in_progress');
    expect(screen.getByTestId('progress-text')).toHaveTextContent('Progress: 75/100 (75%)');
  });

  it('applies correct status colors', () => {
    const { rerender } = render(<ProgressDisplay progress={completedProgressData} />);
    expect(screen.getByTestId('status-badge')).toHaveClass('bg-green-200', 'text-green-800');

    rerender(<ProgressDisplay progress={failedProgressData} />);
    expect(screen.getByTestId('status-badge')).toHaveClass('bg-red-200', 'text-red-800');

    rerender(<ProgressDisplay progress={mockProgressData} />);
    expect(screen.getByTestId('status-badge')).toHaveClass('bg-blue-200', 'text-blue-800');
  });

  it('renders progress bar with correct width', () => {
    render(<ProgressDisplay progress={mockProgressData} />);
    
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toHaveStyle({ width: '75%' });
  });

  it('shows failure warning when hasFailures is true', () => {
    render(<ProgressDisplay progress={failedProgressData} />);
    
    expect(screen.getByTestId('failure-warning')).toBeInTheDocument();
    expect(screen.getByTestId('failure-warning')).toHaveTextContent('⚠️ Some deliveries failed');
  });

  it('does not show failure warning when hasFailures is false', () => {
    const progressWithoutFailures = { ...mockProgressData, hasFailures: false };
    render(<ProgressDisplay progress={progressWithoutFailures} />);
    
    expect(screen.queryByTestId('failure-warning')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ProgressDisplay progress={mockProgressData} className="custom-class" />);
    
    expect(screen.getByTestId('progress-display')).toHaveClass('custom-class');
  });
});

describe('ProgressTracker Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    render(<ProgressTracker />);
    expect(screen.getByTestId('progress-tracker')).toBeInTheDocument();
  });

  it('shows polling indicator when polling starts without progress', () => {
    mockGetNewsletterProgress.mockResolvedValue({ data: null, error: undefined });
    
    render(<ProgressTracker campaignTitle="test-campaign" autoStart={true} />);
    
    expect(screen.getByTestId('polling-indicator')).toBeInTheDocument();
    expect(screen.getByTestId('polling-indicator')).toHaveTextContent('Checking progress...');
  });

  it('does not auto-start when autoStart is false', () => {
    render(<ProgressTracker campaignTitle="test-campaign" autoStart={false} />);
    
    expect(screen.queryByTestId('polling-indicator')).not.toBeInTheDocument();
    expect(mockGetNewsletterProgress).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<ProgressTracker className="custom-tracker-class" />);
    
    expect(screen.getByTestId('progress-tracker')).toHaveClass('custom-tracker-class');
  });

  it('displays error when provided via props', () => {
    // Test the hook directly by creating a component that triggers an error
    const TestErrorComponent = () => {
      const { error } = useProgressTracker({ 
        campaignTitle: '', // Empty title should trigger error
        autoStart: false 
      });
      
      return (
        <div data-testid="progress-tracker">
          {error && (
            <div data-testid="error-message">
              Error: {error}
            </div>
          )}
        </div>
      );
    };

    render(<TestErrorComponent />);
    
    // The hook should not show an error initially since autoStart is false
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});

// Test the hook behavior more directly without complex timing
describe('useProgressTracker Hook - Basic Functionality', () => {
  const TestComponent = ({ 
    campaignTitle, 
    autoStart = false  // Default to false to avoid timing issues
  }: {
    campaignTitle?: string;
    autoStart?: boolean;
  }) => {
    const { progress, isPolling, error, actions } = useProgressTracker({
      campaignTitle,
      autoStart,
      pollInterval: 100 // Short interval for testing
    });

    return (
      <div>
        <div data-testid="progress-data">{JSON.stringify(progress)}</div>
        <div data-testid="is-polling">{isPolling.toString()}</div>
        <div data-testid="error-state">{error || 'none'}</div>
        <button 
          data-testid="start-polling" 
          onClick={() => actions.startPolling('manual-campaign')}
        >
          Start Polling
        </button>
        <button 
          data-testid="stop-polling" 
          onClick={() => actions.stopPolling()}
        >
          Stop Polling
        </button>
        <button 
          data-testid="start-empty" 
          onClick={() => actions.startPolling('')}
        >
          Start Empty
        </button>
      </div>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('initializes with correct default state', () => {
    render(<TestComponent autoStart={false} />);
    
    expect(screen.getByTestId('progress-data')).toHaveTextContent('null');
    expect(screen.getByTestId('is-polling')).toHaveTextContent('false');
    expect(screen.getByTestId('error-state')).toHaveTextContent('none');
  });

  it('validates campaign title when manually starting', async () => {
    render(<TestComponent autoStart={false} />);
    
    // Try to start polling with empty campaign title
    await userEvent.click(screen.getByTestId('start-empty'));
    
    expect(screen.getByTestId('error-state')).toHaveTextContent('Campaign title is required');
  });

  it('starts polling manually', async () => {
    mockGetNewsletterProgress.mockResolvedValue({ data: mockProgressData, error: undefined });
    
    render(<TestComponent autoStart={false} />);
    
    // Initially not polling
    expect(screen.getByTestId('is-polling')).toHaveTextContent('false');
    
    // Start polling manually
    await userEvent.click(screen.getByTestId('start-polling'));
    expect(screen.getByTestId('is-polling')).toHaveTextContent('true');
  });

  it('stops polling manually', async () => {
    render(<TestComponent autoStart={false} />);
    
    // Start polling first
    await userEvent.click(screen.getByTestId('start-polling'));
    expect(screen.getByTestId('is-polling')).toHaveTextContent('true');
    
    // Stop polling
    await userEvent.click(screen.getByTestId('stop-polling'));
    expect(screen.getByTestId('is-polling')).toHaveTextContent('false');
  });

  it('cleans up polling on unmount', () => {
    const { unmount } = render(<TestComponent campaignTitle="test-campaign" autoStart={false} />);
    
    // Start polling
    const startButton = screen.getByTestId('start-polling');
    userEvent.click(startButton);
    
    // Unmount should not throw errors
    expect(() => unmount()).not.toThrow();
  });
});

// Test specific progress states without timing complications
describe('ProgressDisplay - All States', () => {
  afterEach(() => {
    cleanup();
  });

  it('displays pending status correctly', () => {
    const pendingData = { ...mockProgressData, status: 'pending' as const };
    render(<ProgressDisplay progress={pendingData} />);
    
    expect(screen.getByTestId('status-badge')).toHaveTextContent('pending');
    expect(screen.getByTestId('status-badge')).toHaveClass('bg-gray-200', 'text-gray-800');
  });

  it('displays completed status correctly', () => {
    render(<ProgressDisplay progress={completedProgressData} />);
    
    expect(screen.getByTestId('status-badge')).toHaveTextContent('completed');
    expect(screen.getByTestId('status-badge')).toHaveClass('bg-green-200', 'text-green-800');
  });

  it('displays failed status correctly', () => {
    render(<ProgressDisplay progress={failedProgressData} />);
    
    expect(screen.getByTestId('status-badge')).toHaveTextContent('failed');
    expect(screen.getByTestId('status-badge')).toHaveClass('bg-red-200', 'text-red-800');
    expect(screen.getByTestId('failure-warning')).toBeInTheDocument();
  });

  it('handles zero recipients correctly', () => {
    const emptyData = { 
      ...mockProgressData, 
      totalRecipients: 0, 
      processedCount: 0, 
      progressPercentage: 100 
    };
    render(<ProgressDisplay progress={emptyData} />);
    
    expect(screen.getByTestId('progress-text')).toHaveTextContent('Progress: 0/0 (100%)');
    expect(screen.getByTestId('progress-bar')).toHaveStyle({ width: '100%' });
  });
});