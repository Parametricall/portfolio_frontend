export default function reducers(state = {}, action) {
  switch (action.type) {
    case "setUserAuthenticated":
      state.authenticated = action.authenticated;
      return {
        ...state,
        authenticated: action.authenticated,
      };
    default:
      return state;
  }
}
