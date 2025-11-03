import { render, screen } from '@testing-library/react';
import { MobileNav } from '@/components/layout/MobileNav';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from 'next/navigation';

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('MobileNav', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/dashboard');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render all mobile navigation items', () => {
    render(<MobileNav />);

    expect(screen.getByText('Início')).toBeInTheDocument();
    expect(screen.getByText('Prescrições')).toBeInTheDocument();
    expect(screen.getByText('Exames')).toBeInTheDocument();
    expect(screen.getByText('Nutrição')).toBeInTheDocument();
    expect(screen.getByText('Médicos')).toBeInTheDocument();
  });

  it('should highlight active route', () => {
    mockUsePathname.mockReturnValue('/prescriptions');

    render(<MobileNav />);

    const prescriptionsLink = screen.getByText('Prescrições').closest('a');
    expect(prescriptionsLink).toHaveClass('text-primary-600');
  });

  it('should not highlight inactive routes', () => {
    mockUsePathname.mockReturnValue('/dashboard');

    render(<MobileNav />);

    const examLink = screen.getByText('Exames').closest('a');
    expect(examLink).not.toHaveClass('text-primary-600');
  });

  it('should have correct links', () => {
    render(<MobileNav />);

    const homeLink = screen.getByText('Início').closest('a');
    expect(homeLink).toHaveAttribute('href', '/dashboard');

    const prescriptionsLink = screen.getByText('Prescrições').closest('a');
    expect(prescriptionsLink).toHaveAttribute('href', '/prescriptions');
  });

  it('should be hidden on desktop (lg:hidden class)', () => {
    const { container } = render(<MobileNav />);
    expect(container.firstChild).toHaveClass('lg:hidden');
  });

  it('should be fixed at bottom', () => {
    const { container } = render(<MobileNav />);
    expect(container.firstChild).toHaveClass('fixed', 'bottom-0');
  });

  it('should have 5 navigation items in grid', () => {
    const { container } = render(<MobileNav />);
    const grid = container.querySelector('.grid-cols-5');
    expect(grid).toBeInTheDocument();
  });
});
