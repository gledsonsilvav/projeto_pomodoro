import styles from './StatusText.module.css';

interface StatusTextProps {
  children: React.ReactNode;
}

export function StatusText(props: StatusTextProps) {
  return (
    <p className={styles.text}>
      {props.children}
    </p>
  );
}