import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload // update all the workouts to new workouts
            }
        case 'CREATE_WORKOUTS':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            // filters over the existing state workouts and makes sure that their _id does not
			// match our deleted workouts _id
			// We only want to keep what doesnt match
            }
        case 'UPDATE_WORKOUT':{
                const updatedWorkout = action.payload;
                const updatedWorkouts = state.workouts.map(workout => {
                    if(workout._id === updatedWorkout._id ) {
                        // Swap the workout for the new one if the ID's match
                        return updatedWorkout
                    }

                    // Return each workout 
                    return workout
                });

                // return the map of the updated workouts
                return {
                    workouts: updatedWorkouts
                }
            }

        default:
            return state
    }
}

export const WorkoutsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })
    
    return (
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            {children}
        </WorkoutsContext.Provider>
    )
}