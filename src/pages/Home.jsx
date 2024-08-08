import {useState, useEffect} from 'react'
import axios from 'axios'
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await axios.get('http://localhost:4000/api/workouts/')
            // console.log(response.data);
            if (response.status === 200) {
                setWorkouts(response.data)
            }
        }

        fetchWorkouts();
    }, []);

  return (
    <div className='home'>
      <div className='workouts'>
        {workouts && workouts.map((workout) => {
            return (
                <WorkoutDetails key={workout._id} workout={workout}/>
            )
        })}
      </div>
      <WorkoutForm/>
    </div>
  )
}

export default Home
