import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';

import Text from './texts/text';
import Link from './texts/link';
import Table from './widgets/table';

import BlankNav from './widgets/staticNav';
import BlankBanner from './widgets/staticBanner';

import { auto_id, redirect } from '../../useful';
import { widgetSelector, pageWidgetSelector } from './widgetSelector';


export default () => {
    const { page_id } = useParams();

    const [ page, setPageInfor ] = useState({});

    const [ widgets, setWidgets ] = useState([]);

    const  currentEdittingObject = useSelector(state => state.currentEdittingObject)
    const [ color, setColor ] = useState(currentEdittingObject.color);
    const [ content, setContent ] = useState( currentEdittingObject.content )
    const [ size, setSize ] = useState(currentEdittingObject.size);
    const [ currentStyling, setCurrentStyling ] = useState("");
    const [ linkURL, setLinkURL ] = useState("");

    const dispatch = useDispatch();
    const unique_string = useSelector( state => state.unique_string )
    const pageWidgets = useSelector( state => state.pageWidgets );

    const setPageWidgets = ( widgets ) =>{
        dispatch({
            type: "widgets/page/update/state",
            payload: { widgets },
        })
    }

    useEffect( ()=> {

        fetch(`/api/${unique_string}/navbar`).then( res => res.json() )
        .then( ({ widgets }) => {

            dispatch({
                type: 'initializing/static/navbar/widgets',
                payload: { widgets }
            })
        })

        fetch(`/api/${unique_string}/page/${page_id}`).then( res => res.json() )
        .then( (data) => {
            setPageInfor(data.page);

            dispatch({
                type: 'initializing/page/widgets',
                payload: { widgets: data.page ? data.page.widgets : [] }
            })
        })

        $('.link-disabled').click( (e) => {
            e.preventDefault()
        } )
    } , []);

    $('#zone').droppable({
        drop: function(e, ui){
            const id = $(ui.draggable[0]).attr("id");

            const type = $(`#${id}`).attr("widget-type");
            let value = $(`#${id}`).attr("value");
            if( type ==="image" ){
                value = JSON.parse(value);
                if( !value.src ){
                    value.src="/assets/default.jpg"
                }
            }
            setPageWidgets([ ...pageWidgets, pageWidgetSelector(  type, id, value, { size: 14, url: "" }) ]);
            $(`#${id}`).remove()

        }
    })

    const setPageWidgetFromOutsideZone = ( widget ) => {
        setPageWidgets([ ...pageWidgets, widget ]);
    }


    useEffect(() => {
        setColor(currentEdittingObject.color);
        setContent(currentEdittingObject.content);
        setSize(currentEdittingObject.size);

        if( currentEdittingObject.type === "table" ){
            const { id } = currentEdittingObject;
            $(`#${id} th`).resizable({
                grid: [1, 10000],
                resize: (e, ui) => {
                    const fieldName = $(ui.element[0]).attr('field');
                    const { width } = ui.size;

                    dispatch({
                        type: '/update/table/state',
                        payload: {
                            id, fieldName, width
                        }
                    })
                }
            });
        }
    }, [currentEdittingObject])

    const renderWidget = (w, key) => {
        return <div key={key}>{w}</div>;
    }
    const renderPageWidget = (w) => {
        return w;
    };

    const stylingCurrentObject = ({ attr })=> {
        let font  = currentEdittingObject.font;
        font[attr] = !font[attr];
        currentEdittingObject.setFont(font);
        let className = generateClassName(currentEdittingObject);
        setCurrentStyling(className);

        dispatch({
            type: "update/current/editting/page/object/styling",
            payload: { attr }
        })
    }

    const generateClassName = ( object ) => {

        let className = "";
        if( object.font.is_bold ){
            className +=" bold";
        }
        if( object.font.is_italic ){
            className += " italic";
        }
        if( object.font.is_underline ){
            className+= " underline";
        }
        // console.log( className )
        return className;
    }

    const setCurrentStylingColor = (e) => {
        const _color = e.target.value;
        currentEdittingObject.setColor( _color )
        dispatch({
            type: "update/page/widget/prop/color",
            payload: {
                id: currentEdittingObject.id,
                value: _color,
            }
        })

    }

    const changeFontSize = (e) => {
        const size = e.target.value;
        currentEdittingObject.setSize( size )
        dispatch({
            type: "update/page/widget/prop/font/size",
            payload: {
                id: currentEdittingObject.id,
                value: size,
            }
        })
        setSize( size );
    }

    const changeContent = (e) => {
        const cnt = e.target.value;
        currentEdittingObject.setContent( cnt );
        dispatch({
            type: "update/page/widget/prop/content",
            payload: {
                id: currentEdittingObject.id,
                value: cnt,
            }
        })
        setContent( cnt );
    }

    const submitNewPage = () => {
        // console.log(pageWidgets)

        fetch(`/api/${ unique_string }/page/update`, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ page: {...page, id: page.id, widgets: pageWidgets.map( w => { return {...w, cpn: null} } )} }),
        }).then(res => res.json()).then(data => {
            alert(`Successfully add page ${page.title}` )
        })
    }

    const changeLinkURL = (e) => {
        const link = e.target.value;
        currentEdittingObject.setOtherProps( "url", link );
        dispatch({
            type: "update/page/widget/prop/other/url",
            payload: {
                id: currentEdittingObject.id,
                value: link,
            }
        })
        setLinkURL( link );
    }

    const changeImageContent = ( e ) => {
        const files = e.target.files;
        if( files ){
            const file = files[0];

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (e) => {
                setContent({ ...content, name: file.name, src: e.target.result });

                dispatch({
                    type: "update/page/widget/prop/content",
                    payload: {
                        id: currentEdittingObject.id,
                        value: { ...content, name: file.name, src: e.target.result },
                    }
                })
            }
        }
    }

    const removeCurrentEdittingObject = () => {
         dispatch({
             type: "remove/page/widget",
             payload: {
                 id: currentEdittingObject.id,
             }
         })
     }

    return (
        <div>
            <div className="horizon-nav-bar flex flex-no-wrap ">
                <span onClick={ () => { redirect("/ml-admin/") } } className="text m-r-1">Trang chủ</span>
                <span onClick={ () => { redirect("/ml-admin/database") } } className="text m-r-1">Cơ sở dữ liệu</span>
                <span onClick={ () => { redirect("/ml-admin/pages") } } className="text m-r-1">Thiết kế</span>
            </div>

            <div className="flex m-t-2">
                <div className="w-40 flex flex-no-wrap flex-middle">
                    <span className="block p-r-1 text-little-bigger">Tiêu đề</span>
                    <input onChange={ (e) =>{ setPageInfor( {...page, title: e.target.value } ) } } value={ page ? page.title : "" } className="input w-60 text-little-bigger border-bottom-pale text-center w-fill"/>
                </div>
                <div className="w-40 flex flex-no-wrap flex-middle">
                    <span className="block p-r-1 text-little-bigger">Đường dẫn</span>
                    <span onChange={ (e) =>{ setPageInfor( {...page, url: e.target.value } ) } } className="input w-60 text-little-bigger border-bottom-pale text-center w-fill" spellCheck="false">{ page ? page.url: "/duong/dan/ne" }</span>
                </div>
                <div className="flex flex-end ml-auto m-r-1 flex-middle">
                    <button onClick={ submitNewPage } className="button-theme hover text-little-bigger p-t-0-5 p-r-0-5  p-b-0-5  p-l-0-5">Xuất bản</button>
                </div>
            </div>

            <hr className="block border-bold"/>
            <div className="flex flex-no-wrap">
                <div className="block h-fit-screen w-25 m-t-2 m-l-0-5">
                    <h1 className="block">Văn bản</h1>
                    <button className="button-theme hover text-little-bigger p-t-0-5 p-r-0-5  p-b-0-5  p-l-0-5 m-r-1"
                        id="text"
                        onClick= {
                            ()=>{
                                const id = auto_id();
                                setWidgets([...widgets, {widget: <Text id={id}/>, key: id}])
                            }
                        }>Văn bản</button>
                    <button className="button-theme hover text-little-bigger p-t-0-5 p-r-0-5  p-b-0-5  p-l-0-5 m-r-1"
                        id="text"
                        onClick= {
                            ()=>{
                                const id = auto_id();
                                setWidgets([...widgets, { widget: <Link id={id}/>, key: id }])
                            }
                        }>Đường dẫn</button>

                    <h1 className="block">Khối</h1>
                    <button className="button-theme hover text-little-bigger p-t-0-5 p-r-0-5  p-b-0-5  p-l-0-5 m-r-1"
                        id="text"
                        onClick= {
                            ()=>{
                                const id = auto_id();
                                setWidgets([...widgets, {widget: <Table func={setPageWidgetFromOutsideZone} id={id}/>, key: id}])
                            }
                        }>Bảng</button>
                </div>
                <div className="block border-bold h-fit-screen w-50 m-t-2 m-l-0-5 no-scroll-x relative" id="zone">
                    <BlankBanner/>
                    <BlankNav width={200}/>
                    <div className="absolute t-0 l-0">{ widgets.map(w => renderWidget(w.widget, w.key)) }</div>
                    <div style={{ paddingLeft: "200px" }}>
                        { pageWidgets && pageWidgets.map( w =>  renderPageWidget( w.cpn ) ) }
                    </div>
                </div>
                <div className="block h-fit-screen w-25 m-t-2 m-l-0-5">
                { currentEdittingObject.type ?
                    <React.StrictMode>
                    { currentEdittingObject.type !="image" ?

                        <div>
                        { currentEdittingObject.type !="table"?
                            <React.StrictMode>
                                <div className="w-80 m-auto">
                                    <label>Nội dung</label>
                                    <input className={"input w-fit text-little-bigger border-bottom-pale text-center w-fill " } spellCheck="false" value={ content } onChange={ changeContent }/>
                                </div>
                                <div className="w-80 flex flex-no-wrap flex-end m-auto m-t-1">
                                    <input type="color" style={{ fontSize: "1.25em", width: "2em", height: "2em", border: "none", outline: "none" }} onChange={ setCurrentStylingColor } value={ color ? color : "#000" } />
                                    <button onClick={ ()=>{ stylingCurrentObject( { attr: "is_bold" } ) } } className="m-l-1" style={{ fontSize: "1.25em", width: "2em", height: "2em" }}><b>B</b></button>
                                    <button onClick={ ()=>{ stylingCurrentObject( { attr: "is_italic" } ) } } className="m-l-1" style={{ fontSize: "1.25em", width: "2em", height: "2em" }}><i>I</i></button>
                                    <button onClick={ ()=>{ stylingCurrentObject( { attr: "is_underline"} ) } } className="m-l-1" style={{ fontSize: "1.25em", width: "2em", height: "2em" }}><u>U</u></button>
                                </div>
                                <div className=" w-80 flex flex-no-wrap m-auto m-t-1">
                                    <span className="block w-50">Kích cở</span>
                                    <input className="input-outline w-50 text-center" type="number" value={size} onChange={ changeFontSize }/>
                                </div>

                                { currentEdittingObject.type === "link" ?
                                    <div className="w-80 m-auto m-t-2">
                                        <label>Đường dẫn liên kết</label>
                                        <input className={"input w-fit text-little-bigger border-bottom-pale text-center w-fill " } spellCheck="false" value={ linkURL } onChange={ changeLinkURL }/>
                                    </div>
                                    : null
                                }
                            </React.StrictMode>
                            :
                            <div className="w-80 m-auto">
                                <h1>Table config</h1>
                            </div>
                        }

                        </div>
                        :
                        <div className="w-80 m-auto">
                            <label>Tệp</label>
                                <div>
                                { content ?
                                    <div>
                                        <input className={"input w-fit text-little-bigger border-bottom-pale text-center w-fill " } spellCheck="false" value={ content.name }
                                        onClick={ () => { $('#hidden-file-input').click(); } }/>
                                    </div>
                                    :
                                    <div>
                                        <input className={"input w-fit text-little-bigger border-bottom-pale text-center w-fill " } spellCheck="false"
                                        onClick={ () => { $('#hidden-file-input').click(); } }/>
                                    </div>
                                }
                                    <input className="hidden" id="hidden-file-input" type="file" onChange={ changeImageContent }/>
                                </div>
                        </div>
                    }
                        <div className="w-80 flex flex-no-wrap flex-end m-auto m-t-1">
                            <button onClick={ ()=>{ removeCurrentEdittingObject() } } className="m-l-1 button-red">Xóa</button>
                        </div>
                    </React.StrictMode>
                    : null
                }

                </div>

            </div>
        </div>
    )
}
