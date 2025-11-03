import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/Badge';
import '@testing-library/jest-dom';

describe('Badge', () => {
  it('should render children correctly', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('should apply primary variant by default', () => {
    const { container } = render(<Badge>Primary</Badge>);
    expect(container.firstChild).toHaveClass('badge-primary');
  });

  it('should apply success variant', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    expect(container.firstChild).toHaveClass('badge-success');
  });

  it('should apply warning variant', () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    expect(container.firstChild).toHaveClass('badge-warning');
  });

  it('should apply danger variant', () => {
    const { container } = render(<Badge variant="danger">Danger</Badge>);
    expect(container.firstChild).toHaveClass('badge-danger');
  });

  it('should apply secondary variant', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    expect(container.firstChild).toHaveClass('bg-gray-100');
  });

  it('should have badge class by default', () => {
    const { container } = render(<Badge>Test</Badge>);
    expect(container.firstChild).toHaveClass('badge');
  });

  it('should apply custom className', () => {
    const { container } = render(<Badge className="custom-badge">Custom</Badge>);
    expect(container.firstChild).toHaveClass('custom-badge');
  });

  it('should render as span element', () => {
    const { container } = render(<Badge>Span Badge</Badge>);
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('should preserve badge classes with custom className', () => {
    const { container } = render(
      <Badge className="extra-class" variant="success">
        Badge
      </Badge>
    );
    expect(container.firstChild).toHaveClass('badge');
    expect(container.firstChild).toHaveClass('badge-success');
    expect(container.firstChild).toHaveClass('extra-class');
  });
});
