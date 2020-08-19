import React from 'react';



/** util */
export const General = {
    edit: 'Editar',
    delete: 'Eliminar',
    start: 'Empezar',
    nRep: 'Nº de Repeticiones',
    tOn: 'Tiempo Contracción',
    tOff: 'Tiempo Descanso'
};



/** specific components */
export const Navbar = {
    home: 'Boosted',
    categories: 'Categorías',
    addcategory: 'Añadir Categoría',
    exercises: 'Ejercicios',
    addexercise: 'Añadir Ejercicio',
    routines: 'Rutinas',
    addroutine: 'Añadir Rutina',
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    logout: 'Cerrar Sesión',
    lang: { spanish: 'Español', english: 'Inglés' },
};



/** pages */
export const Home = {
    title: '¡Bienvenid@ a BOOSTED!',
    subtitle: <>Regístrate y empieza a personalizar tus rutinas.<br />Como quieras, donde quieras y cuando quieras.</>
};

export const Login = {
    title: 'Iniciar Sesión',
    subtitle: <i>Bienvenido de nuevo <b>guerrero</b></i>,
    description: '¿Preparado para seguir con tu entrenamiento? Para que alargarlo... ¡Introduce ya tus datos!',
    formtitle: 'Necesitamos...',
    input: {
        email: 'Tu e-mail',
        password: 'Tu contraseña',
        submit: 'Enviar'
    },
    link: 'Si todavía no tienes cuenta, puedes ir al registro pulsando aquí.',
    success: <>
        Ya estás dentro. Puedes empezar a realizar tus rutinas cuando quieras.
        <br /><br />
        Si deseas salir pulsa el botón de cerrar sesión.
    </>
};

export const SignUp = {
    title: 'Registrarse',
    subtitle: <i>Bienvenido a nuestra familia <b>soldado</b></i>,
    description: '¿Preparado para seguir con tu entrenamiento? Para que alargarlo... ¡Introduce ya tus datos!',
    formtitle: 'Necesitamos...',
    input: {
        name: 'Tu nombre',
        email: 'Tu e-mail',
        password: 'Tu contraseña',
        repassword: 'Tu contraseña otra vez',
        submit: 'Enviar'
    },
    link: 'Si ya tienes una cuenta, puedes ir al inicio de sesión pulsando aquí.',
    success: <>
        Ya estás dentro. Puedes empezar a realizar tus rutinas cuando quieras.
        <br /><br />
        Si deseas salir pulsa el botón de cerrar sesión.
    </>,
};

export const Categories = {
    title: ['Categorías', 'Categoría'],
};

export const CategoriesForm = {
    title: ['Añadir Categoría', 'Editar Categoría'],
    add: {
        title: '¡Lo primero es añadir una categoría!',
        subtitle: 'Elige el nombre más adecuado para tu grupo de ejercicios',
        description: ''
    },
    edit: {
        title: '¿Quizás estás pensando en un nombre más adecuado?',
        subtitle: 'Prueba y, si no te gusta, siempre puedes volver a cambiarlo al anterior. ¡Es facilísimo!',
        description: ''
    },
    input: {
        name: 'El nombre de tu categoría',
        submit: 'Guardar'
    },
    prompt: {
        name: 'No has guardado tu categoría, ¿estás seguro de que deseas salir?'
    },
    validate: {
        name: 'El nombre es importante. Algo tendrá que tener tu categoría...'
    }
};

export const Exercises = {
    title: ['Ejercicios', 'Ejercicio'],
};

export const ExercisesForm = {
    title: ['Añadir Ejercicio', 'Editar Ejercicio'],
    add: {
        title: 'Las rutinas están compuestas de ejercicios.',
        subtitle: '',
        description: 'Describe bien tu ejercicio y añade una imagen si puedes para que te sea más fácil entenderlo a la hora de realizar tu rutina'
    },
    edit: {
        title: '¿Crees que puedes mejorar más este ejercicio?',
        subtitle: 'Demuéstranoslo!',
        description: ''
    },
    input: {
        name: 'El nombre de tu ejercicio',
        description: 'La descripción de tu ejercicio',
        submit: 'Guardar'
    },
    prompt: {
        name: 'No has guardado tu categoría, ¿estás seguro de que deseas salir?'
    },
    // validate: {
    //     name: 'El nombre es importante. Algo tendrá que tener tu categoría...'
    // }
};

export const Routines = {
    title: ['Rutinas', 'Rutina'],
    prev: 'Ejercicio anterior',
    next: 'Siguiente ejercicio',
    timer: {
        contract: 'Contrae',
        rest: 'descansa',
        totalrep: 'total de repeticiones',
        start: 'Empezar rutina',
        stop: 'Terminar rutina',
        start_msg: 'Empezar rutina',
        again_msg: 'Volver a empezar rutina',
        end_msg: 'FIN',
    },
};

export const RoutinesForm = {
    title: ['Añadir Rutina', 'Editar Rutina'],
    add: {
        title: '¡Lo mejor de esta página, prepárate tu propia rutina personalizada!',
        description: 'Elige de entre tus ejercicios. Puedes elegir en cada ejercicio si usar un timer o un contador. Para NO utilizar el timer, simplemente deja los tiempos de contracción y descanso a 0 segundos.'
    },
    edit: {
        title: 'Editar Rutina',
        description: 'Edición de rutina'
    },
    input: {
        name: 'El nombre de tu rutina',
        description: 'La descripción de tu rutina',
        submit: 'Guardar'
    },
    prompt: {
        name: 'No has guardado tu categoría, ¿estás seguro de que deseas salir?'
    },
    validate: {
        name: 'El nombre es importante. Algo tendrá que tener tu categoría...'
    }
};



const espTexts = {
    /** general translate */
    General,
    /** specific components */
    Navbar,
    /** pages */
    Home,
    Login, SignUp, 
    Categories, CategoriesForm,
    Exercises, ExercisesForm,
    Routines, RoutinesForm
};

export default espTexts;