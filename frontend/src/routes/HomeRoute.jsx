import React from 'react';
import '../styles/HomeRoute.scss';
import TopNavigation from 'components/TopNavigationBar';
import PhotoList from 'components/PhotoList';

const HomeRoute = (props) => {
  const { state } = props;
  const isFavPhotoExist = state.favPhotos.length > 0;

  return (
    <div className="home-route">
      <TopNavigation {...props} isFavPhotoExist={isFavPhotoExist} />
      <PhotoList {...props} />
    </div>
  );
};

export default HomeRoute;
