import { useEffect, useState } from 'react'

import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';

import Text from './texts/text';
import { auto_id } from '../../useful';

export default () => {

    const [ widgets, setWidgets ] = useState([]);

    useEffect( ()=> {
        $('#zone').droppable({
            drop: function(e, ui){
                console.log(ui)
            }
        })
    } , [])

    const renderWidget = (w, key) => {
        return <div key={key}>{w}</div>;
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
                    <button className="button-theme hover text-little-bigger p-t-0-5 p-r-0-5  p-b-0-5  p-l-0-5" id="text" onClick={ ()=>{ setWidgets([...widgets, {widget: <Text />, key: auto_id()}]) } }>Text</button>
                </div>
                <div className="block border-bold h-fit-screen w-50 m-t-2 m-l-0-5 no-scroll-x" id="zone">
                    { widgets.map(w => renderWidget(w.widget, w.key)) }
                </div>
                <div className="block h-fit-screen w-25 m-t-2 m-l-0-5">
                </div>

            </div>
        </div>
    )
}
