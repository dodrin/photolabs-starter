import React from 'react';
import SwitchLabels from './SwitchLabels';

import '../styles/TopNavigationBar.scss';
import TopicList from './TopicList';
import FavBadge from './FavBadge';

const TopNavigation = (props) => {
  const { isFavPhotoExist, backToAllPhotos } = props;
  
  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo" onClick={() => backToAllPhotos()}>PhotoLabs</span>
      <TopicList {...props} />
      <div className='topn-nav-bar__icons'>
        <FavBadge isFavPhotoExist={isFavPhotoExist} className='favbadge' />
        <SwitchLabels {...props}/>
      </div>
    </div>
  );
};

export default TopNavigation;