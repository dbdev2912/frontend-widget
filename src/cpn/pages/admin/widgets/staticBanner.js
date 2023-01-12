import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';

export default () => {

    const dispatch = useDispatch()
    const unique_string = useSelector(state => state.unique_string);
    const bannerWidgets = useSelector(state => state.bannerWidgets);

    const [inputState, setInputState] = useState(false);
    const [cpnName, setCpnName] = useState("");
    useEffect(() => {
        fetch(`/api/${unique_string}/banner`).then(res => res.json()).then( data => {
            dispatch({
                type: "initializing/banner",
                payload: { ...data }
            })
            setCpnName(data.widgets.cpnName)
        })
    }, [])

    return (
        <div className="sticky t-0 l-0 bg-theme p-t-0-5 p-l-0-5 p-b-0-5 index-10">
            <div className="flex flex-no-wrap">
                <div className="flex flex-middle">
                    <img className="block" style={{ height: "3em" }} src={bannerWidgets.img ? bannerWidgets.img: "/assets/default.jpg"}/>

                </div>
                <div className="block m-l-1 w-fill flex flex-middle">
                        <span className="text-medium">{bannerWidgets.cpnName ? bannerWidgets.cpnName : "Untitled"}</span>
                </div>
                <div className="block ml-auto flex flex-middle m-r-2">
                    <img src="/icon/signout.png" className="block" style={{width: "2.5em"}}/>
                </div>
            </div>
        </div>
    )
}
