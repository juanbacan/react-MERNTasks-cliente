import React, {useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';  // Importación del Context
import tareaContext from '../../context/tareas/tareaContext';  // Importación del Context

const Proyecto = ({proyecto}) => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext);
    const { proyectoActual } = proyectosContext;         // Extracción del context

    // Obtener la función del Context de Tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    // Función para agregar el Proyecto Actual
    const seleccionarProyecto = id => {
        proyectoActual(id); // Fijar un proyecto Actual
        obtenerTareas(id); // Filtrar las tareas cuando se de click
    }


    return (
        <li>
            <button
                className="btn btn-blank"
                type="button"
                onClick={()=> seleccionarProyecto(proyecto._id)}
            >   
                {proyecto.nombre}
            </button>
        </li>
    );
}
 
export default Proyecto;