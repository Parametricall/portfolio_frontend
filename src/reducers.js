export default function reducers(state = {}, action) {
  switch (action.type) {
    case "setUserAuthenticated":
      state.authenticated = action.authenticated;
      break;
    default:
      return state;
  }

  return state
}