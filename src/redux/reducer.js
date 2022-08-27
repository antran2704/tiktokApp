const initState = {
  currentUser: {},
  listVideo: [],
  selectVideo: {},
  listVideoUser: [],
  following: [],
  liked: [],
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default rootReducer
