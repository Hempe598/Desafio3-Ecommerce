import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlaBAvtY0YoL7Ly54sbXC3KIsnaMvu3RU",
  authDomain: "desafio3-80549.firebaseapp.com",
  projectId: "desafio3-80549",
  storageBucket: "desafio3-80549.firebasestorage.app",
  messagingSenderId: "313123194274",
  appId: "1:313123194274:web:8179d48d201a24d364defb",
  measurementId: "G-QD5HRCT273"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


// Função para autenticação com Google usando Firebase
export const signInWithGoogle = async () => {
  try {
    // Tenta autenticar o usuário usando um pop-up do Google
    const result = await signInWithPopup(auth, googleProvider);

    // Retorna as informações do usuário autenticado
    return result.user;
  } catch (error) {
    // Caso ocorra um erro, exibe a mensagem no console
    console.error("Error signing in with Google", error);

    // Repassa o erro para ser tratado onde a função foi chamada
    throw error;
  }
};

// Exporta outras funções de autenticação do Firebase
// - signInWithEmailAndPassword: Faz login com email e senha
// - createUserWithEmailAndPassword: Cria um novo usuário com email e senha
export { signInWithEmailAndPassword, createUserWithEmailAndPassword };