import styles from './Error.module.css';

export function Error() {
  return (
    <div className={styles.errorScreen}>
      <div>Something went wrong...</div>
    </div>
  )
}