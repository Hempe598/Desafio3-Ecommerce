import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Importação de imagens utilizadas no design
import bgImage from "../assets/background.jpg";
import forgotPasswordImage from "../assets/Forgot Password.png";
import googleButtonImage from "../assets/Sing up with Google.png";
import signUpHereImage from "../assets/Sign Up here.png";
import statusBarImage from "../assets/Status Bar.png";

// Importação das funções de autenticação do Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "../firebase";

const SignIn = () => {
  const [email, setEmail] = useState(""); // Estado para armazenar o email
  const [password, setPassword] = useState(""); // Estado para armazenar a senha
  const navigate = useNavigate(); // Hook para navegação entre páginas

  // Função para realizar login com email e senha
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login bem-sucedido!");
      navigate("/home"); // Redireciona para a página inicial após login
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro no login: " + error.message);
      } else {
        alert("Erro desconhecido no login.");
      }
    }
  };

  // Função para realizar login com Google
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login com Google bem-sucedido!");
      navigate("/home"); // Redireciona para a página inicial após login
    } catch (error) {
      if (error instanceof Error) {
        alert("Erro ao fazer login com Google: " + error.message);
      } else {
        alert("Erro desconhecido ao fazer login com Google.");
      }
    }
  };

  return (
    <div
  style={{
    backgroundImage: `url(${bgImage})`, // Define a imagem de fundo
    backgroundSize: "cover", // Faz com que a imagem cubra todo o fundo sem distorcer
    backgroundPosition: "center", // Centraliza a imagem de fundo
    height: "100vh", // Ocupa toda a altura da tela
    display: "flex", // Usa flexbox para organizar os elementos
    flexDirection: "column", // Organiza os elementos verticalmente
    color: "#fff", // Define a cor do texto como branco para contraste com o fundo
    justifyContent: "space-between", // Distribui os elementos ao longo do espaço disponível
    padding: "20px", // Adiciona espaçamento interno ao redor do conteúdo
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

    {/* Formulário de Login */}
<div
  style={{
    flex: 1, // Ocupa o espaço disponível na tela
    display: "flex", // Usa flexbox para organizar os elementos
    flexDirection: "column", // Organiza os elementos em coluna
    alignItems: "center", // Centraliza os elementos horizontalmente
    justifyContent: "center", // Centraliza os elementos verticalmente
  }}
>
  {/* Campo de Email */}
  <input
    type="email" // Define o tipo do campo como email
    placeholder="Email" // Texto de placeholder para orientação do usuário
    value={email} // Usa o estado para armazenar o valor do campo
    onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao digitar
    style={{
      width: "80%", // Ocupa 80% da largura do contêiner
      padding: "10px", // Adiciona espaçamento interno
      marginBottom: "10px", // Espaçamento inferior para separar os elementos
      borderRadius: "5px", // Bordas arredondadas para um design mais suave
      border: "1px solid #ccc", // Adiciona uma borda cinza clara
    }}
  />

        {/* Campo de Senha */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao digitar
          style={{
            width: "80%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        {/* Esqueci minha senha */}
        <img
          src={forgotPasswordImage}
          alt="Forgot Password"
          style={{
            marginBottom: "20px",
            cursor: "pointer",
            width: "30%",
          }}
          onClick={() => alert("Forgot Password functionality")} // Ação para recuperar senha
        />

        
{/* Botão de login */}
<button
  onClick={handleSignIn} // Chama a função para autenticar com email e senha
  style={{
    width: "80%", // Define a largura do botão
    padding: "10px", // Adiciona espaçamento interno
    backgroundColor: "#28a745", // Cor verde para indicar ação positiva
    color: "#fff", // Texto branco para contraste
    border: "none", // Remove borda padrão
    borderRadius: "5px", // Bordas arredondadas para um design moderno
    cursor: "pointer", // Indica que o botão é clicável
    marginBottom: "10px", // Espaço inferior para separação do próximo elemento
  }}
>
  Sign In
</button>

       {/* Login com Google */}
<img
  src={googleButtonImage} // Exibe o botão de login com Google
  alt="Sign in with Google"
  style={{ width: "80%", cursor: "pointer" }} // Mantém o tamanho e indica interatividade
  onClick={handleGoogleSignIn} // Chama a função para autenticar com Google
/>
      </div>
      
 {/* Link para cadastro */}
<div style={{ textAlign: "center" }}> {/* Centraliza o conteúdo */}
  <img
    src={signUpHereImage} // Exibe a imagem com link para a página de cadastro
    alt="Sign Up here"
    style={{ cursor: "pointer", width: "50%" }} // Mantém o tamanho e interatividade
    onClick={() => navigate("/signup")} // Redireciona para a página de cadastro
  />
</div>
    </div>
  );
};

export default SignIn;