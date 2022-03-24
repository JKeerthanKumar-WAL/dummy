import React from 'react';
import './App.css';
import TodoMySql from './TodoMySql';
import AuthorMySql from './AuthorMySql';

function App() {
    return (
        <div className="App">
            <TodoMySql />
            <AuthorMySql />
        </div>
    );
}
export default App;
