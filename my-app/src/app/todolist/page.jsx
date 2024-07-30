'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([""]);
    const [newTask, setNewTask] = useState("");
    const [errorTaskInput, setErrorTaskInput] = useState(null)
    const [errorTaskInputOfEdit, setErrorTaskInputOfEdit] = useState(null)
    const searchParams = useSearchParams()
    const emailParams = searchParams.get('email')
    const idParams = searchParams.get('id')

    const [indexEdit, setIndexEdit] = useState(null);

    useEffect(() => {
        // console.log("val email", emailParams)
        // console.log("val id", idParams)

        //get all list tassk by user id
        getAllTaskByUserId(idParams)


    }, [])

    async function getAllTaskByUserId(id) {

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        let response = await fetch("https://localhost:7273/List/GetAllTaskByUserId/" + id, requestOptions)

        if (!response.ok) {
            alert("Error something")
        }
        const json = await response.json();
        // console.log("data list task json >>>>", ...json)
        let data = [...json]
        setTasks(data);
        setNewTask("");

    }


    // Function to allow input
    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    // Function to add a new task
    async function addTask() {

        setErrorTaskInput(null)

        if (!idParams) {
            alert("user id not found !")
            return
        }

        if (newTask.trim() !== "") {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "userId": idParams,
                "taskName": newTask.trim(),
                "description": "wip"
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            let response = await fetch("https://localhost:7273/List/CreateTask", requestOptions)
            if (!response.ok) {
                alert("Error something")
                return
            }

            alert("add task successful")
            getAllTaskByUserId(idParams)

        } else {
            setErrorTaskInput("Require Task input")
        }

    }

    async function updateTaskByTaskId(id, index) {

        setErrorTaskInputOfEdit(null)

        if (!idParams) {
            alert("user id not found !")
            return
        }

        if (!id) {
            alert("task id not found !")
            return
        }

        if (tasks[index]["taskName"].trim() !== "") {

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "userId": idParams,
                "taskName": tasks[index]["taskName"],
                "description": tasks[index]["description"],
                "taskId": id
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            let response = await fetch("https://localhost:7273/List/UpdateTask", requestOptions)
            if (!response.ok) {
                alert("Error something")
                getAllTaskByUserId(idParams)
                return
            }

            alert("update task successful")

        } else {
            setErrorTaskInputOfEdit("Require Task input")
        }

    }

    // Function to delete a task by index
    async function deleteTask(id) {
        // const updatedTasks = tasks.filter((_, i) => i !== index);
        // setTasks(updatedTasks);

        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };

        let response = await fetch("https://localhost:7273/List/DeleteTaskById/" + id, requestOptions)
        if (!response.ok) {
            alert("Error something")
            return
        }

        getAllTaskByUserId(idParams)
    }

    return (
        <div className='to-do-list text-2xl font-semibold text-center cursor-auto bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4'>
            <h1 className="mb-4">
                To-Do List
            </h1>
            <div className="w-full max-w-md mb-4">
                <input
                    type='text'
                    placeholder='Enter a task...'
                    value={newTask}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errorTaskInput != null ? <label className="block text-red-700 text-sm font-bold mb-2">
                    {errorTaskInput}
                </label> :
                    <></>
                }
                <button
                    className='add-button ml-2 px-4 py-2 bg-green-500 text-white rounded-md shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
                    onClick={addTask}
                >
                    Add
                </button>
            </div>

            <ol className="w-full max-w-md space-y-2">
                {tasks.map((task, index) => (
                    <li key={index} className="flex items-center justify-between bg-gray-200 rounded p-2">

                        {indexEdit != null && indexEdit === index ? <><input
                            type='text'
                            placeholder='Enter a task...'
                            value={task.taskName}
                            onChange={(e) => {
                                let taskNameInput = e.target.value
                                // console.log("input change >>>", taskNameInput)
                                tasks[index]["taskName"] = taskNameInput
                                setTasks([...tasks]);

                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                            {errorTaskInputOfEdit != null ? <label className="block text-red-700 text-sm font-bold mb-2">
                                {errorTaskInputOfEdit}
                            </label> :
                                <></>
                            }
                        </>
                            :
                            <span className="text font-sans">{task?.taskName}</span>
                        }

                        {indexEdit != null && indexEdit === index ?
                            <button
                                className='delete-button bg-red-500 text-white rounded-md shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                                onClick={() => {
                                    if (!tasks[index]["taskName"] && tasks[index]["taskName"].toString().trim().length === 0) {
                                        setErrorTaskInputOfEdit("Require Task input")
                                        return
                                    }

                                    updateTaskByTaskId(task?.taskId, index)
                                    setIndexEdit(null)
                                }}
                            >
                                Save
                            </button>
                            :
                            <>
                                <button
                                    className='delete-button bg-red-500 text-white rounded-md shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                                    onClick={() => setIndexEdit(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className='delete-button bg-red-500 text-white rounded-md shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
                                    onClick={() => deleteTask(task?.taskId)}
                                >
                                    Delete
                                </button>
                            </>
                        }



                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ToDoList;
