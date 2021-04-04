import React, {useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';  // Importación del Context
import tareaContext from '../../context/tareas/tareaContext';  // Importación del Context
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTarea = () => {

    // Extraer Proyectos del State Inicial
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    // Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { tareasproyecto } = tareasContext;
    //console.log(tareasproyecto);

    // Si no hay proyecto seleccionado
    if(!proyecto){
        return <h2>Selecciona un Proyecto</h2>;
    }

    // Array Destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto; 



    // Elimina un proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id);
    }

    return (
        <>
            <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ? (<li className="tarea">No hay Tareas</li>)
                    : 
                    <TransitionGroup>
                        {tareasproyecto.map( tarea =>(
                            <CSSTransition
                            key={tarea._id}
                            timeout={200}
                            classNames="tarea"
                            >
                                
                                <Tarea
                                    
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >
                Eliminar Proyecto &times;
            </button>

        </>
    );
}

 
export default ListadoTarea;