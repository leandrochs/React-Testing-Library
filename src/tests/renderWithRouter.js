import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();

  const returnFromRender = render(
    <Router history={ customHistory }>{ component }</Router>,
  );
  return { history: customHistory, ...returnFromRender };
}

export default renderWithRouter;

// Referência: Aula 14.3
// https://github.com/tryber/sd-016-b-live-lectures/blob/lecture/14.3/portfolio/src/tests/renderWithRouter.js
