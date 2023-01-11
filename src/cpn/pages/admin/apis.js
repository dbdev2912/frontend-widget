import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import { redirect, openTab } from '../../useful';
const newapiLink = '/ml-admin/api/new';

export default () => {
    const unique_string = useSelector( state => state.unique_string )
    const [ tableHeight, setTableHeight ] = useState(0);
    const [ apis, setApis ] = useState([

    ])

    const [ apiDisplayList, setApiDisplayList ] = useState([])
    useEffect(() => {
        const height = window.innerHeight - $('#top-section').height() - 75;
        setTableHeight(height);

        fetch(`/api/${unique_string}/apis`).then( res => res.json() )
        .then( (data) => {
            const apisList = data.apis;
            const apiListFormated = apisList.map( api => {
                if( !api.title ){
                    api.title="Khum có tiêu đề"
                }
                return { ...api, edit_url: `/ml-admin/api/edit/${api.id}` }
            })
            setApiDisplayList([...apis, ...apiListFormated]);
            setApis([...apis, ...apiListFormated])

        })


        setApiDisplayList([...apis ]);
    }, [])


    const apiFilter = (e) => {
        const criteria = e.target.value;
        const newDisplay = apis.filter( p => p.title.includes( criteria ) || p.url.includes(criteria) );
        setApiDisplayList(newDisplay);
    }

    return(
        <div className="p-l-1 p-t-1 p-r-1 p-b-1 container-fluid">
            <div className="flex flex-no-wrap" id="top-section">
                <div className="flex flex-no-wrap w-50">
                    <span className="text-medium flex flex-middle">API</span>
                    <div className="flex flex-middle m-l-1">
                        <button className="button-theme p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5" onClick={ () => { redirect(newapiLink) } }>Thêm mới <span className="text-bild">+</span></button>
                    </div>
                </div>
                <div className="w-50 flex flex-middle">
                    <input placeholder="Search" className="border-pale border-radius-0-5 p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5 w-fit" onChange={ apiFilter }/>
                </div>
            </div>

            <div className="bg-white border-pale m-t-2 scroll-y" style={{ maxHeight: `${tableHeight}px` }}>
                <table className="w-fit relative">
                    <thead className="sticky">
                        <tr>
                            <th className="text-left p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5" style={{display: "table-cell"}}>Tiêu đề</th>
                            <th className="text-left p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5" style={{display: "table-cell"}}>Ghi chú</th>
                            <th className="text-left p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5" style={{display: "table-cell"}}>Thay đổi</th>
                        </tr>
                    </thead>

                    <tbody>
                    { apiDisplayList.map( api =>
                        <tr className="hover" onClick={ () => { openTab(api.edit_url) } } key={ api.id }>
                            <td className="p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5">{api.title}</td>
                            <td className="p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5">{api.note}</td>
                            <td className="p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5">{api.last_change ?api.last_change: " " }</td>
                        </tr>
                    ) }

                    </tbody>
                </table>
            </div>

        </div>
    )
}
