import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { logout, auth, db } from "../firebase";
import { orderBy, collection, addDoc, onSnapshot} from "firebase/firestore";

import './chat.css';

function Chat() {
  const [user] = useAuthState(auth);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/");

    const unsub = onSnapshot(collection(db, "chats"), (querySnapshot) => {
      const items = [];

      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setChats(items);
    });
    return (unsub)

  }, [user]);


  const sendMessage = (body) => {
    var currentdate = Date.now(); 

    const docRef = addDoc(collection(db, 'chats'), {
      sender: auth.currentUser.displayName,
      message: body,
      date: currentdate
    });

    if(docRef){

      alert('Message Sent')
    }

    // fetchData();
  }

  return(
    <>
      <div className="chat-page">
        <div className="header">
          <h3>{auth.currentUser.displayName}</h3>
          <button onClick={logout}>Signout</button>
        </div>
        <div className="main-panel">
          {
            chats?.map((chats,i)=>(
              <div className={`chat ${chats.sender != auth.currentUser.displayName ? "notme" : "me"}`} key={i}>
                <p>{chats.sender}</p>
                <p>{chats.message}</p>
              </div>
            ))
          }
        </div>
        <div className="chat-form">
            <input onChange={e => setMessage(e.target.value)} type="text" placeholder="Start chatting"/>
            <button onClick={() => sendMessage(message)}>Send</button>
          </div>
      </div>
    </>
  )
} 

export default Chat;