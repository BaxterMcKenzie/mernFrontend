import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {
        // Remove user from Local storage
        localStorage.removeItem('user')

        // Dispatch - logout 
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}