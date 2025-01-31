import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CartIcon from "../pages/CartIcon"; 

// Importação de imagens utilizadas na interface
import StatusBarImage from "../assets/Status Bar (1).png";
import Frame44Image from "../assets/Frame 44.png";
import TabBarDescriptionImage from "../assets/Tab Bar Descrption 1.png";
import Frame54Image from "../assets/Frame 54.png";
import ButtonImage from "../assets/Button.png";

// Ícones
import { FiArrowLeft } from "react-icons/fi";

const Features: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>(); // Obtém o ID do produto via URL

  return (
    <div
  style={{
    fontFamily: "'Arial', sans-serif", // Define a fonte padrão do conteúdo
    maxWidth: "375px", // Define a largura máxima do layout (ideal para dispositivos móveis)
    margin: "0 auto", // Centraliza o conteúdo na tela
    backgroundColor: "#fff", // Define o fundo branco para o layout
    height: "100vh", // Ocupa toda a altura da tela
  }}
>
  {/* Barra de Status */}
  <img 
    src={StatusBarImage} 
    alt="Status Bar" 
    style={{ width: "100%" }} // A barra de status ocupa toda a largura do contêiner
  />

  {/* Cabeçalho */}
  <div
    style={{
      display: "flex", // Usa flexbox para organizar os elementos horizontalmente
      justifyContent: "space-between", // Distribui os elementos igualmente no espaço disponível
      alignItems: "center", // Alinha os itens verticalmente ao centro
      padding: "16px", // Adiciona espaçamento interno ao cabeçalho
      borderBottom: "1px solid #ddd", // Adiciona uma linha sutil para separar o cabeçalho do conteúdo
    }}
  >
    {/* Ícone de voltar para a página anterior */}
    <FiArrowLeft
      size={24} // Define o tamanho do ícone
      onClick={() => navigate(-1)} // Volta para a página anterior no histórico de navegação
      style={{ cursor: "pointer" }} // Transforma o ícone em um botão clicável
    />

    {/* Título da página */}
    <h1 
      style={{
        fontSize: "16px", // Define o tamanho da fonte do título
        fontWeight: "bold", // Aplica negrito ao texto
        margin: 0 // Remove margens padrão
      }}
    >
      Features
    </h1>

    {/* Ícone do carrinho de compras */}
    <CartIcon />
  </div>


      {/* Conteúdo Principal */}
<div
  style={{
    padding: "16px", // Adiciona espaçamento interno para melhorar a legibilidade
    backgroundColor: "#fff", // Define um fundo branco para o conteúdo
    borderRadius: "8px", // Borda arredondada para um design mais suave
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Adiciona uma leve sombra para destacar o conteúdo
  }}
>
  {/* Imagem principal */}
  <img
    src={Frame44Image} // Renderiza a imagem principal do conteúdo
    alt="Frame 44"
    style={{ width: "100%", marginBottom: "16px" }} // Garante que a imagem ocupe toda a largura e tenha espaçamento inferior
  />

  {/* Barra de descrição */}
  <img
    src={TabBarDescriptionImage} // Renderiza a imagem da barra de descrição
    alt="Tab Bar Description"
    style={{ width: "100%", marginBottom: "16px" }} // Mantém a largura total e adiciona espaçamento inferior
  />

  {/* Outra seção de informações */}
  <img
    src={Frame54Image} // Renderiza outra seção visual do conteúdo
    alt="Frame 54"
    style={{ width: "100%", marginBottom: "100px" }} // Define largura total e espaçamento inferior maior
  />



        {/* Botão de adicionar ao carrinho */}
        <button
  onClick={() => navigate(-1)} // Volta para a página anterior no histórico de navegação
  style={{
    width: "100%", // O botão ocupa toda a largura do contêiner pai
    padding: "16px", // Adiciona espaçamento interno para um melhor toque visual
    backgroundColor: "#00A859", // Define a cor de fundo (verde)
    color: "#fff", // Define a cor do texto como branco para melhor contraste
    border: "none", // Remove a borda padrão do botão
    borderRadius: "8px", // Borda arredondada para um design moderno
    fontSize: "16px", // Define o tamanho da fonte para tornar o texto mais legível
    cursor: "pointer", // Indica ao usuário que o botão é clicável
  }}
>

          <img src={ButtonImage} alt="Add to Cart" style={{ width: "100%" }} />
        </button>
      </div>
    </div>
  );
};

export default Features;
