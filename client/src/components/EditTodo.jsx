import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios.config';

function EditTodo() {
    const [task, setTask] = useState({
        TaskName: '',
        Due: '',
        Category: '',
        Urgency: '',
        Status: ''
    });
    const { ID } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`/get_todo/${ID}`)
            .then((res) => {
                if (res.data && res.data.length > 0) {
                    setTask(res.data[0]);  // Pastikan data yang diterima adalah array dan set pada state task
                }
            })
            .catch((err) => console.log(err));
    }, [ID]);

    function handleSubmit(e) {
        axios
            .post(`/edit_todo/${ID}`, task)
            .then((res) => {
                navigate('/Todo');
                console.log(res);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="ml-72">
            <div className="px-10 pt-0 pb-5 gap-5">
                <h1 className="py-10 text-blacktext font-extrabold text-4xl">
                    <i className="fa-solid fa-square-check text-3xl text-blacktext mr-4"></i>
                    Edit Task
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="font-semibold" htmlFor="TaskName">Task Name</label>
                        <input
                            className="text-sm mb-2 p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full"
                            type="text"
                            name="TaskName"
                            placeholder="Input your task name"
                            value={task.TaskName}
                            onChange={(e) => setTask({ ...task, TaskName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="Due">Due</label>
                        <input
                            className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full"
                            type="date"
                            name="Due"
                            value={task.Due}
                            onChange={(e) => setTask({ ...task, Due: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="Category">Category</label>
                        <select
                            className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full"
                            name="Category"
                            value={task.Category}
                            onChange={(e) => setTask({ ...task, Category: e.target.value })}
                        >
                            <option value="">Choose Category</option>
                            <option value="College">College</option>
                            <option value="Work">Work</option>
                            <option value="Organization">Organization</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="Urgency">Urgency</label>
                        <select
                            className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full"
                            name="Urgency"
                            value={task.Urgency}
                            onChange={(e) => setTask({ ...task, Urgency: e.target.value })}
                        >
                            <option value="">Choose Urgency</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-semibold" htmlFor="Status">Status</label>
                        <select
                            className="mb-2 text-sm font-extralight p-2 border-2 border-blacktext border-opacity-50 rounded-lg h-[38px] w-full"
                            name="Status"
                            value={task.Status}
                            onChange={(e) => setTask({ ...task, Status: e.target.value })}
                        >
                            <option value="">Choose Status</option>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="bg-bluebox text-primary font-semibold text-md px-2 py-1 rounded-lg">Update Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTodo;
