import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';

import Text from './texts/text';
import Link from './texts/link';
import Image from './widgets/image';
import BlankNav from './widgets/blankNav';
import BlankBanner from './widgets/staticBanner';

import { auto_id, redirect } from '../../useful';

export default () => {

    const [ widgets, setWidgets ] = useState([]);

    const  currentEdittingObject = useSelector(state => state.currentEdittingObject)
    const [ color, setColor ] = useState(currentEdittingObject.color);
    const [ content, setContent ] = useState( currentEdittingObject.content )
    const [ size, setSize ] = useState(currentEdittingObject.size);

    const [ linkURL, setLinkURL ] = useState("");

    const [ currentStyling, setCurrentStyling ] = useState("");
    const dispatch = useDispatch();

    const navWidgets = useSelector( state => state.navWidgets );
    const unique_string = useSelector( state => state.unique_string )

    useEffect( ()=> {
        $('#zone').droppable({
            drop: function(e, ui){

            }
        })

        fetch(`/api/${unique_string}/navbar`).then( res => res.json() )
        .then( ({ widgets }) => {
            dispatch({
                type: 'initializing/navbar/widgets',
                payload: { widgets }
            })
        })
    } , [])

    useEffect(() => {
        setColor(currentEdittingObject.color);
        setContent(currentEdittingObject.content);
        setSize(currentEdittingObject.size);
        if( currentEdittingObject.type === "link" ){
            setLinkURL( currentEdittingObject.otherProps.url )
        }
    }, [ currentEdittingObject ])

    const renderWidget = (w, key) => {
        return <div key={key}>{w}</div>;
    }

    const stylingCurrentObject = ({ attr })=> {
        let font  = currentEdittingObject.font;
        font[attr] = !font[attr];
        currentEdittingObject.setFont(font);
        let className = generateClassName(currentEdittingObject);
        setCurrentStyling(className);

        dispatch({
            type: "update/current/editting/object/styling",
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
            type: "update/widget/prop/color",
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
            type: "update/widget/prop/font/size",
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
            type: "update/widget/prop/content",
            payload: {
                id: currentEdittingObject.id,
                value: cnt,
            }
        })
        setContent( cnt );
    }

    const changeLinkURL = (e) => {
        const link = e.target.value;
        currentEdittingObject.setOtherProps( "url", link );
        dispatch({
            type: "update/widget/prop/other/url",
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
                    type: "update/widget/prop/content",
                    payload: {
                        id: currentEdittingObject.id,
                        value: { ...content, name: file.name, src: e.target.result },
                    }
                })
            }
        }
    }

     const publishRequest = () => {
         fetch(`/api/${unique_string}/navbar/update`, {
             method: 'post',
             headers: {
                 "content-type": "application/json",
             },
             body: JSON.stringify({ widgets: navWidgets.map( w => { return w.props } ) })
         }).then( res => res.json() )
         .then( data => {
             alert( "Successfully publish navbar" )
         })
     }

     const removeCurrentEdittingObject = () => {
         dispatch({
             type: "remove/widget",
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
            <div className="flex flex-no-wrap">
                <span className="text-little-bigger block p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5 m-r-1 m-t-1">Chỉnh sửa menu chính</span>
                <button onClick={ publishRequest } className="button-theme block ml-auto p-t-0-5 p-l-0-5 p-r-0-5 p-b-0-5 m-r-1 m-t-1">Xuất bản</button>
            </div>
            <hr className="block border-bold"/>
            <div className="flex flex-no-wrap">
                <div className="block h-fit-screen w-25 m-t-2 m-l-0-5">
                    <h1 className="">Văn bản</h1>
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
                        onClick = {
                            ()=>{
                                const id = auto_id();
                                setWidgets([...widgets, { widget: <Link id={id}/>, key: id }])
                            }
                        }>Đường dẫn</button>

                    {/*    <h1 className="">Khối</h1>
                     <button className="button-theme hover text-little-bigger p-t-0-5 p-r-0-5  p-b-0-5  p-l-0-5 m-r-1"
                        id="text"
                        onClick= {
                            ()=>{
                                const id = auto_id();
                                setWidgets([...widgets, { widget: <Image id={id}/>, key: id }])
                            }
                        }>Hình ảnh</button> */}
                </div>
                <div className="block border-bold h-fit-screen w-50 m-t-2 m-l-0-5 no-scroll-x relative" id="zone">
                    <BlankBanner />
                    <BlankNav />
                    { widgets.map(w => renderWidget(w.widget, w.key)) }
                </div>
                <div className="block h-fit-screen w-25 m-t-2 m-l-0-5">
                    { currentEdittingObject.type ?
                        <React.StrictMode>
                        { currentEdittingObject.type !="image" ?

                            <div>
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
