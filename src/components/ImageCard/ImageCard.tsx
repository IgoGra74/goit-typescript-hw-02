import css from "./ImageCard.module.css";
import { Image } from "../../tipes";

interface ImageCardProps {
  image: Image;
  openModal: (image: Image) => void;
}
const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  return (
    <div>
      <img
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => openModal(image)}
      />
    </div>
  );
};

export default ImageCard;
