'use client'
import { Button } from '@material-tailwind/react'
import React from 'react'

export default function MyBtn(props) {
    console.log(">>>>", props?.title)

    return (
        <Button
            onClick={props?.onSubmit}
            // onClick={() =>  props?.onSubmit()}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
            {props?.title == null ? "my btn" : props?.title}
        </Button>
    )
}
