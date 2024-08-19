import React from 'react'
import { useNavigate } from 'react-router-dom'

const SingleWorkout = () => {
    const navigate = useNavigate()

  return (
    <>
        <div>Single Workout</div>
        <button onClick={() =>navigate(-1)}>Go Back</button>
    </>
  )
}

export default SingleWorkout
