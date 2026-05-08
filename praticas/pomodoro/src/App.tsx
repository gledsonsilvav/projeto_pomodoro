import { useState } from 'react';
import { Home } from './pages/Home';
import { Login } from './pages/Login'; // Certifique-se de que o export no index.tsx do Login não seja default, ou ajuste aqui
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';

import './styles/theme.css';
import './styles/global.css';

export function App() {
  // Estado para controlar se o usuário está logado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função que será chamada quando o login for bem-sucedido
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <>
      {isAuthenticated ? (
        // Se estiver logado, mostra o sistema Pomodoro original
        <TaskContextProvider>
          <Home />
        </TaskContextProvider>
      ) : (
        // Se NÃO estiver logado, mostra apenas a tela de Login
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}