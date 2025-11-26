import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SecondActivityView from './SecondActivityView';
import * as viewModelModule from './secondActivityViewModel';

// Mock the view model module
vi.mock('./secondActivityViewModel');

describe('SecondActivityView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display the info property from the view model', () => {
    // Arrange
    const mockInfo = 'Test information from view model';
    vi.spyOn(viewModelModule, 'secondActivityViewModel').mockReturnValue({
      info: mockInfo,
    });

    // Act
    render(<SecondActivityView />);

    // Assert
    expect(screen.getByText(mockInfo)).toBeInTheDocument();
  });

  it('should render the heading', () => {
    // Arrange
    vi.spyOn(viewModelModule, 'secondActivityViewModel').mockReturnValue({
      info: 'Some info',
    });

    // Act
    render(<SecondActivityView />);

    // Assert
    expect(screen.getByRole('heading', { name: /second activity view/i })).toBeInTheDocument();
  });

  it('should display the modified view model info', () => {
    // Arrange
    const updatedInfo = "lorem ipsum dolor sit amet";
    vi.spyOn(viewModelModule, 'secondActivityViewModel').mockReturnValue({
      info: updatedInfo,
    });

    // Act
    render(<SecondActivityView />);

    // Assert
    expect(screen.getByText(updatedInfo)).toBeInTheDocument();
  });

  it('should render info inside a paragraph element', () => {
    // Arrange
    const mockInfo = 'Paragraph test info';
    vi.spyOn(viewModelModule, 'secondActivityViewModel').mockReturnValue({
      info: mockInfo,
    });

    // Act
    const { container } = render(<SecondActivityView />);
    const paragraph = container.querySelector('p');

    // Assert
    expect(paragraph).toBeInTheDocument();
    expect(paragraph?.textContent).toBe(mockInfo);
  });

  it('should handle empty info string', () => {
    // Arrange
    vi.spyOn(viewModelModule, 'secondActivityViewModel').mockReturnValue({
      info: '',
    });

    // Act
    const { container } = render(<SecondActivityView />);
    const paragraph = container.querySelector('p');

    // Assert
    expect(paragraph).toBeInTheDocument();
    expect(paragraph?.textContent).toBe('');
  });

  it('should call the view model function', () => {
    // Arrange
    const viewModelSpy = vi.spyOn(viewModelModule, 'secondActivityViewModel').mockReturnValue({
      info: 'Test',
    });

    // Act
    render(<SecondActivityView />);

    // Assert
    expect(viewModelSpy).toHaveBeenCalledTimes(1);
  });
});
