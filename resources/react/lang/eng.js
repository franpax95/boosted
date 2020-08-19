import React from 'react';



/** util */
export const General = {
    edit: 'Edit',
    delete: 'Delete',
    start: 'Start',
    nRep: 'Nº Repetitions',
    tOn: 'Contraction time',
    tOff: 'Time off'
};



/** specific components */
export const Navbar = {
    home: 'Boosted',
    categories: 'Categories',
    addcategory: 'Add Category',
    exercises: 'Exercises',
    addexercise: 'Add Exercise',
    routines: 'Routines',
    addroutine: 'Add Routine',
    login: 'Log In',
    signup: 'Sign Up',
    logout: 'Log Out',
    lang: { spanish: 'Spanish', english: 'English' },
};



/** pages */
export const Home = {
    title: 'Welcome to BOOSTED!',
    subtitle: <>Sign up and start customizing your routines.<br />How you want, where you want and when you want.</>
};

export const Login = {
    title: 'Log In',
    subtitle: <i>Welcome back, <b>warrior</b></i>,
    description: 'Ready to continue your training? Why extend it ... Enter your information now!',
    formtitle: 'We need...',
    input: {
        email: 'Your e-mail',
        password: 'Your password',
        submit: 'Send'
    },
    link: 'If you don´t have an account yet, you can go to the registry by clicking here.',
    success: <>
        You are already inside. You can start doing your routines whenever you want.
        <br /><br />
        If you want to exit, press the logout button.
    </>
};

export const SignUp = {
    title: 'Sign Up',
    subtitle: <i>Welcome to our family, <b>soldier</b></i>,
    description: 'Why wait? Create an account now and start to get in shape',
    formtitle: 'We need...',
    input: {
        name: 'Your name',
        email: 'Your e-mail',
        password: 'Your password',
        repassword: 'Your password again',
        submit: 'Send'
    },
    link: 'If you already have an account, you can go to the login by clicking here.',
    success: <>
        You are already inside. You can start doing your routines whenever you want.
        <br /><br />
        If you want to exit, press the logout button.
    </>,
};

export const Categories = {
    title: ['Categories', 'Category'],
};

export const CategoriesForm = {
    title: ['Add Category', 'Edit Category'],
    add: {
        title: 'The first thing is to add a category!',
        subtitle: 'Choose the most suitable name for your exercise group',
        description: ''
    },
    edit: {
        title: 'Maybe you are thinking of a more suitable name?',
        subtitle: 'Try and if you don´t like it, you can always change it back to the old one. It is very easy!',
        description: ''
    },
    input: {
        name: 'Name of your category',
        submit: 'Save'
    },
    prompt: {
        name: 'You have not saved your category, are you sure you want to exit?'
    },
    validate: {
        name: 'The name is important. Something must have your category ...'
    }
};

export const Exercises = {
    title: ['Exercises', 'Exercise'],
};

export const ExercisesForm = {
    title: ['Add Exercise', 'Edit Exercise'],
    add: {
        title: 'The routines are made up of exercises.',
        subtitle: '',
        description: 'Describe your exercise well and add an image if you can so that it is easier for you to understand when performing your routine'
    },
    edit: {
        title: 'Do you think you can improve this exercise more?',
        subtitle: 'Show us!',
        description: ''
    },
    input: {
        name: 'Name of your exercise',
        description: 'Description of your exercise',
        submit: 'Save'
    },
    prompt: {
        name: 'You have not saved your category, are you sure you want to exit?'
    },
    // validate: {
    //     name: 'El nombre es importante. Algo tendrá que tener tu categoría...'
    // }
};

export const Routines = {
    title: ['Routines', 'Routine'],
    prev: 'Previous exercise',
    next: 'Next exercise',
    timer: {
        contract: 'Contract',
        rest: 'rest',
        totalrep: 'repetitions',
        start: 'Start routine',
        stop: 'Stop routine',
        start_msg: 'Start routine',
        again_msg: 'Do routine again',
        end_msg: 'END',
    },
};

export const RoutinesForm = {
    title: ['Add Routine', 'Edit Routine'],
    add: {
        title: 'Best of this page, prepare your own custom routine!',
        description: 'Choose from your exercises. You can choose in each exercise whether to use a timer or a counter. To NOT use the timer, simply leave the contraction and rest times at 0 seconds.'
    },
    edit: {
        title: 'Edit Routine',
        description: 'Edit routine'
    },
    input: {
        name: 'Name of your routine',
        description: 'Description of your routine',
        submit: 'Save'
    },
    prompt: {
        name: 'You have not saved your routine, are you sure you want to exit?'
    },
    // validate: {
    //     name: 'El nombre es importante. Algo tendrá que tener tu categoría...'
    // }
};



const engTexts = {
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

export default engTexts;