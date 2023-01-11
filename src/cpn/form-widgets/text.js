import React, { useState, useEffect } from 'react'

export default ( props ) => {

    const { field, setter, data , foreign_keys } =  props;

    const fk = foreign_keys.filter( key => key.on === field.name );
    /* this bug is serious and must be fixed in the final product */
    const [ height, setHeight ] = useState(0);
    const [ drop, setDrop ] = useState(false);
    const [ fkValue, setFkValue ] = useState("");

    const dropdownTrigger = () => {

        setHeight( drop ? 0 : 200 );
        setDrop( !drop );
    }

    const setData = (e) => {
        data[field.name] = e.target.value;
        setter(data);
    }

    /* Duplicate entry bug */
    const setForeignData = ( rowData ) => {
        let fk_data = data.fk_data;
        if( fk_data ){
            let bruhh = fk_data.filter(d => d.rel === fk[0].rel);
            if( bruhh.length > 0 ){
                const rd = bruhh[0];
                const index = fk_data.indexOf( rd );

                fk_data[index] = { rel: fk[0].rel, data: rowData }

            }else{
                fk_data.push( { rel: fk[0].rel, data: rowData } )
            }

        }else{
            fk_data = [ { rel: fk[0].rel, data: rowData } ]
        }
        setter({ ...data, fk_data: fk_data })
        setFkValue( rowData[fk[0].on] );

    }

    const getKeys = (object) => {
        const keys = Object.keys(object);
        return keys;
    }


    const [ relData, setRelData ] = useState([]);
    useEffect( () => {
            if( fk.length > 0 ){
                fetch(`/api/${ fk[0].rel }/data`).then( res => res.json() ).then( (resp) => {
                    setRelData( resp.data );
                })
            }
    }, []);

    return(
        <React.StrictMode>
        { fk.length == 0 ?
            <div className="w-80 m-auto p-t-2 form-small">
                <label className="block text-little-bigger">{ field.name } { field.is_primary ? <span className="text-theme">*</span>: null } </label>
                <input className="input-outline block w-fit p-t-0-5 p-t-0-5 p-l-0-5 p-b-0-5 p-r-0-5" type="text" onChange={ (e) => { setData(e) } }/>
            </div>
        :
            <div className="w-80 m-auto p-t-2 form-small relative">
                <label className="block text-little-bigger">{ field.name } <small className="text-theme">(foreign key constraint must not be blank)</small> </label>
                <input className="input-outline block w-fit p-t-0-5 p-t-0-5 p-l-0-5 p-b-0-5 p-r-0-5" type="text" onFocus = { dropdownTrigger } onBlur={ dropdownTrigger } value={ fkValue }/>

                <div className="absolute r-0 t-100 no-over-flow index-2" style={{ height: `${height}px` }}>
                   <div className="drop-container h-200 w-fit" >
                   { relData && relData.map( (row, index) =>
                       <div key={index} className="p-t-0-5 p-l-1 p-b-0-5 drop-item hover border-bottom-pale flex flex-no-wrap bg-white" onClick={ () => { setForeignData( row ) } }>
                           <span className="block w-50">{row[fk[0].on]}</span>
                       </div>
                   )}
                   </div>
                </div>

            </div>
        }
        </React.StrictMode>
    )
}
