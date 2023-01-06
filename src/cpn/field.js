import React, { useState } from 'react';
import $ from 'jquery';

export default (props) => {
    const { index, updateFieldAtIndexOf, relations } = props;
    const [ field, setField ] = useState(props.field);

    const [ drop, setDrop ] = useState(false);
    const [ innerDrop, setInnerDrop ] = useState(false);

    const [ foreignkeyDropRelation, setForeignkeyDropRelation ] = useState(false);
    const [ foreignKeyDropRelationHeight, setForeignkeyDropRelationHeight ] = useState(0);
    const [ foreignkeyDropRefs, setForeignkeyDropRefs ] = useState(false);
    const [ foreignKeyDropRefsHeight, setForeignkeyDropRefsHeight ] = useState(0);

    const [ height, setHeight ] = useState(0);
    const [ innerHeight, setInnerHeight ] = useState(0);

    const [ foreignKey, setForeignKey ] = useState({})
    const [ foreignKeyRelation, setForeignKeyRelation ] = useState({})
    const [ foreignKeyRefs, setForeignKeyRefs ] = useState({})

    const dataTypes = [
        { id: "1", label: "Int", value: "int" , exp: "10"},
        { id: "2", label: "Text", value: "text", exp: "Example"},
        { id: "3", label: "Date", value: "date", exp: "1-1-1970" },
        { id: "4", label: "Decimal", value: "decimal", exp: "10.05" },
        { id: "5", label: "Bool", value: "bool", exp: "True/False" },
    ]

    const dropdownTrigger = (e) => {

        let height = $(e.target).closest(".field").find(".outer-drop-container").height();
        height = height > 450 ? height: 450;
        setHeight( drop ? 0: height );
        setDrop( !drop )
    }

    const innerDropdownTrigger = () => {
        setInnerHeight( innerDrop? 0: 200 )
        setInnerDrop( !innerDrop )
    }

    const dropForeignKey = () => {
        setForeignkeyDropRelation( !foreignkeyDropRelation );
        setForeignkeyDropRelationHeight( foreignkeyDropRelation ? 0 : 200 );
    }

    const dropForeignKeyRefs = () => {
        setForeignkeyDropRefs( !foreignkeyDropRefs );
        setForeignkeyDropRefsHeight( foreignkeyDropRefs ? 0 : 200 );
    }

    const setDataType = (type) => {
        setField({...field, type: type, data_type: type.value});
        setInnerHeight( 0 )
        setInnerDrop( !innerDrop )
    }

    const setDataTypeNoDrop = (type) => {
        setField({...field, type: type, data_type: type.value});

    }

    const saveState = () => {
        setDrop( !drop )
        setHeight( 0 );
        updateFieldAtIndexOf(index, field);
    }
    const setFieldName = ( name ) => {
        setField( {...field, name: name} )
    }

    return(
        <div className="p-t-1 p-l-0-5 p-r-0-5 w-80 m-auto field">
            <div className="relative">
            <span className="block w-fit border-bottom-pale text-left transparent text-little-bigger">{ field.name }</span>
                { drop ?
                    <React.StrictMode>
                        <img className="icon absolute drop-icon" src = "/icon/drop.png" onClick={ dropdownTrigger }/>
                    </React.StrictMode>
                    :
                    <React.StrictMode>
                        <img className="icon absolute drop-icon" src = "/icon/undrop.png" onClick={ dropdownTrigger }/>
                    </React.StrictMode>
                 }
            </div>
            { /* <div className="no-over-flow" style={{ height: `${height}px` }}></div> */}
            <div className="no-over-flow" style={{ height: `${height}px` }}>
                <div className="p-l-5 drop-container outer-drop-container">
                    <div className="flex flex-end m-t-1">
                        <div className="flex p-t-0-5 p-l-0-5 p-b-0-5 p-r-0-5 border-radius-0-5 button-theme border-pale" onClick={ saveState }>
                            <div className="flex flex-middle">
                                <span className="block">Save</span>
                            </div>
                            <div className="flex flex-middle">
                                <img className="drop-icon m-l-1" src = "/icon/save.png" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-no-wrap m-t-1">
                        <div className="w-50 flex flex-middle">
                            <span className="text-left">Field Name</span>
                        </div>
                        <div className="w-50">
                            <input className="input-outline border-bottom-pale p-t-0-5 p-l-0-5 p-b-0-5  block w-fit" value={ field.name } onChange={ (e) =>{ setField( {...field, name: e.target.value} )} } />
                        </div>
                    </div>

                    <div className="flex flex-no-wrap  m-t-1">
                        <div className="w-50 flex flex-middle">
                            <span className="text-left">Data type</span>
                        </div>
                        <div className="w-50">
                            <div className="relative index-3">
                                <span className="block w-fit border-bottom-pale text-left text-little-bigger">{  field.type? field.type.label:"Data type"  }</span>
                                { innerDrop ?
                                    <React.StrictMode>
                                        <img className="icon absolute drop-icon" src = "/icon/drop.png" onClick={ innerDropdownTrigger }/>
                                    </React.StrictMode>
                                    :
                                    <React.StrictMode>
                                        <img className="icon absolute drop-icon" src = "/icon/undrop.png" onClick={ innerDropdownTrigger }/>
                                    </React.StrictMode>
                                 }
                                 <div className="absolute r-0 t-100 no-over-flow index-2" style={{ height: `${innerHeight}px` }}>
                                    <div className="drop-container h-200 w-fit" >
                                    { dataTypes.map( (type, index) =>
                                        <div key={index} className="p-t-0-5 p-l-1 p-b-0-5 drop-item hover border-bottom-pale flex flex-no-wrap bg-white" onClick={ ()=> { setDataType(type) } }>
                                            <span className="block w-50">{type.label}</span>
                                            <span className="block text-right w-50 italic text-pale p-r-0-5">{type.exp}</span>
                                        </div>
                                    )}
                                    </div>
                                 </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-no-wrap m-t-1">
                        <div className="w-50">
                            <div className="w-fit flex flex-no-wrap">
                                <div className="flex flex-middle">
                                    <input type="checkbox" checked={ field.is_primary } onChange={ () => { setField({ ...field, is_primary: !field.is_primary }) } }/>
                                </div>
                                <div className="flex flex-middle">
                                    <span>Primary key</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="w-fit flex flex-no-wrap">
                                <div className="flex flex-middle">
                                    <input type="checkbox" checked={ field.is_visible } onChange={ () => { setField({ ...field, is_visible: !field.is_visible }) } }/>
                                </div>
                                <div className="flex flex-middle">
                                    <span>Visible</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-no-wrap m-t-1">
                        <div className="w-50">
                            <div className="w-fit flex flex-no-wrap">
                                <div className="flex flex-middle">
                                    <input type="checkbox" checked={ field.is_sort_index } onChange={ () => { setField({ ...field, is_sort_index: !field.is_sort_index }) } }/>
                                </div>
                                <div className="flex flex-middle">
                                    <span>Sort index</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="w-fit flex flex-no-wrap">
                                <div className="flex flex-middle">
                                    <input type="checkbox" checked={ field.is_search_index } onChange={ () => { setField({ ...field, is_search_index: !field.is_search_index }) } }/>
                                </div>
                                <div className="flex flex-middle">
                                    <span>Search index</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-no-wrap m-t-1">
                        <div className="w-50">
                            <div className="w-fit flex flex-no-wrap">
                                <div className="flex flex-middle">
                                    <input type="checkbox" />
                                </div>
                                <div className="flex flex-middle">
                                    <span>Unique</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-50">
                            <div className="w-fit flex flex-no-wrap">
                                <div className="flex flex-middle">
                                    <input type="checkbox"/>
                                </div>
                                <div className="flex flex-middle">
                                    <span>More</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="m-t-2">

                        <span>Foreign keys</span>

                        <div className="flex flex-no-wrap w-fit m-t-2">
                            <div className="w-50 flex flex-middle">
                                <span className="block text-theme">Relation</span>
                            </div>
                            <div className="w-50 flex flex-middle relative index-2" onClick={ dropForeignKey }>

                                <span className="block w-fit border-bottom-pale text-left">{ field.foreign_key && field.foreign_key.rel ? field.foreign_key.rel : "Choose relation" }</span>
                                <img className="icon absolute drop-icon b-100" src = "/icon/drop.png" style={{ transform: `rotate(180deg)`}}/>
                                <div className="absolute r-0 b-100 no-over-flow bg-white shadow" style={{ height: `${foreignKeyDropRelationHeight}px` }}>
                                   <div className="drop-container h-200 w-fit scroll-y" >
                                        { relations.map( (rel, index) =>
                                            <div key={rel.id} className="p-t-0-5 p-l-1 p-b-0-5 drop-item hover border-bottom-pale flex flex-no-wrap bg-white" onClick={ ()=> { setForeignKeyRelation(rel); setField({ ...field, foreign_key: { rel: rel.name } }) } }>
                                                <span className="block w-50">{rel.name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-no-wrap w-fit m-t-2">
                            <div className="w-50 flex flex-middle">
                                <span className="block text-theme">References on</span>
                            </div>
                            <div className="w-50 flex flex-middle relative index-3" onClick={  dropForeignKeyRefs }>

                                <span className="block w-fit border-bottom-pale text-left">{  field.foreign_key&&field.foreign_key.on ? field.foreign_key.on : "Choose field" }</span>
                                <img className="icon absolute drop-icon b-100" src = "/icon/drop.png" style={{ transform: `rotate(180deg)` }}/>

                                <div className="absolute r-0 b-100 no-over-flow bg-white shadow" style={{ height: `${foreignKeyDropRefsHeight}px` }}>
                                   <div className="drop-container h-200 w-fit scroll-y" >
                                        { foreignKeyRelation.fields && foreignKeyRelation.fields.map( (rel, index) =>
                                            <div key={rel.id} className="p-t-0-5 p-l-1 p-b-0-5 drop-item hover border-bottom-pale flex flex-no-wrap bg-white" onClick={ ()=> {

                                                setForeignKeyRefs(rel);
                                                setField({ ...field, foreign_key: { ...field.foreign_key, on: rel.name }, name: rel.name, type: rel.type });

                                            }}>
                                                <span className="block w-50">{rel.name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>



        </div>
    )
}
