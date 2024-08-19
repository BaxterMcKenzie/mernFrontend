import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

// Import custom context hook
import { useWorkoutsContext } from '../hooks/UseWorkoutsContext';

// Date FNZ
import {formatDistanceToNow} from 'date-fns'

const baseURL = import.meta.env.VITE_API_BASE_URL

const WorkoutDetails = ({workout}) => { 

  // Bring in dispatch method
  const {dispatch} = useWorkoutsContext();
  const navigate = useNavigate();

  // State variable for the edit
  const [isEditing, setIsEditing] = useState(false);

  // State for the edit form inputs:
  const [editTitle, setEditTitle] = useState(workout.title);
  const [editLoad, setEditLoad] = useState(workout.load);
  const [editReps, setEditReps] = useState(workout.reps);

  // Comment states
  const [commentText, setCommentText] = useState(''); // User input for comment
  const [showComments, setShowComments] = useState(false) // Hide/Show of comments

  // User 
  const user = JSON.parse(localStorage.getItem('user'));
  const user_id = user.email;

  // Add comment Function
  const handleAddComment = async () => {
    try {
      const response = await axios.post(`${baseURL}/api/comments/workouts/${workout._id}/comments`,
        {
          text: commentText, // from the state variable
          user_id: user_id // should already be defined in your component (State Variable)
        }
      );

      if (response.status === 201) {
        // Update the component State to include the new commment:
        const newComment = response.data;
        const updatedComments = [...workout.comments, newComment];
        
        const updatedWorkout = {...workout, comments: updatedComments};

        // Dispatch the updated workout data - update the context when a comment is created
        dispatch({ type: 'UPDATE_WORKOUT', payload: updatedWorkout});

        // Clear the comment state:
        setCommentText('');
      }

    } catch (error) {
      console.error('Error Adding Comment!', error);
    }
  };
  
  const handleDelete = async () => {
    const response = await axios.delete(`${baseURL}/api/workouts/${workout._id}`)

    const json = await response.data

    if (response.status === 200 ) {
      console.log(json)
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSubmitEdit = async () => {
    const updatedWorkout = {
      title: editTitle,
      load: editLoad,
      reps: editReps
    };

    try {
      const response = await axios.patch(
        `${baseURL}/api/workouts/${workout._id}`,
        updatedWorkout
      );
      const updatedData = response.data;

      if (response.status === 200) {
        console.log(response);
        console.log(updatedData);
        dispatch({type: 'UPDATE_WORKOUT', payload: updatedData});
        setIsEditing(false);
      }

    } catch (error) {
      console.error('Error updating workout', error);
    }
  }

  const handleCancelEdit = () => {
    setEditTitle(workout.title)
    setEditLoad(workout.load)
    setEditReps(workout.reps)
    setIsEditing(false);
  }

  const handleNavigate = () => {
    let path = `/${workout._id}`
    navigate(path)
  }

  // Function to split the email address
  const getEmailCharactersBeforeAtSymbol = (email) => {
    const delimiter = '@';
    const parts = email.split(delimiter);
    return parts.length > 1 ? parts[0] : '';
  };

  return (
    <div className='workout-details'>
      {isEditing ? (
        <div className='edit-modal'>

          <label>Edit Workout Title:</label>
          <input
            type='text'
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <label>Edit Load:</label>
          <input
            type='text'
            value={editLoad}
            onChange={(e) => setEditLoad(e.target.value)}
          />

          <label>Edit Reps:</label>
          <input
            type='text'
            value={editReps}
            onChange={(e) => setEditReps(e.target.value)}
          />

          <button onClick={handleCancelEdit}>Cancel</button>
          <button onClick={handleSubmitEdit}>Save</button>

        </div>
      ) : (
        <>
          <h4>{workout.title}</h4>
          {workout.image && (
            <img className='workout-image' src={`${baseURL}/public/uploads/${workout.image}`} alt={workout.title}/>
          )}
          <p><strong>Load (kg): </strong>{workout.load}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <p>{formatDistanceToNow(new Date(workout.createdAt), {includeSeconds: true}, {addSuffix: true})}</p>
          <p>Created by: {workout.user_id ? getEmailCharactersBeforeAtSymbol(workout.user_id) : 'Unknown'}</p>

          <button onClick={handleNavigate}>Read More</button>

          {/* Edit & Delete Buttons */}
          <span className='button' onClick={handleEdit}>
            <i className='fa-solid fa-pen'></i>
          </span>

          <span className='button' onClick={handleDelete}>
          <i className="fa-solid fa-trash-can"></i>
          </span>
        </>
      )}
      <button
       onClick={() => {
        setShowComments(!showComments)
        console.log(workout.comments[0])
       }}
      >
        {showComments ? 'Hide Comments' : 'Show comments'}
        </button>

        {showComments && (
          <>
            <div className='comments'>
              {workout.comments.map((comment) => (
                <div key={comment._id} className='comment'>
                  <h5>{getEmailCharactersBeforeAtSymbol(comment.user_id)}</h5>
                  <p>{comment.text}</p>
                  <span>Posted: {formatDistanceToNow(new Date (comment.createdAt), 
                  // Include Seconds shows how long ago
                  {includeSeconds: true})}{''}ago</span>
                </div>
              ))}
            </div>

            {/* Add Comments Section */}
            <div className='add-comment'>
              <label>Add New Comment</label>
              <input
                type='text'
                placeholder='Add a comment...'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button onClick={handleAddComment}>Submit</button>
          </div>
          </>
        )}
    </div>
  )
}

export default WorkoutDetails
