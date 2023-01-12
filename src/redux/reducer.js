import Widget from './widget_object';
import { widgetSelector, staticWidgetSelector, pageWidgetSelector } from '../cpn/pages/admin/widgetSelector';
import { generateClassName, propsFromClassName } from '../cpn/useful';
const initState = {
    signedIn : false,
    credential: {
        username: "",
        role: "",
    },
    currentEdittingObject: {

    },

    unique_string : "ngonghinhnhilalunnhi",

    navWidgets: [],
    bannerWidgets: {
        img: "/assets/default.jpg",
        cpnName: ""
    },
    pageWidgets: [],

    APIRelations: [

    ],

    apiTables: [],
    currentEdittingTable: {

    },
    currentEdittingField: {

    }
}

export default ( state = initState, action ) => {
    switch (action.type) {
        case 'signInSwitch':

            return { ...state, signedIn: action.payload.signInState, credential: action.payload.credential };

            break;

        case 'initializing/navbar/widgets':
            return initializingNavBarWidgets(state, action);

            break;

        case 'initializing/page/widgets':
            return initializingPageWidgets(state, action);

            break;

        case 'initializing/static/navbar/widgets':
            return initializingStaticNavBarWidgets(state, action);
            break;

        case 'initializing/static/page/widgets':
            return initializingStaticPageWidgets(state, action);
            break;

        case "initializing/banner":
            return initializingBanner(state, action);
            break;

        case "update/banner":
            return updateBanner(state, action);
            break;

        case "set/current/editting/object":

            return setCuurrentEdditingObject( state, action )
            break;

        case "set/current/editting/page/object":

            return setCuurrentEdditingPageObject( state, action )
            break;

        case "update/current/editting/object/styling":
            return updateCurrentEdittingObjectStyling( state, action )

            break;

        case "update/current/editting/page/object/styling":
            return updateCurrentEdittingPageObjectStyling( state, action )

            break;
        case "widgets/nav/update/state":

            return { ...state, navWidgets:  action.payload.widgets }
            break;

        case "widgets/page/update/state":

            return { ...state, pageWidgets:  action.payload.widgets }
            break;

        case "update/widget/prop/content":

            return updateWidgetContent( state, action );
            break;

        case "update/page/widget/prop/content":

            return updatePageWidgetContent( state, action );
            break;

        case "update/widget/prop/color":

            return updateWidgetColor( state, action );
            break;

        case "update/page/widget/prop/color":

            return updatePageWidgetColor( state, action );
            break;
        case "update/widget/prop/font/size":

            return updateWidgetFontSize( state, action );
            break;
        case "update/page/widget/prop/font/size":

            return updatePageWidgetFontSize( state, action );
            break;
        case "update/widget/prop/other/url":

            return updateWidgetOtherPropsURL( state, action );
            break;

        case "update/page/widget/prop/other/url":

            return updatePageWidgetOtherPropsURL( state, action );
            break;

        case '/update/table/state':
            return updateTableState( state, action );
            break;

        case "remove/widget":
            return removeWidget( state, action );
            break;

        case "remove/page/widget":
            return removePageWidget( state, action );
            break;

        case "update/API/table/state":
            return { ...state, apiTables: [ ...state.apiTables, action.payload.table ] };
            break;

        case "set/current/editting/table":
            return setCurrentEdittingTable( state, action );
            break;

        case "update/current/table/fields/state":
            return updateCurrentTableFieldsState( state, action );
            break;

        case "initializing/API/tables":
            return initializingApiTable(state, action)
            break;

        default:
            return state;
    }
}

const initializingNavBarWidgets = (state, action) => {
    const { widgets } = action.payload;

    const navWidgets = widgets.map( w => {
        let { id, state, type, value } = w;
        return widgetSelector( type, id, value, state );
    });

    return { ...state, navWidgets: navWidgets }
}

const initializingPageWidgets = (state, action) => {
    const { widgets } = action.payload;

    const navWidgets = widgets.map( w => {
        let { id, state, type, value } = w.props;
        return pageWidgetSelector( type, id, value, state );
    });

    return { ...state, pageWidgets: navWidgets }
}

const initializingApiTable = (state, action) => {
    const { tables } = action.payload;

    return { ...state, apiTables: tables }
}

const initializingStaticNavBarWidgets = (state, action) => {
    const { widgets } = action.payload;

    const navWidgets = widgets.map( w => {
        let { id, state, type, value } = w;
        return staticWidgetSelector( type, id, value, state );
    });

    return { ...state, navWidgets: navWidgets }
}

