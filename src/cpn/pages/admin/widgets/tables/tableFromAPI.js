import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { widgetSelector } from '../../widgetSelector';

export default (props) => {
    const { _id, func } = props
    const [ api, setApi ] = useState({});
    const [ APIs, setAPIs ] = useState([]);

    const unique_string = useSelector( state => state.unique_string );

    const [ innerDrop, setInnerDrop ] = useState(false);
    const [ innerHeight, setInnerHeight ] = useState(0);

    useEffect(() => {
        fetch(`/api/${unique_string}/apis`).then( res => res.json() ).then( ({ apis }) => {
            setAPIs(apis);
        })
    }, [])

    const innerDropdownTrigger = () => {
        setInnerHeight( innerDrop? 0: 200 )
        setInnerDrop( !innerDrop )
    }

    const setTableAsCurrentEdittingObject = () => {
        if( api.id ){
            let fields = [];

            const { tables } = api;
            for( let i = 0; i < tables.length; i++ ){
                let table = tables[i];
                for( let j = 0; j < table.fields.length; j++){
                    fields.push({ name:  table.fields[j].name});
                }
            }
            let table = {};
            table.name = api.title;
            table.fields = fields;
            func(widgetSelector('api-table', api.id, null, { table: table }))


        }
    }


    return(
        <div>
            <div className="w-100 p-t-2 flex flex-middle">
                <span className="text-left block text-little-bigger">API url: </span>
            </div>

            <div className="w-80 m-t-1">
                <div className="relative index-3">
                    <span className="block w-fit border-bottom-pale text-left text-little-bigger">{  api.id? api.id: " "  }</span>
                    { innerDrop ?
                        <React.StrictMode>
                            <img className="icon absolute drop-icon" src = "/icon/drop.png" onClick={ innerDropdownTrigger }/>
                        </React.StrictMode>
                        :
                        <React.StrictMode>
                            <img className="icon absolute drop-icon" src = "/icon/undrop.png" onClick={ innerDropdownTrigger }/>
                        </React.StrictMode>
                     }
                     <div className="absolute r-0 t-100 no-over-flow index-5" style={{ height: `${innerHeight}px` }}>
                        <div className="drop-container h-200 w-fit scroll-y" >
                        { APIs.map( (api, index) =>
                            <div key={api.id} className="p-t-0-5 p-l-1 p-b-0-5 drop-item hover border-bottom-pale flex flex-no-wrap bg-white" onClick={ ()=> { setApi(api); innerDropdownTrigger() } }>
                                <span className="block w-50">{api.title}</span>
                            </div>
                        )}
                        </div>
                     </div>
                </div>
            </div>

            { api.id ?
                <div className="w-80 m-t-1">
                   <button onClick={ setTableAsCurrentEdittingObject } className="button-theme block ml-auto p-t-0-5 p-b-0-5 p-l-1 p-r-1">Thêm</button>
                </div>
                : null
            }
        </div>
    )
}
