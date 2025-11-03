import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('should render children correctly', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should apply primary variant by default', () => {
    const { container } = render(<Button>Primary</Button>);
    expect(container.firstChild).toHaveClass('btn-primary');
  });

  it('should apply secondary variant', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toHaveClass('btn-secondary');
  });

  it('should apply danger variant', () => {
    const { container } = render(<Button variant="danger">Danger</Button>);
    expect(container.firstChild).toHaveClass('bg-danger-600');
  });

  it('should apply ghost variant', () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    expect(container.firstChild).toHaveClass('bg-transparent');
  });

  it('should apply medium size by default', () => {
    const { container } = render(<Button>Medium</Button>);
    expect(container.firstChild).toHaveClass('px-4', 'py-2');
  });

  it('should apply small size', () => {
    const { container } = render(<Button size="sm">Small</Button>);
    expect(container.firstChild).toHaveClass('px-3', 'py-1.5', 'text-sm');
  });

  it('should apply large size', () => {
    const { container } = render(<Button size="lg">Large</Button>);
    expect(container.firstChild).toHaveClass('px-6', 'py-3', 'text-lg');
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByText('Click Me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    const button = screen.getByText('Disabled');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    const { container } = render(<Button className="custom-button">Custom</Button>);
    expect(container.firstChild).toHaveClass('custom-button');
  });

  it('should render as button element', () => {
    render(<Button>Button Element</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should support button type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByText('Submit');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should have transition classes', () => {
    const { container } = render(<Button>Transition</Button>);
    expect(container.firstChild).toHaveClass('transition-colors', 'duration-200');
  });

  it('should have disabled cursor when disabled', () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    expect(container.firstChild).toHaveClass('disabled:cursor-not-allowed');
  });
});
