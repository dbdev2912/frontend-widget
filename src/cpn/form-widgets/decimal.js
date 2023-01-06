import React from 'react'

export default ( props ) => {

    const { field, setter, data , foreign_keys} =  props;

    const fk = foreign_keys.filter( key => key.on === field.name ).length; /* this bug is serious and must be fixed in the final product */

    const setData = (e) => {
        data[field.name] = e.target.value;
        setter(data);
    }

    return(
        <React.StrictMode>
        { fk !== 0 ?
            <div className="w-80 mg-auto mg-t-2 form-small">
                <label className="block text-little-bigger">{ field.name } { field.is_primary ? <span className="text-theme">*</span>: null } </label>
                <input className="input-outline block w-fit mg-t-0-5 pg-t-0-5 pg-l-0-5 pg-b-0-5 pg-r-0-5" type="number" onChange={ (e) => { setData(e) } }/>
            </div>
        :
            <div className="w-80 mg-auto mg-t-2 form-small">
                <label className="block text-little-bigger">{ field.name } <small className="text-theme">(foreign key constraint must not be blank)</small> </label>
                <input className="input-outline block w-fit mg-t-0-5 pg-t-0-5 pg-l-0-5 pg-b-0-5 pg-r-0-5" type="number" onChange={ (e) => { setData(e) } }/>
            </div>
        }
        </React.StrictMode>
    )
}
