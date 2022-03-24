import { useState, useEffect } from 'react';
import axios from 'axios';
const AuthorMySql = () => {
    const [author, setAuthor] = useState([]);
    const getAuthors = () => {
        axios
            .get('/authormysql')
            .then((res) => {
                setAuthor(res.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getAuthors();
    }, []);
    const createAuthor = (event) => {
        event.preventDefault();
        let authorObject = {
            first_name: event.target.first_name.value,
            last_name: event.target.last_name.value,
            dob: event.target.dob.value,
            dod: event.target.dod.value,
        };
        axios
            .post('/authormysql', authorObject)
            .then((res) => {
                getAuthors();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteAuthor = (item) => {
        axios
            .delete('/authormysql/' + item)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        getAuthors();
    };
    const deleteAll = () => {
        axios
            .get('/authormysql/deleteall')
            .then((res) => {
                getAuthors();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="App-div">
            <h1>Author Details</h1>
            <form onSubmit={createAuthor}>
                <b>First Name : </b>
                <input type="text" name="first_name" />
                <br />
                <b>Last Name : </b>
                <input type="text" name="last_name" />
                <br />
                <b>Date of Birth : </b>
                <input type="date" name="dob" />
                <br />
                <b>Date of Death : </b>
                <input type="date" name="dod" />
                <br />
                <button>
                    <b>Add Author</b>
                </button>
                <br />
            </form>
            <button onClick={deleteAll}>
                <b>Delete All</b>
            </button>
            <br />
            <br />
            {author.map((val, index) => {
                return (
                    <div className="card">
                        <h2>Author Detail {index + 1}</h2>
                        <b>First Name : </b>
                        {val.first_name}
                        <br />
                        <b>Last Name : </b>
                        {val.last_name} <br />
                        <b>Date of Birth : </b>
                        {val.dob} <br />
                        <b>Date of Death : </b>
                        {val.dod}
                        <br />
                        <button
                            onClick={() => {
                                deleteAuthor(val.first_name);
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
export default AuthorMySql;
