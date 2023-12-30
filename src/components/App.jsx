import React, { useState, useEffect, useRef } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { requestImagesByQuery } from 'services/api';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const loadMoreRef = useRef(null);

  const scrollToBottom = () => {
    loadMoreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  const fetchImagesByQuery = async (searchQuery, page = 1) => {
    try {
      setStatus('pending');
      const data = await requestImagesByQuery(searchQuery, page);
      const { hits } = data;
      setImages(prevImg => (page > 1 ? [...prevImg, ...hits] : hits));
      setStatus('success');
    } catch (error) {
      setError(error.message);
      setStatus('error');
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchImagesByQuery(searchQuery, page);
    }
  }, [searchQuery, page]);

  useEffect(() => {
    if (page > 1 && images && images.length > 0) {
      scrollToBottom();
    }
  }, [images, page]);

  const handleSubmit = searchValue => {
    setSearchQuery(searchValue);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleShowModal = imageId => {
    const selectedImage = images.find(image => image.id === imageId);
    setIsOpenModal(true);
    setModalData(selectedImage);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const showImages = status === 'success' && Array.isArray(images);

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />

      {status === 'pending' && <Loader />}
      {status === 'error' && <p>Whoops, something went wrong: {error}</p>}
      {showImages && (
        <ImageGallery images={images} handleShowModal={handleShowModal} />
      )}
      {showImages && <Button onClick={handleLoadMore} ref={loadMoreRef} />}
      {isOpenModal && (
        <Modal handleCloseModal={handleCloseModal} image={modalData} />
      )}
    </div>
  );
};
