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

    const setForeignData = ( rowData ) => {
        let fk_data = data.fk_data;
        if( fk_data ){
            fk_data.push( rowData )
        }else{
            fk_data = [ rowData ]
        }
        setter({ ...data, fk_data: fk_data })
        setFkValue( rowData[fk[0].on] );
        
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
            <div className="w-80 mg-auto mg-t-2 form-small">
                <label className="block text-little-bigger">{ field.name } { field.is_primary ? <span className="text-theme">*</span>: null } </label>
                <input className="input-outline block w-fit mg-t-0-5 pg-t-0-5 pg-l-0-5 pg-b-0-5 pg-r-0-5" type="text" onChange={ (e) => { setData(e) } }/>
            </div>
        :
            <div className="w-80 mg-auto mg-t-2 form-small relative">
                <label className="block text-little-bigger">{ field.name } <small className="text-theme">(foreign key constraint must not be blank)</small> </label>
                <input className="input-outline block w-fit mg-t-0-5 pg-t-0-5 pg-l-0-5 pg-b-0-5 pg-r-0-5" type="text" onFocus = { dropdownTrigger } onBlur={ dropdownTrigger } value={ fkValue }/>

                <div className="absolute r-0 t-100 no-over-flow index-2" style={{ height: `${height}px` }}>
                   <div className="drop-container h-200 w-fit" >
                   { relData && relData.map( (row, index) =>
                       <div key={index} className="pg-t-0-5 pg-l-1 pg-b-0-5 drop-item hover border-bottom-pale flex flex-no-wrap bg-white" onClick={ () => { setForeignData( row ) } }>
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
