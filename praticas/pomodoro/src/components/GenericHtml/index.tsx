import styles from './styles.module.css';

type GenericHtmlProps = {
  children: React.ReactNode;
};

export function GenericHtml({ children }: GenericHtmlProps) {
  // Esse componente apenas envelopa o conteúdo em uma div com classe especial
  return <div className={styles.genericHtml}>{children}</div>;
}