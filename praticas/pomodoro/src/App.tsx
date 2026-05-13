import { AuthContextProvider } from './contexts/AuthContext/AuthContextProvider';
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider';
import { MessagesContainer } from './components/MessagesContainer';
import { MainRouter } from './routers/MainRouter';

import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

export function App() {
  return (
    <AuthContextProvider>
      <TaskContextProvider>
        <MessagesContainer>
          <MainRouter />
        </MessagesContainer>
      </TaskContextProvider>
    </AuthContextProvider>
  );
}