const dateStringFormat = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const dateFormat = (date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

const auto_id = () => {
    return 'id' + (new Date()).getTime();
}


const compareBy = (...props) => (a, b) => {
    for (let i = 0; i < props.length; i++) {
        const ascValue = props[i].startsWith('-') ? -1 : 1;
        const prop = props[i].startsWith('-') ? props[i].substr(1) : props[i];
        if (a[prop] !== b[prop]) {
            return a[prop] > b[prop] ? ascValue : -ascValue;
        }
    }
    return 0;
};

const generateMapKey = ( row, keys ) =>{
    let key = "";
    for( let i = 0; i < keys.length; i++ ){
        key += row[keys[i]]
    }
    return key
}

const openTab = ( url ) => {
    window.open(url, '_blank').focus();
}

const redirect = ( url ) => {
    window.location = url;
}

export {
    dateFormat,
    dateStringFormat,
    auto_id,
    compareBy,
    generateMapKey,
    openTab,
    redirect,
}
