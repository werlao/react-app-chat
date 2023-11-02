import React, { useEffect, useRef, useState } 
from 'react';
import Header from '../components/Header';
import Message from '../components/Message';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { addDoc,collection, onSnapshot, orderBy, query, serverTimestamp } 
from 'firebase/firestore';
import FlipMove from 'react-flip-move';

function HomePage() {

    const [input, setInput] = useState("");
    const [chats, setChats] = useState([]);
    const [user] = useAuthState(auth);
    const lastMessageDiv = useRef(null);

    const sendMessage = (e) => {
        e.preventDefault();

        addDoc(collection(db, 'chats'), {
            sender: user?.displayName,
            message: input,
            time: serverTimestamp(),
        })
            .then(() => setInput(""))
            .catch((err) => alert(err.message));

        scrollToBottom();
    };

    useEffect(() => {
        onSnapshot(
            query(collection(db, `chats`), orderBy('time', 'asc')),
            (snapshot) => {
                setChats(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        message: doc.data().message,
                        time: doc.data().time,
                        sender: doc.data().sender,
                    }))
                );
            }
        );
    }, [user]);

    const scrollToBottom = () => {
        lastMessageDiv.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div className=''>
            <Header />

            {/* Body */}
            <div className='max-w-2xl mx-auto mt-5' >
                {/* Messages */}
                <div className='max-w-lg mx-auto flex-1'>
                    <FlipMove>
                        {chats?.map((chat) => (
                            <Message 
                                key={chat.id} 
                                sender={chat.sender} 
                                message={chat.message} 
                                time={chat?.time?.toDate().getTime()} 
                            />
                        ))}
                    </FlipMove>

                    <div ref={lastMessageDiv} className='mb-20 pb-10'></div>
                </div>

                {/* Input */}
                <form className='flex items-center justify-between space-x-1 w-96 mx-auto sticky bottom-2 z-10 ml-20' >

                    <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type='text' 
                        placeholder='Envie uma mensagem' 
                        className='flex-1 outline-none bg-gray-200 
                        p-3 rounded-lg' />
                    
                    <button 
                    disabled={!input}
                    onClick={sendMessage} 
                    className='bg-red-500 text-sm 
                    text-white font-bold p-3 rounded-lg 
                    hover:scale-95 transition-all duration-200 
                    ease-in-out disabled:bg-gray-200 disabled:cursor-not-allowed' >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default HomePage;