import React from "react";
import ReactDOM from "react-dom/client"; // Atualize o import
import App from "./App";
import GlobalStyles from "./styles/globalStyles";

// Seleciona o elemento HTML com o ID "root" e cria a raiz para renderização do React.
// O `as HTMLElement` garante ao TypeScript que o elemento retornado é um HTMLElement.
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Renderiza o aplicativo dentro da raiz criada.
root.render(
  // React.StrictMode é um helper que ajuda a identificar potenciais problemas no aplicativo.
  // Ele não renderiza nada visível, mas verifica o código em busca de práticas não recomendadas.
  <React.StrictMode>
    {/* GlobalStyles: Componente para definir estilos globais do aplicativo, como CSS reset ou temas. */}
    <GlobalStyles />

    {/* App: Componente principal que contém a lógica e estrutura do aplicativo. */}
    <App />
  </React.StrictMode>
);
