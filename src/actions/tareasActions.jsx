import axios from 'axios';
import { TRAER_TODAS, CARGANDO, ERROR, CAMBIO_USUARIO_ID, CAMBIO_TITULO, GUARDAR, ACTUALIZAR, LIMPIAR } from '../types/tareasTypes'

export const traerTodas =  () => {
    return async (dispath) => {
        dispath({
            type: CARGANDO
        })
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
            const tareas = []
            response.data.map((tarea) => {
                tareas[tarea.userId] = {
                    ... tareas[tarea.userId],
                    [tarea.id]: {
                        ... tarea
                    }
                }
            })
            dispath({
                type: TRAER_TODAS,
                payload: tareas,
                error: ''
            })
        } catch (error) {
            dispath({
                type: ERROR,
                payload: 'Informacion de tareas no disponible'
            })
        }
    }
}

export const cambioUsuarioId = (usuario_id) => {
    return (dispatch) => {
        dispatch({
            type: CAMBIO_USUARIO_ID,
            payload: usuario_id
        })
    }
}

export const cambioTitulo = (titulo) => {
    return (dispatch) => {
        dispatch({
            type: CAMBIO_TITULO,
            payload: titulo
        })
    }
}

export const agregar = (nueva_tarea) => {
    return async (dispatch) => {
        dispatch({
            type: CARGANDO,
        })

        try {
            const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea)
            dispatch({
                type: GUARDAR
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: 'Intente mas tarde'
            })
        }
    }
}

export const editar = (tarea_editada) => {
    return async (dispatch) => {
        dispatch({
            type: CARGANDO,
        })

        try {
            const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada)
            dispatch({
                type: GUARDAR
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: 'Intente mas tarde'
            })
        }
    }
}

export const cambioCheck = (usuario_id, tarea_id) => {
    return (dispatch, getState) => {
        const { tareas} = getState().tareasReducer;
        const seleccionada = tareas[usuario_id][tarea_id]

        const actualizadas = {
            ... tareas,
        }
        actualizadas[usuario_id] = {
            ... tareas[usuario_id]
        }
        actualizadas[usuario_id][tarea_id] = {
            ... tareas[usuario_id][tarea_id],
            completed: !seleccionada.completed
        }

        dispatch({
            type: ACTUALIZAR,
            payload: actualizadas
        })
    }
}

export const eliminar = (tarea_id) => {
    return async (dispatch) => {
        dispatch({
            type: CARGANDO,
        })
        try {
            const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tarea_id}`)
            dispatch({
                type: TRAER_TODAS,
                payload: {}
            })
        } catch (error) {
            dispatch({
                type: ERROR,
                payload: 'El servicio no esta disponible.'
            })
        }
    }
} 

export const limpiarForma = () => {
    return (dispatch) => {
        dispatch({
            type: LIMPIAR
        })
    }
}