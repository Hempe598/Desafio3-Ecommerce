import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Importação de componentes e assets
import CartIcon from "../pages/CartIcon";
import StatusBar from "../assets/Status Bar (1).png";
import Avatar from "../assets/Avatar.png";
import Logo from "../assets/Logo.png";
import MenuVariant from "../assets/menu-variant.png";

// Interface para definir o formato dos produtos
interface Product {
  id: string;       // Identificador único do produto
  name: string;     // Nome do produto
  category: string; // Categoria à qual o produto pertence
  price: number;    // Preço do produto
  img: string;      // URL da imagem do produto
}


const Home: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  // Busca os produtos da API ao carregar a página
  useEffect(() => {
    // Função assíncrona para buscar os produtos da API
    const fetchProducts = async () => {
      try {
        // Faz a requisição para a API
        const response = await fetch(
          "https://run.mocky.io/v3/a05144a7-4a48-4a85-b213-77bdc072abbf"
        );
  
        // Verifica se a resposta da API é válida
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
  
        // Converte a resposta para JSON
        const data = await response.json();
  
        // Atualiza o estado com os produtos recebidos
        setProducts(data);
      } catch (error) {
        // Captura e exibe erros no console
        console.error("Erro ao buscar produtos:", error);
      }
    };
  
    fetchProducts(); // Chama a função ao montar o componente
  }, []); // O array vazio garante que o efeito execute apenas uma vez
  

  return (
    <div
    style={{
      fontFamily: "Arial, sans-serif", // Define a fonte principal
      maxWidth: "375px", // Define a largura máxima do layout (ideal para mobile)
      margin: "0 auto", // Centraliza o conteúdo na tela
      backgroundColor: "#fff", // Define o fundo branco
      padding: "16px", // Adiciona espaçamento interno
    }}
  >
    {/* Barra de Status */}
    <img 
      src={StatusBar} 
      alt="Status Bar" 
      style={{ width: "100%" }} // Ocupa toda a largura do contêiner
    />
  
    {/* Cabeçalho */}
    <div
      style={{
        display: "flex", // Usa flexbox para organizar os elementos em linha
        justifyContent: "space-between", // Distribui os elementos uniformemente
        alignItems: "center", // Centraliza verticalmente
        marginBottom: "16px", // Espaçamento inferior para separação do conteúdo
        padding: "0 16px", // Adiciona espaçamento horizontal
      }}
    >
      {/* Ícone do menu */}
      <img 
        src={MenuVariant} 
        alt="Menu" 
        style={{ width: "24px" }} // Define um tamanho fixo para o ícone do menu
      />
  
      {/* Logo */}
      <img 
        src={Logo} 
        alt="Logo" 
        style={{ height: "24px" }} // Define a altura da logo
      />
  
      {/* Avatar do usuário */}
      <div 
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "16px" // Adiciona espaçamento entre os elementos
        }}
      >
        <img
          src={Avatar}
          alt="Avatar"
          style={{ 
            width: "32px", 
            height: "32px", 
            borderRadius: "50%" // Garante que a imagem fique circular
          }}
        />
      </div>
    </div>
  

      {/* Seção de boas-vindas */}
<div style={{ marginTop: "16px", textAlign: "center" }}>
  <img
    src={require("../assets/Frame 31.png")}
    alt="Welcome"
    style={{ 
      width: "80%", 
      maxWidth: "375px", 
      borderRadius: "8px", 
      marginRight: "50px" // Ajuste para posicionamento
    }}
  />
</div>

{/* Barra de Pesquisa */}
<div style={{ marginTop: "16px" }} onClick={() => navigate("/search")}>
  <input
    type="text"
    placeholder="Search headphone"
    style={{
      width: "100%", // Ocupa toda a largura do contêiner pai
      padding: "12px", // Espaçamento interno para conforto visual
      borderRadius: "8px", // Bordas arredondadas para um design moderno
      border: "1px solid #ddd", // Borda sutil para separação visual
      fontSize: "14px", // Texto ajustado para melhor leitura
    }}
  />
