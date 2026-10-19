import styles from "./Loading.module.scss";

function Loading() {
  return (
    <div>
      <span
        className={`material-symbols-outlined d-flex flex-row flex-fill justify-content-center align-items-center ${styles.spinner}`}
      >
        progress_activity
      </span>
    </div>
  );
}

export default Loading;
