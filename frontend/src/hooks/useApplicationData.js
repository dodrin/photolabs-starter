import { useReducer, useEffect } from "react";

const ACTIONS = {
  ADD_FAV_PHOTO: 'ADD_FAV_PHOTO',
  DELETE_FAV_PHOTO: 'DELETE_FAV_PHOTO',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  SELECT_PHOTO: 'SELECT_PHOTO',
  SET_PHOTO_DATA: 'SET_PHOTO_DATA',
  SET_TOPIC_DATA: 'SET_TOPIC_DATA',
  SET_SELECTED_TOPIC_ID: 'SET_SELECTED_TOPIC_ID',
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
  case ACTIONS.SET_SELECTED_TOPIC_ID:
    return {
      ...state, photosData: action.payload.topicId
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
    topicData: [],
    selectedTopicId: null,
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
        dispatch({ type: ACTIONS.SET_PHOTO_DATA, payload: { photoData: data } });
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
        dispatch({ type: ACTIONS.SET_TOPIC_DATA, payload: { topicData: data } });
      })
      .catch((error) => {
        throw error;
      });
  }, [dispatch]);

  // like and unlike function
  const toggleFav = (id) => {
    if (state.favPhotos.includes(id)) {
      dispatch({ type: ACTIONS.DELETE_FAV_PHOTO, payload: { photoId: id } });
    } else {
      dispatch({ type: ACTIONS.ADD_FAV_PHOTO, payload: { photoId: id } });
    }
  };

  // Open and close modal
  const toggleModal = () => {
    dispatch({ type: ACTIONS.TOGGLE_MODAL });
  };
  
  // Set selected photo data to modal
  const togglePhotoSelection = (photo) => {
    const newSelectedPhoto = state.selectedPhoto === photo ? null : photo;
    dispatch({ type: ACTIONS.SELECT_PHOTO, payload: { selectedPhoto: newSelectedPhoto }});
  };

  // Select topic by onClick and fetch data by topic id
  const selectTopic = (id) => {
    dispatch({ type: ACTIONS.SET_SELECTED_TOPIC_ID, payload: { topicId: id } });
  
    if (id) {
      fetch(`/api/topics/photos/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Request failed with status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          dispatch({ type: ACTIONS.SET_PHOTO_DATA, payload: { photoData: data } });
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  return {
    state,
    dispatch,
    toggleFav,
    toggleModal,
    togglePhotoSelection,
    selectTopic
  };
};

export default useApplicationData;