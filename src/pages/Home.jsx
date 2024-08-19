import {useEffect, useState} from 'react'
import axios from 'axios'
import { useWorkoutsContext } from '../hooks/UseWorkoutsContext'


// Import Components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const baseURL = import.meta.env.VITE_API_BASE_URL

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const [myWorkouts, setMyWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {

            const response = await axios.get(`${baseURL}/api/workouts/`)

            // console.log(response.data);
            if (response.status === 200) {
              dispatch({type:'SET_WORKOUTS' , payload: response.data})
            }
        }

        fetchWorkouts();
    }, []);

    const handleMyWorkouts = () => {
      setMyWorkouts(true)
    }

    const handleAllWorkouts = () => {
      setMyWorkouts(null)
    }



  return (
    <div className='home'>
      <div className='workouts'>
        <button onClick={handleMyWorkouts}>My Workouts</button>
        <button onClick={handleAllWorkouts}>All Workouts</button>

        {myWorkouts ? (workouts && workouts.map((workout) => {
          const user = JSON.parse(localStorage.getItem('user'))
          const user_id = user.email
          if (workout.user_id === user_id) {
            return (
              <WorkoutDetails key={workout._id} workout={workout}/>
            )
          }

        })) :  (workouts && workouts.map((workout) => {
          return (
              <WorkoutDetails key={workout._id} workout={workout}/>
          )
        })
      )}

      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home
