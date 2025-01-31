import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Importação de imagens utilizadas no design
import bgImage from "../assets/background.jpg";
import googleButtonImage from "../assets/Sing up with Google.png";
import signInHereImage from "../assets/Sign In here Google.png";
import statusBarImage from "../assets/Status Bar.png";

// Importação das funções de autenticação do Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "../firebase";

const SignUp = () => {
  const [email, setEmail] = useState(""); // Estado para armazenar o email
  const [password, setPassword] = useState(""); // Estado para armazenar a senha
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar senha
  const navigate = useNavigate(); // Hook para navegação entre páginas

// Função para realizar o cadastro de usuário
const handleSignUp = async () => {
  // Verifica se as senhas coincidem antes de prosseguir
  if (password !== confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }
  try {
    // Cria um novo usuário com email e senha
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Cadastro bem-sucedido!");
    navigate("/signin"); // Redireciona para a tela de login após cadastro
  } catch (error) {
    if (error instanceof Error) {
      alert("Erro ao cadastrar: " + error.message); // Exibe erro detalhado
    } else {
      alert("Erro desconhecido no cadastro.");
    }
  }
};

// Função para realizar o cadastro com Google
const handleGoogleSignUp = async () => {
  try {
    await signInWithGoogle(); // Autenticação com o Google
    alert("Cadastro com Google bem-sucedido!");
    navigate("/home"); // Redireciona para a página inicial
  } catch (error) {
    if (error instanceof Error) {
      alert("Erro ao cadastrar com Google: " + error.message);
    } else {
      alert("Erro desconhecido ao cadastrar com Google.");
    }
  }
};

return (
  <div
    style={{
      backgroundImage: `url(${bgImage})`, // Define a imagem de fundo
      backgroundSize: "cover", // Ajusta a imagem para cobrir toda a tela
      backgroundPosition: "center", // Centraliza a imagem de fundo
      height: "100vh", // Ocupa toda a altura da tela
      display: "flex",
      flexDirection: "column", // Organiza os elementos verticalmente
      color: "#fff", // Define a cor do texto como branco
      justifyContent: "space-between", // Espaça os elementos na tela
      padding: "20px", // Adiciona espaçamento interno
    }}
  >
    {/* Barra de Status */}
    <img src={statusBarImage} alt="Status Bar" style={{ width: "100%", marginBottom: "20px" }} />

    {/* Título da Página */}
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Audio</h1>
      <p style={{ textAlign: "center", marginBottom: "30px" }}>
        It's modular and designed to last
      </p>
    </div>

      {/* Formulário de Cadastro */}
<div
  style={{
    flex: 1, // Ocupa todo o espaço disponível
    display: "flex", // Usa flexbox para organizar os elementos
    flexDirection: "column", // Organiza os elementos verticalmente
    alignItems: "center", // Centraliza os itens horizontalmente
    justifyContent: "center", // Centraliza os itens verticalmente
  }}
>
  {/* Campo de Email */}
  <input
    type="email" // Define o tipo do campo como email
    placeholder="Email" // Texto placeholder
    value={email} // Controla o valor do campo com o estado
    onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao digitar
    style={{
      width: "80%", // Define a largura do campo
      padding: "10px", // Adiciona espaçamento interno
      marginBottom: "10px", // Espaço inferior para separação dos elementos
      borderRadius: "5px", // Bordas arredondadas para um visual moderno
      border: "1px solid #ccc", // Borda cinza para definição do campo
    }}
  />

  {/* Campo de Senha */}
  <input
    type="password" // Define o campo como senha
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{
      width: "80%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    }}
  />

  {/* Campo para confirmar a senha */}
  <input
    type="password" // Define o campo como senha
    placeholder="Confirm Password" // Texto placeholder
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)} // Atualiza o estado ao digitar
    style={{
      width: "80%",
      padding: "10px",
      marginBottom: "20px", // Adiciona mais espaço inferior para separação
      borderRadius: "5px",
      border: "1px solid #ccc",
    }}
  />

  {/* Botão de cadastro */}
  <button
    onClick={handleSignUp} // Chama a função de cadastro ao clicar
    style={{
      width: "80%", // Ocupa a mesma largura dos campos de entrada
      padding: "10px",
      backgroundColor: "#28a745", // Verde para indicar ação positiva
      color: "#fff", // Texto branco para contraste
      border: "none",
      borderRadius: "5px", // Bordas arredondadas para um design moderno
      cursor: "pointer", // Indica que o botão é clicável
      marginBottom: "10px", // Espaçamento inferior antes do próximo elemento
    }}
  >
    Sign Up
  </button>

     {/* Cadastro com Google */}
<img
  src={googleButtonImage} // Exibe o botão de cadastro com Google
  alt="Sign up with Google" // Texto alternativo para acessibilidade
  style={{ width: "80%", cursor: "pointer" }} // Ajusta tamanho e indica que é clicável
  onClick={handleGoogleSignUp} // Chama a função de cadastro com Google ao clicar
/>
      </div>
      
     {/* Link para login */}
<div style={{ textAlign: "center" }}> {/* Centraliza o conteúdo */}
  <img
    src={signInHereImage} // Exibe a imagem do link para a tela de login
    alt="Sign In here" // Texto alternativo para acessibilidade
    style={{ cursor: "pointer", width: "50%" }} // Ajusta tamanho e torna a imagem interativa
    onClick={() => navigate("/signin")} // Redireciona o usuário para a tela de login ao clicar
  />
</div>
    </div>
  );
};

export default SignUp;
