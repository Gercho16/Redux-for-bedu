import React from 'react';

function Fatal(props) {
    console.log(props)
    return (
        <h2 className="center rojo">
            {props.mensaje}
        </h2>
    );
}

export default Fatal;