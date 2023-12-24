import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import useTasks from '../../hooks/useTasks/useTasks';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Link, useNavigate } from 'react-router-dom';

const ListTasks2 = ({ tasks, setTasks }) => {

    const [allTasks, loading, refetch] = useTasks();

    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [closed, setClosed] = useState([]);

    useEffect(() => {
        refetch()

        //using this makes the status change not appear, needs adjustments
        const fTodos = allTasks?.filter(task => task.status === "todo");
        const fInProgress = allTasks?.filter(task => task.status === "inprogress");
        const fClosed = allTasks?.filter(task => task.status === "closed");


        setTodos(fTodos)
        setInProgress(fInProgress)
        setClosed(fClosed)
    }, [tasks, allTasks])

    const statuses = ["todo", "inprogress", "closed"]

    return (
        <div className='flex gap-16'>
            {statuses.map((status, idx) => <Section
                key={idx}
                status={status}
                tasks={tasks}
                todos={todos}
                inProgress={inProgress}
                closed={closed} />)}
        </div>
    );
};

export default ListTasks2;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    let text = "Todo"
    let bg = "bg-gray-500"
    let tasksToMap = todos;

    if (status === "inprogress") {
        text = "On Going"
        bg = "bg-purple-500"
        tasksToMap = inProgress;
    }
    if (status === "closed") {
        text = "Completed"
        bg = "bg-green-500"
        tasksToMap = closed;
    }
    const axiosPublic = useAxiosPublic();
    const [allTasks, loading, refetch] = useTasks();
    const addItemToSection = async (id) => {

        const updatedTask = {
            id,
            status
        }
        await axiosPublic.patch(`/tasks/${id}`, updatedTask)
        console.log('dropped', id, status);
        refetch()
        toast(`Task status changed to ${status}`, { icon: "👍" })

    }

    return (
        <div ref={drop} className={`w-64 pb-8 pt-8 rounded-md p-2 ${isOver ? "bg-gray-200" : ""}`}>
            <Header text={text} bg={bg} count={tasksToMap?.length} />
            {tasksToMap?.length > 0 && tasksToMap.map((task) =>
                <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />)}
        </div>
    )
}

const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text}
            <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>
                {count}
            </div>
        </div>
    )
}

const Task = ({ task, tasks }) => {
    const axiosPublic = useAxiosPublic();
    const [allTasks, loading, refetch] = useTasks()
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    console.log(isDragging);

    const handleRemove = async (id) => {
        await axiosPublic.delete(`/tasks/${id}`)
        refetch()
        toast("Task Removed", { icon: "💀" })
    }

    const handleEdit = (id) => {
    }
    return (
        <div ref={drag} className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"}`}>
            <p className='text-brown-400'>{task.name}</p>
            <div className=' bg-white absolute right-2 top-3 px-2 min-w-10 h-6 text-red-600 rounded-md flex items-center justify-center'>
                {task.priority}
            </div>
            <p className='text-brown-400'>Details: {task.details}</p>
            <p className='text-brown-400'>Deadline: {task.deadline}</p>
            <Link to={`/tasks/${task.id}`}><button onClick={()=>handleEdit(task.id)} className='absolute bottom-1 right-10 text-blue-gray-400'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>

            </button></Link>
            <button className='absolute bottom-1 right-1 text-blue-gray-400'
                onClick={() => handleRemove(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </div>
    )
}
// const Edit = ()=>{

// }