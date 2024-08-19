import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const getEmailCharactersBeforeAtSymbol = (email) => {
    const delimiter = '@';
    const parts = email.split(delimiter);
    return parts.length > 1 ? parts[0] : '';
  };

  const handleClick = () => {
    logout()
  }

  return (
    <header>
        <div className='container'>
            <Link to = '/'>
                <img className='jims' src={"/img/jims_gym.svg"} alt="Jim's Gym Logo" />
            </Link>
            <nav>

              {user && (<div>
                <span className='welcome-back-user'><span className='welcome-back'>WELCOME BACK!</span> {getEmailCharactersBeforeAtSymbol(user.email)}</span>
                <button onClick={handleClick}>Logout</button>
              </div>)}

              {!user && (<div>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>SignUp</Link>
              </div>)}

            </nav>
        </div>
    </header>
  )
}

export default Navbar
