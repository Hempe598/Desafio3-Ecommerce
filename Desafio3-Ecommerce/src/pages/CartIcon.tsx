import { useCart } from "../pages/CartContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  // Obtém o número total de itens no carrinho usando o hook useCart().
  // Isso permite acessar o contexto global do carrinho em qualquer parte do app.
  const { totalItems } = useCart(); 

  // Hook do React Router que permite navegação programática entre páginas.
  // Exemplo: `navigate('/shopping-cart')` leva o usuário para a página do carrinho.
  const navigate = useNavigate(); 

  // Aqui provavelmente haverá um retorno JSX para exibir o ícone do carrinho

  return (
    <div 
      style={{ position: "relative", cursor: "pointer" }} 
      onClick={() => navigate("/shopping-cart")} // Redireciona para a página do carrinho ao clicar no ícone
    >
      {/* Ícone do carrinho de compras */}
      <AiOutlineShoppingCart size={24} />
  
      {/* Exibe a quantidade de itens no carrinho, se houver algum */}
      {totalItems > 0 && (
        <span
          style={{
            position: "absolute", // Posiciona o indicador sobre o ícone do carrinho
            top: "-5px", // Ajusta a posição para cima
            right: "-5px", // Ajusta a posição para a direita
            background: "red", // Define um fundo vermelho para destacar a contagem
            color: "white", // Texto branco para contraste
            fontSize: "12px", // Define um tamanho pequeno para o texto
            borderRadius: "50%", // Garante que o indicador seja um círculo
            padding: "4px", // Adiciona espaçamento interno para melhor visualização
          }}
        >
          {totalItems} {/* Mostra o número total de itens no carrinho */}
        </span>
      )}
    </div>
  );
  
};

export default CartIcon;
