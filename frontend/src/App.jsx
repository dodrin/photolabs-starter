import React, { useState } from 'react';
import './App.scss';
import HomeRoute from 'routes/HomeRoute';
import PhotoDetailsModal from 'routes/PhotoDetailsModal';
import photos from 'mocks/photos';
import useApplicationData from 'hooks/useApplicationData';

const App = () => {
  const {
    state,
    toggleFav,
    toggleModal,
    // isShown,
    // setIsShown,
    selectedPhoto,
    setSelectedPhoto
  } = useApplicationData();

  // const closeModal = () => {
  //   setIsShown(false);
  // };
  // const openModal = () => {
  //   setIsShown(true);
  // };
  
  return (
    <div className="App">
      <HomeRoute state={state} toggleFav={toggleFav} toggleModal={toggleModal} photos={photos} selectedPhoto={selectedPhoto} setSelectedPhoto={setSelectedPhoto} />
      {!!state.isShown && <PhotoDetailsModal state={state} toggleFav={toggleFav} toggleModal={toggleModal} photos={photos} selectedPhoto={selectedPhoto} />}
    </div>
  );
};

export default App;
