import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatusBarImage from "../assets/Status Bar (1).png"; // Imagem da barra de status
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiArrowLeft, FiMoreVertical } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import CartIcon from "../pages/CartIcon";

// Definição da interface do produto
interface Product {
  id: string;
  name: string;
  img: string;
  price: number;
  popularity: number;
  reviews: Array<{ rating: number }>;
}

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
  const [products, setProducts] = useState<Product[]>([]); // Lista de produtos da API
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Lista de produtos filtrados
  const navigate = useNavigate();

  // Busca os produtos da API ao carregar a página
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://run.mocky.io/v3/a05144a7-4a48-4a85-b213-77bdc072abbf");
      
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos"); // Lança um erro caso a resposta não seja válida
      }

      const data = await response.json();
      setProducts(data); // Armazena todos os produtos
      setFilteredProducts(data); // Inicializa a lista filtrada com todos os produtos
    } catch (error) {
      console.error("Erro ao buscar produtos:", error); // Captura e exibe erros no console
    }
  };

  fetchProducts(); // Chama a função ao montar o componente
}, []); // O array vazio garante que essa busca aconteça apenas uma vez

// Atualiza a lista de produtos filtrados conforme a busca do usuário
useEffect(() => {
  const results = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra os produtos pelo nome
  );
  setFilteredProducts(results); // Atualiza a lista com os resultados da busca
}, [searchTerm, products]); // Executa o efeito sempre que `searchTerm` ou `products` mudarem

// Obtém os 3 produtos mais populares
const popularProducts = products
  .sort((a, b) => b.popularity - a.popularity) // Ordena os produtos pela popularidade em ordem decrescente
  .slice(0, 3); // Seleciona os 3 primeiros

// Renderiza um cartão de produto
const renderProductCard = (product: Product) => (
  <div
    key={product.id}
    onClick={() => navigate(`/product/${product.id}`)} // Redireciona para a página do produto ao clicar
    style={{
      display: "flex", // Usa flexbox para organizar o layout do card
      alignItems: "center", // Centraliza os itens verticalmente
      marginBottom: "16px", // Adiciona espaçamento inferior entre os cards
      border: "1px solid #ddd", // Adiciona uma borda leve para destacar o card
      borderRadius: "8px", // Arredonda as bordas para um design mais suave
      padding: "8px", // Adiciona espaçamento interno
      cursor: "pointer", // Indica que o card é clicável
    }}
  >

      {/* Imagem do produto */}
<img
  src={product.img} // Exibe a imagem do produto
  alt={product.name} // Define um texto alternativo para acessibilidade
  style={{
    width: "60px", // Define a largura da imagem
    height: "60px", // Define a altura da imagem
    borderRadius: "8px", // Bordas arredondadas para um design moderno
    marginRight: "12px", // Espaço entre a imagem e o texto
  }}
/>

{/* Conteúdo do produto */}
<div style={{ flex: 1 }}> {/* Faz com que o conteúdo ocupe todo o espaço restante */}
  {/* Nome do produto */}
  <h3 style={{ fontSize: "14px", margin: "0 0 4px" }}>{product.name}</h3>

  {/* Preço do produto */}
  <p style={{ fontSize: "12px", color: "#555", margin: "0 0 4px" }}>
    USD {product.price}
  </p>

  {/* Seção de avaliação */}
  <div style={{ display: "flex", alignItems: "center", fontSize: "12px" }}>
    {/* Ícone de estrela representando a avaliação do produto */}
    <FaStar color="#FFD700" style={{ marginRight: "4px" }} />

    {/* Média das avaliações calculada dinamicamente */}
    <span>
      {(
        product.reviews.reduce((a, b) => a + b.rating, 0) / product.reviews.length
      ).toFixed(1)} Stars
    </span>

    {/* Número total de avaliações */}
    <span style={{ marginLeft: "8px" }}>
      {product.reviews.length} Reviews
    </span>
  </div>
</div>

{/* Ícone de opções adicionais */}
<FiMoreVertical size={16} />

    </div>
  );

  return (
    <div
    style={{
      fontFamily: "Arial, sans-serif", // Define a fonte do layout
      backgroundColor: "#fff", // Fundo branco
      maxWidth: "375px", // Define a largura máxima para layout mobile
      margin: "0 auto", // Centraliza o conteúdo na tela
      padding: "16px", // Adiciona espaçamento interno
    }}
  >
    {/* Barra de Status */}
    <img src={StatusBarImage} alt="Status Bar" style={{ width: "100%" }} />
  
    {/* Cabeçalho */}
    <div
      style={{
        display: "flex", // Organiza os elementos horizontalmente
        justifyContent: "space-between", // Distribui os itens igualmente no espaço disponível
        alignItems: "center", // Centraliza os itens verticalmente
        marginBottom: "16px", // Adiciona espaçamento abaixo do cabeçalho
      }}
    >
      {/* Botão para voltar à página inicial */}
      <FiArrowLeft size={24} onClick={() => navigate("/Home")} />
  
      {/* Título da página */}
      <h1 style={{ fontSize: "18px", fontWeight: "bold" }}>Search</h1>
  
      {/* Ícone do carrinho de compras */}
      <CartIcon />
    </div>
  
    {/* Campo de Busca */}
    <input
      type="text"
      placeholder="Search headphone"
      value={searchTerm} // Controla o valor do campo com o estado
      onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o estado conforme o usuário digita
      style={{
        width: "100%", // Ocupa toda a largura do contêiner
        padding: "12px", // Adiciona espaçamento interno
        borderRadius: "8px", // Bordas arredondadas para um design mais suave
        border: "1px solid #ddd", // Borda sutil para separar o campo de entrada
        fontSize: "14px",
        marginBottom: "16px", // Espaço inferior para separação dos resultados
      }}
    />
  
    {/* Resultados da Pesquisa */}
    {searchTerm && (
      <div>
        <h2 style={{ fontSize: "16px", marginBottom: "8px" }}>Search Results</h2>
        {filteredProducts.map(renderProductCard)} {/* Mapeia e renderiza os produtos filtrados */}
      </div>
    )}
  
    {/* Produtos Populares */}
    <h2 style={{ fontSize: "16px", marginBottom: "8px" }}>Popular Products</h2>
    <div>{popularProducts.map(renderProductCard)}</div> {/* Mapeia e exibe os produtos populares */}
  </div>
  
  );
};

export default Search;
