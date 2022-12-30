const initState = {
    signedIn : false,
    credential: {
        username: "",
        role: "",
    }
}

export default ( state = initState, action ) => {
    switch (action.type) {
        case 'signInSwitch':

            return { ...state, signedIn: action.payload.signInState, credential: action.payload.credential };

            break;
        default:
            return state;
    }
}
