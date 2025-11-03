import { render, screen } from '@testing-library/react';
import EmergencyPage from '@/app/emergency/page';
import '@testing-library/jest-dom';

describe('Emergency Page', () => {
  it('should render page title', () => {
    render(<EmergencyPage />);
    expect(screen.getByText('Cartão de Emergência')).toBeInTheDocument();
  });

  it('should display blood type prominently', () => {
    render(<EmergencyPage />);

    expect(screen.getByText(/A\+/)).toBeInTheDocument();
  });

  it('should show organ donor status', () => {
    render(<EmergencyPage />);

    expect(screen.getByText(/doador de órgãos/i)).toBeInTheDocument();
  });

  it('should render allergies section', () => {
    render(<EmergencyPage />);

    expect(screen.getByText(/alergias/i)).toBeInTheDocument();
  });

  it('should display specific allergies', () => {
    render(<EmergencyPage />);

    expect(screen.getByText('Penicilina')).toBeInTheDocument();
    expect(screen.getByText('Camarão')).toBeInTheDocument();
  });

  it('should show allergy reactions', () => {
    render(<EmergencyPage />);

    expect(screen.getByText(/urticária e dificuldade respiratória/i)).toBeInTheDocument();
  });

  it('should display chronic conditions', () => {
    render(<EmergencyPage />);

    expect(screen.getByText('Hipertensão Arterial')).toBeInTheDocument();
    expect(screen.getByText('Diabetes Tipo 2')).toBeInTheDocument();
  });

  it('should show current medications', () => {
    render(<EmergencyPage />);

    expect(screen.getByText('Losartana 50mg')).toBeInTheDocument();
    expect(screen.getByText('Metformina 850mg')).toBeInTheDocument();
  });

  it('should render emergency contacts section', () => {
    render(<EmergencyPage />);

    expect(screen.getByText('Contatos de Emergência')).toBeInTheDocument();
  });

  it('should display emergency contact names', () => {
    render(<EmergencyPage />);

    expect(screen.getByText('Maria Silva')).toBeInTheDocument();
    expect(screen.getByText('João Silva')).toBeInTheDocument();
  });

  it('should show relationship for contacts', () => {
    render(<EmergencyPage />);

    expect(screen.getByText('Esposa')).toBeInTheDocument();
    expect(screen.getByText('Filho')).toBeInTheDocument();
  });

  it('should mark primary contact', () => {
    render(<EmergencyPage />);

    expect(screen.getByText('Principal')).toBeInTheDocument();
  });

  it('should display insurance information', () => {
    render(<EmergencyPage />);

    expect(screen.getByText('Unimed')).toBeInTheDocument();
    expect(screen.getByText('123456789')).toBeInTheDocument();
  });

  it('should show insurance validity', () => {
    render(<EmergencyPage />);

    expect(screen.getByText(/validade/i)).toBeInTheDocument();
  });

  it('should display advance directives if present', () => {
    render(<EmergencyPage />);

    expect(
      screen.getByText(/em caso de emergência, priorizar qualidade de vida/i)
    ).toBeInTheDocument();
  });

  it('should have share and print buttons', () => {
    render(<EmergencyPage />);

    expect(screen.getByText('Compartilhar')).toBeInTheDocument();
    expect(screen.getByText('Imprimir Cartão')).toBeInTheDocument();
  });

  it('should show call buttons for emergency contacts', () => {
    render(<EmergencyPage />);

    const callButtons = screen.getAllByText('Ligar');
    expect(callButtons.length).toBeGreaterThan(0);
  });
});
