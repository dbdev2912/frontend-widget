import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';

import Text from './texts/text';
import Link from './texts/link';

import BlankNav from './widgets/blankNav';

import { auto_id } from '../../useful';

export default () => {
    const [ widgets, setWidgets ] = useState([]);

    const  currentEdittingObject = useSelector(state => state.currentEdittingObject)
    const [ color, setColor ] = useState(currentEdittingObject.color);
    const [ content, setContent ] = useState( currentEdittingObject.content )
    const [ size, setSize ] = useState(currentEdittingObject.size);
    const [ currentStyling, setCurrentStyling ] = useState("");

    const dispatch = useDispatch();



    useEffect( ()=> {
        $('#zone').droppable({
            drop: function(e, ui){

            }
        })
    } , [])

    useEffect(() => {
        setColor(currentEdittingObject.color);
        setContent(currentEdittingObject.content);
        setSize(currentEdittingObject.size);

    }, [currentEdittingObject])

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
        setColor( _color )
    }

    const changeFontSize = (e) => {
        const size = e.target.value;
        currentEdittingObject.setSize( size )
        setSize( size );
    }

    const changeContent = (e) => {
        const cnt = e.target.value;
        currentEdittingObject.setContent( cnt );
        setContent( cnt );
    }

    return (
        <div>
            <div className="horizon-nav-bar flex flex-no-wrap ">
                <span className="text m-r-1">Trang chủ</span>
                <span className="text m-r-1">Cơ sở dữ liệu</span>
                <span className="text m-r-1">Thiết kế</span>
            </div>

            <div className="flex m-t-2">
                <div className="w-40 flex flex-no-wrap flex-middle">
                    <span className="block p-r-1 text-little-bigger">Tiêu đề</span>
                    <input className="input w-60 text-little-bigger border-bottom-pale text-center w-fill"/>
                </div>
                <div className="w-40 flex flex-no-wrap flex-middle">
                    <span className="block p-r-1 text-little-bigger">Đường dẫn</span>
                    <input className="input w-60 text-little-bigger border-bottom-pale text-center w-fill" spellCheck="false"/>
                </div>
                <div className="flex flex-end ml-auto m-r-1 flex-middle">
                    <button className="button-theme hover text-little-bigger p-t-0-5 p-r-0-5  p-b-0-5  p-l-0-5">Xuất bản</button>
                </div>
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
                        onClick= {
                            ()=>{
                                const id = auto_id();
                                setWidgets([...widgets, { widget: <Link id={id}/>, key: id }])
                            }
                        }>Đường dẫn</button>

                    <h1 className="">Khung</h1>
                    <button className="button-theme hover text-little-bigger p-t-0-5 p-r-0-5  p-b-0-5  p-l-0-5 m-r-1"
                        id="text"
                        onClick= {
                            ()=>{
                                const id = auto_id();
                                setWidgets([...widgets, { widget: <Link id={id}/>, key: id }])
                            }
                        }>Hình ảnh</button>
                    <button className="button-theme hover text-little-bigger p-t-0-5 p-r-0-5  p-b-0-5  p-l-0-5 m-r-1"
                        id="text"
                        onClick= {
                            ()=>{
                                const id = auto_id();
                                setWidgets([...widgets, { widget: <Link id={id}/>, key: id }])
                            }
                        }>Bảng</button>
                </div>
                <div className="block border-bold h-fit-screen w-50 m-t-2 m-l-0-5 no-scroll-x relative" id="zone">
                    <BlankNav />
                    { widgets.map(w => renderWidget(w.widget, w.key)) }
                </div>
                <div className="block h-fit-screen w-25 m-t-2 m-l-0-5">
                    { currentEdittingObject.type ?
                        <div>
                            <div className="w-80 m-auto">
                                <label>Nội dung</label>
                                <input className={"input w-fit text-little-bigger border-bottom-pale text-center w-fill " + currentStyling } spellCheck="false" style={{ color: `${color}`, fontSize: `${size}px` }} value={ content } onChange={ changeContent }/>
                            </div>
                            <div className="w-80 flex flex-no-wrap flex-end m-auto m-t-1">
                                <input type="color" style={{ fontSize: "1.25em", width: "2em", height: "2em", border: "none", outline: "none" }} onChange={ setCurrentStylingColor }/>
                                <button onClick={ ()=>{ stylingCurrentObject( { attr: "is_bold" } ) } } className="m-l-1" style={{ fontSize: "1.25em", width: "2em", height: "2em" }}><b>B</b></button>
                                <button onClick={ ()=>{ stylingCurrentObject( { attr: "is_italic" } ) } } className="m-l-1" style={{ fontSize: "1.25em", width: "2em", height: "2em" }}><i>I</i></button>
                                <button onClick={ ()=>{ stylingCurrentObject( { attr: "is_underline"} ) } } className="m-l-1" style={{ fontSize: "1.25em", width: "2em", height: "2em" }}><u>U</u></button>
                            </div>
                            <div className=" w-80 flex flex-no-wrap m-auto m-t-1">
                                <span className="block w-50">Kích cở</span>
                                <input className="input-outline w-50 text-center" type="number" value={size} onChange={ changeFontSize }/>
                            </div>
                        </div>
                        : null
                    }

                </div>

            </div>
        </div>
    )
}
