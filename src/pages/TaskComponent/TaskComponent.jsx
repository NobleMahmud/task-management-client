import React from 'react';
import CreateTask from '../../components/CreateTask/CreateTask';
import ListTasks from '../../components/ListTasks/ListTasks';

const TaskComponent = ({ tasks, setTasks }) => {
    return (
        <div>
            <CreateTask tasks={tasks} setTasks={setTasks}></CreateTask>
            <ListTasks tasks={tasks} setTasks={setTasks}></ListTasks>
        </div>
    );
};

export default TaskComponent;