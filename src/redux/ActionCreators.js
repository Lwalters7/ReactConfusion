import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// Add Comment
export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    comment
  }
});

// Fetch Dishes from Server
export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading());

  return fetch(baseUrl + 'dishes')
    .then(response => {
      if (!response.ok) {
        const error = new Error(`Error ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

// Indicate Dishes Are Loading
export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

// Indicate Fetch Failed
export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

// Successfully Add Dishes
export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
      .then(response => {
        if (!response.ok) {
          const error = new Error(`Error ${response.status}: ${response.statusText}`);
          throw error;
        }
        return response.json();
      })
      .then(comments => dispatch(addComments(comments)))
      .catch(error => dispatch(commentsFailed(error.message)));
  };
  
  export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
  });
  
  export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
  });
  
  export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading());
  
    return fetch(baseUrl + 'promotions')
      .then(response => {
        if (!response.ok) {
          const error = new Error(`Error ${response.status}: ${response.statusText}`);
          throw error;
        }
        return response.json();
      })
      .then(promos => dispatch(addPromos(promos)))
      .catch(error => dispatch(promosFailed(error.message)));
  };
  
  export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
  });
  
  export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
  });
  
  export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
  });
  