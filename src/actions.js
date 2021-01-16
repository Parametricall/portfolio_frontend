export const setUserAuthenticated = authenticated => {
  return {
    type: 'setUserAuthenticated',
    authenticated: authenticated
  };
};