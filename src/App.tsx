import { useEffect, useState } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import { fetchImagesWithTopic } from "./images-api";
import toast from "react-hot-toast";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { Image } from "./tipes";
import { ImageData } from "./tipes";

function App() {
  const [images, setImages] = useState<Image[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(false);
  const [page, setPage] = useState<number | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (topic.length === 0) return;

    async function fetchImages() {
      try {
        setError(false);
        setLoading(true);

        const data: ImageData = await fetchImagesWithTopic(topic, page);
        const totalPages: number = data.total_pages;

        if (data.results.length === 0) {
          setSearchError(true);
          toast.error(
            "Sorry, there are no images matching your search query. Please try again"
          );
          setShowBtn(false);
        } else {
          setSearchError(false);

          if (page && page <= totalPages) {
            setImages((prevImages) => [...(prevImages || []), ...data.results]);
            setShowBtn(true);
          }
        }
      } catch (error) {
        setError(true);
        toast.error(
          "Whoops, something went wrong! Please try reloading this page!"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [topic, page]);

  const onSearchImage = (searchImage: string) => {
    setPage(1);
    setImages([]);
    setTopic(searchImage);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const onMoreLoad = () => {
    if (page !== null) setPage(page + 1);
  };

  return (
    <div className="app">
      <SearchBar onSearchImage={onSearchImage} />
      {error && <ErrorMessage />}
      {searchError && <ErrorMessage />}
      {images && <ImageGallery images={images} openModal={openModal} />}
      {loading && <Loader />}
      {showBtn && images && images.length > 0 && !loading && (
        <LoadMoreBtn onMoreLoad={onMoreLoad} />
      )}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          modalOpen={modalOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default App;
