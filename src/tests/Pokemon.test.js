import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('6. Teste o componente <Pokemon.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const elements = [
    'Pikachu',
    'Charmander',
    'Caterpie',
    'Ekans',
    'Alakazam',
    'Mew',
    'Rapidash',
    'Snorlax',
    'Dragonair',
  ];

  it('a) O nome correto do Pokémon deve ser mostrado na tela', () => {
    const elementName = screen.getByTestId('pokemon-name').innerHTML;
    const verifyName = elements.includes(elementName);
    expect(verifyName).toBe(true);

    const elementType = screen.getByTestId('pokemon-type').innerHTML;
    const buttonType = screen.getByRole('button', { name: elementType });
    userEvent.click(buttonType);
    expect(elementName).toBeDefined();
  });

  it('b) Peso exibido no formato Average weight: <value> <measurementUnit>', () => {
    // <value> e <measurementUnit> são, respectivamente, peso médio e unidade de medida.
    const average = screen.getByTestId('pokemon-weight').innerHTML;
    const text = average.split(' ');

    const word0 = text[0] === 'Average';
    const word1 = text[1] === 'weight:';
    const word2 = !Number.isNaN(parseFloat(text[2]));
    const word3 = text[3] === 'kg';

    expect(word0 && word1 && word2 && word3).toBe(true);
  });

  it('c) Imagem exibida com atributo src e alt com texto <name> sprite', () => {
    const imgElement = screen.getByRole('img', { name: /sprite/i });

    expect(elements.includes(imgElement.alt.split(' ')[0])).toBe(true);
    expect(imgElement.alt.split(' ')[1]).toBe('sprite');
    expect(imgElement.src.includes('https://')).toBe(true);
  });

  it('d) Teste o link de detalhes', () => {
    const link = screen.getByRole('link', { name: /more details/i }).href;
    expect(!Number.isNaN(parseFloat(link.split('pokemons/')[1]))).toBe(true);
  });

  it('e) Clicar no link de navegação redireciona para página de detalhes.', () => {
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const heading = screen.getByRole('heading', { name: /details/i });
    expect(heading).toBeDefined();
  });

  it('f) URL exibida no navegador muda para /pokemon/<id>', () => {
    const link = screen.getByRole('link', { name: /more details/i }).href;
    const idElement = link.split('pokemons/')[1];

    const { history } = renderWithRouter(<App />);
    history.push(`pokemons/${idElement}`);

    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeDefined();
  });

  it('g) Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const moreDatails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDatails);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkbox);

    const img = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(img).toBeDefined();

    expect(img.alt.includes('marked as favorite')).toBe(true);
    expect(img.src.includes('/star-icon.svg')).toBe(true);
  });
});
