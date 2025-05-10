import React, { useState, useEffect } from 'react';
import { MdOutlineAddTask } from "react-icons/md";
import "./todo2.css"


const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showWarning, setShowWarning] = useState(false);

    // Load todos from localStorage on initial render
    useEffect(() => {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    // Save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (newTodo.trim() === "") {
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 3000);
            return;
        }

        setTodos([...todos, { 
            id: Date.now(),
            text: newTodo, 
            completed: false 
        }]);
        setNewTodo("");
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    // Filter todos based on search term
    const filteredTodos = todos.filter(todo =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='main_container'>
            <h1>Todo App</h1>

            <div className='input__field__searchbar'>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className='input__field'>
                <input 
                    type="text"
                    placeholder="Enter new task"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={addTodo} className='add__task__btn'><MdOutlineAddTask className='icons'/></button>
            </div>

            {showWarning && (
                <div className='error__msg'>Please enter a task before adding!</div>
            )}

            <ol>
                {filteredTodos.length === 0 ? (
                    <p>
                        {todos.length === 0 ? 'No tasks yet. Add one above!' : 'No tasks match your search.'}
                    </p>
                ) : (
                    filteredTodos.map((todo) => (
                        <li key={todo.id}>
                            <span style={{ textDecoration: todo.completed ? "line-through" : "none" }} className='completed'>
                                {todo.text}
                            </span>
                            <div>
                                <button onClick={() => toggleTodo(todo.id)}>
                                    {todo.completed ? "✓ Done" : "Mark Done"}
                                </button>
                                <button onClick={() => deleteTodo(todo.id)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ol>
        </div>
    );
};

export default TodoApp;