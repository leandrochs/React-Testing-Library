import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('2. Teste o componente <About.js /> .', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('a) Teste se a página contém as informações sobre a Pokédex.', () => {
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);

    const text = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing/i,
    );

    expect(text).toBeDefined();
  });

  it('b) Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });

    expect(heading).toBeDefined();
  });

  it('c) Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);

    const textP1 = screen.getByText(/this application simulates/i);
    const textP2 = screen.getByText(/one can filter pokémons by/i);

    expect(textP1).toBeDefined();
    expect(textP2).toBeDefined();
  });

  it('e) Teste se a página contém determinada imagem de uma Pokédex .', () => {
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);

    const img = screen.getByRole('img', {
      name: /pokédex/i,
    });

    expect(img).toBeDefined();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
