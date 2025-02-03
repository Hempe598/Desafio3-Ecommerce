import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiTrash } from "react-icons/fi";
import { useCart } from "../pages/CartContext";
import StatusBarImage from "../assets/Status Bar (1).png";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cart, clearCart, updateItemQuantity, totalItems, totalPrice } = useCart();
  
  // Estado para exibir o modal de confirmação
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Função para abrir o modal
  const handleClearCart = () => {
    setShowConfirmModal(true);
  };

  // Função para confirmar a limpeza do carrinho
  const confirmClearCart = () => {
    clearCart();
    setShowConfirmModal(false); // Fecha o modal após limpar o carrinho
  };

  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif", // Define a fonte do layout
        maxWidth: "375px", // Define a largura máxima do componente (ideal para mobile)
        margin: "0 auto", // Centraliza o conteúdo
        backgroundColor: "#fff", // Fundo branco
        height: "100vh", // Ocupa toda a altura da tela
        display: "flex",
        flexDirection: "column", // Organiza os elementos verticalmente
      }}
    >
      {/* Barra de Status */}
      <img src={StatusBarImage} alt="Status Bar" style={{ width: "100%" }} />

      {/* Cabeçalho */}
      <div
        style={{
          display: "flex", // Organiza os itens horizontalmente
          justifyContent: "space-between", // Distribui os elementos igualmente
          alignItems: "center", // Centraliza os elementos verticalmente
          padding: "16px",
          borderBottom: "1px solid #ddd", // Adiciona uma linha separadora
        }}
      >
        {/* Botão para voltar à página anterior */}
        <FiArrowLeft size={24} onClick={() => navigate(-1)} style={{ cursor: "pointer" }} />

        {/* Título do Carrinho */}
        <h1 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>Shopping Cart</h1>

        {/* Ícone para limpar o carrinho */}
        <FiTrash size={24} onClick={handleClearCart} style={{ cursor: "pointer", color: "red" }} />
      </div>

      {/* Conteúdo do Carrinho */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {/* Caso o carrinho esteja vazio */}
        {cart.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>Seu carrinho está vazio.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex", // Organiza os elementos do produto em linha
                justifyContent: "space-between", // Distribui o espaço igualmente
                alignItems: "center", // Centraliza verticalmente
                padding: "16px 0",
                borderBottom: "1px solid #ddd", // Linha separadora entre itens
              }}
            >
              {/* Imagem do produto */}
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
              />

              {/* Informações do produto */}
              <div style={{ flex: 1, marginLeft: "16px" }}>
                <h3 style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>{item.name}</h3>
                <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>USD {item.price.toFixed(2)}</p>
              </div>

              {/* Controles de quantidade e remoção */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {/* Botão para reduzir a quantidade */}
                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} style={buttonStyle}>-</button>

                {/* Exibe a quantidade atual */}
                <span style={{ margin: "0 8px", fontSize: "14px" }}>{item.quantity}</span>

                {/* Botão para aumentar a quantidade */}
                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} style={buttonStyle}>+</button>

                {/* Botão para remover o item do carrinho */}
                <FiTrash size={20} onClick={() => updateItemQuantity(item.id, 0)} style={{ cursor: "pointer", color: "red" }} />
              </div>
            </div>
          ))
        )}
      </div>


     {/* Total e Botão de Checkout */}
<div
  style={{
    padding: "16px",
    borderTop: "1px solid #ddd", // Adiciona uma linha separadora acima
    backgroundColor: "#fff",
  }}
>
  {/* Exibe o total de itens e o preço total */}
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
    <span style={{ fontSize: "14px", color: "#666" }}>Total {totalItems} Items</span>
    <span style={{ fontSize: "16px", fontWeight: "bold" }}>USD {totalPrice.toFixed(2)}</span>
  </div>

  {/* Botão de Finalizar Compra */}
  <button
    onClick={() => navigate("/checkout")} // Redireciona para a página de checkout
    style={{
      width: "100%",
      padding: "16px",
      backgroundColor: "#00A859", // Verde para indicar ação positiva
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "background 0.3s ease-in-out, transform 0.1s ease-in-out", // Efeito suave de clique
    }}
    onMouseDown={(e) => {
      e.currentTarget.style.backgroundColor = "#00804D"; // Muda a cor ao pressionar
      e.currentTarget.style.transform = "scale(0.95)"; // Efeito de "apertar"
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.backgroundColor = "#00A859"; // Retorna a cor ao soltar
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    Proceed to Checkout
  </button>
</div>

{/* Modal de Confirmação para Limpar o Carrinho */}
{showConfirmModal && (
  <div
    style={{
      position: "fixed", // Fixa o modal na tela inteira
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1000", // Garante que o modal fique acima dos outros elementos
    }}
  >
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Adiciona uma leve sombra ao modal
      }}
    >
      <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "20px" }}>
        Tem certeza que deseja limpar o carrinho?
      </p>

      {/* Botão para confirmar a limpeza */}
      <button
        onClick={confirmClearCart} // Chama a função para limpar o carrinho
        style={{
          backgroundColor: "#0a0a0a", // Preto para destaque
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px", // Adiciona espaçamento entre os botões
        }}
      >
        Sim, limpar
      </button>

      {/* Botão para cancelar e fechar o modal */}
      <button
        onClick={() => setShowConfirmModal(false)} // Fecha o modal sem limpar o carrinho
        style={{
          backgroundColor: "#ccc", // Cinza para ação neutra
          color: "#000",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Cancelar
      </button>
    </div>
  </div>
)}

    </div>
  );
};

// Estilos para os botões de quantidade
const buttonStyle = {
  width: "32px", // Define a largura do botão
  height: "32px", // Define a altura do botão, tornando-o quadrado
  display: "flex", // Usa flexbox para alinhar o conteúdo
  justifyContent: "center", // Centraliza o conteúdo horizontalmente
  alignItems: "center", // Centraliza o conteúdo verticalmente
  backgroundColor: "#f0f0f0", // Define a cor de fundo do botão
  border: "1px solid #ddd", // Adiciona uma borda cinza clara para destacar o botão
  borderRadius: "8px", // Arredonda as bordas para um design mais suave
  cursor: "pointer", // Indica que o botão é clicável
  fontSize: "16px", // Define o tamanho do texto dentro do botão
};


export default ShoppingCart;
