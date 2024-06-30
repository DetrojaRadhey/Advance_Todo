import { useState,useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import SingleTodo from "./SingleTodo";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { PieChart } from '@mui/x-charts/PieChart';

export default function TodoList(){
    let [todos,setTodos] = useState([{}]);
    let [newTodo,setNewTodo] = useState("");
    const [search,setSearch] = useState("");
    const [searchRate,setSearchRate] = useState(0);
    const [star,setStar] = useState(3);
    const navigate = useNavigate();
    let [pieData,setPiedata] = useState([]);
    const [activate,setActivate] = useState(true);

    useEffect(()=>{
        axios.get("http://localhost:8080/tasks")
        .then((res)=>{
            setTodos(res.data.tasks);
            setPiedata(res.data.pieData);
            setActivate(false);
        })
        .catch((err)=>{
            console.log(err);
        });
    },[activate])

    let addNewTask = () => {
        axios.post("http://localhost:8080/tasks/add",{newTodo,star})
        .then((res)=>{
            console.log(res.data);
            setActivate(true);
        })
        .catch((err)=>{
            console.log(err);
        })
        setNewTodo("")
        setStar(3)
    }

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value)
    }

    let doneAll = () => {
        axios.put(`http://localhost:8080/tasks/setTrue`)
        .then((res)=>{
            console.log(res.data);
            setActivate(true);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    let cancelAll = () => {
        axios.put(`http://localhost:8080/tasks/setFalse`)
        .then((res)=>{
            console.log(res.data);
            setActivate(true);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    let handleSearch = () => {

        if(search=="" && searchRate==0){
            return;
        }

        axios.put("http://localhost:8080/tasks/search",{key1: search, key2: searchRate})
        .then((res)=>{
            setTodos([{}]);
            setTodos(res.data)
        })
        .catch((err)=>{
            console.log(err);
        });
        setSearch("")
        setSearchRate(0)
    }

    const updateActivation = (newstate) => {
        setActivate(newstate);
    };

    return(
        <div>
            <h1><u>Todo List</u></h1>

            <table style={{margin:'auto'}}>
                <thead>
                    <tr>
                        <th>Write Task</th>
                        <th>Set Priority</th>
                        <th>Add in list</th>
                    </tr>
                    <tr>
                        <th><input type="text" placeholder='Add Task' value={newTodo} onChange={updateTodoValue}/></th>
                        <th><input type="range" min={1} max={5} value={star} onChange={(e)=>{setStar(e.target.value)}}/></th>
                        <th><button onClick={addNewTask}>Add</button></th>
                    </tr>
                </thead>
            </table>

            <br /><br /><hr />
            <input type="text" placeholder='Search Task' value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
            <select value={searchRate} onChange={(e)=>setSearchRate(e.target.value)}>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <button onClick={handleSearch}><ManageSearchIcon/></button>
            <div style={{display: "flex",justifyItems: "center"}}>
                <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: pieData[0], label: '1 Rating' },
                          { id: 1, value: pieData[1], label: '2 Rating' },
                          { id: 2, value: pieData[2], label: '3 Rating' },
                          { id: 3, value: pieData[3], label: '4 Rating' },
                          { id: 4, value: pieData[4], label: '5 Rating' },
                        ],
                      },
                    ]}
                    width={400}
                    height={200}
                />
            </div>
            <br /><br /><hr />
            {
                todos.length==0 ? <h2>Tasks not found.</h2> :
                <table>
                    <thead>
                        <tr>
                            <th><h3>Task</h3></th>
                            <th><h3>Priority</h3></th>
                            <th><h3>Edit Task</h3></th>
                            <th><h3>Save Changes</h3></th>
                            <th><h3>Delete</h3></th>
                            <th><h3>State</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo)=>(
                                <SingleTodo key={todo._id} todo = {todo} activate={activate} updateActivation={updateActivation} />
                            ))
                        }
                    </tbody>
                </table>
            }



            <br /><br />
            <button onClick={doneAll}>Mark all as complete</button>
            <button onClick={cancelAll}>Mark all as incomplete</button>
        </div>
    )
}