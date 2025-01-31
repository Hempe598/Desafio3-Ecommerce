import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Resetando margens e preenchimentos padrão */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* Garante que padding e border não aumentem o tamanho do elemento */
  }

  /* Estilos globais do corpo da página */
  body {
    font-family: 'Arial', sans-serif; /* Define a fonte padrão */
    background-color: #f5f5f5; /* Define um fundo cinza claro */
    color: #333; /* Define a cor do texto principal */
    -webkit-font-smoothing: antialiased; /* Suaviza fontes no Chrome/Safari */
    -moz-osx-font-smoothing: grayscale; /* Suaviza fontes no Firefox */
    height: 100vh; /* Faz a página ocupar toda a altura da tela */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* Estilização global para títulos */
  h1 {
    font-size: 2rem;
    color: #ffffff;
    text-align: center;
  }

  /* Estilização global para parágrafos */
  p {
    font-size: 1rem;
    color: #ffffff;
    text-align: center;
    margin-bottom: 20px; /* Adiciona espaçamento inferior */
  }

  /* Estilização global para inputs */
  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }

  /* Estilização global para botões */
  button {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    background-color: #28a745; /* Cor verde para ações positivas */
    color: #fff;
    font-weight: bold;
  }

  /* Efeito de hover para botões */
  button:hover {
    background-color: #218838; /* Cor verde escura ao passar o mouse */
  }

  /* Contêineres para Login e Cadastro */
  .signup-container, .login-container {
    width: 90%;
    max-width: 400px;
    background-color: #2a2a2a; /* Fundo escuro para o formulário */
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra para destacar o card */
    text-align: center;
  }

  /* Estilos globais */
  * {
    box-sizing: border-box;
  }

  /* Removendo margens e definindo a fonte do corpo */
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }

  /* Estilos responsivos para telas menores */
  @media (max-width: 375px) {
    img {
      max-width: 100%;
      height: auto;
    }

    button {
      width: auto;
      height: auto;
    }
  }
`;

export default GlobalStyles;
