import React, { useEffect, useState } from 'react';
import $ from 'jquery';

import TableFromDB from './tables/tableFromDataBase';


export default ( props ) => {
    const type = "image";
    const { id } = props

    const [ tableType, setTableType ] = useState(0);

    const [ innerDrop, setInnerDrop ] = useState(false);
    const [ innerHeight, setInnerHeight ] = useState(0);

    const tableTypes = [
        { id : 1,  label: "Bảng từ cơ sở dữ liệu" },
        { id : 2,  label: "Bảng từ API" },
        { id : 3,  label: "Bảng không từ cái gì cả" },
    ]

    useEffect(() => {

    }, []);

    const innerDropdownTrigger = () => {
        setInnerHeight( innerDrop? 0: 200 )
        setInnerDrop( !innerDrop )
    }

    return(
        <div id={id} className="floating-box" style={{ width: "fit-content" }} widget-type={type}>

                <div className="floating-container relative index-2" style={{ width: "50vw", maxWidth: "unset", height: "100vh" }}>
                    <div className="p-l-2 p-r-2">
                        <div className="w-100 p-t-2 flex flex-middle">
                            <span className="text-left text-little-bigger">Loại bảng</span>
                        </div>
                        <div className="w-80 m-t-1 relative index-6">
                            <div className="relative index-3">
                                <span className="block w-fit border-bottom-pale text-left text-little-bigger">{  tableType.label? tableType.label: "Chọn dùm một cái trời ơi"  }</span>
                                { innerDrop ?
                                    <React.StrictMode>
                                        <img className="icon absolute drop-icon" src = "/icon/drop.png" onClick={ innerDropdownTrigger }/>
                                    </React.StrictMode>
                                    :
                                    <React.StrictMode>
                                        <img className="icon absolute drop-icon" src = "/icon/undrop.png" onClick={ innerDropdownTrigger }/>
                                    </React.StrictMode>
                                 }
                                 <div className="absolute r-0 t-100 no-over-flow index-6" style={{ height: `${innerHeight}px` }}>
                                    <div className="drop-container h-200 w-fit" >
                                    { tableTypes.map( (type, index) =>
                                        <div key={index} className="p-t-0-5 p-l-1 p-b-0-5 drop-item hover border-bottom-pale flex flex-no-wrap bg-white" onClick={ ()=> { setTableType(type); innerDropdownTrigger() } }>
                                            <span className="block w-50">{type.label}</span>
                                        </div>
                                    )}
                                    </div>
                                 </div>
                            </div>
                        </div>

                        { tableType.id === 1 ?
                            <div className="relative index-5">
                                <TableFromDB />
                            </div>
                            : null
                        }
                        { tableType.id === 2 ?
                            <div>
                                <h1>{ tableType.label }</h1>
                            </div>
                            : null
                        }
                        { tableType.id === 3 ?
                            <div>
                                <h1>{ tableType.label }</h1>
                            </div>
                            : null
                        }
                    </div>
                </div>
            <div className="fk-bg fixed index-1 t-0 l-0 full-screen transparent-bg"/>

        </div>
    )
}
