import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Provedor do carrinho de compras

// Importação das páginas do aplicativo
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import ExploreProducts from "./pages/ExploreProducts";
import FilterScreen from "./pages/FilterScreen";
import Features from "./pages/Features";
import ShoppingCart from "./pages/ShoppingCart";

function App() {
  return (
    // Envolve todo o aplicativo dentro do CartProvider
    // Isso permite acessar o estado global do carrinho de compras em qualquer componente.
    <CartProvider>
      {/* Configuração do roteamento usando react-router-dom */}
      <Router>
        <Routes>
          {/* Definição das rotas principais do aplicativo */}
          
          {/* Rota inicial ou página de login */}
          <Route path="/" element={<SignIn />} />
          
          {/* Rotas para autenticação */}
          <Route path="/signin" element={<SignIn />} /> {/* Página de login */}
          <Route path="/signup" element={<SignUp />} /> {/* Página de cadastro */}

          {/* Rota para a página inicial */}
          <Route path="/home" element={<Home />} />

          {/* Rota para a página de busca */}
          <Route path="/search" element={<Search />} />

          {/* Rota para explorar produtos */}
          <Route path="/explore" element={<ExploreProducts />} />

          {/* Rota para a tela de filtro */}
          <Route path="/filter" element={<FilterScreen />} />

          {/* Rota para detalhes de um produto específico */}
          {/* O parâmetro :productId é dinâmico e identifica o produto a ser exibido */}
          <Route path="/product/:productId" element={<ProductDetail />} />

          {/* Rota para recursos adicionais de um produto */}
          <Route path="/features/:productId" element={<Features />} />

          {/* Rota para o carrinho de compras */}
          <Route path="/shopping-cart" element={<ShoppingCart />} />

          {/* Rota coringa para redirecionar o usuário em caso de rota não encontrada */}
          <Route path="*" element={<SignIn />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;