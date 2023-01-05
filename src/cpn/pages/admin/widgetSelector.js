import { useSelector, useDispatch } from 'react-redux';

const widgetSelector = ( type, id, value, state = {} ) => {
    switch (type) {
        case "text":
            return {
                id: id,
                cpn: <Text key={ id } state={ state } type={ type } id={id} value = { value } />,
                props: {
                    id, state, type, value
                }
            }
            break;

        case "link":
            return {
                id: id,
                cpn: <Link key={ id } state={ state } type={ type } id={id} value = { value }/>,
                props: {
                    id, state, type, value
                }
            }
            break;

        case "image":
            return {
                id: id,
                cpn: <Image key={ id } state={ state } type={ type } id={id} value = { value }/>,
                props: {
                    id, state, type, value
                }
            }
            break;
        default:
            return null;
    }
}

const staticWidgetSelector = ( type, id, value, state = {} ) => {
    switch (type) {
        case "text":
            return {
                id: id,
                cpn: <StaticText key={ id } state={ state } type={ type } id={id} value = { value } />,
                props: {
                    id, state, type, value
                }
            }
            break;

        case "link":
            return {
                id: id,
                cpn: <StaticLink key={ id } state={ state } type={ type } id={id} value = { value }/>,
                props: {
                    id, state, type, value
                }
            }
            break;

        case "image":
            return {
                id: id,
                cpn: <StaticImage key={ id } state={ state } type={ type } id={id} value = { value }/>,
                props: {
                    id, state, type, value
                }
            }
            break;
        default:
            return null;
    }
}

const pageWidgetSelector = ( type, id, value, state = {} ) => {
    switch (type) {
        case "text":
            return {
                id: id,
                cpn: <PageText key={ id } state={ state } type={ type } id={id} value = { value } />,
                props: {
                    id, state, type, value
                }
            }
            break;

        case "link":
            return {
                id: id,
                cpn: <PageLink key={ id } state={ state } type={ type } id={id} value = { value }/>,
                props: {
                    id, state, type, value
                }
            }
            break;

        case "image":
            return {
                id: id,
                cpn: <PageImage key={ id } state={ state } type={ type } id={id} value = { value }/>,
                props: {
                    id, state, type, value
                }
            }
            break;
        default:
            return null;
    }
}

const Text = ( props ) => {
    const { id, type, value, state } = props;
    const dispatch = useDispatch();
    return(
        <div id={id} onClick={ () => { dispatch({
            type: "set/current/editting/object",
            payload: {
                type, content: value, id
            }
        }) } } className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5">
            <span className={ "text-little-bigger "+ state.className } style={{ color: state.color, fontSize: `${state.size}px` }}>{ value }</span>
        </div>
    )
}

const Link = ( props ) => {
    const { id, type, value, state } = props;
    const dispatch = useDispatch();
    return(
        <div id={id} onClick={ () => { dispatch({
            type: "set/current/editting/object",
            payload: {
                type, content: value, id
            }
        }) } } className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5">
            <span className={ "text-little-bigger link "+ state.className } href={ state.href } style={{ color: state.color, fontSize: `${state.size}px` }}>{ value }</span>
        </div>
    )
}

const Image = (props) => {
    const { id, type, value, state } = props;

    const dispatch = useDispatch();

    return(
        <div id={id} onClick={ () => { dispatch({
            type: "set/current/editting/object",
            payload: {
                type, content: value, id
            }
        }) } } className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5">
            <img src={ value.src } className="block w-80 m-auto"/>
        </div>
    )
}

const PageText = ( props ) => {
    const { id, type, value, state } = props;
    const dispatch = useDispatch();
    return(
        <div id={id} onClick={ () => { dispatch({
            type: "set/current/editting/page/object",
            payload: {
                type, content: value, id
            }
        }) } } className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5">
            <span className={ "text-little-bigger "+ state.className } style={{ color: state.color, fontSize: `${state.size}px` }}>{ value }</span>
        </div>
    )
}

const PageLink = ( props ) => {
    const { id, type, value, state } = props;
    const dispatch = useDispatch();
    return(
        <div id={id} onClick={ () => { dispatch({
            type: "set/current/editting/page/object",
            payload: {
                type, content: value, id
            }
        }) } } className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5">
            <span className={ "text-little-bigger link "+ state.className } href={ state.href } style={{ color: state.color, fontSize: `${state.size}px` }}>{ value }</span>
        </div>
    )
}

const PageImage = (props) => {
    const { id, type, value, state } = props;

    const dispatch = useDispatch();

    return(
        <div id={id} onClick={ () => { dispatch({
            type: "set/current/editting/page/object",
            payload: {
                type, content: value, id
            }
        }) } } className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5">
            <img src={ value.src } className="block w-80 m-auto"/>
        </div>
    )
}

const StaticText = ( props ) => {
    const { id, type, value, state } = props;
    const dispatch = useDispatch();
    return(
        <div id={id} className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5">
            <span className={ "text-little-bigger "+ state.className } style={{ color: state.color, fontSize: `${state.size}px` }}>{ value }</span>
        </div>
    )
}

const StaticLink = ( props ) => {
    const { id, type, value, state } = props;
    const dispatch = useDispatch();
    return(
        <div id={id} className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5">
            <a className={ "text-little-bigger link link-disabled "+ state.className } href={ state.url } style={{ color: state.color, fontSize: `${state.size}px` }}>{ value }</a>
        </div>
    )
}

const StaticImage = (props) => {
    const { id, type, value, state } = props;

    const dispatch = useDispatch();

    return(
        <div id={id} className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5">
            <img src={ value.src } className="block w-80 m-auto"/>
        </div>
    )
}

export {
    widgetSelector,
    staticWidgetSelector,
    pageWidgetSelector
}
