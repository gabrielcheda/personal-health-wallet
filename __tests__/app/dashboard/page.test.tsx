import { render, screen } from '@testing-library/react';
import Dashboard from '@/app/dashboard/page';
import '@testing-library/jest-dom';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Dashboard Page', () => {
  it('should render greeting message', () => {
    render(<Dashboard />);
    expect(screen.getByText(/olá, joão/i)).toBeInTheDocument();
  });

  it('should render health score card', () => {
    render(<Dashboard />);
    expect(screen.getByText('Score de Saúde')).toBeInTheDocument();
  });

  it('should display health score value', () => {
    render(<Dashboard />);
    // The health score should be displayed (78 from mockHealthScore)
    expect(screen.getByText('78')).toBeInTheDocument();
  });

  it('should render quick action buttons', () => {
    render(<Dashboard />);

    expect(screen.getByText('Nova Prescrição')).toBeInTheDocument();
    expect(screen.getByText('Upload Exame')).toBeInTheDocument();
    expect(screen.getByText('Info Emergência')).toBeInTheDocument();
    expect(screen.getByText('Agendar')).toBeInTheDocument();
  });

  it('should render medications section', () => {
    render(<Dashboard />);
    expect(screen.getByText('Medicamentos de Hoje')).toBeInTheDocument();
  });

  it('should render health alerts section', () => {
    render(<Dashboard />);
    expect(screen.getByText('Alertas de Saúde')).toBeInTheDocument();
  });

  it('should render recent activities section', () => {
    render(<Dashboard />);
    expect(screen.getByText('Atividades Recentes')).toBeInTheDocument();
  });

  it('should render achievements section', () => {
    render(<Dashboard />);
    expect(screen.getByText('Conquistas')).toBeInTheDocument();
  });

  it('should display medication names', () => {
    render(<Dashboard />);

    expect(screen.getByText('Losartana 50mg')).toBeInTheDocument();
    expect(screen.getByText('Metformina 850mg')).toBeInTheDocument();
  });

  it('should display adherence rates', () => {
    render(<Dashboard />);

    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
  });

  it('should render health insights with priorities', () => {
    render(<Dashboard />);

    // Should show insights from mockHealthInsights
    expect(screen.getByText('Pressão Arterial Estável')).toBeInTheDocument();
    expect(screen.getByText('Glicemia Elevada')).toBeInTheDocument();
  });

  it('should have links to other pages', () => {
    render(<Dashboard />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);

    // Check for specific links
    const prescriptionLinks = links.filter(link =>
      link.getAttribute('href')?.includes('/prescriptions')
    );
    expect(prescriptionLinks.length).toBeGreaterThan(0);
  });

  it('should render category breakdown in health score', () => {
    render(<Dashboard />);

    // Should show category percentages
    const percentages = screen.getAllByText('85%');
    expect(percentages.length).toBeGreaterThan(0); // medication

    expect(screen.getAllByText('72%').length).toBeGreaterThan(0); // exercise
    expect(screen.getAllByText('80%').length).toBeGreaterThan(0); // nutrition
  });
});
