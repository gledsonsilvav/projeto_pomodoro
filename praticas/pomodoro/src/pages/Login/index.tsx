import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  // Estados dos inputs controlados
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Estados de controle de UI
  const [viewMode, setViewMode] = useState<'login' | 'register' | 'recovery'>('login');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Efeito para limpar mensagens automaticamente
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de validação (Usuário mockado)
    if (username === 'aluno@pomodoro.com' && password === '123456') {
      setIsSuccess(true);
      setMessage('Login realizado com sucesso! Entrando...');
      // Pequeno delay para o usuário ler a mensagem de sucesso antes de mudar de tela
      setTimeout(() => onLoginSuccess(), 1500);
    } else {
      setIsSuccess(false);
      setMessage('Credenciais inválidas. Tente aluno@pomodoro.com / 123456');
    }
  };

  // Renderização Condicional de Telas Secundárias
  if (viewMode === 'register') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Criar Conta</h2>
          <p>O fluxo de cadastro ainda será implementado.</p>
          <button className={styles.linkButton} onClick={() => setViewMode('login')}>
            Voltar para o Login
          </button>
        </div>
      </div>
    );
  }

  if (viewMode === 'recovery') {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>Recuperar Senha</h2>
          <p>O fluxo de recuperação de senha será implementado em breve.</p>
          <button className={styles.linkButton} onClick={() => setViewMode('login')}>
            Voltar para o Login
          </button>
        </div>
      </div>
    );
  }

  // Tela de Login Principal
  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <h1 className={styles.title}>Chronos Login</h1>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="user">E-mail ou Usuário</label>
            <input
              id="user"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu e-mail"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="pass">Senha</label>
            <input
              id="pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
              required
            />
          </div>

          {message && (
            <div className={`${styles.feedback} ${isSuccess ? styles.successFeedback : ''}`}>
              {message}
            </div>
          )}

          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
        </form>

        <div className={styles.actions}>
          <button className={styles.linkButton} onClick={() => setViewMode('recovery')}>
            Esqueci minha senha
          </button>
          <button className={styles.linkButton} onClick={() => setViewMode('register')}>
            Não tem conta? Cadastre-se
          </button>
        </div>
      </section>
    </main>
  );
};