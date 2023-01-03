import { useSelector, useDispatch } from 'react-redux';

export default ( type, id, value ) => {
    switch (type) {
        case "text":
            return <Text key={ id } type={ type } id={id} value = { value } />
            break;

        case "link":
            return <Link key={ id } type={ type } id={id} value = { value }/>
            break;
        default:
            return null;
    }
}



const Text = ( props ) => {
    const { id, type, value } = props;
    const dispatch = useDispatch();
    return(
        <div id={id} onClick={ () => { dispatch({
            type: "set/current/editting/object",
            payload: {
                type, content: value
            }
        }) } } className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5">
            <span className="text-little-bigger">{ value }</span>
        </div>
    )
}

const Link = ( props ) => {
    const { id, type, value } = props;
    const dispatch = useDispatch();
    return(
        <div id={id} onClick={ () => { dispatch({
            type: "set/current/editting/object",
            payload: {
                type, content: value
            }
        }) } } className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5">
            <span className="text-little-bigger text-theme">{ value }</span>
        </div>
    )
}
