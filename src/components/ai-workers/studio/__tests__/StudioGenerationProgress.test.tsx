import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StudioGenerationProgress } from '../StudioGenerationProgress';

const defaultProps = {
  jobStatus: null as string | null,
  videoUrl: null as string | null,
  onReset: vi.fn(),
  onRegenerate: vi.fn(),
  onBackToScript: vi.fn(),
  videoTitle: 'Test Video',
  videoDescription: 'A test description',
  videoRequestId: 'req-123',
};

describe('StudioGenerationProgress', () => {
  it('renders loading state when generating', () => {
    render(<StudioGenerationProgress {...defaultProps} jobStatus="processing" />);
    expect(screen.getByText('Generating Video...')).toBeInTheDocument();
    expect(screen.getByText(/This may take 1–5 minutes/i)).toBeInTheDocument();
  });

  it('shows the processing badge', () => {
    render(<StudioGenerationProgress {...defaultProps} jobStatus="processing" />);
    expect(screen.getByText('processing')).toBeInTheDocument();
  });

  it('renders completed state with video player', () => {
    const videoUrl = 'https://example.com/video.mp4';
    render(<StudioGenerationProgress {...defaultProps} jobStatus="completed" videoUrl={videoUrl} />);
    expect(screen.getByText('Video Ready! 🎬')).toBeInTheDocument();
    const video = document.querySelector('video');
    expect(video).toBeTruthy();
    expect(video?.getAttribute('src')).toBe(videoUrl);
  });

  it('renders Download link for completed video', () => {
    const videoUrl = 'https://example.com/video.mp4';
    render(<StudioGenerationProgress {...defaultProps} jobStatus="completed" videoUrl={videoUrl} />);
    expect(screen.getByText('Download')).toBeInTheDocument();
    const downloadLink = screen.getByText('Download').closest('a');
    expect(downloadLink?.getAttribute('href')).toBe(videoUrl);
  });

  it('renders YouTube upload button for completed video', () => {
    render(<StudioGenerationProgress {...defaultProps} jobStatus="completed" videoUrl="https://example.com/v.mp4" />);
    expect(screen.getByText('YouTube')).toBeInTheDocument();
  });

  it('renders Create Another button and calls onReset', () => {
    const onReset = vi.fn();
    render(<StudioGenerationProgress {...defaultProps} jobStatus="completed" videoUrl="https://x.mp4" onReset={onReset} />);
    fireEvent.click(screen.getByText('Create Another'));
    expect(onReset).toHaveBeenCalled();
  });

  it('renders Regenerate button and calls onRegenerate', () => {
    const onRegenerate = vi.fn();
    render(<StudioGenerationProgress {...defaultProps} jobStatus="completed" videoUrl="https://x.mp4" onRegenerate={onRegenerate} />);
    fireEvent.click(screen.getByText('Regenerate'));
    expect(onRegenerate).toHaveBeenCalled();
  });

  it('renders failed state with error message', () => {
    render(<StudioGenerationProgress {...defaultProps} jobStatus="failed" />);
    expect(screen.getByText('Generation Failed')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong. Please try again.')).toBeInTheDocument();
  });

  it('renders back to script button on failure', () => {
    const onBackToScript = vi.fn();
    render(<StudioGenerationProgress {...defaultProps} jobStatus="failed" onBackToScript={onBackToScript} />);
    fireEvent.click(screen.getByText('← Back to Script'));
    expect(onBackToScript).toHaveBeenCalled();
  });
});
