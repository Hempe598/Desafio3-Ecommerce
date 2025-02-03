import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../pages/CartContext";
import CartIcon from "../pages/CartIcon";
import Avatar from "../assets/Avatar.png"; // Ajuste o caminho conforme a estrutura do projeto

// Importando os assets
import StatusBarImage from "../assets/Status Bar (1).png";
import Frame44Image from "../assets/Frame 44.png";
import TabBarDescriptionImage from "../assets/Tab Bar Description.png";
import Frame32Image from "../assets/Frame 32 (1).png";
import ButtonImage from "../assets/Button.png";

import { FiArrowLeft } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Interface para representar uma avaliação de um produto
interface Review {
  userId: string;  // ID do usuário que fez a avaliação
  userName: string; // Nome do usuário
  rating: number;  // Nota dada ao produto (exemplo: 1 a 5 estrelas)
  comment: string; // Comentário sobre o produto
}

// Interface para representar um produto
interface Product {
  id: string;       // ID único do produto
  name: string;     // Nome do produto
  price: number;    // Preço do produto
  img: string;      // URL da imagem do produto
  details: string;  // Detalhes adicionais sobre o produto
  reviews: Review[]; // Lista de avaliações do produto
}

// Componente para exibir os detalhes do produto
const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Obtém o ID do produto da URL
  const navigate = useNavigate(); // Hook para navegação
  const { addToCart } = useCart(); // Função para adicionar ao carrinho

  // Estado para armazenar os detalhes do produto
  const [product, setProduct] = useState<Product | null>(null);

  // Estado para armazenar produtos recomendados
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  // Estado para controlar a animação de "adicionando ao carrinho"
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Estado para exibir mensagem de sucesso ao adicionar ao carrinho
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Busca os detalhes do produto ao carregar o componente
  useEffect(() => {
    axios
      .get<Product[]>("https://run.mocky.io/v3/a05144a7-4a48-4a85-b213-77bdc072abbf")
      .then((response) => {
        // Encontra o produto específico pelo ID
        const selectedProduct = response.data.find((p) => p.id === productId) || null;
        setProduct(selectedProduct);

        // Filtra e armazena produtos recomendados (excluindo o atual)
        setRecommendedProducts(response.data.filter((p) => p.id !== productId));
      })
      .catch((error) => console.error("Erro ao buscar detalhes do produto:", error));
  }, [productId]); // Executa a busca sempre que o ID do produto mudar

  // Função para adicionar o produto ao carrinho
  const handleAddToCart = () => {
    if (product) {
      setIsAddingToCart(true); // Ativa animação de "adicionando ao carrinho"

      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.img,
        quantity: 1,
      });

      // Exibe mensagem de sucesso
      setShowSuccessMessage(true);

      // Oculta a mensagem e desativa a animação após 2 segundos
      setTimeout(() => {
        setShowSuccessMessage(false);
        setIsAddingToCart(false);
      }, 2000);
    }
  };


 // Função para navegar para a página de "Features" do produto
const handleNavigateToFeatures = () => {
  navigate(`/features/${productId}`);
};

// Se o produto ainda não foi carregado, exibe uma mensagem de "Carregando..."
if (!product) return <div>Carregando...</div>;

return (
  <div
    style={{
      fontFamily: "'Arial', sans-serif", // Define a fonte principal
      maxWidth: "375px", // Define a largura máxima do layout (ideal para mobile)
      margin: "0 auto", // Centraliza o conteúdo
      backgroundColor: "#fff", // Fundo branco
      height: "130vh", // Ocupa toda a altura da tela
    }}
  >
    {/* Barra de Status */}
    <img src={StatusBarImage} alt="Status Bar" style={{ width: "100%" }} />

    {/* Cabeçalho */}
    <div
      style={{
        display: "flex", // Organiza os elementos horizontalmente
        justifyContent: "space-between", // Distribui os itens igualmente
        alignItems: "center", // Centraliza os elementos verticalmente
        padding: "16px",
        borderBottom: "1px solid #ddd", // Adiciona uma linha separadora sutil
      }}
    >
      {/* Botão para voltar à página inicial */}
      <FiArrowLeft
        size={24}
        onClick={() => navigate("/Home")}
        style={{ cursor: "pointer" }}
      />

      {/* Nome do Produto */}
      <h1 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
        {product.name}
      </h1>

      {/* Ícone do Carrinho */}
      <CartIcon />
    </div>

    {/* Conteúdo Principal */}
    <div style={{ padding: "16px" }}>
      {/* Imagem decorativa */}
      <img
        src={Frame44Image}
        alt="Frame 44"
        style={{ width: "100%", marginBottom: "16px" }}
      />

      {/* Tab Bar Description - Clicável para ir para "Features" */}
<img
  src={TabBarDescriptionImage} // Imagem da barra de descrição do produto
  alt="Tab Bar Description" // Texto alternativo para acessibilidade
  style={{
    width: "100%", // Ocupa toda a largura disponível do contêiner
    marginBottom: "16px", // Adiciona espaçamento inferior
    cursor: "pointer", // Indica que a imagem é clicável
  }}
  onClick={handleNavigateToFeatures} // Navega para a seção de "Features" ao clicar
/>

{/* Imagem do produto */}
<img
  src={product.img} // Imagem principal do produto
  alt={product.name} // Usa o nome do produto como descrição alternativa
  style={{
    width: "100%", // Ajusta para ocupar toda a largura do contêiner
    borderRadius: "8px", // Bordas arredondadas para um design mais moderno
    marginBottom: "16px", // Espaçamento inferior para separação de elementos
  }}
/>


      {/* Lista de Reviews */}
      <h3 style={{ marginBottom: "8px" }}>Reviews</h3>
      {product.reviews.length > 0 ? (
        product.reviews.map((review) => (
          <div
            key={review.userId}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f8f8f8",
              padding: "8px",
              borderRadius: "8px",
              marginBottom: "8px",
            }}
          >
            {/* Avatar do usuário */}
<img
  src={Avatar} // Imagem do avatar do usuário
  alt="User Avatar" // Texto alternativo para acessibilidade
  style={{
    width: "40px", // Define largura do avatar
    height: "40px", // Define altura do avatar
    borderRadius: "50%", // Torna o avatar completamente circular
    marginRight: "8px", // Adiciona espaçamento à direita para separar do texto
  }}
/>


<div>
  {/* Nome do usuário que fez a avaliação */}
  <strong>{review.userName}</strong>

  {/* Exibe a nota do usuário como estrelas */}
  <p style={{ margin: "4px 0", fontSize: "14px" }}>
    {Array(review.rating).fill("⭐").join(" ")} {/* Gera a quantidade de estrelas com base na avaliação */}
  </p>

  {/* Comentário do usuário sobre o produto */}
  <p style={{ margin: "4px 0", fontSize: "12px", color: "#666" }}>
    {review.comment}
  </p>
</div>

            </div>
          ))
        ) : (
          <p style={{ fontSize: "14px", color: "#999" }}>
            Nenhuma avaliação disponível.
          </p>
        )}

        {/* Produtos Recomendados */}
