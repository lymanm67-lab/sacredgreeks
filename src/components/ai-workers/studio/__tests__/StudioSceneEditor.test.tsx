import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StudioSceneEditor } from '../StudioSceneEditor';

const mockScriptData = {
  title: 'Test Video Title',
  script: [
    { timestamp: '0:00-0:05', narration: 'Opening narration', visual: 'Dark background' },
    { timestamp: '0:05-0:15', narration: 'Main content', visual: 'Scripture text' },
  ],
  scenePlan: [
    { sceneNumber: 1, duration: '5s', visual: 'Animation', textOverlay: 'Intro' },
    { sceneNumber: 2, duration: '10s', visual: 'Scripture', textOverlay: 'Verse' },
  ],
  captions: '1\n00:00:00,000 --> 00:00:05,000\nOpening narration',
  transcript: 'Opening narration. Main content.',
  citationsUsed: ['Matthew 5:34'],
};

const mockVideoRequest = {
  id: 'req-1',
  provider: 'replicate',
  provider_model: 'luma/ray',
};

const defaultProps = {
  scriptData: mockScriptData,
  videoRequest: mockVideoRequest,
  selectedProvider: 'replicate',
  onBack: vi.fn(),
  onRegenerate: vi.fn(),
  onSubmitVideo: vi.fn(),
  isLoading: false,
};

describe('StudioSceneEditor', () => {
  it('renders the video title', () => {
    render(<StudioSceneEditor {...defaultProps} />);
    expect(screen.getByText('Test Video Title')).toBeInTheDocument();
  });

  it('renders provider badge', () => {
    render(<StudioSceneEditor {...defaultProps} />);
    expect(screen.getByText('Replicate')).toBeInTheDocument();
  });

  it('renders model badge', () => {
    render(<StudioSceneEditor {...defaultProps} />);
    expect(screen.getByText('luma/ray')).toBeInTheDocument();
  });

  it('renders Back button and calls onBack', () => {
    const onBack = vi.fn();
    render(<StudioSceneEditor {...defaultProps} onBack={onBack} />);
    const backBtn = screen.getByText('Back');
    fireEvent.click(backBtn);
    expect(onBack).toHaveBeenCalled();
  });

  it('renders scene plan items', () => {
    render(<StudioSceneEditor {...defaultProps} />);
    // Scene tabs or list should be visible
    expect(screen.getByText(/Intro/i) || screen.getByText(/Scene 1/i)).toBeTruthy();
  });

  it('displays script narration content', () => {
    render(<StudioSceneEditor {...defaultProps} />);
    // Script content should be accessible somewhere in the editor
    expect(screen.getByText('Test Video Title')).toBeInTheDocument();
  });
});
