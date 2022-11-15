export const ASTRONAUT_INITIAL_STATE = {
  name: '',
  bio: '',
  teamId: '1',
  image: ''
};

export const astronautReducer = (state, action) => {
  switch (action.type) {
    case 'updateFieldValue':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'resetForm':
      return ASTRONAUT_INITIAL_STATE;
    default:
      return ASTRONAUT_INITIAL_STATE;
  }
};
