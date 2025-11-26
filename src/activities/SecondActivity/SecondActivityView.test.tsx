import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import SecondActivityView from './SecondActivityView';
import * as viewModelModule from './secondActivityViewModel';

vi.mock('./secondActivityViewModel');

describe('SecondActivityView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    'Test information from view model',
    'lorem ipsum dolor sit amet',
    '',
  ])('should display info in paragraph: "%s"', (info) => {
    vi.spyOn(viewModelModule, 'secondActivityViewModel').mockReturnValue({ info });
    const { container } = render(<SecondActivityView />);
    const paragraph = container.querySelector('p');

    expect(paragraph).toBeInTheDocument();
    expect(paragraph?.textContent).toBe(info);
  });

  it('should render the heading', () => {
    vi.spyOn(viewModelModule, 'secondActivityViewModel').mockReturnValue({ info: '' });
    render(<SecondActivityView />);

    expect(screen.getByRole('heading', { name: /second activity view/i })).toBeInTheDocument();
  });

  it('should call the view model function', () => {
    const viewModelSpy = vi.spyOn(viewModelModule, 'secondActivityViewModel').mockReturnValue({ info: '' });
    render(<SecondActivityView />);

    expect(viewModelSpy).toHaveBeenCalledTimes(1);
  });
});
