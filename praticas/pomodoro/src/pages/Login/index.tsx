import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useNavigate } from 'react-router';

import { useAuthContext } from '../../contexts/AuthContext/AuthContextProvider';

import styles from './styles.module.css';

type ViewMode = 'login' | 'register' | 'recovery';

export function Login() {
  const { login, isAuthenticated } = useAuthContext();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'Login - Chronos Pomodoro';
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage('');
    }, 4000);

    return () => clearTimeout(timer);
  }, [message]);

  function showFeedback(text: string, success = false) {
    setIsSuccess(success);
    setMessage(text);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    const loginWasSuccessful = login(username, password);

    if (!loginWasSuccessful) {
      setIsSubmitting(false);
      showFeedback('Usuário ou senha inválidos. Use pomodoro / 123456.');
      return;
    }

    showFeedback('Login realizado com sucesso!', true);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/home/', { replace: true });
    }, 800);
  }

  function handleRegisterClick() {
    setViewMode('register');
    showFeedback('Fluxo de cadastro ainda será implementado.');
  }

  function handleRecoveryClick() {
    setViewMode('recovery');
    showFeedback('Fluxo de recuperação de senha ainda será implementado.');
  }

  function handleBackToLogin() {
    setViewMode('login');
    setMessage('');
  }

  return (
    <div className={styles.loginPage}>
      <main className={styles.card}>
        <div className={styles.logoArea}>
          <span className={styles.logoIcon}>⏱</span>
          <h1 className={styles.title}>Chronos Login</h1>
        </div>

        {viewMode === 'login' && (
          <>
            <p className={styles.subtitle}>
              Acesse o sistema Pomodoro para continuar.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="username">Usuário</label>

                <input
                  ref={usernameInputRef}
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Digite seu usuário"
                  autoComplete="username"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Senha</label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  required
                />
              </div>

              {message && (
                <div
                  className={`${styles.feedback} ${
                    isSuccess ? styles.success : styles.error
                  }`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                className={styles.loginButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <div className={styles.actions}>
              <button type="button" onClick={handleRegisterClick}>
                Não tem conta? Cadastre-se
              </button>

              <button type="button" onClick={handleRecoveryClick}>
                Esqueci minha senha
              </button>
            </div>
          </>
        )}

        {viewMode === 'register' && (
          <section className={styles.simulationBox}>
            <h2>Cadastro</h2>

            <p>Tela de cadastro em modo simulação.</p>

            {message && <p className={styles.error}>{message}</p>}

            <button type="button" onClick={handleBackToLogin}>
              Voltar para login
            </button>
          </section>
        )}

        {viewMode === 'recovery' && (
          <section className={styles.simulationBox}>
            <h2>Recuperar senha</h2>

            <p>Tela de recuperação de senha em modo simulação.</p>

            {message && <p className={styles.error}>{message}</p>}

            <button type="button" onClick={handleBackToLogin}>
              Voltar para login
            </button>
          </section>
        )}
      </main>
    </div>
  );
}