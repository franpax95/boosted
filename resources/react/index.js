import React from 'react';
import ReactDOM from 'react-dom';

import { Provider as LangProvider } from './contexts/LangContext';
import { Provider as UserProvider } from './contexts/UserContext';
import { Provider as CategoriesProvider } from './contexts/CategoriesContext';
import { Provider as ExercisesProvider } from './contexts/ExercisesContext';
import { Provider as RoutinesProvider } from './contexts/RoutinesContext';

import { BrowserRouter } from 'react-router-dom';
import App from './components/App';


const app = document.getElementById('app');
const userdata = Object.assign({}, app.dataset);
const isLogIn = (userdata.user) ? true : false;
const user = (isLogIn) ? JSON.parse(userdata.user) : {};

ReactDOM.render(
    <LangProvider>
        <UserProvider _user={user} _isAuth={isLogIn}>
            <CategoriesProvider>
                <ExercisesProvider>
                    <RoutinesProvider>

                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                        
                    </RoutinesProvider>
                </ExercisesProvider>
            </CategoriesProvider>
        </UserProvider>
    </LangProvider>,
    app
);