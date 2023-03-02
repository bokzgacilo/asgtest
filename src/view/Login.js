import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { signInWithGoogle, auth } from "../firebase";
import './login.css'

function Login() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return navigate("/chat");
  }, [user]);

  return(
    <>
      <div className="login-container">
        <h2>Sample Chat</h2>
        <button className="login-button" onClick={signInWithGoogle}>Enter chats using Google</button>
      </div>
    </>
  )
} 

export default Login;