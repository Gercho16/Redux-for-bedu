import React from 'react';
import { connect } from 'react-redux'

import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'

function Comentarios(props) {
    const ponerComentarios = () => {
        if (props.com_error) {
            return <Fatal mensaje={ props.com_error }/>
        }
        if (props.com_cargando && !props.comentarios.length) {
            return <Spinner />
        }
        return props.comentarios.map((comentario) => {
            return (
                <li>
                    <b>
                        <u>
                            { comentario.email }
                        </u>
                    </b>
                    <br/>
                    { comentario.body  }
                </li>
            )
        })
    }

    return (
        <ul>
            { ponerComentarios() }
        </ul>
    )
}

const mapStateToProps = ({publicacionesReducer}) => {
    return publicacionesReducer;
}

export default connect(mapStateToProps)(Comentarios);