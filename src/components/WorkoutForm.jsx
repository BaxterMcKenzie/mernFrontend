import {useState} from 'react'
import axios from 'axios'
import { useWorkoutsContext } from '../hooks/UseWorkoutsContext';

const baseURL = import.meta.env.VITE_API_BASE_URL

const WorkoutForm = () => {
    // Dispatch for useContext
    const { dispatch } = useWorkoutsContext()

    // Form input state variables
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');

    // Set an error state
    const [error, setError] = useState (null);

    // Image State
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        const user = JSON.parse(localStorage.getItem('user'))
        const user_id = user.email

        // Set up object to send to the database
        // const workout = {title, load, reps, user_id} - USE THIS LINE IF NO IMAGE UPLOAD

        const formData = new FormData();
        formData.append('title', title);
        formData.append('load', load);
        formData.append('reps', reps);
        formData.append('user_id', user_id);
        formData.append('image', image);



        // HTTP Request 
        try {

            // ---------- THIS IS FOR IF YOU HAVE NO IMAGE UPLOAD ----------------

            // const response = await axios.post(`${baseURL}/api/workouts`, workout, {
            //     headers : {
            //         'Content-Type': 'application/json'
            //     }
            // });   

             // ---------- THIS IS FOR IF YOU HAVE NO IMAGE UPLOAD ----------------

            const response = await axios.post(`${baseURL}/api/workouts`, formData, {
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            console.log('new workout added', response.data);
            dispatch({type: 'CREATE_WORKOUTS', payload: response.data})
            
        } catch (error) {
            setError(error.message)
        }
    }


  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>

        <div className='create-form'>
        <label>Exercise Title:
        <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value= {title}
        />
        </label>

        <label>Load (in Kg):
        <input
            type='number'
            onChange={(e) => setLoad(e.target.value)}
            value= {load}
        />
        </label>

        <label>Reps:
        <input
            type='number'
            onChange={(e) => setReps(e.target.value)}
            value= {reps}
        />
        </label>
        </div>

        <div className='upload'>
        <label>Upload Image:
        <input 
        type='file' 
        accept='image/*'
        onChange={(e) => setImage(e.target.files[0])}
        />
        </label>

        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}
        </div>
    </form>
  )
}

export default WorkoutForm
