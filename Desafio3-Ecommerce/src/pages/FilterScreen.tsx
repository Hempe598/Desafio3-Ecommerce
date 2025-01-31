import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FilterScreen: React.FC = () => {
  const [category, setCategory] = useState<string>("headphones"); // Estado para armazenar a categoria selecionada  
const [sortBy, setSortBy] = useState<string>("popularity"); // Estado para armazenar a opção de ordenação  
const navigate = useNavigate(); // Hook para navegação  

const handleBackPress = () => {
  navigate(-1); // Volta para a página anterior  
};

const applyFilter = () => {
  localStorage.setItem("selectedCategory", category); // Salva a categoria no localStorage  
  localStorage.setItem("selectedSortBy", sortBy); // Salva a ordenação no localStorage  
  navigate("/explore"); // Redireciona para a página de exploração  
};


  return (
    <div
  style={{
    display: "flex", // Usa flexbox para organizar o layout
    flexDirection: "column", // Organiza os elementos em coluna
    alignItems: "center", // Centraliza os itens horizontalmente
    height: "100%", // Ocupa toda a altura do contêiner pai
    backgroundColor: "#fff", // Fundo branco
    borderRadius: "20px", // Borda arredondada para um visual mais suave
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Adiciona uma sombra para destacar o elemento
    maxWidth: "360px", // Define a largura máxima do contêiner
    margin: "auto", // Centraliza na tela
    padding: "16px", // Adiciona espaçamento interno
    position: "relative", // Permite posicionamento absoluto de elementos filhos
  }}
>
  {/* Botão de fechar */}
  <button
    onClick={handleBackPress} // Fecha o modal ou retorna à página anterior
    style={{
      position: "absolute", // Posiciona o botão independentemente do fluxo normal do layout
      top: "0px", // Alinha ao topo do contêiner
      right: "12px", // Alinha à direita
      backgroundColor: "transparent", // Fundo transparente para um visual discreto
      border: "none", // Remove a borda padrão do botão
      fontSize: "18px", // Define um tamanho de fonte adequado para o ícone de fechar
      cursor: "pointer", // Indica que o botão é clicável
      color: "#000", // Define a cor do ícone como preto
      marginRight: "-120px", // Ajuste de margem (possivelmente para corrigir alinhamento)
    }}
  >
    ✕ {/* Ícone de fechar */}
  </button>

{/* Título do filtro */}
<h3
  style={{
    fontSize: "20px", // Define o tamanho da fonte
    fontWeight: "bold", // Torna o texto em negrito
    marginBottom: "16px", // Adiciona espaçamento abaixo do título
    marginRight: "200px", // Move o título para a esquerda (pode precisar de ajuste para alinhamento correto)
  }}
>
  Filter
</h3>


      {/* Categoria */}
      <div style={{ width: "100%", marginBottom: "24px" }}>
        <h4 style={{ marginBottom: "8px", fontWeight: "bold" }}>Category</h4>
        <div style={{ display: "flex", gap: "12px" }}>
        <button
  onClick={() => setCategory("headphones")} // Define a categoria como "headphones" ao clicar
  style={{
    flex: 1, // Faz o botão expandir para ocupar o espaço disponível no contêiner pai
    padding: "10px", // Adiciona espaçamento interno para melhor usabilidade
    backgroundColor: category === "headphones" ? "#28a745" : "#f1f1f1", // Altera a cor do botão conforme a seleção
    color: category === "headphones" ? "#fff" : "#000", // Define a cor do texto conforme a seleção
    border: "none", // Remove a borda padrão
    borderRadius: "20px", // Arredonda as bordas para um visual moderno
    fontWeight: "bold", // Destaca o texto com negrito
    cursor: "pointer", // Indica que o botão é interativo
  }}
>
            Headphone
          </button>
          <button
  onClick={() => setCategory("headsets")} // Define a categoria como "headsets" ao clicar
  style={{
    flex: 1, // Faz o botão expandir igualmente dentro do contêiner pai
    padding: "10px", // Adiciona espaçamento interno para melhor usabilidade
    backgroundColor: category === "headsets" ? "#28a745" : "#f1f1f1", // Muda a cor de fundo com base na seleção
    color: category === "headsets" ? "#fff" : "#000", // Altera a cor do texto conforme a seleção
    border: "none", // Remove a borda padrão para um visual mais limpo
    borderRadius: "20px", // Arredonda as bordas para um design moderno
    fontWeight: "bold", // Mantém o texto em negrito para melhor destaque
    cursor: "pointer", // Exibe o cursor de clique ao passar o mouse
  }}
>

            Headset
          </button>
        </div>
      </div>

      {/* Ordenação */}
<div style={{ width: "100%", marginBottom: "24px" }}>
  {/* Título da seção de ordenação */}
  <h4 style={{ marginBottom: "8px", fontWeight: "bold" }}>Sort By</h4>

  {/* Container dos botões de ordenação, organizados em grid */}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
    {/* Lista de opções de ordenação mapeada para botões */}
    {[
      { key: "popularity", label: "Popularity" },
      { key: "newest", label: "Newest" },
      { key: "oldest", label: "Oldest" },
      { key: "highPrice", label: "High Price" },
      { key: "lowPrice", label: "Low Price" },
    ].map((option) => (
      <button
        key={option.key} // Define uma chave única para cada botão
        onClick={() => setSortBy(option.key)} // Atualiza o estado da ordenação ao clicar
        style={{
          padding: "10px",
          backgroundColor: sortBy === option.key ? "#28a745" : "#f1f1f1", // Destaca a opção selecionada
          color: sortBy === option.key ? "#fff" : "#000", // Define a cor do texto dinamicamente
          border: "none",
          borderRadius: "20px", // Bordas arredondadas para um visual moderno
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {option.label} {/* Exibe o nome da opção de ordenação */}
      </button>
    ))}
  </div>
</div>

      {/* Botão de aplicar filtro */}
<button
  onClick={applyFilter} // Aplica os filtros selecionados e redireciona para a página de exploração
  style={{
    padding: "12px", // Espaçamento interno para melhor toque visual
    backgroundColor: "#28a745", // Cor verde para destacar a ação principal
    color: "#fff", // Texto branco para melhor contraste
    border: "none", // Remove a borda padrão para um design mais limpo
    borderRadius: "20px", // Bordas arredondadas para um visual moderno
    cursor: "pointer", // Indica que o botão é interativo
    width: "100%", // O botão ocupa toda a largura disponível
    fontWeight: "bold", // Texto em negrito para melhor legibilidade
    fontSize: "16px", // Tamanho da fonte adequado para melhor visibilidade
  }}
>
        Apply Filter
      </button>
    </div>
  );
};

export default FilterScreen;
