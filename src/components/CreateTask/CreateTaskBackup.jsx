import React, { useState } from 'react';
import toast from 'react-hot-toast';


import { v4 as uuidv4 } from 'uuid';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth/useAuth';

const CreateTask2 = ({ tasks, setTasks, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const [task, setTask] = useState({
        id: "", //mongodb will handle this. no need to add later
        name: "",
        status: "todo" //can also be on going, done
    })
    // console.log(task);
    const handleSubmit = e => {
        e.preventDefault();

        if (task.name.length < 3) return toast.error('Task must have at least 3 characters')
        {

            setTasks((prev) => {
                const list = [...prev, task]
                const addedTask = {
                    id: task.id,
                    name: task.name,
                    email: user?.email,
                    status: "todo"
                }
                axiosPublic.post('/tasks', addedTask)
                refetch();
                toast.success("Task Added!")
                return list
            });
        }

        setTask({
            id: "", //for clearing the form
            name: "",
            status: "todo" //
        })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' className="px-7 mr-2 border rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
                />
                <input type='text' className="px-7 mr-2 border rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
                />
                <input type='text' className="px-7 border rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
                />
                <button className="inline-flex mt-4 px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">

                    Add Task
                </button>
            </form>

        </div>
    );
};

export default CreateTask2;

