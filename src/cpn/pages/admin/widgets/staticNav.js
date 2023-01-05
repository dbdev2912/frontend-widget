import $ from 'jquery'
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { widgetSelector } from '../widgetSelector'

export default (props) => {
    const { width } = props;

    const widgets = useSelector( state => state.navWidgets );
    const dispatch = useDispatch()

    const setWidgets = (widgets) => {
        dispatch({
            type: "widgets/nav/update/state",
            payload: { widgets },
        })
    }

    const renderWidget = (w) => {
        return w;
    }

    return (
        <div className="mini-nav block absolute t-0 l-0 border-right-pale h-fit" id="mini-nav" style={{ width: `${width}px` }}>
            <div className="sortable" id="nav-sortable">
                { widgets && widgets.map( w => renderWidget(w.cpn) ) }
            </div>
        </div>
    )

}
