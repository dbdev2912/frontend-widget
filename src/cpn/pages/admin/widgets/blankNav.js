import $ from 'jquery'
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { widgetSelector } from '../widgetSelector'

export default () => {
    const widgets = useSelector( state => state.navWidgets );
    const dispatch = useDispatch()

    const setWidgets = (widgets) => {
        dispatch({
            type: "widgets/nav/update/state",
            payload: { widgets },
        })
    }

    $("#mini-nav").droppable({
        drop: (event, ui) => {
            const id = $(ui.draggable[0]).attr("id");

            const type = $(`#${id}`).attr("widget-type");
            let value = $(`#${id}`).attr("value");
            if( type ==="image" ){
                value = JSON.parse(value);
                if( !value.src ){
                    value.src="/assets/default.jpg"
                }
            }
            setWidgets([ ...widgets, widgetSelector(  type, id, value, { size: 14, url: "" }) ]);

            $(`#${id}`).remove()
        }
    })

    const renderWidget = (w) => {
        return w;
    }

    return (
        <div className="mini-nav block absolute t-0 l-0 border-right-pale h-fit" id="mini-nav" style={{ width: "200px" }}>
            <div className="sortable" id="nav-sortable">
                { widgets && widgets.map( w => renderWidget(w.cpn) ) }
            </div>
        </div>
    )

}