const initializingStaticPageWidgets = (state, action) => {
    const { widgets } = action.payload;

    const navWidgets = widgets.map( w => {
        let { id, state, type, value } = w.props;
        return staticWidgetSelector( type, id, value, state );
    });

    return { ...state, pageWidgets: navWidgets }
}

const initializingBanner = (state, action) => {
    return { ...state, bannerWidgets: action.payload.widgets }
}

const updateBanner = ( state, action ) => {
    return { ...state, bannerWidgets: action.payload.banner }
}

const setCuurrentEdditingObject = (state, action) => {
    let { type, content, id } = action.payload;

    let existedWidgets = state.navWidgets.filter( nw => nw.id === id );
    let widget;
    if( existedWidgets.length > 0 ){
        let widgetObject = existedWidgets[0];

        widget = new Widget( widgetObject.props.type, widgetObject.props.id, widgetObject.props.value )

        widget.setColor( widgetObject.props.state.color );

        widget.setFont( propsFromClassName( widgetObject.props.state.className ? widgetObject.props.state.className:"" ) )
        widget.setSize( widgetObject.props.state.size )
        widget.setOtherProps( "url",  widgetObject.props.state.url )
    }else{
        widget = new Widget(type, id, content);
    }

    return { ...state, currentEdittingObject: widget }
}

const setCuurrentEdditingPageObject = (state, action) => {
    let { type, content, id } = action.payload;

    let existedWidgets = state.pageWidgets.filter( nw => nw.id === id );
    let widget;

    if( existedWidgets.length > 0 ){
        let widgetObject = existedWidgets[0];

        widget = new Widget( widgetObject.props.type, widgetObject.props.id, widgetObject.props.value )

        widget.setColor( widgetObject.props.state.color );

        widget.setFont( propsFromClassName( widgetObject.props.state.className ? widgetObject.props.state.className:"" ) )
        widget.setSize( widgetObject.props.state.size )
        widget.setOtherProps( "url",  widgetObject.props.state.url )
    }else{
        widget = new Widget(type, id, content);
    }

    return { ...state, currentEdittingObject: widget }
}

const updateCurrentEdittingObjectStyling = ( state, action ) => {
    let attr = action.payload.attr;
    let font = {...state.currentEdittingObject.font};

    let styling_widget = state.currentEdittingObject;
    styling_widget.setFont(font);

    let widget_ = state.navWidgets.filter( w => w.id === styling_widget.id )[0];
    let index = state.navWidgets.indexOf( widget_ );

    widget_ = widgetSelector(
        styling_widget.type,
        styling_widget.id,
        styling_widget.content,
        {   ...widget_.props.state,
            className: generateClassName( styling_widget ),
        },
    );
    state.navWidgets[index] = widget_;

    return { ...state, currentEdittingObject: styling_widget, navWidgets: [...state.navWidgets] }
}

const updateCurrentEdittingPageObjectStyling = ( state, action ) => {
    let attr = action.payload.attr;
    let font = {...state.currentEdittingObject.font};

    let styling_widget = state.currentEdittingObject;
    styling_widget.setFont(font);

    let widget_ = state.pageWidgets.filter( w => w.id === styling_widget.id )[0];
    let index = state.pageWidgets.indexOf( widget_ );

    widget_ = widgetSelector(
        styling_widget.type,
        styling_widget.id,
        styling_widget.content,
        {   ...widget_.props.state,
            className: generateClassName( styling_widget ),
        },
    );
    state.pageWidgets[index] = widget_;

    return { ...state, currentEdittingObject: styling_widget, pageWidgets: [...state.pageWidgets] }
}

const updateWidgetContent = ( state, action ) => {
    const { id,  value } = action.payload;
    let widget = state.navWidgets.filter( w => w.id === id )[0];
    let index = state.navWidgets.indexOf( widget );

    let newWidget = widgetSelector( widget.props.type, widget.props.id, value, widget.props.state );

    state.navWidgets[index] = newWidget;

    return { ...state, navWidgets: [...state.navWidgets] }
}

const updatePageWidgetContent = ( state, action ) => {
    const { id,  value } = action.payload;
    let widget = state.pageWidgets.filter( w => w.id === id )[0];
    let index = state.pageWidgets.indexOf( widget );

    let newWidget = widgetSelector( widget.props.type, widget.props.id, value, widget.props.state );

    state.pageWidgets[index] = newWidget;

    return { ...state, pageWidgets: [...state.pageWidgets] }
}

