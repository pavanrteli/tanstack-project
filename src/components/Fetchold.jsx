import React from 'react'
import { useState, useEffect } from 'react'
const Fetchold = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const json = await response.json();
            setData(json);
        }
        fetchData()
    }, [])

    console.log(data)

    return (
        <>
            <h4>Fetch Old</h4>
                {
                    data.map((post) => {
                        const { id, title, body } = post;
                        return (
                            <div>
                                <p>{id}</p>
                                <p>{title}</p>
                                <p>{body}</p>
                            </div>)
                    })
                }
        </>
    )
}

export default Fetchold