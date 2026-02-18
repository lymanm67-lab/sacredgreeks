import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StudioPromptHero } from '../StudioPromptHero';

const defaultProps = {
  generationMode: 'text_to_video' as const,
  onModeChange: vi.fn(),
  prompt: '',
  onPromptChange: vi.fn(),
  onGenerate: vi.fn(),
  isLoading: false,
  isAdmin: false,
  selectedProvider: 'invideo' as const,
  onProviderChange: vi.fn(),
  selectedModel: 'minimax/video-01-live',
  onModelChange: vi.fn(),
  onShowLibrary: vi.fn(),
  onShowAdmin: vi.fn(),
  sceneCount: '6',
  onSceneCountChange: vi.fn(),
};

describe('StudioPromptHero', () => {
  it('renders the header and subtitle', () => {
    render(<StudioPromptHero {...defaultProps} />);
    expect(screen.getByText('Script Writing Assistant')).toBeInTheDocument();
    expect(screen.getByText('AI-powered video scripts for InVideo.ai')).toBeInTheDocument();
  });

  it('renders all navigation tabs', () => {
    render(<StudioPromptHero {...defaultProps} />);
    expect(screen.getByText('Storyboard')).toBeInTheDocument();
    expect(screen.getByText('Create Video')).toBeInTheDocument();
    expect(screen.getByText('Image to Video')).toBeInTheDocument();
    expect(screen.getByText('Upload & Edit')).toBeInTheDocument();
    expect(screen.getByText('AI Images')).toBeInTheDocument();
    expect(screen.getByText('Library')).toBeInTheDocument();
  });

  it('shows Admin tab only for admins', () => {
    const { rerender } = render(<StudioPromptHero {...defaultProps} isAdmin={false} />);
    expect(screen.queryByText('Admin')).not.toBeInTheDocument();

    rerender(<StudioPromptHero {...defaultProps} isAdmin={true} />);
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('renders the Storyboard Production Suite bar', () => {
    render(<StudioPromptHero {...defaultProps} />);
    expect(screen.getByText('Storyboard Production Suite')).toBeInTheDocument();
    expect(screen.getByText('Listen')).toBeInTheDocument();
    expect(screen.getByText('Show Steps')).toBeInTheDocument();
  });

  it('toggles Show Steps / Hide Steps', () => {
    render(<StudioPromptHero {...defaultProps} />);
    const btn = screen.getByText('Show Steps');
    fireEvent.click(btn);
    expect(screen.getByText('Hide Steps')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Hide Steps'));
    expect(screen.getByText('Show Steps')).toBeInTheDocument();
  });

  it('renders the video creation form in text_to_video mode', () => {
    render(<StudioPromptHero {...defaultProps} generationMode="text_to_video" />);
    expect(screen.getByText('Template')).toBeInTheDocument();
    expect(screen.getByText('Provider')).toBeInTheDocument();
    expect(screen.getByText('Script')).toBeInTheDocument();
    expect(screen.getByText('Generate Video')).toBeInTheDocument();
  });

  it('renders image generation card in generate_image mode', () => {
    render(<StudioPromptHero {...defaultProps} generationMode="generate_image" />);
    expect(screen.getAllByText('Generate Image').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Image Description')).toBeInTheDocument();
  });

  it('shows Provider/Model selectors for image_to_video mode', () => {
    render(<StudioPromptHero {...defaultProps} generationMode="image_to_video" />);
    expect(screen.getByText('Provider')).toBeInTheDocument();
    expect(screen.getByText('Motion Description')).toBeInTheDocument();
  });

  it('hides main content card in video_upload mode', () => {
    render(<StudioPromptHero {...defaultProps} generationMode="video_upload" />);
    expect(screen.queryByText('Generate Video')).not.toBeInTheDocument();
  });

  it('disables generate button when prompt is empty in AI script mode', () => {
    render(<StudioPromptHero {...defaultProps} prompt="" />);
    const btn = screen.getByText('Generate Video');
    expect(btn.closest('button')).toBeDisabled();
  });

  it('enables generate button when prompt has content', () => {
    render(<StudioPromptHero {...defaultProps} prompt="Test video idea" />);
    const btn = screen.getByText('Generate Video');
    expect(btn.closest('button')).not.toBeDisabled();
  });

  it('calls onGenerate when generate button is clicked', () => {
    const onGenerate = vi.fn();
    render(<StudioPromptHero {...defaultProps} prompt="Test" onGenerate={onGenerate} />);
    fireEvent.click(screen.getByText('Generate Video'));
    expect(onGenerate).toHaveBeenCalled();
  });

  it('calls onModeChange when clicking Image to Video tab', () => {
    const onModeChange = vi.fn();
    render(<StudioPromptHero {...defaultProps} onModeChange={onModeChange} />);
    fireEvent.click(screen.getByText('Image to Video'));
    expect(onModeChange).toHaveBeenCalledWith('image_to_video');
  });

  it('calls onShowLibrary when Library tab is clicked', () => {
    const onShowLibrary = vi.fn();
    render(<StudioPromptHero {...defaultProps} onShowLibrary={onShowLibrary} />);
    fireEvent.click(screen.getByText('Library'));
    expect(onShowLibrary).toHaveBeenCalled();
  });

  it('shows loading spinner when isLoading is true', () => {
    render(<StudioPromptHero {...defaultProps} prompt="Test" isLoading={true} />);
    const btn = screen.getByText('Generate Video').closest('button');
    expect(btn).toBeDisabled();
  });
});