const updateWidgetColor = ( state, action ) => {
    const { id,  value } = action.payload;
    let widget = state.navWidgets.filter( w => w.id === id )[0];
    let index = state.navWidgets.indexOf( widget );

    let newWidget = widgetSelector(
        widget.props.type,
        widget.props.id,
        widget.props.value,
        {   ...widget.props.state,
            color: value,
        }
    );

    state.navWidgets[index] = newWidget;

    return { ...state, navWidgets: [...state.navWidgets] }
}

const updatePageWidgetColor = ( state, action ) => {
    const { id,  value } = action.payload;
    let widget = state.pageWidgets.filter( w => w.id === id )[0];
    let index = state.pageWidgets.indexOf( widget );

    let newWidget = widgetSelector(
        widget.props.type,
        widget.props.id,
        widget.props.value,
        {   ...widget.props.state,
            color: value,
        }
    );

    state.pageWidgets[index] = newWidget;

    return { ...state, pageWidgets: [...state.pageWidgets] }
}

const updateWidgetFontSize = ( state, action ) => {
    const { id,  value } = action.payload;
    let widget = state.navWidgets.filter( w => w.id === id )[0];
    let index = state.navWidgets.indexOf( widget );

    let newWidget = widgetSelector(
        widget.props.type,
        widget.props.id,
        widget.props.value,
        {   ...widget.props.state,
            size: value,
        }
    );

    state.navWidgets[index] = newWidget;

    return { ...state, navWidgets: [...state.navWidgets] }
}

const updatePageWidgetFontSize = ( state, action ) => {
    const { id,  value } = action.payload;
    let widget = state.pageWidgets.filter( w => w.id === id )[0];
    let index = state.pageWidgets.indexOf( widget );

    let newWidget = widgetSelector(
        widget.props.type,
        widget.props.id,
        widget.props.value,
        {   ...widget.props.state,
            size: value,
        }
    );

    state.pageWidgets[index] = newWidget;

    return { ...state, pageWidgets: [...state.pageWidgets] }
}

const updateWidgetOtherPropsURL = ( state, action ) => {
    const { id,  value } = action.payload;
    let widget = state.navWidgets.filter( w => w.id === id )[0];
    let index = state.navWidgets.indexOf( widget );

    let newWidget = widgetSelector(
        widget.props.type,
        widget.props.id,
        widget.props.value,
        {   ...widget.props.state,
            url: value
        }
    );

    state.navWidgets[index] = newWidget;

    return { ...state, navWidgets: [...state.navWidgets] }
}

const updatePageWidgetOtherPropsURL = ( state, action ) => {
    const { id,  value } = action.payload;
    let widget = state.pageWidgets.filter( w => w.id === id )[0];
    let index = state.pageWidgets.indexOf( widget );

    let newWidget = widgetSelector(
        widget.props.type,
        widget.props.id,
        widget.props.value,
        {   ...widget.props.state,
            url: value
        }
    );

    state.pageWidgets[index] = newWidget;

    return { ...state, pageWidgets: [...state.pageWidgets] }
}

const updateTableState = ( state, action ) => {
    const { id, fieldName, width } = action.payload;

    const widgets = state.pageWidgets;
    const widget = widgets.filter( w => w.id === id )[0];
    const index = state.pageWidgets.indexOf( widget );

    const fields = widget.props.state.table.fields;
    const field = fields.filter( f => f.name === fieldName )[0];
    const fieldIndex = fields.indexOf(field);
    field.width = width;
    fields[fieldIndex] = field;
    widget.props.state.table.fields = fields;
    widgets[index] = widget;
    return { ...state, pageWidgets: widgets }
}

const removeWidget = (state, action) => {
    const { id } = action.payload;

    const newNavWidgets = state.navWidgets.filter( w => w.id !== id );

    return { ...state, navWidgets: newNavWidgets, currentEdittingObject: {} }
}

const removePageWidget = (state, action) => {
    const { id } = action.payload;

    const newPageWidgets = state.pageWidgets.filter( w => w.id !== id );

    return { ...state, pageWidgets: newPageWidgets, currentEdittingObject: {} }
}

const setCurrentEdittingTable = (state, action) => {
    const { table, field } = action.payload;

    return { ...state, currentEdittingTable: table, currentEdittingField: field }

}

const updateCurrentTableFieldsState = ( state, action ) => {
    const { table, field, value } = action.payload;

    const table_ = state.apiTables.filter( tb => tb.name === table.name )[0];
    const tableIndex = state.apiTables.indexOf(table_)

    const index = table.fields.indexOf(field);
    table.fields[index].is_hidden = value;
    state.apiTables[tableIndex] = table;
    return { ...state, apiTables: [...state.apiTables], currentEdittingTable: {...table} }
}
