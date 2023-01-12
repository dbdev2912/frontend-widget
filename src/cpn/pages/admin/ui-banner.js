import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';

import { auto_id, redirect } from '../../useful';

import BlankNav from './widgets/staticNav';
import Banner from './widgets/blankBanner';



export default () => {
    const dispatch = useDispatch();
    const unique_string = useSelector( state => state.unique_string )
    const bannerWidgets = useSelector( state => state.bannerWidgets );


    useEffect( ()=> {

        fetch(`/api/${unique_string}/navbar`).then( res => res.json() )
        .then( ({ widgets }) => {

            dispatch({
                type: 'initializing/static/navbar/widgets',
                payload: { widgets }
            })
        })

    } , []);
    const publishRequest = () => {
        fetch(`/api/${unique_string}/banner/update`, {
            method: 'post',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ widgets: bannerWidgets })
        }).then( res => res.json() )
        .then( data => {
            alert( "Successfully publish navbar" )
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
                <div className="block h-fit-screen w-25 m-t-2 m-l-0-5" />

                <div className="block border-bold h-fit-screen w-50 m-t-2 m-l-0-5 no-scroll-x relative" id="zone">
                    <Banner />
                    <BlankNav width={200}/>
                </div>
                <div className="block h-fit-screen w-25 m-t-2 m-l-0-5">

                </div>

            </div>
        </div>
    )
}
