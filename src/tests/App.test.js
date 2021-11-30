import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('1. Teste o componente <App.js /> .', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('a) O primeiro link deve possuir o texto Home.', () => {
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeInTheDocument();
  });

  it('b) O segundo link deve possuir o texto About.', () => {
    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeInTheDocument();
  });

  it('c) O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokemons).toBeInTheDocument();
  });

  it('d) Redireciona para página inicial, na URL / ao clicar no link Home.', () => {
    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);
    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('e) Redireciona para página About, na URL /about, ao clicar no link About.', () => {
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);
    const heading = screen.getByRole('heading', {
      name: /about pokédex/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('f) Redireciona para página de Pokémons Favoritados, na URL /favorites .', () => {
    const favorites = screen.getByRole('link', { name: /Favorite/i });
    userEvent.click(favorites);
    const heading = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('g) Redireciona para página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/urlInvalida');
    const heading = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
