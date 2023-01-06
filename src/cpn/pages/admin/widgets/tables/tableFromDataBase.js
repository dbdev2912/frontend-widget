import React, { useState, useEffect } from 'react';

export default () => {

    const [ tables, setTables ] = useState([]);
    const [ table, setTable ] = useState([]);

    const [ innerDrop, setInnerDrop ] = useState(false);
    const [ innerHeight, setInnerHeight ] = useState(0);

    useEffect(() => {
        fetch('/api/tables').then( res => res.json()).then( data => {
            setTables( data.tables );
        })
    }, [])

    const innerDropdownTrigger = () => {
        setInnerHeight( innerDrop? 0: 200 )
        setInnerDrop( !innerDrop )
        console.log(table)
    }

    return(
        <div>
            <div className="w-100 p-t-2 flex flex-middle">
                <span className="text-left text-little-bigger">Chọn bảng nguồn</span>
            </div>
            <div className="w-80 m-t-1">
                <div className="relative index-3">
                    <span className="block w-fit border-bottom-pale text-left text-little-bigger">{  table.name? table.name: "Bảng nào z quí dị"  }</span>
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
                        <div className="drop-container h-200 w-fit" >
                        { tables.map( (table, index) =>
                            <div key={index} className="p-t-0-5 p-l-1 p-b-0-5 drop-item hover border-bottom-pale flex flex-no-wrap bg-white" onClick={ ()=> { setTable(table); innerDropdownTrigger() } }>
                                <span className="block w-50">{table.name}</span>
                            </div>
                        )}
                        </div>
                     </div>
                </div>
            </div>


        </div>
    )
}
