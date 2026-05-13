import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [viewMode, setViewMode] = useState<'login' | 'register' | 'recovery'>('login');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'pomodoro' && password === '123456') {
      setIsSuccess(true);
      setMessage('Login realizado com sucesso!');
      setTimeout(() => onLoginSuccess(), 1000);
    } else {
      setIsSuccess(false);
      setMessage('Erro: Use pomodoro / 123456');
    }
  };

  return (
    <div className={styles.loginPage}>
      <main className={styles.card}>
        <h1 className={styles.title}>Chronos Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Usuário</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Digite seu usuário" 
              required 
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Senha</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="******" 
              required 
            />
          </div>
          {message && (
            <div className={`${styles.feedback} ${isSuccess ? styles.success : styles.error}`}>
              {message}
            </div>
          )}
          <button type="submit" className={styles.loginButton}>Entrar</button>
        </form>
      </main>
    </div>
  );
};