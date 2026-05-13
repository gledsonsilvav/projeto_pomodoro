import type { ToastContentProps } from 'react-toastify';

import {
  ThumbsUp,
  ThumbsDown,
} from 'phosphor-react';

import styles from './styles.module.css';

type DialogData = string;

export function Dialog({
  closeToast,
  data,
}: ToastContentProps<DialogData>) {
  return (
    <div className={styles.container}>
      <p>{data}</p>

      <div className={styles.buttonsContainer}>
        <button
          onClick={() => closeToast?.(true)}
          className={styles.confirmButton}
          type="button"
        >
          <ThumbsUp size={18} />
        </button>

        <button
          onClick={() => closeToast?.(false)}
          className={styles.cancelButton}
          type="button"
        >
          <ThumbsDown size={18} />
        </button>
      </div>
    </div>
  );
}