</div>

{/* Lista de Categorias */}
<div style={{ marginTop: "16px", textAlign: "center" }}>
  <img
    src={require("../assets/Category list.png")}
    alt="Category List"
    style={{ 
      width: "110%", 
      maxWidth: "375px", 
      borderRadius: "8px", 
      marginLeft: "-22px" // Ajuste para alinhamento
    }}
  />
</div>

{/* Banner de Destaque com o primeiro produto */}
<div
  style={{
    backgroundColor: "#f8f8f8", // Fundo cinza claro para destaque
    borderRadius: "8px", // Bordas arredondadas para um design suave
    padding: "16px", // Espaçamento interno
    marginTop: "20px", // Separação do conteúdo anterior
    width: "100%", 
    height: "200px",
    display: "flex", // Organiza a imagem e o texto lado a lado
    alignItems: "center", // Centraliza os elementos verticalmente
  }}
>
  {/* Imagem do primeiro produto */}
  <img
    src={products[0]?.img || ""} // Usa a imagem do primeiro produto, ou uma string vazia como fallback
    alt={products[0]?.name || "Product"} // Usa o nome do primeiro produto ou um texto padrão
    style={{ 
      width: "130px", 
      borderRadius: "8px", // Bordas arredondadas para um design suave
      height: "130px", 
      marginRight: "16px" // Espaçamento entre a imagem e o texto
    }}
  />
  
  {/* Informações do produto */}
  <div>
    <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>
      {products[0]?.name || "TMA-2 Modular Headphone"} {/* Nome do produto ou fallback */}
    </h2>
    <p style={{ fontSize: "14px",fontWeight: "bold", color: "#13db41" }}>Shop now →</p> {/* Chamada para ação */}
  </div>
</div>


     {/* Carrossel de Produtos */}
<div style={{ marginTop: "32px" }}>
  
  {/* Cabeçalho do carrossel */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    }}
  >
    {/* Botão "See All" para navegar para a página de exploração */}
    <img
      src={require("../assets/Frame 32.png")}
      alt="See All"
      onClick={() => navigate("/explore")}
      style={{ 
        cursor: "pointer", // Indica que a imagem é clicável
        width: "360px", 
        height: "auto", 
        marginLeft: "-10px" // Ajuste de posicionamento
      }}
    />
  </div>

  {/* Swiper para navegação entre produtos */}
  <Swiper spaceBetween={16} slidesPerView={2.2}>
    {/* Mapeia os produtos do índice 1 ao 5 para exibição no carrossel */}
    {products.slice(1, 6).map((product) => (
      <SwiperSlide key={product.id}>
        
        {/* Card do produto */}
        <div
          onClick={() => navigate(`/product/${product.id}`)} // Redireciona para a página do produto
          style={{
            border: "1px solid #ddd", // Borda sutil para separar os produtos
            borderRadius: "8px", // Bordas arredondadas para um visual moderno
            padding: "8px", // Espaçamento interno
            textAlign: "center",
            cursor: "pointer", // Indica que o card é clicável
            width: "100%",
          }}
        >
          {/* Imagem do produto */}
          <img
            src={product.img}
            alt={product.name}
            style={{
              width: "80px", 
              height: "80px", 
              objectFit: "cover", // Mantém a proporção da imagem
              display: "block",
              margin: "0 auto" // Centraliza a imagem no card
            }}
          />

          {/* Nome do produto */}
          <h3 
            style={{ 
              fontSize: "14px", 
              margin: "8px 0", 
              overflow: "hidden", 
              textOverflow: "ellipsis" // Evita que textos longos quebrem o layout
            }}
          >
            {product.name}
          </h3>

          {/* Preço do produto */}
          <p style={{ fontSize: "12px", color: "#555" }}>
            USD {product.price}
          </p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>

    </div>
  );
};

export default Home;
