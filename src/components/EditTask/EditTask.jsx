import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useTasks from '../../hooks/useTasks/useTasks';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const EditTask = () => {
    const [allTasks, , refetch] = useTasks();
    const {id} = useParams();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const currentTask = allTasks?.filter(task=>task?.id===id)[0];
    const [task, setTask] = useState({
        id: currentTask?.id,
        name: currentTask?.name,
        email: currentTask?.email,
        details: currentTask?.details,
        priority: currentTask?.details,
        status: currentTask?.status,
        deadline: currentTask?.deadline
    })
    const onSubmit = async (data) => {
        console.log(data)

        if (data.name.length < 3) return toast.error('Task must have at least 3 characters')
        {
            const updatedTask = {
                id: task.id,
                name: task.name,
                email: user?.email,
                details: task.details,
                priority: task.priority,
                status: task.status,
                deadline: task.deadline
            }
            console.log(currentTask);
            console.log(updatedTask);
            await axiosPublic.put(`/tasks/${id}`, updatedTask)
            refetch();
            // console.log(addedTask);
            toast.success("Task Updated!")

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
        <div>
             <form onSubmit={handleSubmit(onSubmit)}>

<div className='flex flex-col md:flex-col lg:flex-row'>
    <div>
        <input required {...register("name", { required: true })} name="name" type="text" placeholder="Update task name" aria-labelledby="name" className="px-7 mr-2 border rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2"  onChange={(e) => setTask({ ...task, name: e.target.value })} value={task.name}/>
        {/* {errors.name && <span className="text-red-600">Name is required</span>} */}
    </div>
    <div>
        <input required {...register("details", { required: true })} name="details" type="text" placeholder="Update task details" aria-labelledby="details" className="px-7 mr-2 border rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2"  onChange={(e) => setTask({ ...task, details: e.target.value })} value={task.details} />
        {/* {errors.name && <span className="text-red-600">Details is required</span>} */}
    </div>
    <div>
       
      
        <select required className='rounded-md mr-2 py-5 px-3' {...register("priority")} onChange={(e) => setTask({ ...task, priority: e.target.value })} >
            <option value="" disabled selected>Select Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>
    </div>
    <div>
        <input required {...register("deadline", { required: true })} name="deadline" type="date" placeholder="Update deadline" aria-labelledby="deadline" className="px-7 mr-2 border rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2" onChange={(e) => setTask({ ...task, deadline: e.target.value })} value={task.deadline} />
        {/* {errors.name && <span className="text-red-600">Details is required</span>} */}
    </div>
</div>

<button className="inline-flex mt-8 h-12 px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">

    Update Task
</button>
</form>
        </div>
    );
};

export default EditTask;