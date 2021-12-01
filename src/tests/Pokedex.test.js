import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('5. Teste o componente <Pokedex.js />', () => {
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
    'Pikachu',
  ];

  const elementsByTypes = [
    { Electric: ['Pikachu'] },
    { Fire: ['Charmander', 'Rapidash'] },
    { Bug: ['Caterpie'] },
    { Poison: ['Ekans'] },
    { Psychic: ['Alakazam', 'Mew'] },
    { Normal: ['Snorlax'] },
    { Dragon: ['Dragonair'] },
  ];

  it('a) Página contém um heading h2 com o texto Encountered pokémons.', () => {
    const heading = screen.getByRole('heading', {
      name: /encountered pokémons/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('b) Exibe o próximo Pokémon da lista quando o botão Próximo é clicado.', () => {
    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);

    elements.forEach((element) => {
      const elementTested = screen.getByText(element);
      expect(elementTested).toBeDefined();

      expect(allButton).toBeDefined();

      const buttonProximo = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(buttonProximo);
    });
  });

  it('c(  })) Teste se é mostrado apenas um Pokémon por vez.', () => {
    elements.forEach((element) => {
      const elementTested = screen.getByText(element);
      expect(elementTested).toBeDefined();

      const singleElement = screen.getByText(/average weight/i);
      expect(singleElement).toBeDefined();

      const buttonProximo = screen.getByRole('button', { name: /próximo pokémon/i });
      userEvent.click(buttonProximo);
    });
  });

  it('d) Deve existir um botão de filtragem para cada tipo, sem repetição.', () => {
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeDefined();

    elementsByTypes.forEach((elementsByType) => {
      const [type] = Object.keys(elementsByType);

      const typeButton = screen.getByRole('button', { name: type });
      expect(typeButton).toBeDefined();
    });
  });

  it('e) Na seleção de um botão, deve circular somente pokémons daquele tipo.', () => {
    const TYPE_BUTTONS = 7;
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(TYPE_BUTTONS);

    elementsByTypes.forEach((elementsByType) => {
      const [type] = Object.keys(elementsByType);
      const [group] = Object.values(elementsByType);

      const typeButton = screen.getByRole('button', { name: type });
      userEvent.click(typeButton);

      group.forEach((eachElement) => {
        const screenType = screen.getByText(eachElement);
        expect(screenType).toBeDefined();

        const buttonProximo = screen.getByRole('button', { name: /próximo pokémon/i });
        userEvent.click(buttonProximo);
      });
    });
  });

  it('f) O texto do botão deve corresponder ao nome do tipo.', () => {
    elementsByTypes.forEach((elementsByType) => {
      const [type] = Object.keys(elementsByType);
      const [group] = Object.values(elementsByType);

      const typeButton = screen.getByRole('button', { name: type });
      userEvent.click(typeButton);

      group.forEach((eachElement) => {
        const screenType = screen.getByText(eachElement);
        expect(screenType).toBeDefined();

        const elementType = screen.getAllByText(type);
        expect(elementType.length).toBe(2);

        const buttonProximo = screen.getByRole('button', { name: /próximo pokémon/i });
        userEvent.click(buttonProximo);
      });
    });
  });

  it('g) O botão All precisa estar sempre visível.', () => {
    elementsByTypes.forEach((elementsByType) => {
      const [type] = Object.keys(elementsByType);
      const [group] = Object.values(elementsByType);

      const typeButton = screen.getByRole('button', { name: type });
      userEvent.click(typeButton);

      group.forEach((eachElement) => {
        const screenType = screen.getByText(eachElement);
        expect(screenType).toBeDefined();

        const elementType = screen.getAllByText(type);
        expect(elementType.length).toBe(2);

        const allButton = screen.getByRole('button', { name: /all/i });
        expect(allButton).toBeDefined();

        const buttonProximo = screen.getByRole('button', { name: /próximo pokémon/i });
        userEvent.click(buttonProximo);
      });
    });
  });
});
