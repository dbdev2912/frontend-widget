import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';

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

        case "table":
            return {
                id: id,
                cpn: <Table key={ id } state={ state } type={ type } id={id} value = { value }/>,
                props: {
                    id, state, type, value
                }
            }
            break;

        case "api-table":
            return {
                id: id,
                cpn: <APITable key={ id } state={ state } type={ type } id={id} value = { value }/>,
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
        case "table":
            return {
                id: id,
                cpn: <StaticTable key={ id } state={ state } type={ type } id={id} value = { value }/>,
                props: {
                        id, state, type, value
                }
            }
            break;
        case "api-table":
            return {
                id: id,
                cpn: <APIStaticTable key={ id } state={ state } type={ type } id={id} value = { value }/>,
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
        case "table":
            return {
                id: id,
                cpn: <PageTable key={ id } state={ state } type={ type } id={id} value = { value }/>,
                props: {
                        id, state, type, value
                }
            }
            break;

        case "api-table":
            return {
                id: id,
                cpn: <APIPageTable key={ id } state={ state } type={ type } id={id} value = { value }/>,
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

const Table = ( props ) => {
    const { id, type, value, state } = props;
    const dispatch = useDispatch();
    const  [data, setData] = useState([]);

    useEffect(() => {
        fetch(`/api/${state.table.name}/data`).then(res => res.json())
        .then( ({ data }) => {
            setData( data );
        })
    }, [])

    const setCurrentEdittingField = (field) => {
        console.log(id);
        console.log(field)
    }

    return(
        <div id={id} onClick={ () => { dispatch({
            type: "set/current/editting/object",
            payload: {
                type, content: value, id
            }
        }) } } className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5 w-fit table-resizble" style={{ overflowX: "auto" }}>
            <table className="w-fit no-border">
                <thead>
                    <tr>
                        { state.table && state.table.fields.map(
                            f =>
                            <th field={ f.name } className="text-theme text-left p-t-0-5 p-l-0-5 p-b-0-5" style={ {display: "table-cell", width: `${f.width}px` } }><span className="th-label" onClick={ () => { setCurrentEdittingField(f) } }>{ f.name }</span></th>
                        ) }
                    </tr>
                </thead>
                <tbody>
                    { data.length > 0 ?
                        data.map( d =>
                        <tr>
                            { state.table && state.table.fields.map(
                                f =>
                                <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">{ d[f.name] }</td>
                            ) }
                        </tr>
                    )
                    :
                    <tr>
                        { state.table && state.table.fields.map(
                            f =>
                            <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">Văn bản mẫu</td>
                        ) }
                    </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}



const APITable = ( props ) => {
    const { id, type, value, state } = props;
    const dispatch = useDispatch();
    const  [data, setData] = useState([]);
    const unique_string = useSelector(state => state.unique_string)

    useEffect(() => {

        fetch(`/api/${unique_string}/retrieve/api/${id}`).then( res => res.json() ).then( ({ data }) => {
            setData( data )
            console.log(state.table)
            console.log(data)
        })
    }, [])

    const setCurrentEdittingField = (field) => {
        console.log(id);
        console.log(field)
    }

    return(
        <div id={id} onClick={ () => { dispatch({
            type: "set/current/editting/object",
            payload: {
                type, content: value, id
            }
        }) } } className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5 w-fit table-resizble" style={{ overflowX: "auto" }}>
            <table className="w-fit no-border">
                <thead>
                    <tr>
                        { state.table && state.table.fields.map(
                            f =>
                            <th field={ f.name } className="text-theme text-left p-t-0-5 p-l-0-5 p-b-0-5" style={ {display: "table-cell", width: `${f.width}px` } }><span className="th-label" onClick={ () => { setCurrentEdittingField(f) } }>{ f.name }</span></th>
                        ) }
                    </tr>
                </thead>
                <tbody>
                    { data.length > 0 ?
                        data.map( d =>
                        <tr>
                            { state.table && state.table.fields.map(
                                f =>
                                <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">{ d[f.name] }</td>
                            ) }
                        </tr>
                    )
                    :
                    <tr>
                        { state.table && state.table.fields.map(
                            f =>
                            <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">Văn bản mẫu</td>
                        ) }
                    </tr>
                    }

                </tbody>
            </table>
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

const PageTable = ( props ) => {
    const { id, type, value, state } = props;
    const dispatch = useDispatch();
    const  [data, setData] = useState([]);

    useEffect(() => {
        fetch(`/api/${state.table.name}/data`).then(res => res.json())
        .then( ({ data }) => {
            setData( data );
        })
    }, [])

    const setCurrentEdittingField = (field) => {
        console.log(id);
        console.log(field)
    }

    return(
        <div id={id} onClick={ () => { dispatch({
            type: "set/current/editting/object",
            payload: {
                type, content: value, id
            }
        }) } } className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5 w-fit table-resizble" style={{ overflowX: "auto" }}>
            <table className="w-fit no-border">
                <thead>
                    <tr>
                        { state.table && state.table.fields.map(
                            f =>
                            <th field={ f.name } className="text-theme text-left p-t-0-5 p-l-0-5 p-b-0-5" style={ {display: "table-cell", width: `${f.width}px` } }><span className="th-label" onClick={ () => {setCurrentEdittingField( f )} }>{ f.name }</span></th>
                        ) }
                    </tr>
                </thead>
                <tbody>
                    { data.length > 0 ?
                        data.map( d =>
                        <tr>
                            { state.table && state.table.fields.map(
                                f =>
                                <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">{ d[f.name] }</td>
                            ) }
                        </tr>
                    )
                    :
                    <tr>
                        { state.table && state.table.fields.map(
                            f =>
                            <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">Văn bản mẫu</td>
                        ) }
                    </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

const APIPageTable = ( props ) => {
    const { id, type, value, state } = props;
    const dispatch = useDispatch();
    const  [data, setData] = useState([]);
    const unique_string = useSelector(state => state.unique_string)

    useEffect(() => {

        fetch(`/api/${unique_string}/retrieve/api/${id}`).then( res => res.json() ).then( ({ data }) => {
            setData( data )
            console.log(state.table)
            console.log(data)
        })
    }, [])

    const setCurrentEdittingField = (field) => {
        console.log(id);
        console.log(field)
    }

    return(
        <div id={id} onClick={ () => { dispatch({
            type: "set/current/editting/object",
            payload: {
                type, content: value, id
            }
        }) } } className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5 w-fit table-resizble" style={{ overflowX: "auto" }}>
            <table className="w-fit no-border">
                <thead>
                    <tr>
                        { state.table && state.table.fields.map(
                            f =>
                            <th field={ f.name } className="text-theme text-left p-t-0-5 p-l-0-5 p-b-0-5" style={ {display: "table-cell", width: `${f.width}px` } }><span className="th-label" onClick={ () => { setCurrentEdittingField(f) } }>{ f.name }</span></th>
                        ) }
                    </tr>
                </thead>
                <tbody>
                    { data.length > 0 ?
                        data.map( d =>
                        <tr>
                            { state.table && state.table.fields.map(
                                f =>
                                <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">{ d[f.name] }</td>
                            ) }
                        </tr>
                    )
                    :
                    <tr>
                        { state.table && state.table.fields.map(
                            f =>
                            <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">Văn bản mẫu</td>
                        ) }
                    </tr>
                    }

                </tbody>
            </table>
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
        <div id={id} className="block p-t-1 p-r-0-5 p-l-0-5 p-b-0-5 hover">
            <a className={ "text-little-bigger link link-disabled no-decorate "+ state.className } href={ state.url } style={{ color: state.color, fontSize: `${state.size}px` }}>{ value }</a>
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

const StaticTable = ( props ) => {
    const { id, type, value, state } = props;
    const dispatch = useDispatch();
    const  [data, setData] = useState([]);
    useEffect(() => {
        fetch(`/api/${state.table.name}/data`).then(res => res.json())
        .then( ({ data }) => {
            setData( data );
        })
    }, [])

    return(
        <div id={id} className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5 w-fit table-resizble" style={{ overflowX: "auto" }}>
            <table className="w-fit no-border">
                <thead>
                    <tr>
                        { state.table && state.table.fields.map(
                            f =>
                            <th field={ f.name } className="text-theme text-left p-t-0-5 p-l-0-5 p-b-0-5" style={ {display: "table-cell", width: `${f.width}px` } }><span className="th-label" onClick={ () => {console.log( f )} }>{ f.name }</span></th>
                        ) }
                    </tr>
                </thead>
                <tbody>
                    { data.length > 0 ?
                        data.map( d =>
                        <tr>
                            { state.table && state.table.fields.map(
                                f =>
                                <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">{ d[f.name] }</td>
                            ) }
                        </tr>
                    )
                    :
                    <tr>
                        { state.table && state.table.fields.map(
                            f =>
                            <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">Văn bản mẫu</td>
                        ) }
                    </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

const APIStaticTable = ( props ) => {
    const { id, type, value, state } = props;
    const dispatch = useDispatch();
    const  [data, setData] = useState([]);
    const unique_string = useSelector(state => state.unique_string)

    useEffect(() => {

        fetch(`/api/${unique_string}/retrieve/api/${id}`).then( res => res.json() ).then( ({ data }) => {
            setData( data )
            console.log(state.table)
            console.log(data)
        })
    }, [])

    const setCurrentEdittingField = (field) => {
        console.log(id);
        console.log(field)
    }

    return(
        <div id={id} className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5 w-fit table-resizble" style={{ overflowX: "auto" }}>
            <table className="w-fit no-border">
                <thead>
                    <tr>
                        { state.table && state.table.fields.map(
                            f =>
                            <th field={ f.name } className="text-theme text-left p-t-0-5 p-l-0-5 p-b-0-5" style={ {display: "table-cell", width: `${f.width}px` } }><span className="th-label" onClick={ () => { setCurrentEdittingField(f) } }>{ f.name }</span></th>
                        ) }
                    </tr>
                </thead>
                <tbody>
                    { data.length > 0 ?
                        data.map( d =>
                        <tr>
                            { state.table && state.table.fields.map(
                                f =>
                                <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">{ d[f.name] }</td>
                            ) }
                        </tr>
                    )
                    :
                    <tr>
                        { state.table && state.table.fields.map(
                            f =>
                            <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">Văn bản mẫu</td>
                        ) }
                    </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

export {
    widgetSelector,
    staticWidgetSelector,
    pageWidgetSelector
}
