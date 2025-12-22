import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom"

const FetchIndv = () => {
    const { id } = useParams()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['post', id],
        queryFn: async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            if (!res.ok) {
                throw new Error('Network response was not ok in FetchIndv')
            }
            return res.json()
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
            <div>
                <p>{data.id}</p>
                <p>{data.title}</p>
                <p>{data.body}</p>
            </div>
            <NavLink to ='/rq'>
                <button>
                    Go Back
                </button>
            </NavLink>

        </>
    )
}

export default FetchIndv