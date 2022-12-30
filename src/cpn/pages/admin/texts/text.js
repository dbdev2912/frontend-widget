import { useEffect, useState } from 'react';
import $ from 'jquery';
export default () => {

    const [ editState, setEditState ] = useState(true)

    useEffect(() => {
        $('.draggable').draggable(
            {
                drag: (e, ui) => {
                    console.log("drage")
                }
            }
        )

        $('#blur').focusout(() => {
            console.log("Focus out")
        })
    }, [])



    return(
        <div>
            { editState ?
            <div className="draggable" id="blur">
                <span className="text-little-bigger">Edit Text</span>
            </div>
            :
            <div className="draggable">
                <span className="text-little-bigger">Text</span>
            </div>
            }
        </div>
    )
}
