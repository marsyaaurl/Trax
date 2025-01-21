import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios.config';

function Todo() {
    const [task, setTask] = useState([])
    const [deleted, setDeleted] = useState(true)
    useEffect(() => {
        if(deleted){
            setDeleted(false)
        }
        axios.get('/todo')
            .then((res) => {
                console.log('Data fetched:', res.data);
                setTask(res.data);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    }, [deleted]);

    function handleDelete(ID){
        axios.delete(`/delete_todo/${ID}`)
        .then((res)=>{
            if (res.data.success)
                setDeleted(true)
        })
        .catch((err)=> console.log(err))
    }

    const [values, setValues] = useState({
        TaskName: '',
        Due: '',
        Category: '',
        Urgency: '',
        Status: ''
    });

    const navigate = useNavigate();

    function handleSubmit(e) {

        // Validasi sederhana
        if (!values.TaskName || !values.Due || !values.Category || !values.Urgency || !values.Status) {
            alert('Please fill in all fields!');
            return;
        }

        axios.post('/add_task', values)
            .then((res) => {
                console.log(res);
                navigate('/Todo');
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div className="ml-72">
                <h1 className="p-10 text-blacktext font-extrabold text-4xl">
                    <i className="fa-solid fa-square-check text-3xl text-blacktext mr-4"></i>
                    To-do
                </h1>
                <div className="px-10 pt-0 pb-10 flex gap-5">
                    <table className="border-2 w-full border-blacktext border-opacity-50 rounded-lg border-separate">
                        <thead className="font-semibold">
                            <td className="px-2 border-r border-blacktext border-opacity-50">Task Name</td>
                            <td className="px-2 border-r border-blacktext border-opacity-50">Due</td>
                            <td className="px-2 border-r border-blacktext border-opacity-50">Category</td>
                            <td className="px-2 border-r border-blacktext border-opacity-50">Urgency</td>
                            <td className="px-2 border-r border-blacktext border-opacity-50">Status</td>
                            <td className="px-2">Edit/Delete</td>
                        </thead>
                        <tbody>
                            {task.map((todo) => {
                                return (
                                    <tr key={todo.ID}>
                                        <td className="px-2 border-t border-r border-blacktext border-opacity-50">{todo.TaskName}</td>
                                        <td className="px-2 border-t border-r border-blacktext border-opacity-50">
                                        {new Date(todo.Due).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="px-2 border-t border-r border-blacktext border-opacity-50">{todo.Category}</td>
                                        <td className="px-2 border-t border-r border-blacktext border-opacity-50">{todo.Urgency}</td>
                                        <td className="px-2 border-t border-r border-blacktext border-opacity-50">{todo.Status}</td>
                                        <td className="px-2 border-t border-blacktext border-opacity-50">
                                            <Link to={`/EditTodo/${todo.ID}`}><button className="bg-bluebox text-primary font-semibold mr-2 text-md px-2 py-1 rounded-lg">Edit</button></Link>
                                            <button className="bg-bluebox text-primary font-semibold text-md px-2 py-1 rounded-lg" onClick={()=>handleDelete(todo.ID)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="px-10 pt-0 pb-5 gap-5">
                    <div className="mb-2">
                        <h3 className="font-bold text-xl">Add New Task</h3>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="font-semibold" htmlFor="TaskName">Task Name</label>
                                <input className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" type="text" name="TaskName" placeholder="Input your task name" onChange={(e) => setValues({ ...values, TaskName: e.target.value })} />
                            </div>
                            <div>
                                <label className="font-semibold" htmlFor="Due">Due</label>
                                <input className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" type="date" name="Due" onChange={(e) => setValues({ ...values, Due: e.target.value })} />
                            </div>
                            <div>
                                <label className="font-semibold" htmlFor="Category">Category</label>
                                <select className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" name="Category" onChange={(e) => setValues({ ...values, Category: e.target.value })}>
                                    <option value="">Choose Category</option>
                                    <option value="College">College</option>
                                    <option value="Work">Work</option>
                                    <option value="Organization">Organization</option>
                                </select>
                            </div>
                            <div>
                                <label className="font-semibold" htmlFor="Urgency">Urgency</label>
                                <select className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" name="Urgency" onChange={(e) => setValues({ ...values, Urgency: e.target.value })}>
                                    <option value="">Choose Urgency</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="font-semibold" htmlFor="Status">Status</label>
                                <select className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full" name="Status" onChange={(e) => setValues({ ...values, Status: e.target.value })}>
                                    <option value="">Choose Status</option>
                                    <option value="Not Started">Not Started</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                            <div>
                                <button type="submit" className="bg-bluebox text-primary font-semibold text-md px-2 py-1 rounded-lg">Add Task</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Todo;
