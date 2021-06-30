// export const setUserAuthenticated = (authenticated) => {
//   return {
//     type: "setUserAuthenticated",
//     authenticated: authenticated,
//   };
// };

export const setUser2 = (user) => {
  return { type: "set_user", payload: user };
};

export const setUserAuthenticated = (authenticated) => {
  return {
    type: "set_user_authenticated",
    payload: { isAuthenticated: authenticated },
  };
};
