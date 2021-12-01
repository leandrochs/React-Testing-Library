import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
  });

  it('a) Contém texto <name> Details, onde <name> é o nome do Pokémon;', () => {
    const heading = screen.getByRole('heading', { name: /pikachu details/i });
    expect(heading).toBeDefined();
  });

  it('b) Não deve existir o link de navegação para os detalhes.', () => {
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    expect(detailsLink).not.toBeInTheDocument();
  });

  it('c) A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
    const summary = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });

    expect(summary).toBeDefined();
  });

  it('d) Um parágrafo com o resumo do Pokémon específico sendo visualizado.', () => {
    const abstract = screen.getByText(/this intelligent pokémon roasts hard/i);
    expect(abstract).toBeDefined();
  });

  it('e) Existe um heading h2 com o texto Game Locations of <name>', () => {
    const heading = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(heading).toBeDefined();
  });

  it('f) Todas as localizações devem ser mostradas na seção de detalhes.', () => {
    const location1 = screen.getByText(/kanto viridian forest/i);
    expect(location1).toBeDefined();

    const location2 = screen.getByText(/kanto power plant/i);
    expect(location2).toBeDefined();
  });

  it('g) Exibe imagem do mapa', () => {
    const img = screen.getAllByAltText(/Pikachu location/i);
    expect(img.length).toBe(2);
  });

  it('h) Imagem da localização deve ter atributo src com a URL da localização.', () => {
    const img = screen.getAllByAltText(/Pikachu location/i);

    expect(img[0].src.includes('https://')).toBe(true);
    expect(img[1].src.includes('https://')).toBe(true);
  });

  it('i) A imagem deve ter atributo alt com texto <name> location.', () => {
    const img = screen.getAllByAltText(/Pikachu location/i);
    expect(img).toBeDefined();
  });

  it('j) A página deve exibir um checkbox que permite favoritar o Pokémon.', () => {
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkbox).toBeDefined();
  });

  it('h) Cliques alternados no checkbox adicionam e removem de favoritos;', () => {
    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);

    const favoriteIcon = screen.getByRole('img', { name: /marked as favorite/i });
    expect(favoriteIcon).toBeDefined();

    userEvent.click(checkbox);
    expect(favoriteIcon).not.toBeInTheDocument();

    userEvent.click(checkbox);
    const favoriteIcon2 = screen.getByRole('img', { name: /marked as favorite/i });
    expect(favoriteIcon2).toBeInTheDocument();
  });

  it('i) O label do checkbox deve conter o texto Pokémon favoritado?', () => {
    const label = screen.getByText(/pokémon favoritado\?/i);
    expect(label).toBeDefined();
  });
});
