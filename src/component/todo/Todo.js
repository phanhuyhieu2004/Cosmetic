import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Todo.css"
const TodoList = () => {
    const [todos, setTodos] = useState([]);


    useEffect(() => {
        axios.get("https://dummyjson.com/todos")
            .then(response => {
                setTodos(response.data.todos);
            })
            .catch(error => console.error("Error fetching data: ", error));
    }, []);

    // Khi người dùng đánh dấu một công việc, hàm sẽ tạo một mảng mới bằng cách sử dụng map. Nếu todo.id khớp với id được truyền vào, nó sẽ tạo một đối tượng mới với trường completed được đảo ngược; nếu không, nó sẽ giữ nguyên công việc đó.
    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>To do list</h2>
            <ul style={styles.list}>
                {todos.slice(0,5).
                map(todo => (
                    <li
                        key={todo.id}
                        style={{
                            ...styles.todoItem,
                            backgroundColor: todo.completed ? "#C28282" : "white"
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(todo.id)}
                            style={styles.checkbox}
                        />
                        <span style={{
                            textDecoration: todo.completed ? "line-through" : "none"
                        }}>
              {todo.todo}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


const styles = {
    container: {
        maxWidth: "30%",
        minWidth: "400px",
        margin: "0 auto",

        borderRadius: "8px",
        backgroundColor: "#099494",
    },
    header: {
        textAlign: "left",
        padding: "10px",
    },
    list: {
        listStyleType: "none",
        padding: "0"
    },
    todoItem: {
        padding: "10px",

        display: "flex",
        alignItems: "center",

        border: "1px solid #ddd",
        transition: "background-color 0.3s ease"
    },
    checkbox: {
        marginRight: "10px",
        transform: "scale(1.2)"
    }
};

export default TodoList;
