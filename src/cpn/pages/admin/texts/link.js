import { useEffect, useState } from 'react';
import $ from 'jquery';
export default ( props ) => {
    const type = "link";
    const label = "Đường dẫn mới";
    const { id } = props
    const [ editState, setEditState ] = useState(false)

    useEffect(() => {
        $('.draggable').draggable();
    }, [])


    const editStateUpdate = () => {
        setEditState( !editState );
    }

    return(
        <div id={id} className="draggable" style={{ width: "fit-content" }} widget-type={type} value={ label }>

            <div className="relative index-2" onClick = { editStateUpdate } >
                <span className="text-little-bigger">{ label }</span>
            </div>

            {
                editState ?
                <div className="fk-bg fixed index-1 t-0 l-0 full-screen" onClick={ editStateUpdate }/>
                : null
            }
        </div>
    )
}
