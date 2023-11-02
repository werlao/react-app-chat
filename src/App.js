import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {

    const [user] = useAuthState(auth);

    return (
        <div>
            {!user ? <LoginPage /> : <HomePage />}
        </div>
    );
}

export default App;