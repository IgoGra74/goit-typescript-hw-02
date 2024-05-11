import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onMoreLoad: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onMoreLoad }) => {
  return (
    <div>
      <div className={css.loadMore}>
        <button className={css.button} onClick={onMoreLoad}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default LoadMoreBtn;
