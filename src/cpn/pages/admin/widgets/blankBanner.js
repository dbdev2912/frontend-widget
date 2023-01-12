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

    const changeImage = ( e ) => {
        const files = e.target.files;
        if( files ){
            const file = files[0];

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (e) => {

                dispatch({
                    type: "update/banner",
                    payload: {
                        banner: { ...bannerWidgets, img: e.target.result }
                    }
                })
            }
        }
    }

    const triggerEnter = (e) => {
        if( e.keyCode === 13 ){

            dispatch({
                type: "update/banner",
                payload: {
                    banner: { ...bannerWidgets, cpnName: cpnName }
                }
            })
            setInputState( !inputState )
        }
    }

    const updateBanner = (e) => {
        setCpnName(e.target.value);
    }


    return (
        <div className="sticky t-0 l-0 bg-theme p-t-0-5 p-l-0-5 p-b-0-5 index-10">
            <div className="flex flex-no-wrap">
                <div className="flex flex-middle">
                    <img className="block" style={{ height: "3em" }} src={bannerWidgets.img ? bannerWidgets.img: "/assets/default.jpg"} onClick={ () => { $('#hidden-banner-input').click() } }/>
                    <input type="file" className="hidden" id="hidden-banner-input" onChange={ changeImage }/>
                </div>
                <div className="block m-l-1 w-fill flex flex-middle">
                    { inputState ?
                        <input type="text" className="input w-fit text-little-bigger border-bottom-pale" value={ cpnName } onKeyUp = { triggerEnter } onChange={ updateBanner }/>
                         :
                        <span className="text-medium" onClick={ () => { setInputState( !inputState ) } }>{bannerWidgets.cpnName ? bannerWidgets.cpnName : "Untitled"}</span>
                     }

                </div>
            </div>
        </div>
    )
}
