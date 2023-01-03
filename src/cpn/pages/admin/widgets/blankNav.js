import $ from 'jquery'
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';
import { useEffect, useState } from 'react';

import widgetSelector from '../widgetSelector'

export default () => {
    const [ widgets, setWidgets ] = useState([]);

    $("#mini-nav").droppable({
        drop: (event, ui) => {
            const id = $(ui.draggable[0]).attr("id");

            const type = $(`#${id}`).attr("widget-type");
            const value = $(`#${id}`).attr("value");
            setWidgets([ ...widgets, widgetSelector(  type, id, value) ]);
            $(`#${id}`).remove()
        }
    })

    const renderWidget = (w) => {
        return w;
    }

    return (
        <div className="mini-nav block absolute t-0 l-0 border-right-pale h-fit" id="mini-nav" style={{ width: "200px" }}>
            <div>
                { widgets && widgets.map( w => renderWidget(w) ) }
            </div>
        </div>
    )

}
