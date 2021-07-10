const initialState = {
    user: {
        isAuthenticated: false,
    },
};

export default function reducers(state = initialState, action) {
    switch (action.type) {
        case 'set_user':
            return {
                ...state,
                user: {
                    isAuthenticated: state.user.isAuthenticated,
                    ...action.payload,
                },
            };
        case 'set_user_authenticated':
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                },
            };
        case 'setUserAuthenticated':
            return {
                ...state,
                authenticated: action.authenticated,
            };
        default:
            return state;
    }
}
