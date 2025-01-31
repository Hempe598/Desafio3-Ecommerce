import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Teste básico para verificar se o texto "learn react" é renderizado na aplicação.
test('renders learn react link', () => {
  // Renderiza o componente principal <App /> em um ambiente de teste.
  render(<App />);

  // Busca por um elemento na tela que contenha o texto "learn react".
  // A expressão regular (/learn react/i) torna a busca case-insensitive.
  const linkElement = screen.getByText(/learn react/i);

  // Verifica se o elemento encontrado está presente no DOM.
  // Se o elemento não for encontrado, o teste falhará.
  expect(linkElement).toBeInTheDocument();
});

