class widget{
    constructor(type, id, content=""){
        this.content = content;
        this.type = type;
        this.id = id;
        this.font = {
            is_bold: false,
            is_italic: false,
            is_underline: false,
        };
        this.color = "#000";
        this.size  = 14;
        this.otherProps = {
            url: ""
        }
    }

    setContent = (content) => {
        this.content = content;
    }

    setFont = (font) => {
        this.font = font;
    }

    setColor = (color) => {
        this.color = color;
    }

    setSize = (size) => {
        this.size = size;
    }

    setOtherProps = ( attr, value ) => {
        this.otherProps[attr] = value;
    }


    getAll = () => {
        return this;
    }

    generateClassName = () => {
        let className = "";
        if( this.font.is_bold ){
            className +=" bold";
        }
        if( this.font.is_italic){
            className += " italic";
        }
        if( this.font.is_underline ){
            className+= " underline";
        }
        console.log( className )
        return className;
    }
}

export default widget
