import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';

import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';

import Text from './texts/text';
import Link from './texts/link';

import BlankNav from './widgets/staticNav';

import { auto_id, redirect } from '../../useful';

export default () => {
    const [ api, setApiInfor ] = useState({});

    const [ tables, setTables ] = useState([]);
    const [ relations, setRelations ] = useState([]);
    const [ relationWidgets, setRelationsWidgets ] = useState([]);

    const dispatch = useDispatch()

    const apiTables = useSelector( state => state.apiTables );
    const currentEdittingTable = useSelector( state => state.currentEdittingTable )
    const currentEdittingField = useSelector( state => state.currentEdittingField )
    const unique_string = useSelector( state => state.unique_string );

    useEffect(()=>{
        fetch('/api/tables').then(res => res.json()).then(({ tables }) => {
            setRelations(tables);
        });
    }, [])

    useEffect(() => {

    }, [currentEdittingTable])

    useEffect(() => {

    }, [currentEdittingField])

    const submitNewApi = () => {
        console.log(api)
        console.log(apiTables)

        fetch(`/api/${unique_string}/api/new`, {
            method: "post",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ api: { ...api, id: auto_id(), tables: apiTables }  }),
        }).then( res => res.json() ).then(data => {
            console.log(data)
        })
    }

    const addRelation = () => {
        setRelationsWidgets([...relationWidgets, <RelationSelector setCurrentField={ setCurrentField } updateApiTableState={updateApiTableState} relations = { relations }/>])
    }

    const updateApiTableState = (table) => {
        dispatch({
            type: "update/API/table/state",
            payload: {
                table
            }
        })
    }

    const setCurrentField = ( table, field ) => {
        dispatch({
            type: "set/current/editting/table",
            payload: { table, field }
        })
    }

    const renderFinalTable = () => {

        return(
            <div className="block p-t-0-5 p-r-0-5 p-l-0-5 p-b-0-5 w-fit table-resizble" style={{ overflowX: "auto" }}>
                <table className="w-fit no-border">
                    <thead>
                        <tr>
                        {
                            apiTables.map(table =>
                                <React.StrictMode>
                                    { table.fields.map(
                                        f =>
                                        <React.StrictMode>
                                            { f.is_hidden ?
                                                <th field={ f.name } className="text-theme text-left p-t-0-5 p-l-0-5 p-b-0-5 " style={ {display: "table-cell", width: `${f.width}px` } }><span className="th-label" onClick={ () => { setCurrentField( table, f ) } }>{ f.name }</span></th>
                                            : null}
                                        </React.StrictMode>
                                    ) }
                                </React.StrictMode>
                            )
                    }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {
                                apiTables.map(table =>
                                    <React.StrictMode>
                                    { table.fields.map(
                                        f =>
                                        <React.StrictMode>
                                            { f.is_hidden ?
                                                <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">{ "Văn mẫu nè" }</td>
                                            : null}
                                        </React.StrictMode>
                                    ) }
                                    </React.StrictMode>
                                )
                            }
                        </tr>

                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div>
            <div className="horizon-nav-bar flex flex-no-wrap ">
                <span onClick={ () => { redirect("/ml-admin/") } } className="text m-r-1">Trang chủ</span>
                <span onClick={ () => { redirect("/ml-admin/database") } } className="text m-r-1">Cơ sở dữ liệu</span>
                <span onClick={ () => { redirect("/ml-admin/pages") } } className="text m-r-1">Thiết kế</span>
            </div>

            <div className="flex m-t-2 flex-wrap">
                <div className="w-80 flex flex-no-wrap flex-middle m-t-1">
                    <span className="block p-r-1 text-little-bigger w-40">Tiêu đề</span>
                    <input onChange={ (e) =>{ setApiInfor( {...api, title: e.target.value } ) } } value={ api.title } className="input w-60 text-little-bigger border-bottom-pale text-center w-fill"/>
                </div>
                <div className="w-80 flex flex-no-wrap flex-middle m-t-1">
                    <span className="block p-r-1 text-little-bigger w-40">Ghi chú</span>
                    <textarea onChange={ (e) =>{ setApiInfor( {...api, note: e.target.value } ) } } value={ api.note }
                    className="input w-60 text-little-bigger border-bottom-pale text-center" spellCheck="false" style={{ outline: "none" }}/>
                </div>
                <div className="flex flex-end ml-auto m-r-1 flex-middle">
                    <button onClick={ submitNewApi } className="button-theme hover text-little-bigger p-t-0-5 p-r-0-5  p-b-0-5  p-l-0-5">Xuất bản</button>
                </div>
            </div>

            <hr className="block border-bold" style={{ margin: 0 }}/>
            <div className="flex flex-no-wrap h-fit-screen">
                <div className="w-60">
                    { renderFinalTable() }
                </div>
                <div className="w-20 border-left-pale" onClick={ renderFinalTable }>
                {
                    currentEdittingTable.name ?
                    <div className="m-t-1">
                        <span className="text-little-bigger block text-center">{ currentEdittingTable.name }</span>

                        { currentEdittingTable.fields.map( field =>
                            <div className="w-50 p-t-0-5 p-l-0-5">
                                <div className="w-fit flex flex-no-wrap">
                                    <div className="flex flex-middle">
                                        <input type="checkbox" checked={ field.is_hidden } onChange={ () => {
                                            dispatch({
                                                type: "update/current/table/fields/state",
                                                payload: {
                                                    table: currentEdittingTable,
                                                    field,
                                                    value: !field.is_hidden
                                                }
                                            })
                                        } }/>
                                    </div>
                                    <div className="flex flex-middle">
                                        <span>{ field.name }</span>
                                    </div>
                                </div>
                            </div>
                        ) }

                    </div>
                    : null

                }

                {
                    currentEdittingField.name ?
                    <div className="m-t-2">
                        <span className="text-little-bigger">{ currentEdittingField.name } of { currentEdittingTable.name }</span>
                    </div>
                    : null
                }
                </div>
                <div className="w-20 border-left-pale">
                    { relationWidgets.map( rel => rel ) }
                    <button onClick={ addRelation } className="button-theme block w-80 m-auto p-t-0-5 p-b-0-5 p-l-1 p-r-1 m-t-1">Thêm quan hệ</button>
                </div>
            </div>
        </div>
    )
}

