import { useEffect, useState } from 'react';
import $ from 'jquery';
export default ( props ) => {
    const type = "image";
    const { id } = props
    const [ editState, setEditState ] = useState(false)
    const [ img, setImg ] = useState({});

    useEffect(() => {
        $('.draggable').draggable();
    }, [])

    const changeImage = (e) => {
        const files = e.target.files;
        if( files ){
            const file = files[0];
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (e) => {
                setImg( {name: file.name, src: e.target.result} )
            }
        }
    }

    const editStateUpdate = () => {
        setEditState( !editState );
    }

    return(
        <div id={id} className="draggable" style={{ width: "fit-content" }} widget-type={type} value={ JSON.stringify(img) }>

            <div className="relative index-2 p-t-1 p-l-1 p-r-1 p-b-1" onClick = { editStateUpdate } >
                <img src={ img.src ? img.src : "/assets/default.jpg" } onClick={ (e)=> { $(`#${id}`).find('input').click() } } className="block m-auto" style={{ width: "100px" }}/>
                <input type="file" className="hidden" onChange={ changeImage }/>
            </div>

            {
                editState ?
                <div className="fk-bg fixed index-1 t-0 l-0 full-screen" onClick={ editStateUpdate }/>
                : null
            }
        </div>
    )
}
