import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { NavLink } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { useState } from "react"
const Fetchrq = () => {

    const [pageNumber, setPageNumber] = useState(0)
    const queryClient = useQueryClient()

    const fetchPosts = async (pageNumber) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${pageNumber}&_limit=3`)
        if (!res.ok) {
            throw new Error('Network response was not ok')
        }
        return res.json()
    }

    const deletePost = async (postId) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'DELETE'
        })
        return res.json()
    }

    const updatePost = async (postId) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: "I have updated",
                }),
            }

        )
        return res.json()
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['posts', pageNumber],
        queryFn: () => fetchPosts(pageNumber),
        placeholderData: keepPreviousData,
        // staleTime : 10000
        // refetchInterval: 1000,
        // refetchIntervalInBackground:true
    })

    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(['posts', pageNumber], (currEle) => {
                return currEle.filter((post) => post.id !== id)
            })
        }
    })

    const updateMutation = useMutation({
        mutationFn: (id) => updatePost(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(['posts', pageNumber], (currEle) => {
                return currEle.map((post) => post.id == id ? { ...post, title: data.title } : post)
            })
        }
    })

    if (isLoading) {
        return <h4>Loading....</h4>
    }

    if (isError) {
        return <h4>{error.message}</h4>
    }

    return (
        <>
            <h4>Fetching RQ</h4>
            {
                data?.map((post) => {
                    const { id, title, body } = post
                    return (
                        <div>
                            <NavLink to={`/rq/${id}`}>
                                <p>{id}</p>
                                <p>{title}</p>
                                <p>{body}</p>
                            </NavLink>
                            <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
                            <button onClick={() => updateMutation.mutate(id)}>update</button>
                        </div>

                    )
                })
            }
            <div>
                <button disabled={pageNumber === 0} onClick={() => setPageNumber((prev) => prev - 3)}>Prev</button>
                <h2>{pageNumber / 3}</h2>
                <button onClick={() => setPageNumber((prev) => prev + 3)}>Next</button>
            </div>
        </>
    )
}

export default Fetchrq