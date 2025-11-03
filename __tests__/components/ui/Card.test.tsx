import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import '@testing-library/jest-dom';

describe('Card Components', () => {
  describe('Card', () => {
    it('should render children correctly', () => {
      render(<Card>Test Content</Card>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<Card className="custom-class">Content</Card>);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should apply hover class when hover prop is true', () => {
      const { container } = render(<Card hover>Content</Card>);
      expect(container.firstChild).toHaveClass('cursor-pointer');
    });

    it('should call onClick when clicked', () => {
      const handleClick = jest.fn();
      const { container } = render(<Card onClick={handleClick}>Clickable Card</Card>);

      const card = container.firstChild as HTMLElement;
      card.click();

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should have card class by default', () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.firstChild).toHaveClass('card');
    });
  });

  describe('CardHeader', () => {
    it('should render children correctly', () => {
      render(<CardHeader>Header Content</CardHeader>);
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <CardHeader className="custom-header">Header</CardHeader>
      );
      expect(container.firstChild).toHaveClass('custom-header');
    });

    it('should have default margin bottom class', () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      expect(container.firstChild).toHaveClass('mb-4');
    });
  });

  describe('CardTitle', () => {
    it('should render children correctly', () => {
      render(<CardTitle>Title Text</CardTitle>);
      expect(screen.getByText('Title Text')).toBeInTheDocument();
    });

    it('should apply heading styles', () => {
      const { container } = render(<CardTitle>Title</CardTitle>);
      expect(container.firstChild).toHaveClass('text-xl', 'font-semibold');
    });

    it('should apply custom className', () => {
      const { container } = render(
        <CardTitle className="custom-title">Title</CardTitle>
      );
      expect(container.firstChild).toHaveClass('custom-title');
    });

    it('should render as h3 element', () => {
      render(<CardTitle>Title</CardTitle>);
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });
  });

  describe('CardContent', () => {
    it('should render children correctly', () => {
      render(<CardContent>Content Text</CardContent>);
      expect(screen.getByText('Content Text')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <CardContent className="custom-content">Content</CardContent>
      );
      expect(container.firstChild).toHaveClass('custom-content');
    });

    it('should render multiple children', () => {
      render(
        <CardContent>
          <p>First</p>
          <p>Second</p>
        </CardContent>
      );
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });
  });

  describe('Card composition', () => {
    it('should work together as a complete card', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Test content paragraph</p>
          </CardContent>
        </Card>
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test content paragraph')).toBeInTheDocument();
    });
  });
});
