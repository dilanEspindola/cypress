'use client'

import { Button } from "@mui/material"

export default function PostButton() {

    function handleClick() {
        fetch('http://localhost:3000/examples', { method: 'POST' })
            .then(info => info.json())
            .then(data => console.log(data))
            .catch(err => console.log("something went wrong", err))
    }

    return (
        <Button onClick={handleClick} data-test={"post-button"}>
            Post Data
        </Button>
    )
}