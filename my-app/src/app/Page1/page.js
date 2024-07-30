'use client'
import React, { useEffect, useState } from 'react'
import { Button, Input } from "@material-tailwind/react";
import { useRouter } from 'next/navigation'


export default function page1() {
    const router = useRouter()
    const [number, setNumber] = useState(0)
    const [listData, setListData] = useState(['bbb', 'ccc', 'ddd'])
    const [listData2, setListData2] = useState(
        [
            { id: 1, topic: "test", description: "test des" },
            { id: 2, topic: "test", description: "test des" },
            { id: 3, topic: "test", description: "test des" },
        ]
    )
    const [test, setTest] = useState("init")
    useEffect(() => {

        fucInit()

    }, [number])

    const fucInit = () => {
        console.log("first")
    }
    const back = () => {
        console.log(" >>>>")
        //todo 
        router.back("")
    }

    const AddNumber = () => {

        setNumber(number + 1)
    }


    const Delete = (index) => {
        //
        console.log('my index >>>', index)
        let dataByIndex = listData[index]

        console.log('dataByIndex >>>', dataByIndex)

        let newData = listData.filter((data) => data != dataByIndex)
        console.log('dataByIndex >>>', newData)

        setListData(newData)
    }

    const add = (index) => {
        //
        // console.log('my index >>>', index)
        // let dataByIndex = listData[index]

        // console.log('dataByIndex >>>', dataByIndex)

        listData.push("eee");
        //console.log('data add>>>', [...newData])
        setListData([...listData])
        console.log('data add>>>', newData)

    }
    return (
        <>
            {/* <input></input> */}
            <div className="w-72">
                <Input
                    label="test" value={test}
                    onChange={(e) => setTest(e.target.value)}
                />
            </div>
            <Button
                class="flex-none w-32 bg-indigo-100"
                onClick={() => back()}
            >
                BACK
            </Button>
            <Button
                class="flex-none w-32 bg-indigo-100"
                onClick={() => add()}
            >
                ADD
            </Button >
            <div >page1</div>
            <div>number :{number}</div>

            {
                listData2.map((obj, index) => {

                    return <>
                        <div>Data :{obj.description}  index : {index}</div>
                        <Button
                            class="flex-none w-32 bg-indigo-100"
                            onClick={() => Delete(index)}
                        >
                            delete
                        </Button >
                    </>
                })
            }
        </>
    )
}