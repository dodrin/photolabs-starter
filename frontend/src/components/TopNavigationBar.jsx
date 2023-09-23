import React from 'react';

import '../styles/TopNavigationBar.scss';
import TopicList from './TopicList';
import FavBadge from './FavBadge';

const TopNavigation = (props) => {
  const { isFavPhotoExist, backToAllPhotos } = props;
  
  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo" onClick={() => backToAllPhotos()}>PhotoLabs</span>
      <TopicList {...props} />
      <FavBadge isFavPhotoExist={isFavPhotoExist} />
    </div>
  );
};

export default TopNavigation;