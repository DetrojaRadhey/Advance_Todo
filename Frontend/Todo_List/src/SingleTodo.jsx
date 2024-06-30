import { useState } from "react"
import axios from "axios";

export default function SingleTodo({todo,activate,updateActivation}){
    const [Todo,setTodo] = useState(todo.task);
    const [rate,setRate] = useState(todo.priority);

    const handleChange = () => {
        updateActivation(true);
    };

    let removeTask = (id) => {
        axios.delete(`http://localhost:8080/tasks/delete/${id}`)
        .then((res)=>{
            console.log(res.data);
            handleChange();
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    let updateOne = (id) => {
        axios.put(`http://localhost:8080/tasks/changestate/${id}`)
        .then((res)=>{
            console.log(res.data);
            handleChange();
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    let updateTodoValue = (event) => {
        setTodo(event.target.value)
    }

    let updateTask = () => {
        const key = todo._id;
        axios.put(`http://localhost:8080/tasks/update/${key}`,{Todo,rate})
        .then((res)=>{
            console.log(res.data);
            handleChange();
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <tr>
            <td><big style={todo.isDone==true?{textDecoration: "line-through"}:{}}><u>{todo.task}</u></big></td>
            <td><input type="range" min={1} max={5} value={rate} onChange={(e)=>{setRate(e.target.value)}} /></td>
            <td><input type="text" placeholder='Update Task' value={Todo} onChange={updateTodoValue}/></td>
            <td><button onClick={updateTask}>Save</button></td>
            <td><button onClick={()=>updateOne(todo._id)}>{todo.isDone==false?"Mark as complete":"Mark as incomplete"}</button></td>
            <td><button onClick={()=>removeTask(todo._id)}>Delete</button></td>
        </tr>
    )
}