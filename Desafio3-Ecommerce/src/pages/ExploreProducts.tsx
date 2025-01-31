import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CartIcon from "../pages/CartIcon";
import StatusBar from "../assets/Status Bar (1).png";
import FilterEmpty from "../assets/Filter Empty.png";
import Frame41 from "../assets/Frame 41.png";

// Definição da interface para um review (avaliação do produto)
interface Review {
  userId: string;  // ID do usuário que escreveu a avaliação
  userName: string; // Nome do usuário que escreveu a avaliação
  rating: number;   // Nota dada ao produto (exemplo: de 1 a 5 estrelas)
  comment: string;  // Comentário ou feedback sobre o produto
}

// Definição da interface para um produto
interface Product {
  id: string;       // ID único do produto
  name: string;     // Nome do produto
  price: number;    // Preço do produto
  img: string;      // URL da imagem do produto
  reviews: Review[]; // Lista de avaliações associadas ao produto

  rating?: number;  // Nota média do produto (opcional, pois pode ser calculada com base nos reviews)

  category: string; // Categoria do produto (exemplo: "Eletrônicos", "Roupas", etc.)
}


const ExploreProducts: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  // Efeito para buscar os produtos ao carregar a página
useEffect(() => {
  // Função assíncrona para buscar os produtos da API
  const fetchProducts = async () => {
    try {
      // Faz a requisição para a API mockada e aguarda a resposta
      const response = await fetch("https://run.mocky.io/v3/a05144a7-4a48-4a85-b213-77bdc072abbf");
      const data = await response.json(); // Converte a resposta para JSON

      // Verifica se os dados recebidos são um array antes de continuar
      if (Array.isArray(data)) {
        // Recupera a categoria selecionada pelo usuário do localStorage, se existir
        const storedCategory = localStorage.getItem("selectedCategory") || "";

        // Recupera a preferência de ordenação salva pelo usuário, se existir
        const storedSortBy = localStorage.getItem("selectedSortBy") || "";

        let filtered = data; // Inicializa a variável de produtos filtrados com todos os produtos da API

        // Filtragem baseada na categoria selecionada pelo usuário
        if (storedCategory) {
          filtered = filtered.filter((product) => product.category === storedCategory);
        }

        // Ordenação dos produtos conforme a seleção do usuário
        if (storedSortBy === "popularity") {
          // Ordena pela quantidade de reviews, do maior para o menor (mais popular)
          filtered = filtered.sort((a, b) => b.reviews.length - a.reviews.length);
        } else if (storedSortBy === "newest") {
          // Ordena do mais recente para o mais antigo (assumindo que IDs refletem ordem cronológica)
          filtered = filtered.sort((a, b) => b.id.localeCompare(a.id));
        } else if (storedSortBy === "oldest") {
          // Ordena do mais antigo para o mais recente
          filtered = filtered.sort((a, b) => a.id.localeCompare(b.id));
        } else if (storedSortBy === "highPrice") {
          // Ordena do preço mais alto para o mais baixo
          filtered = filtered.sort((a, b) => b.price - a.price);
        } else if (storedSortBy === "lowPrice") {
          // Ordena do preço mais baixo para o mais alto
          filtered = filtered.sort((a, b) => a.price - b.price);
        }

        // Atualiza o estado dos produtos filtrados
        setFilteredProducts(filtered);
      } else {
        // Caso a API retorne um formato inesperado, exibe um erro no console
        console.error("Formato inesperado da API:", data);
      }
    } catch (error) {
      // Captura e exibe erros de requisição ou problemas na API
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Chama a função ao montar o componente
  fetchProducts();
}, []); // O array vazio [] garante que esse efeito execute apenas uma vez ao carregar a página

  // Função para abrir a tela de filtros
  const openFilter = () => {
    navigate("/filter");
  };

  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column", // Organiza os elementos verticalmente
        height: "100vh", // Define a altura total da tela
        backgroundColor: "#fff", // Fundo branco
        overflow: "hidden" // Impede rolagem global, a rolagem será aplicada na lista de produtos
      }}
    >
      {/* Barra de Status */}
      <div style={{ flexShrink: 0 }}> {/* Garante que a barra de status não diminua de tamanho */}
        <img 
          src={StatusBar} 
          alt="Status Bar" 
          style={{ width: "100%", height: "auto", marginBottom: 8 }} 
        />
      </div>
  
      {/* Cabeçalho */}
      <div 
        style={{
          display: "flex",
          justifyContent: "space-between", // Alinha os elementos às extremidades
          alignItems: "center", // Centraliza verticalmente
          padding: "0 16px",
          marginBottom: 8,
          flexShrink: 0 // Impede que o cabeçalho encolha
        }}
      >
        {/* Ícone de voltar para a página de busca */}
        <FiArrowLeft 
          size={24} 
          onClick={() => navigate("/search")} 
          style={{ cursor: "pointer" }} 
        />
        {/* Ícone do carrinho */}
        <CartIcon />
      </div>
  
      {/* Banner e botão de filtro */}
      <div 
        style={{
          textAlign: "center",
          marginBottom: 16,
          flexShrink: 0 // Mantém o tamanho fixo
        }}
      >
        {/* Imagem do banner */}
        <img 
          src={Frame41} 
          alt="TMA Wireless" 
          style={{ width: "80%", height: "auto", marginBottom: "16px" }} 
        />
  
        {/* Botão para abrir o filtro */}
        <div 
          onClick={openFilter} 
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer"
          }}
        >
          <img 
            src={FilterEmpty} 
            alt="Filter Icon" 
            style={{ width: "300px", height: "auto" }} 
          />
        </div>
      </div>
  
      {/* Lista de Produtos */}
      <div 
        style={{
          flex: 1, // Ocupa o espaço disponível na tela
          overflowY: "auto", // Permite rolagem vertical apenas na lista de produtos
          padding: "0 16px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", // Layout responsivo com colunas dinâmicas
          gap: 16 // Espaçamento entre os produtos
        }}
      >
        {/* Mapeia os produtos filtrados e renderiza cada um na tela */}
        {filteredProducts.map((product) => {
          // Calcula a média de avaliações
          const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
          const averageRating = totalRating / product.reviews.length || 0;
  
          return (
            <div 
              key={product.id} 
              onClick={() => navigate(`/product/${product.id}`)} 
              style={{
                border: "1px solid #ddd", // Borda cinza clara
                borderRadius: "8px", // Borda arredondada
                padding: "8px",
                backgroundColor: "#fff",
                textAlign: "center",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" // Sombra suave para destacar o card
              }}
            >
              {/* Imagem do produto */}
              <img 
                src={product.img} 
                alt={product.name} 
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover", // Mantém a proporção da imagem sem distorção
                  borderRadius: "4px",
                  marginBottom: "8px"
                }} 
              />
  
              {/* Nome do produto */}
              <h4 
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "4px"
                }}
              >
                {product.name}
              </h4>
  
              {/* Preço do produto */}
              <p 
                style={{
                  fontSize: "12px",
                  color: "#555",
                  marginBottom: "8px"
                }}
              >
                USD {product.price.toFixed(2)}
              </p>
  
              {/* Avaliação do produto (estrelas) */}
              <div 
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {/* Renderiza as estrelas com base na média de avaliações */}
                <span 
                  style={{ fontSize: "12px", marginRight: "4px" }}
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <span 
                      key={index} 
                      style={{ color: index < averageRating ? "#FFD700" : "#ddd" }} // Estrela preenchida ou vazia
                    >
                      ★
                    </span>
                  ))}
                </span>
  
                {/* Exibe o número total de avaliações */}
                <span 
                  style={{ fontSize: "12px", color: "#555" }}
                >
                  {product.reviews.length} Reviews
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  
};

export default ExploreProducts;
