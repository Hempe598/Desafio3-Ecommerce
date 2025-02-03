import React, { createContext, useContext, useState, useEffect } from "react";

// Interface para os itens do carrinho
export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Definição das propriedades do contexto do carrinho
interface CartContextProps {
  cart: CartItem[]; // Lista de itens no carrinho
  addToCart: (item: CartItem) => void; // Adiciona um item ao carrinho
  removeFromCart: (id: string | number) => void; // Remove um item do carrinho pelo ID
  updateItemQuantity: (id: string | number, quantity: number) => void; // Atualiza a quantidade de um item no carrinho
  clearCart: () => void; // Remove todos os itens do carrinho
  totalItems: number; // Número total de itens no carrinho
  totalPrice: number; // Preço total dos itens no carrinho
}

// Criando o contexto do carrinho
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Provedor do Carrinho, responsável por gerenciar o estado global do carrinho
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado do carrinho, inicializado com dados do localStorage se existirem
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart"); // Obtém o carrinho do localStorage
    return storedCart ? JSON.parse(storedCart) : []; // Se houver dados, carrega-os; senão, inicia vazio
  });

  // Atualiza o localStorage sempre que o carrinho for modificado
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // Salva o carrinho atualizado no localStorage
  }, [cart]);

  // Adiciona um item ao carrinho ou atualiza sua quantidade se já existir
  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Se o item já estiver no carrinho, apenas aumenta a quantidade
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      // Se o item não existir, adiciona um novo
      return [...prev, { ...item }];
    });
  };


// Remove um item do carrinho pelo ID
const removeFromCart = (id: string | number) => {
  setCart((prev) => prev.filter((item) => item.id !== id)); // Filtra os itens e remove o que tem o ID correspondente
};

// Atualiza a quantidade de um item no carrinho, removendo-o se a quantidade for zero
const updateItemQuantity = (id: string | number, quantity: number) => {
  setCart((prev) =>
    prev
      .map((item) => (item.id === id ? { ...item, quantity } : item)) // Atualiza a quantidade do item correto
      .filter((item) => item.quantity > 0) // Remove o item se a quantidade for 0
  );
};

// Remove todos os itens do carrinho
const clearCart = () => setCart([]);

// Calcula o total de itens no carrinho (somando as quantidades de todos os itens)
const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

// Calcula o preço total do carrinho (multiplica preço por quantidade de cada item)
const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);


// Provedor do contexto do carrinho
return (
  <CartContext.Provider
    value={{ cart, addToCart, removeFromCart, updateItemQuantity, clearCart, totalItems, totalPrice }}
  >
    {children} {/* Torna os valores disponíveis para os componentes filhos */}
  </CartContext.Provider>
);

};

// Hook para acessar o contexto do carrinho em outros componentes
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
