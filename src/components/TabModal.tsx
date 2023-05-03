import React, { useState } from 'react';
import SearchBar from '@theme-original/SearchBar';
import Modal from 'react-modal';

Modal.setAppElement('body');

const TabModal: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('search');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div
        className="robot-button"
        onClick={openModal}
        aria-label="Open robot modal"
        role="button" // Add role="button" to make it accessible
        tabIndex={0} // Add tabIndex to make it focusable
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            openModal();
          }
        }} // Add onKeyDown event handler to make it keyboard-accessible
      >
        Robot
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="My Modal"
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        {/* ... existing tabs and tab content code ... */}
      </Modal>
    </>
  );
};

export default TabModal;
