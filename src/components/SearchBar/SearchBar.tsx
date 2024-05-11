import { FC, FormEvent } from "react";
import { toast } from "react-hot-toast";
import css from "./SearchBar.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface SearchBarProps {
  onSearchImage: (topic: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearchImage }) => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const topicInput = form.elements.namedItem(
      "topic"
    ) as HTMLInputElement | null;

    if (!topicInput) {
      toast.error("Please enter search term!");
      return;
    }
    const topic = topicInput.value.trim();

    onSearchImage(topic);
    form.reset();
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="topic"
        />
        <button className={css.button} type="submit">
          Search
        </button>
        <ErrorMessage />
      </form>
    </header>
  );
};

export default SearchBar;
