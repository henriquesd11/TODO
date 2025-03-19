import './App.css';
import {useState, useEffect} from "react";
import {BsTrash, BsBookmarkCheck, BsBookmarkCheckFill} from 'react-icons/bs'
import {Table, Button, InputGroup, Form} from 'react-bootstrap'

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

    async function handleEndit(todo)
    {
        todo.done = !todo.done;

        const data = await fetch(API + "/todos/" + todo.id, {
            method: "PUT",
            body: JSON.stringify(todo),
            headers: {
                "Content-type": "application-json"
            }
        })

        setTodos(prevState => prevState.map((t) => (t.id === data.id) ? (t = data) : t));
    }

    return (
    <div className="App">
        <div className="header-todo">
            <h1>React Todo</h1>
        </div>
        <div className="form-todo text-left">
            <h2>Insira sua tarefa:</h2>
            <form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label> Tarefa </Form.Label>
                    <Form.Control
                        placeholder="Titulo da tarefa"
                        aria-label="titulo"
                        aria-describedby="basic-addon1"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title || ""}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Duração</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Tempo estimado (em horas)"
                            aria-label="time"
                            aria-describedby="basic-addon1"
                            onChange={(e) => setTime(e.target.value)}
                            value={time || ""}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button
                        variant="secondary"
                        type="submit">Salvar</Button>
                </div>
            </form>
        </div>
        <div className="list-todo">
            <h2>Lista de Tarefas:</h2>
            {todos.length <= 0 && <p>Não há tarefas!</p>}
            <Table>
                <thead className="text-center">
                <tr>
                    <th>Tarefa</th>
                    <th>Duração</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody className="text-center">
                {todos.map((todo) => (
                    <tr key={todo.id}>
                        <td className={todo.done ? "todo-done": ""}>
                            {todo.title}
                        </td>
                        <td>
                            {todo.time}
                        </td>
                        <td>
                        <span onClick={() => handleEndit(todo)}>
                            {!todo.done ? <BsBookmarkCheck/> : <BsBookmarkCheckFill/>}
                        </span>
                            <BsTrash className="trash" tooltip="Remover" onClick={() => handleDelete(todo.id)}/>
                            <span/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    </div>
    );
}

export default App;
