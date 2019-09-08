const initialState = {
    count: 0,
    results_count: 0,
    results: [],
  };
  
  // Dictionary of ACTIONS gives us a functional decalaritive style of calling actions
  const handlers = {
    INCREMENT: state => ({ ...state, count: state.count + 1 }),
    DECREMENT: state => ({ ...state, count: state.count - 1 }),
    ADD: (state, action) => ({ ...state, count: state.count + action.payload }),
    RESULTS: (state, action) => ({ ...state, results: action.payload }),
    RESULTS_COUNT: (state, action) => ({ ...state, results_count: action.payload }),
    DEFAULT: state => state
  };
  
  // New State = Old State + Action
  const reducer = (state = initialState, action) => {
    // Look up the handler
    const handler = handlers[action.type] || handlers.DEFAULT;
    // Execute, and return new state
    return handler(state, action);
  };
  
  export default reducer;
  