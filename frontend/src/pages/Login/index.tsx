import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useNavigate } from 'react-router';

import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { apiFetch } from '../../services/api';

import styles from './styles.module.css';

type ViewMode = 'login' | 'register' | 'recovery';

export function Login() {
  const { login, register } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [resetToken, setResetToken] = useState('');
  const [generatedToken, setGeneratedToken] = useState('');

  const [viewMode, setViewMode] = useState<ViewMode>('login');

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'Login - Chronos Pomodoro';
  }, []);

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  function showFeedback(text: string, success = false) {
    setIsSuccess(success);
    setMessage(text);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    showFeedback('');

    try {
      await login(username, password);
      navigate('/home/', { replace: true });
    } catch (error) {
      showFeedback(error instanceof Error ? error.message : 'Email ou senha inválidos.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    showFeedback('');

    try {
      await register(name, username, password);
      showFeedback('Conta criada com sucesso!', true);
      setViewMode('login');
    } catch (error) {
      showFeedback(error instanceof Error ? error.message : 'Erro ao cadastrar usuário.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleForgotPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    showFeedback('');
    setGeneratedToken('');

    try {
      const data = await apiFetch('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email: username }),
      });

      setGeneratedToken(data.resetToken);
      setResetToken(data.resetToken);
      showFeedback('Token gerado. Copie ou use o token exibido abaixo.', true);
    } catch (error) {
      showFeedback(error instanceof Error ? error.message : 'Erro ao gerar token.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    showFeedback('');

    try {
      await apiFetch('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify({
          token: resetToken,
          password,
        }),
      });

      showFeedback('Senha redefinida com sucesso!', true);
      setViewMode('login');
      setPassword('');
      setResetToken('');
      setGeneratedToken('');
    } catch (error) {
      showFeedback(error instanceof Error ? error.message : 'Erro ao redefinir senha.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleRegisterClick() {
    setViewMode('register');
    setMessage('');
  }

  function handleRecoveryClick() {
    setViewMode('recovery');
    setMessage('');
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
            <p className={styles.subtitle}>Acesse o sistema Pomodoro para continuar.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="username">Email</label>
                <input
                  ref={usernameInputRef}
                  id="username"
                  type="email"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Digite seu email"
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
                <div className={`${styles.feedback} ${isSuccess ? styles.success : styles.error}`}>
                  {message}
                </div>
              )}

              <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
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

            <form className={styles.form} onSubmit={handleRegister}>
              <div className={styles.inputGroup}>
                <label htmlFor="name">Nome</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Digite seu nome"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="register-email">Email</label>
                <input
                  id="register-email"
                  type="email"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Digite seu email"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="register-password">Senha</label>
                <input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  required
                />
              </div>

              {message && (
                <div className={`${styles.feedback} ${isSuccess ? styles.success : styles.error}`}>
                  {message}
                </div>
              )}

              <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </form>

            <button type="button" onClick={handleBackToLogin}>
              Voltar para login
            </button>
          </section>
        )}

        {viewMode === 'recovery' && (
          <section className={styles.simulationBox}>
            <h2>Recuperar senha</h2>

            <form className={styles.form} onSubmit={handleForgotPassword}>
              <div className={styles.inputGroup}>
                <label htmlFor="recovery-email">Email</label>
                <input
                  id="recovery-email"
                  type="email"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Digite seu email"
                  required
                />
              </div>

              <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
                {isSubmitting ? 'Gerando...' : 'Gerar token'}
              </button>
            </form>

            {generatedToken && (
              <form className={styles.form} onSubmit={handleResetPassword}>
                <div className={styles.inputGroup}>
                  <label htmlFor="reset-token">Token</label>
                  <input
                    id="reset-token"
                    type="text"
                    value={resetToken}
                    onChange={(event) => setResetToken(event.target.value)}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="new-password">Nova senha</label>
                  <input
                    id="new-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Digite a nova senha"
                    required
                  />
                </div>

                <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
                  Redefinir senha
                </button>
              </form>
            )}

            {message && (
              <div className={`${styles.feedback} ${isSuccess ? styles.success : styles.error}`}>
                {message}
              </div>
            )}

            <button type="button" onClick={handleBackToLogin}>
              Voltar para login
            </button>
          </section>
        )}
      </main>
    </div>
  );
}