const RelationSelector = (props) => {
    const { relations, updateApiTableState, setCurrentField } = props;
    const [ table, setTable ] = useState([]);
    const dispatch = useDispatch()
    const [ innerDrop, setInnerDrop ] = useState(false);
    const [ innerHeight, setInnerHeight ] = useState(0);


    const innerDropdownTrigger = () => {
        setInnerHeight( innerDrop? 0: 200 )
        setInnerDrop( !innerDrop )
    }

    const onClickHandler = (table) => {
        setTable(table);
        updateApiTableState(table)
        innerDropdownTrigger();
        dispatch({
            type: "set/current/editting/table",
            payload: { table, field: {} }
        })
    }

    return(
        <div>
          { !table.name ?
            <div className="w-80 m-auto m-t-1">
                <div className="relative index-3">
                    <span className="block w-fit border-bottom-pale text-left p-b-0-5">{  table.name? table.name: "Chọn bảng"  }</span>
                    { innerDrop ?
                        <React.StrictMode>
                            <img className="icon absolute drop-icon" src = "/icon/drop.png" onClick={ innerDropdownTrigger }/>
                        </React.StrictMode>
                        :
                        <React.StrictMode>
                            <img className="icon absolute drop-icon" src = "/icon/undrop.png" onClick={ innerDropdownTrigger }/>
                        </React.StrictMode>
                     }
                     <div className="absolute r-0 t-100 no-over-flow index-5" style={{ height: `${innerHeight}px` }}>
                        <div className="drop-container h-200 w-fit scroll-y" >
                        { relations.map( (table, index) =>
                            <div key={index} className="p-t-0-5 p-l-1 p-b-0-5 drop-item hover border-bottom-pale flex flex-no-wrap bg-white" onClick={ ()=> onClickHandler(table) }>
                                <span className="block w-50">{table.name}</span>
                            </div>
                        )}
                        </div>
                     </div>
                </div>
            </div>
            :
            <div className="w-80 m-auto m-t-1">
                <span className="block w-fit border-bottom-pale text-left p-b-0-5" onClick={ () => { setCurrentField(table, {}) }  }>{  table.name? table.name: "Chọn bảng"  }</span>
            </div>
            }
        </div>
    )
}
