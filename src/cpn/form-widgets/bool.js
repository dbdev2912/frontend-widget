import { useState } from 'react';

export default ( props ) => {

    const { field, setter, data, keys, foreign_keys } =  props;

    const [ checked, setChecked ] = useState( data[field.name] );

    const setData = ( value ) => {
        data[field.name] = value;
        setter(data);
        setChecked(value)
    }



    return(
        <div className="w-80 mg-auto mg-t-1 form-small">
            <label className="block text-little-bigger">{ field.name } { field.is_primary ? <span className="text-theme">*</span>: null } </label>
            <div className="flex flex-no-wrap mg-t-1">
                <div className="w-50">
                    <div className="w-fit flex flex-no-wrap">
                        <div className="flex flex-middle">
                            <input type="checkbox" checked={ checked } onChange={ () => { setData(true)} }/>
                        </div>
                        <div className="flex flex-middle">
                            <span>True</span>
                        </div>
                    </div>
                </div>
                <div className="w-50">
                    <div className="w-fit flex flex-no-wrap">
                        <div className="flex flex-middle">
                            <input type="checkbox" checked={ !checked }onChange={ () => { setData(false)} }/>
                        </div>
                        <div className="flex flex-middle">
                            <span>False</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
