import React, { useState } from 'react';
import toast from 'react-hot-toast';


import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({tasks, setTasks}) => {
    const [task, setTask] = useState({
        id: "", //mongodb will handle this. no need to add later
        name: "",
        status: "todo" //can also be on going, done
    })
    console.log(task);
    const handleSubmit = e =>{
        e.preventDefault();

        if(task.name.length < 3) return toast.error('Task must have more than 3 characters')

        setTasks((prev)=>{
            const list = [...prev, task]

            localStorage.setItem("tasks", JSON.stringify(list))
            toast.success("Task Added!")
            return list
        });

        setTask({
            id: "", //for clearing the form
            name: "",
            status: "todo" //
        })

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
        <input type='text' className="px-7 border rounded-lg p-4 bg-gray-100 transition duration-200 focus:outline-none focus:ring-2"
        value={task.name}
        onChange={(e)=>setTask({...task, id: uuidv4(), name: e.target.value})}
        />
        <button className="inline-flex mt-4 px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3">
            
            Add Task
          </button>
            </form>

            {/* <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg> */}
        </div>
    );
};

export default CreateTask;

