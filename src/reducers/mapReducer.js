import { INITIALIZE_MAP } from '../actions/mapActions';

const initialState = {
  mapInstance: null,
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_MAP:
      return { ...state, mapInstance: action.payload };
    default:
      return state;
  }
};

export default mapReducer;