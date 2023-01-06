import React, { useState, useEffect } from 'react';
import { dateFormat, dateStringFormat, auto_id } from '../../useful';
import Field from '../../field';

export default () => {
    let form = false;
    const [ relations, setRelations ] = useState([
        // { name: "Accounts", keys: ["username"], create_on: "Dec 26 2022" },
    ]);

    const defaultField = {
        name: "New field", is_primary: false, is_sort_index: false, is_search_index: false, is_visible: false,
        data_type: "Not selected yet",
    }

    const [ current, setCurrent ] = useState({});

    const [ editButton, setEditButton ] = useState(false)

    useEffect(()=> {
        fetch('/api/tables').then( res => res.json() ).then((data) => {
            const { tables } = data;
            setRelations( tables ? tables: [] );
            setCurrent( tables.length > 0 ? tables[0] : {} );
        });
    }, [])


    const setRelation = (index) => {
        /* Database async query */
        setCurrent( relations[index] )

    }

    const submitNewRelation = () => {
        const newRelationName = "New relation";

        if( newRelationName ){
            fetch('/api/models/new/table', {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ name: newRelationName })
            }).then(res => res.json()).then( data => {
                const { id } = data;
                const date = new Date();
                setRelations([...relations,
                    { id, name: "New Relation", keys: [], fields: [], foreign_keys: [], create_on: date.toString() }
                ]);
            })
        }
    }

    const editOrStatic = () => {
        setEditButton( !editButton )
        if( editButton )
            saveState();
    }

    const addField = () => {
        setCurrent( {...current, fields: [...current.fields, {...defaultField, id: auto_id() }]})
    }

    const updateFieldAtIndexOf = (index, field) => {
        const newFieldsState = current.fields;
        newFieldsState[index] = field;
        let keys = [];
        let foreign_keys = [];
        for( let i = 0 ; i < current.fields.length; i++ ){
            let field = current.fields[i];
            if( field.is_primary ){
                keys.push( field.name );
            }

            if( field.foreign_key )
                foreign_keys.push( field.foreign_key );
        }
        setCurrent({...current, fields: newFieldsState, keys: keys, foreign_keys: foreign_keys })
        saveState();
    }


    const saveState = () => {
        const relation = relations.filter( rel => rel.id === current.id )[0];
        const index = relations.indexOf( relation );
        relations[index] = current;
        console.log(current)
        setRelations(relations);
        saveRequest();
    }

    const saveRequest = () => {

        fetch('/api/models/modify/table', {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ table: current }),
        }).then( res => res.json() ).then( (data) => {

        })
    }

    const deleteRelation = (id) => {
        const newRels = relations.filter( r => r.id !== id );

        fetch('/api/models/delete/table', {
            method: "post",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({ id })
        }).then( res=> res.json() ).then(data => {
        })
        setRelations( newRels );
    }

    return(
        <div className="full-screen flex flex-no-wrap">
            <div className="flex flex-no-wrap w-fit p-t-0-5 p-b-0-5 m-t-2 box-fit-nav-bar">
                <div className="w-50">
                    <div className="flex w-100 flex-end">
                        <button className="button-theme block p-t-0-5 p-l-0.5 p-r-0-5 p-b-0-5 m-r-1"  onClick={ submitNewRelation }>Add new</button>
                    </div>
                    <div className="table-list">
                        <table className="w-fit no-border">
                            <thead>
                                <tr>
                                    <th className="text-theme text-left p-t-0-5 p-l-0-5 p-b-0-5" style={ {display: "table-cell"} }>Name</th>
                                    <th className="text-theme text-left p-t-0-5 p-l-0-5 p-b-0-5" style={ {display: "table-cell"} }>Keys</th>
                                    <th className="text-theme text-left p-t-0-5 p-l-0-5 p-b-0-5" style={ {display: "table-cell"} }>Create on</th>
                                </tr>
                            </thead>
                            <tbody id="relations">
                                {relations.map( (r, index) =>
                                    <tr className={r.id === current.id ? "hover relative theme-hightlight": "hover relative"} key={r.id} onClick={ ()=> { setRelation(index) } }>
                                        <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">{ r.name }</td>
                                        <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">{ r.keys.join(', ') }</td>
                                        <td className="p-t-0-5 p-l-0-5 p-b-0-5 border-bottom-pale">{ dateStringFormat(r.create_on) }</td>
                                        <td className="absolute pos-unset t-0 r-0" onClick={ () => { deleteRelation(r.id) } }> <img src="/icon/close.png" className="icon m-auto delete-icon"/> </td>
                                    </tr>
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>

                { current  ?
                <div className="w-50 border-left-pale no-scroll-x scroll-y" >

                    <div className="block w-100 p-t-1 p-t-0-5 p-l-0.5 p-r-0-5 p-b-0-5 m-r-1">
                        <div className="flex w-fit flex-no-wrap relative">
                            { editButton ?
                                <input className="block w-fit border-bottom-pale text-medium text-center" value={ current.name } onChange={ (e) => {setCurrent( {...current, name: e.target.value} ) }}/>
                                :
                                <span className="block w-fit border-bottom-pale text-medium text-center">{ current.name }</span>
                            }
                            <img className="icon absolute r-0 t-0 edit-icon" src="/icon/edit.png" onClick={ editOrStatic }/>
                        </div>
                    </div>

                    { current.fields ?
                        <React.StrictMode>
                        {
                            current.fields.map( (f, index) =>
                                <Field field = {f} key = {f.id} index={index} updateFieldAtIndexOf = {updateFieldAtIndexOf} relations={relations} />
                            )
                        }
                        </React.StrictMode>
                        : null
                    }

                    <div className="add w-80 m-auto m-t-2">
                        <img src="/icon/add.png" className="icon block ml-auto" onClick={ addField }/>
                    </div>
                </div>
                    : null
                }

            </div>
        </div>
    )
}
