import { useReducer, useEffect } from "react";
// import photos from "mocks/photos";
// import topics from "mocks/topics";

const ACTIONS = {
  ADD_FAV_PHOTO: 'ADD_FAV_PHOTO',
  DELETE_FAV_PHOTO: 'DELETE_FAV_PHOTO',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  SELECT_PHOTO: 'SELECT_PHOTO',
  SET_PHOTO_DATA: 'SET_PHOTO_DATA',
  SET_TOPIC_DATA: 'SET_TOPIC_DATA'
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
  case ACTIONS.SET_PHOTO_DATA:
    return {
      ...state, photoData: action.payload.photoData
    };
  case ACTIONS.SET_TOPIC_DATA:
    return {
      ...state, topicData: action.payload.topicData
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
    photoData: [],
    topicData: []
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('/api/photos')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        dispatch({ type: ACTIONS.SET_PHOTO_DATA, payload: { photoData: data} });
      })
      .catch((error) => {
        throw error;
      });

    fetch('/api/topics')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        dispatch({ type: ACTIONS.SET_TOPIC_DATA, payload: { topicData: data} });
      })
      .catch((error) => {
        throw error;
      });
  }, [dispatch]);

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
    console.log('State', state);
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