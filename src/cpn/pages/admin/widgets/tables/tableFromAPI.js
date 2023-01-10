import { useState, useEffect } from 'react';

export default (props) => {
    const { _id, func } = props
    const [ apiURL, setApiURL ] = useState("");

    const setTableAsCurrentEdittingObject = () => {
        if( apiURL ){
            fetch( apiURL ).then( res => res.json() ).then(data => {
                const keys = Object.keys(data)
                console.log(keys)
            })
        }

        // func(widgetSelector('table', _id, null, { }))

        /*This will be finished after dynamic API is completed */
    }

    return(
        <div>
            <div className="w-100 p-t-2 flex flex-middle">
                <span className="text-left block text-little-bigger">API url: </span>
            </div>
            <div className="w-80 m-t-1">
                <input type="text" className="block input-outline w-fit p-t-0-5 p-l-0-5 p-b-0-5" onChange={ (e)=>{ setApiURL(e.target.value) } }/>
            </div>
            <div className="w-80 m-t-1">
                  <button onClick={ setTableAsCurrentEdittingObject } className="button-theme block ml-auto p-t-0-5 p-b-0-5 p-l-1 p-r-1">Thêm</button>
            </div>
        </div>
    )
}
