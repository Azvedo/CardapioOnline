import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Admin from "./Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // Email do administrador autorizado
  const ADMIN_EMAIL = "admin@example.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Usuário autenticado:", user.email);
      if (user.email === ADMIN_EMAIL) {
        setIsLoggedIn(true);
        setError("");
        console.log("Admin autenticado com sucesso!");
      } else {
        setError("Usuário não autorizado!");
        console.log("Usuário não autorizado!");
      }
    } catch (error) {
      setError("Erro ao autenticar: " + error.message);
      console.error("Erro ao autenticar:", error.message);
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Header />
      {isLoggedIn && (
        <button className="absolute right-4 top-[36px] text-[#F9CF49] hover:text-yellow-300" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
      )}
      <div>
        {isLoggedIn ? (
          <div>
            <Admin />
          </div>
        ) : (
          <form onSubmit={handleLogin} className="p-5 max-w-md mx-auto border border-gray-300 rounded m-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Login do Administrador</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="p-2 mb-4 w-full border border-gray-300 rounded"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="p-2 mb-4 w-full border border-gray-300 rounded"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Entrar
            </button>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
