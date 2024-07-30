'use client'
import MyBtn from '@/Components/MyBtn';
import { useRouter } from 'next/navigation';
// import { Button } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)
  const router = useRouter()

  const handleSubmit = async (event) => {

    setErrorEmail(null)
    setErrorPassword(null)

    event.preventDefault();
    // Handle form submission logic here
    // console.log("event >>> ", event)
    // console.log("event 1>>> ", event.target.email.value)
    // console.log("event 2>>> ", event.target.password.value)

    let EmailInput = event.target.email.value
    let PasswordInput = event.target.password.value

    if (!EmailInput && EmailInput.toString().trim().length === 0) {
      setErrorEmail("require email")
    }

    if (!PasswordInput && PasswordInput.toString().trim().length === 0) {
      setErrorPassword("require email")
    }


    //send data
    // https://localhost:7273/User/Login
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "password": PasswordInput,
      "email": EmailInput
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    // fetch("https://localhost:7273/User/Login", requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => console.log(result))
    //   .catch((error) => console.error(error));

    let response = await fetch("https://localhost:7273/User/Login", requestOptions)
    const json = await response.json();
    // console.log("data json >>>>", json)

    if (!response.ok) {
      alert("Error something")
    }

    const { errorMessage, id, email } = json
    // let error = json?.errorMessage
    // if (errorMessage) {
    //   alert(errorMessage)
    // }

    // console.log("data json id, email >>>>", id)
    // console.log("data json id, email >>>>", email)
    router.push("todolist" + "?email=" + email + "&id=" + id)

  };

  const goTodolistPage = () => {

    let value = "xxxx1"
    // router.push("todolist" + "?testParams=" + value)

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
          />
          {errorEmail != null ? <label className="block text-red-700 text-sm font-bold mb-2">
            Email Error
          </label> :
            <></>
          }
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
          />
          {errorPassword != null ? <label className="block text-red-700 text-sm font-bold mb-2">
            Password Error
          </label> :
            <></>
          }
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          {/* <MyBtn
            title='Sign In xxxxx'
          // onSubmit={goTodolistPage}
          /> */}
        </div>
      </form>
    </div>
  );
};

export default Home;
