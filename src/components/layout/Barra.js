import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autenticacion/authContext';
import ProyectoContext from '../../context/proyectos/proyectoContext';
import TareaContext from '../../context/tareas/tareaContext';

const Barra = () => {

        // Extraer la información de autenticación
        const authContext = useContext(AuthContext);
        const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

        // Extraemos los proyectos
        const proyectoContext = useContext(ProyectoContext);
        const { sesionProyectos } = proyectoContext;

        // Extraemos las tareas
        const tareaContext = useContext(TareaContext);
        const { sesionTareas } = tareaContext;

        const cerrarSesionUsuario = () => {
            sesionProyectos();
            sesionTareas();
            cerrarSesion();
        }

    
        useEffect(() => {
            usuarioAutenticado();
            // eslint-disable-next-line
        },[]);
    

    return (
        <header className="app-header">
            { usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p>: null}
            
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={cerrarSesionUsuario}
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
}
 
export default Barra;