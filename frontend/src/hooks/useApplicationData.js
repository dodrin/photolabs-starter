import { useReducer, useState } from "react";


const ACTIONS = {
  ADD_FAV_PHOTO: 'ADD_FAV_PHOTO',
  DELETE_FAV_PHOTO: 'DELETE_FAV_PHOTO',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  SELECT_PHOTO: 'SELECT_PHOTO',
};

const reducer = (state, action) => {
  switch (action.type) {
  case ACTIONS.ADD_FAV_PHOTO:
    return {
      ...state,
      favPhotos: [...state.favPhotos, action.payload.photoId]};
  case ACTIONS.DELETE_FAV_PHOTO:
    return {
      ...state,
      favPhotos: state.favPhotos.filter((id) => id !== action.payload.photoId)};
  case ACTIONS.TOGGLE_MODAL:
    return {
      ...state, isShown: !state.isShown
    };
  case ACTIONS.SELECT_PHOTO:
    return {
      ...state, selectedPhoto: action.payload.selectedPhoto
    };
  default:
    return state;
  }
};

const useApplicationData = () => {
  
  const initialState = {
    favPhotos: [],
    isShown: false,
    selectedPhoto: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleFav = (id) => {
    if (state.favPhotos.includes(id)) {
      dispatch({ type: ACTIONS.DELETE_FAV_PHOTO, payload: { photoId: id } });
    } else {
      dispatch({ type: ACTIONS.ADD_FAV_PHOTO, payload: { photoId: id } });
    }
  };

  const toggleModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_MODAL });
  };
  
  const togglePhotoSelection = (photo) => {
    const { selectedPhoto } = state;
    const newSelectedPhoto = selectedPhoto === photo ? null : photo;
    dispatch({ type: ACTIONS.SELECT_PHOTO, payload: { selectedPhoto: newSelectedPhoto }});
  };

  return {
    state,
    dispatch,
    toggleFav,
    toggleModal,
    togglePhotoSelection,
  };
};

export default useApplicationData;