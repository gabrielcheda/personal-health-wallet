import { render, screen } from '@testing-library/react';
import PrescriptionsPage from '@/app/prescriptions/page';
import '@testing-library/jest-dom';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Prescriptions Page', () => {
  it('should render page title', () => {
    render(<PrescriptionsPage />);
    expect(screen.getByText('Prescrições Médicas')).toBeInTheDocument();
  });

  it('should render filter button', () => {
    render(<PrescriptionsPage />);
    expect(screen.getByText('Filtrar')).toBeInTheDocument();
  });

  it('should render new prescription button', () => {
    render(<PrescriptionsPage />);
    expect(screen.getByText('Nova Prescrição')).toBeInTheDocument();
  });

  it('should display statistics cards', () => {
    render(<PrescriptionsPage />);

    expect(screen.getByText('Ativas')).toBeInTheDocument();
    expect(screen.getByText('Concluídas')).toBeInTheDocument();
    expect(screen.getByText('Medicamentos')).toBeInTheDocument();
    expect(screen.getByText('Próximas Consultas')).toBeInTheDocument();
  });

  it('should render active prescriptions section', () => {
    render(<PrescriptionsPage />);
    expect(screen.getByText('Prescrições Ativas')).toBeInTheDocument();
  });

  it('should display doctor names', () => {
    render(<PrescriptionsPage />);

    expect(screen.getByText('Dr. Carlos Alberto Silva')).toBeInTheDocument();
    expect(screen.getByText('Dra. Maria Helena Santos')).toBeInTheDocument();
  });

  it('should display doctor specialties', () => {
    render(<PrescriptionsPage />);

    expect(screen.getByText(/cardiologia/i)).toBeInTheDocument();
    expect(screen.getByText(/endocrinologia/i)).toBeInTheDocument();
  });

  it('should display diagnoses', () => {
    render(<PrescriptionsPage />);

    expect(screen.getByText('Hipertensão Arterial Sistêmica')).toBeInTheDocument();
    expect(screen.getByText('Diabetes Mellitus Tipo 2')).toBeInTheDocument();
  });

  it('should display CID codes', () => {
    render(<PrescriptionsPage />);

    expect(screen.getByText(/I10/)).toBeInTheDocument();
    expect(screen.getByText(/E11/)).toBeInTheDocument();
  });

  it('should display medications', () => {
    render(<PrescriptionsPage />);

    expect(screen.getByText('Losartana Potássica 50mg')).toBeInTheDocument();
    expect(screen.getByText('Metformina 850mg')).toBeInTheDocument();
  });

  it('should show medication instructions', () => {
    render(<PrescriptionsPage />);

    expect(screen.getByText(/tomar pela manhã/i)).toBeInTheDocument();
    expect(screen.getByText(/após café da manhã e jantar/i)).toBeInTheDocument();
  });

  it('should display completed prescriptions section', () => {
    render(<PrescriptionsPage />);
    expect(screen.getByText('Prescrições Concluídas')).toBeInTheDocument();
  });

  it('should show download and share buttons', () => {
    render(<PrescriptionsPage />);

    const downloadButtons = screen.getAllByText('Download PDF');
    expect(downloadButtons.length).toBeGreaterThan(0);

    const shareButtons = screen.getAllByText('Compartilhar');
    expect(shareButtons.length).toBeGreaterThan(0);
  });

  it('should display medication interactions warning', () => {
    render(<PrescriptionsPage />);

    const interactionElements = screen.getAllByText(/interações/i);
    expect(interactionElements.length).toBeGreaterThan(0);
  });

  it('should show refill information', () => {
    render(<PrescriptionsPage />);

    const refillElements = screen.getAllByText(/renovações disponíveis/i);
    expect(refillElements.length).toBeGreaterThan(0);
  });
});
