import axios from 'axios';
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes'

export const traerTodos =  () => {
    return async (dispath) => {
        dispath({
            type: CARGANDO
        })
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            dispath({
                type: TRAER_TODOS,
                payload: response.data,
                error: ''
            })
        } catch (error) {
            console.log('error:', error.message);
            dispath({
                type: ERROR,
                payload: 'Informacion de usuarios no disponible'
            })
        }
    }
}
