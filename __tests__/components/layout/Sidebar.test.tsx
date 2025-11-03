import { render, screen } from '@testing-library/react';
import { Sidebar } from '@/components/layout/Sidebar';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from 'next/navigation';

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('Sidebar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/dashboard');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render app title', () => {
    render(<Sidebar />);
    expect(screen.getByText('360 Health Wallet')).toBeInTheDocument();
  });

  it('should render all navigation items', () => {
    render(<Sidebar />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Prescrições')).toBeInTheDocument();
    expect(screen.getByText('Exames')).toBeInTheDocument();
    expect(screen.getByText('Nutrição')).toBeInTheDocument();
    expect(screen.getByText('Treinos')).toBeInTheDocument();
    expect(screen.getByText('Linha do Tempo')).toBeInTheDocument();
    expect(screen.getByText('Emergência')).toBeInTheDocument();
    expect(screen.getByText('Médicos')).toBeInTheDocument();
    expect(screen.getByText('Documentos')).toBeInTheDocument();
    expect(screen.getByText('Insights')).toBeInTheDocument();
  });

  it('should highlight active route', () => {
    mockUsePathname.mockReturnValue('/prescriptions');
    const { container } = render(<Sidebar />);

    const prescriptionsLink = screen.getByText('Prescrições').closest('a');
    expect(prescriptionsLink).toHaveClass('bg-primary-50');
  });

  it('should render user information', () => {
    render(<Sidebar />);

    expect(screen.getByText('João Silva')).toBeInTheDocument();
    expect(screen.getByText('joao@email.com')).toBeInTheDocument();
  });

  it('should have correct links', () => {
    render(<Sidebar />);

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');

    const prescriptionsLink = screen.getByText('Prescrições').closest('a');
    expect(prescriptionsLink).toHaveAttribute('href', '/prescriptions');
  });

  it('should not highlight inactive routes', () => {
    mockUsePathname.mockReturnValue('/dashboard');

    render(<Sidebar />);

    const examLink = screen.getByText('Exames').closest('a');
    expect(examLink).not.toHaveClass('bg-primary-50');
  });

  it('should be hidden on mobile (lg:flex class)', () => {
    const { container } = render(<Sidebar />);
    expect(container.firstChild).toHaveClass('hidden', 'lg:flex');
  });
});
