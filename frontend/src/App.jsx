import React from 'react';
import './App.scss';
import HomeRoute from 'routes/HomeRoute';
import PhotoDetailsModal from 'routes/PhotoDetailsModal';
import useApplicationData from 'hooks/useApplicationData';

const App = () => {
  const {
    topics,
    state,
    toggleFav,
    toggleModal,
    togglePhotoSelection,
    selectTopic,
    backToAllPhotos,
    switchDark,
  } = useApplicationData();

  const dark = (state.isDark === true) ? `dark` : ``;
  
  return (
    <div className={`App ${dark}`}>
      <HomeRoute
        state={state}
        topics={topics}
        toggleFav={toggleFav}
        toggleModal={toggleModal}
        photos={state.photoData}
        togglePhotoSelection={togglePhotoSelection}
        selectTopic={selectTopic}
        backToAllPhotos={backToAllPhotos}
        switchDark={switchDark}
      />
      
      {!!state.isShown &&
        <PhotoDetailsModal
          state={state}
          toggleFav={toggleFav}
          toggleModal={toggleModal}
          togglePhotoSelection={togglePhotoSelection}
          photos={state.photoData}
        />}
    </div>
  );
};

export default App;
