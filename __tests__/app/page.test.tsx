import '@testing-library/jest-dom';

// Mock next/navigation
const mockRedirect = jest.fn();
jest.mock('next/navigation', () => ({
  redirect: mockRedirect,
}));

describe('Home Page (Root)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to /dashboard', () => {
    // Import after mocking
    const Home = require('@/app/page').default;

    Home();

    expect(mockRedirect).toHaveBeenCalledWith('/dashboard');
    expect(mockRedirect).toHaveBeenCalledTimes(1);
  });
});
