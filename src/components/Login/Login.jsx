
import {GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth';
import app from '../../firebase/firebase.init';
import { useState } from 'react';
const Login = () => {
    const [user,setUser] = useState(null);
    const   auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const handleGoogleSignIn =()=>{
       signInWithPopup(auth,provider)
       .then(result =>{
        const loggedInUser = result.user;
        setUser(loggedInUser);
       })
       .catch(error =>{
        console.log('error',error);
       })
    }
    const handleSignOut =() =>{
        signOut(auth)
        .then(result =>{
            console.log(result)
            setUser(null);
        })
        .catch(error =>{
            console.log(error)
        })
    }
    const handleGithubSignIn = ()=>{
        signInWithPopup(auth,githubProvider)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser);
        })
        .error(error => {
            console.log(error)
        })
    }

    return (
        <div>
            {/* user ? logout : sign in */}
          { user ?
           <button onClick={handleSignOut}>Sign Out</button> :
            <>
            <button onClick={handleGoogleSignIn}>Goggle Login</button>
            <button onClick={handleGithubSignIn}>GitHub Login</button>
            </>
            }
           
            {user && <div>
                <h3>User : {user.displayName}</h3>
                <p>email : {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;