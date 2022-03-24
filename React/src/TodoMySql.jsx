import { useState, useEffect } from 'react';
import axios from 'axios';
const TodoMySql = () => {
    const [todos, setTodos] = useState([]);
    const getTodos = () => {
        axios
            .get('/todomysql')
            .then((res) => {
                setTodos(res.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getTodos();
    }, []);
    const createTodo = (event) => {
        event.preventDefault();
        let todoObject = {
            item: event.target.item.value,
            status: event.target.status.value,
        };
        axios
            .post('/todomysql', todoObject)
            .then((res) => {
                getTodos();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteTodo = (item) => {
        axios
            .delete('/todomysql/' + item)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getTodos();
    };
    const deleteAll = () => {
        axios
            .get('/todomysql/deleteall')
            .then((res) => {
                getTodos();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="App-div">
            <h1>Todo App</h1>
            <form onSubmit={createTodo}>
                <b>Todo : </b>
                <input type="text" name="item" />
                <br />
                <b>Status : </b>
                <select name="status">
                    <option selected>Select</option>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                </select>
                <br />
                <button>
                    <b>Add Todo</b>
                </button>
                <br />
            </form>
            <button onClick={deleteAll}>
                <b>Delete All</b>
            </button>
            <br />
            <br />
            {todos.map((val, index) => {
                return (
                    <div className="card">
                        <h2>Todo Detail {index + 1}</h2>
                        <b>Todo : </b>
                        {val.item}
                        <br />
                        <b>Status : </b>
                        {val.status} <br />
                        <button
                            onClick={() => {
                                deleteTodo(val.item);
                            }}
                        >
                            <b> Delete</b>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
export default TodoMySql;
