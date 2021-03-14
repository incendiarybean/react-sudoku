import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Sudoku } from './components';
import { props } from './JS';

function App() {

    useEffect(() => {
        props.custom("💠 Welcome!", "bottom-left");
    }, []);

    return (
        <Router>
            <ToastContainer />
            <Switch>
                <Route path='/'>
                    <Sudoku {...props} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;