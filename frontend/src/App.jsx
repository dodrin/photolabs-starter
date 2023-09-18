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
    togglePhotoSelection,
  } = useApplicationData();
  
  return (
    <div className="App">
      <HomeRoute state={state} toggleFav={toggleFav} toggleModal={toggleModal} photos={photos} togglePhotoSelection={togglePhotoSelection} />
      {!!state.isShown && <PhotoDetailsModal state={state} toggleFav={toggleFav} toggleModal={toggleModal} togglePhotoSelection={togglePhotoSelection} photos={photos}/>}
    </div>
  );
};

export default App;
