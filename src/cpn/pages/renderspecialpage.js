import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import $ from 'jquery';

import BlankNav from './admin/widgets/staticNav';

export default () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState({});
    const unique_string = useSelector( state => state.unique_string )

    const pageWidgets = useSelector(state => state.pageWidgets)


    useEffect(() => {
        fetch(`/api/${unique_string}/navbar`).then( res => res.json() )
        .then( ({ widgets }) => {

            dispatch({
                type: 'initializing/static/navbar/widgets',
                payload: { widgets }
            })
        });

        fetch(`/api/${unique_string}/page/widget/by/url`, {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ dynamic_url: "" }),
        }).then( res => res.json() ).then( data => {
            $('#title').text(data.page.title);

            dispatch({
                type: 'initializing/static/page/widgets',
                payload: { widgets: data.page ? data.page.widgets: [] }
            })
        })
    },[])

    const renderPageWidget = (w) => {
        return w;
    };

    return(
        <div>
            <BlankNav width={300}/>
            <div className="app-container">
                { pageWidgets && pageWidgets.map( w =>  renderPageWidget( w && w.cpn ) ) }
            </div>
        </div>
    )
}
