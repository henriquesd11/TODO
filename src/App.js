import './App.css';
import {useState, useEffect, use} from "react";
import {BsSTrash, BsBookmarkCheck, BsBookmarkCheckFill} from 'react-icons/bs'

const API = "http://localhost:5000";
function App() {
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault()

        const todo = {
            id: Math.random(),
            title,
            time,
            done: false
        };

        console.log(todo)
        setTitle("")
        setTime("")
    }

    return (
    <div className="App">
        <div className="header-todo">
            <h1>React Todo</h1>
        </div>
        <div className="form-todo">
            <h2>Insira sua tarefa:</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="title">O que vai fazer?</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Titulo da tarefa"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title || ""}
                        required/>
                </div>
                <div className="form-control">
                    <label htmlFor="time">Duração</label>
                    <input
                        type="text"
                        name="time"
                        placeholder="Tempo estimado (em horas)"
                        onChange={(e) => setTime(e.target.value)}
                        value={time || ""}
                        required
                    />
                </div>
                <input type="submit" value="Enviar"/>
            </form>
        </div>
        <div className="list-todo">
            <h2>Lista de Tarefas:</h2>
            {todos.length <= 0 ? <p>Não há tarefas!</p> : <p>Tarefas</p>}
        </div>
    </div>
    );
}

export default App;
