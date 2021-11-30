import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  function addFavorite() {
    const moreDatails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDatails);

    const favoritado = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favoritado);

    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);
  }

  it('a) Exibe mensagem No favorite pokemon found, se não tiver favoritos.', () => {
    const favorites = screen.getByRole('link', { name: /Favorite/i });
    userEvent.click(favorites);

    const message = screen.getByText(/no favorite pokemon found/i);
    expect(message).toBeDefined();
  });

  it('b) Teste se é exibido todos os cards de pokémons favoritados.', () => {
    addFavorite();
    const buttonProximo = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonProximo);

    addFavorite();
    const favorites = screen.getByRole('link', { name: /Favorite/i });
    userEvent.click(favorites);

    const favoriteMoreDatails = screen.getAllByText(/more details/i);
    expect(favoriteMoreDatails.length).toBe(2);
  });
});
