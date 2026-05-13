import styles from './styles.module.css';

type GenericHtmlProps = {
  children: React.ReactNode;
};

export function GenericHtml({ children }: GenericHtmlProps) {
  // A div abaixo servirá como o "pai" que aplicará os estilos aos filhos
  return <div className={styles.genericHtml}>{children}</div>;
}