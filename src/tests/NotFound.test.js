import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('4. Teste o componente <NotFound.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('a) Contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urlInvalida');

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('b) Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif .', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urlInvalida');

    const img = screen.getByRole('img', { name: /pikachu crying/i });

    expect(img).toBeDefined();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
