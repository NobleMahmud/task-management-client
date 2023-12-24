import CreateTask2 from "../../components/CreateTask/CreateTask2";
import ListTasks2 from "../../components/ListTasks/ListTasks2";


const TaskComponent2 = ({ tasks, setTasks, refetch }) => {
    return (
        <div className="rounded-md">
            <CreateTask2 tasks={tasks} setTasks={setTasks} refetch={refetch}></CreateTask2>
            <ListTasks2 tasks={tasks} setTasks={setTasks}></ListTasks2>
        </div>
    );
};

export default TaskComponent2;