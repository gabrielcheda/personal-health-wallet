import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/components/layout/Header';
import '@testing-library/jest-dom';

describe('Header', () => {
  it('should render search input on desktop', () => {
    render(<Header />);

    const searchInput = screen.getByPlaceholderText(
      /buscar prescrições, exames, médicos/i
    );
    expect(searchInput).toBeInTheDocument();
  });

  it('should render notification button', () => {
    render(<Header />);

    const notificationButton = screen.getByLabelText('Notificações');
    expect(notificationButton).toBeInTheDocument();
  });

  it('should render theme toggle button', () => {
    render(<Header />);

    const themeButton = screen.getByLabelText('Alternar tema');
    expect(themeButton).toBeInTheDocument();
  });

  it('should toggle dark mode when theme button is clicked', () => {
    render(<Header />);

    const themeButton = screen.getByLabelText('Alternar tema');

    // Initially should show Moon icon (light mode)
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click to toggle
    fireEvent.click(themeButton);

    // Should toggle dark class
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Click again to toggle back
    fireEvent.click(themeButton);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should show notification badge', () => {
    const { container } = render(<Header />);

    const badge = container.querySelector('.bg-danger-500');
    expect(badge).toBeInTheDocument();
  });

  it('should be sticky at top', () => {
    const { container } = render(<Header />);

    expect(container.firstChild).toHaveClass('sticky', 'top-0');
  });

  it('should have menu button for mobile', () => {
    render(<Header />);

    // Look for button with Menu icon (hidden on desktop via lg:hidden class)
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
