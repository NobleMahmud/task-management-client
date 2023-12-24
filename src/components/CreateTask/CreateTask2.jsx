import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth/useAuth';

const CreateTask2 = ({ tasks, setTasks, refetch }) => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const [task, setTask] = useState({
        id: "",
        name: "",
        email: "",
        details: "",
        priority: "",
        status: "todo",
        deadline: ""
    })
    // const handlePriority = (priority) =>{
    //     console.log(priority);
    // }
    const onSubmit = async (data) => {
        console.log(data)

        if (data.name.length < 3) return toast.error('Task must have at least 3 characters')
        {
            const addedTask = {
                id: task.id,
                name: task.name,
                email: user?.email,
                details: task.details,
                priority: task.priority,
                status: "todo",
                deadline: task.deadline
            }
            await axiosPublic.post('/tasks', addedTask)
            refetch();
            // console.log(addedTask);
            toast.success("Task Added!")

            setTask({
                id: "",
                name: "",
                details: "",
                priority: "",
                status: "todo",
                deadline: ""
            })
        }


    }

    return (
        <div className='mt-8'>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='flex flex-col md:flex-col lg:flex-row'>
                    <div>
                        <input required {...register("name", { required: true })} name="name" type="text" placeholder="Enter task name" aria-labelledby="name" className="px-7 mr-2 border rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2" onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })} value={task.name} />
                        {/* {errors.name && <span className="text-red-600">Name is required</span>} */}
                    </div>
                    <div>
                        <input required {...register("details", { required: true })} name="details" type="text" placeholder="Enter task details" aria-labelledby="details" className="px-7 mr-2 border rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2" onChange={(e) => setTask({ ...task, id: uuidv4(), details: e.target.value })} value={task.details} />
                        {/* {errors.name && <span className="text-red-600">Details is required</span>} */}
                    </div>
                    <div>
                       
                      
                        <select required className='rounded-md mr-2 py-5 px-3' {...register("priority")} onChange={(e) => setTask({ ...task, id: uuidv4(), priority: e.target.value })} >
                            <option value="" disabled selected>Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div>
                        <input required {...register("deadline", { required: true })} name="deadline" type="date" placeholder="Enter deadline" aria-labelledby="deadline" className="px-7 mr-2 border rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2" onChange={(e) => setTask({ ...task, id: uuidv4(), deadline: e.target.value })} value={task.deadline} />
                        {/* {errors.name && <span className="text-red-600">Details is required</span>} */}
                    </div>
                </div>

                <button className="inline-flex mt-8 h-12 px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">

                    Add Task
                </button>
            </form>

        </div>
    );
};

export default CreateTask2;

