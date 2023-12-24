import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import useTasks from '../../hooks/useTasks/useTasks';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const ListTasks2 = ({tasks, setTasks}) => {

    const [allTasks, loading, refetch] = useTasks();

    const[todos, setTodos] = useState([]);
    const[inProgress, setInProgress] = useState([]);
    const[closed, setClosed] = useState([]);

    useEffect(()=>{
        refetch()
        
        //using this makes the status change not appear, needs adjustments
        const fTodos = allTasks?.filter(task=>task.status==="todo");
        const fInProgress = allTasks?.filter(task=>task.status==="inprogress");
        const fClosed = allTasks?.filter(task=>task.status==="closed");
        // const fTodos = tasks?.filter(task=>task.status==="todo");
        // const fInProgress = tasks?.filter(task=>task.status==="inprogress");
        // const fClosed = tasks?.filter(task=>task.status==="closed");

        setTodos(fTodos)
        setInProgress(fInProgress)
        setClosed(fClosed)
    },[tasks, allTasks])

    const statuses = ["todo", "inprogress", "closed"]

    return (
        <div className='flex gap-16'>
            {statuses.map((status, idx)=><Section 
            key={idx} 
            status={status} 
            tasks={tasks} 
            setTasks={setTasks} 
            todos={todos} 
            inProgress={inProgress} 
            closed={closed}/>)}
        </div>
    );
};

export default ListTasks2;

const Section = ({status, tasks, setTasks, todos, inProgress, closed}) =>{

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item)=>addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
      }))

    let text = "Todo"
    let bg = "bg-gray-500"
    let tasksToMap = todos;

    if(status==="inprogress"){
        text = "In Progress"
        bg = "bg-purple-500"
        tasksToMap = inProgress;
    }
    if(status==="closed"){
        text = "Closed"
        bg = "bg-green-500"
        tasksToMap = closed;
    }
    const axiosPublic = useAxiosPublic();
    const addItemToSection = (id) =>{
        
        const updatedTask = {
            id,
            status
        }
        axiosPublic.patch(`/tasks/${id}`, updatedTask)
        console.log('dropped', id, status);
        
        setTasks(prev=>{
            // console.log("prev", prev);

            const mTasks = prev.map(t=>{
                if(t.id===id){
                    return {...t, status: status}
                }
                return t;
            })

            // localStorage.setItem("tasks", JSON.stringify(mTasks));
            toast(`Task status changed to ${status}`, {icon: "👍"})

            return mTasks;
        })
    }

    return (
        <div ref={drop} className={`w-64 min-h-svh rounded-md p-2 ${isOver ? "bg-gray-200" : ""}`}>
            <Header text={text} bg={bg} count={tasksToMap?.length}/>
            {tasksToMap?.length>0 && tasksToMap.map((task)=>
            <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks}/>)}
        </div>
    )
}

const Header = ({text, bg, count}) =>{
    return (
        <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white`}>
            {text}
            <div className='ml-2 bg-white w-5 h-5 text-black rounded-full flex items-center justify-center'>
                {count}
            </div>
        </div>
    )
}

const Task = ({task, tasks, setTasks}) =>{
    const axiosPublic = useAxiosPublic();
    const [allTasks, loading, refetch] = useTasks()
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: {id: task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }))
      console.log(isDragging);

    const  handleRemove = async(id) =>{
        // console.log(id);
        const fTasks = tasks?.filter(t=>t.id !==id);
       await axiosPublic.delete(`/tasks/${id}`)
       refetch()
       toast("Task Removed", {icon: "💀"})
       
        // localStorage.setItem("tasks", JSON.stringify(fTasks))
        // setTasks(fTasks)
        //     refetch()
        // toast("Task Removed", {icon: "💀"})
    }
    return (
       <div ref={drag} className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-25" : "opacity-100"}`}>
        <p>{task.name}</p>
        <button className='absolute bottom-1 right-1 text-blue-gray-400'
        onClick={()=>handleRemove(task.id)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

        </button>
       </div>
    )
}