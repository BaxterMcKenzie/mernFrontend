import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext) // provides both state and dispatch

    // Checking if we are inside the WorkoutContextProvider or not

    if(!context) {
        throw Error('useWorkoutsContext hook must be used inside of WorkoutsContextProvider')
    } // There is only context when this is invoked inside WorkoutsContextProvider

    return context
}