'use client';
import { useState } from 'react';
import Navbar from './Navigations/Navigation';

const ModalWrapper = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Navbar />
    </>
  );
};

export default ModalWrapper;
