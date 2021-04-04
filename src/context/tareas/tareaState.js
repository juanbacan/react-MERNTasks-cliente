import React, {useReducer} from 'react';
import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';


import { 
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA,
    SESION_TAREA,
} from '../../types';


const TareaState = props => {
    const initialState = {
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null,
    }

    // Crear el dispatch y el state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    // Crear las funciones

    // Obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        if(!proyecto){  // Linea agregada :( // Proyecto viene como null 
            return;
        }
    
        try {
            const resultado =  await clienteAxios.get('/api/tareas', {params: { proyecto }});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);

        }
    }

    // Agregar una Tarea al Proyecto
    const agregarTarea = async (tarea) => {
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea,
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Valida y muestra un error en caso necesario
    const validarTarea = () => {
        dispatch ({
            type: VALIDAR_TAREA,
        })  
    }

    // Eliminar Tarea por Id
    const eliminarTarea = async (id, proyecto) => {
        await clienteAxios.delete(`/api/tareas/${id}`, {params: { proyecto }});
        try {
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Edita o modifica una tarea 
    const actualizarTarea = async (tarea) => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            //console.log(resultado);
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    // Extrae la tarea para edición
    const guardarTareaActual = (tarea) => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }



    // Elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA,
        })
    }

    // Al cerrar sesión de las tareas
    const sesionTareas = () => {
        dispatch({
            type: SESION_TAREA,
        })
    }

    return (
        <TareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea,
                sesionTareas,
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;