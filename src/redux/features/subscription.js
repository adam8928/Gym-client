const initialState = {
  subscriptions: [],
  loading: false,
  error: null,
}

export const subscriptionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'subscriptions/load/pending':
      return {
        ...state,
        loading: true,
      };
    case 'subscriptions/load/fullfilled':
      return {
        ...state,
        subscriptions: action.payload,
        loading: false,
      };
    case 'subscriptions/load/rejected':
      return {
        ...state,
        error: action.payload
      }
      default:
        return state
  }
}

export const loadSubscriptions = () => {
  return async (dispatch) => {
    dispatch({ type: 'subscriptions/load/pending' });
    try {
      const res = await fetch("http://localhost:5000/users/subscriptions");
      const data = await res.json();


      dispatch({ type: 'subscriptions/load/fullfilled', payload: data });
    } catch (e) {
      dispatch({ type:'subscriptions/load/rejected', payload: e });
    }
  };
};
