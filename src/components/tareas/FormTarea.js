import React, {useContext, useState, useEffect } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';  // Importación del Context

import tareaContext from '../../context/tareas/tareaContext';  // Importación del Context

const FormTarea = () => {

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener la función del Context de Tarea
    const tareasContext = useContext(tareaContext);
    const { tareaseleccionada, errortarea, agregarTarea,
        validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada para editar
    useEffect(() => {
        if (tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        } else{
            guardarTarea({nombre: ''})
        }
         
    }, [tareaseleccionada])


    // State del Formulario

    const [tarea, guardarTarea] = useState({
        nombre: "",
    })

    // Extraer el nombre del Proyecto
    const { nombre } = tarea;


    // Si no hay proyecto seleccionado
    if(!proyecto){
        return null;
    }

    // Array Destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto; 


    // Leer los valores del formulario
    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }


    const onSubmit = e => {
        e.preventDefault();

        // Validar
        if (nombre.trim() === ''){
            validarTarea();
            return;
        }

        // Revisar si es edición o si es nueva tarea
        if(tareaseleccionada === null){
            // Agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // Actualizar la tarea existente
            actualizarTarea(tarea);
            // Elimina la tarea seleccionada
            limpiarTarea();

        }

        // Obtener y filtrar las tareas del Proyecto Actual
        obtenerTareas(proyectoActual.id);

        // Reiniciar el Form
        guardarTarea({
            nombre: '',
        })

    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la Tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value= {tareaseleccionada? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>

            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>: null}

        </div>
    );
}
 
export default FormTarea;