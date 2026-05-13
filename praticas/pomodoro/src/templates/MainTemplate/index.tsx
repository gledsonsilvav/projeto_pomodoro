import { Logo } from '../../components/Logo';
import { Menu } from '../../components/Menu';
import { Footer } from '../../components/Footer';

import styles from './styles.module.css';

type MainTemplateProps = {
  children: React.ReactNode;
};

export function MainTemplate({ children }: MainTemplateProps) {
  return (
    <main className={styles.container}>
      <Logo />

      <Menu />

      <div className={styles.content}>{children}</div>

      <Footer />
    </main>
  );
}