import Widget from './widget_object';

const initState = {
    signedIn : false,
    credential: {
        username: "",
        role: "",
    },
    currentEdittingObject: {

    },
}

export default ( state = initState, action ) => {
    switch (action.type) {
        case 'signInSwitch':

            return { ...state, signedIn: action.payload.signInState, credential: action.payload.credential };

            break;
        case "set/current/editting/object":
            let { type, content } = action.payload;
            let widget = new Widget(type, content);

            return { ...state, currentEdittingObject: widget }

            break;

        case "update/current/editting/object/styling":
            let attr = action.payload.attr;
            let font = {...state.currentEdittingObject.font};

            let styling_widget = state.currentEdittingObject;
            styling_widget.setFont(font)
            return { ...state, currentEdittingObject: styling_widget }
            break;
        default:
            return state;
    }
}
