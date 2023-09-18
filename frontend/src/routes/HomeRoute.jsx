import React from 'react';
import '../styles/HomeRoute.scss';
import TopNavigation from 'components/TopNavigationBar';
import PhotoList from 'components/PhotoList';
// import photos from 'mocks/photos';

const HomeRoute = (props) => {
  const { favPhotos } = props;
  const isFavPhotoExist = favPhotos.length > 0;

  return (
    <div className="home-route">
      <TopNavigation isFavPhotoExist={isFavPhotoExist} />
      <PhotoList {...props} />
    </div>
  );
};

export default HomeRoute;
