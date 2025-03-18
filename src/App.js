import './App.css';
import {useState, useEffect, use} from "react";
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from 'react-icons/bs'

const API = "http://localhost:5000";
function App() {
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getListTodo()
    }, [])

    async function getListTodo() {
        setLoading(true)

        const res = await fetch(API + "/todos")
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))

        setLoading(false);

        setTodos(res)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const todo = {
            id: Math.random().toPrecision(1),
            title,
            time,
            done: false
        };

        await fetch(API + "/todos", {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json"
            }
        });

        // prevState é o ultimo resuta passado ao setTodos e para cada valor novo, adiciona na lista.
        setTodos(prevState => [...prevState, todo])
        console.log(todo)
        setTitle("")
        setTime("")
    }

    async function handleDelete(id)
    {
        await fetch(API + "/todos/" + id, {
            method: "DELETE"
        })

        setTodos(prevState => prevState.filter((todo) => todo.id !== id))
    }

    if (loading) {
        return (
            <p>Carregando...</p>
        );
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
            { todos.length <= 0 && <p>Não há tarefas!</p>}
            {todos.map((todo) => (
                <div className="todo" key={todo.id}>
                    <h3 className={todo.done ? "todo-done": ""}>{todo.title}</h3>
                    <p>Duração: {todo.time}</p>
                    <div className="action">
                        <span>
                            {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
                        </span>
                        <BsTrash onClick={() => handleDelete(todo.id)}/>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
}

export default App;