<div style={{ marginTop: "32px" }}>
  
  {/* Título da seção de produtos recomendados */}
  <img
    src={Frame32Image}
    alt="Produtos Recomendados"
    style={{
      width: "100%", // A imagem ocupa toda a largura disponível
      marginBottom: "16px", // Espaçamento inferior para separação
    }}
  />

  {/* Carrossel de produtos recomendados */}
  <Slider
    dots={false} // Remove os indicadores de páginação
    arrows={false} // Remove setas de navegação
    infinite={true} // Permite rolagem infinita
    speed={500} // Velocidade da transição do carrossel
    slidesToShow={2} // Exibe 2 produtos por vez
    slidesToScroll={1} // Avança um produto por vez ao deslizar
  >
    {/* Mapeia os produtos recomendados */}
    {recommendedProducts.map((recProduct) => (
      <div
        key={recProduct.id}
        onClick={() => navigate(`/product/${recProduct.id}`)} // Redireciona ao clicar
        style={{
          cursor: "pointer", // Indica que o card é interativo
          textAlign: "center",
          padding: "8px",
          display: "flex",
          flexDirection: "column", // Exibe os elementos verticalmente
          alignItems: "center", // Centraliza os itens horizontalmente
        }}
      >
        {/* Imagem do produto recomendado */}
        <img
          src={recProduct.img}
          alt={recProduct.name}
          style={{
            width: "100px", 
            height: "100px", 
            objectFit: "cover", // Mantém a proporção da imagem sem distorcer
            borderRadius: "8px", // Bordas arredondadas para um visual moderno
            marginBottom: "8px", // Espaçamento inferior para separação do nome
          }}
        />


{/* Nome do produto */}
<p
  style={{
    fontSize: "14px", // Tamanho do texto ajustado para boa legibilidade
    fontWeight: "bold", // Destaca o nome do produto com negrito
    margin: "0 0 4px", // Remove margem superior e adiciona espaçamento inferior
    color: "#000", // Define a cor preta para o texto
  }}
>
  {recProduct.name} {/* Nome do produto vindo da API */}
</p>

{/* Preço do produto */}
<p
  style={{
    fontSize: "12px", // Fonte menor para diferenciar do nome do produto
    color: "#00A859", // Verde para destacar o preço
    margin: 0, // Remove margens desnecessárias para alinhamento
  }}
>
  USD {recProduct.price.toFixed(2)} {/* Formata o preço para duas casas decimais */}
</p>


        
      </div>
    ))}
  </Slider>
</div>
</div>


     {/* Mensagem de Sucesso ao adicionar ao carrinho */}
{showSuccessMessage && (
  <div
    style={{
      position: "fixed", // Fixa a posição da mensagem na tela
      bottom: "80px", // Ajusta a posição acima do rodapé
      left: "50%", // Centraliza horizontalmente
      transform: "translateX(-50%)", // Garante que a posição fique no centro
      backgroundColor: "#00A859", // Fundo verde para sucesso
      color: "#fff", // Texto branco para contraste
      padding: "10px 20px", // Espaçamento interno
      borderRadius: "8px", // Bordas arredondadas
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Efeito de sombra sutil
      fontSize: "14px",
      zIndex: 1000, // Garante que fique acima dos outros elementos
    }}
  >
    Adicionado com sucesso!
  </div>
)}

      {/* Botão de Adicionar ao Carrinho */}
      <img
        src={ButtonImage}
        alt="Adicionar ao Carrinho"
        onClick={handleAddToCart}
        style={{
          width: "100%",
          cursor: "pointer",
          marginTop: "32px",
        }}
      />
    </div>
  );
};

export default ProductDetail;
