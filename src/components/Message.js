import React, { forwardRef } from 'react';
import moment from 'moment/moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Message = forwardRef(({ sender, message, time}, ref) => {

    const [user] = useAuthState(auth);

    return (
        <div 
            ref={ref}
            className={`${
                sender === user?.displayName
                    ? 'bg-gray-300 text-black relative w-fit min-w-[120px] p-2 rounded-lg ml-auto mt-8 rounded-tr-none'
                    : 'bg-gray-100 text-black relative w-fit min-w-[120px] p-2 rounded-lg mt-8 rounded-tl-none'
            }   `}
        >

            <p className='text-xs font-semibold absolute -top-5'>{sender}</p>
            <p>{message}</p>

            <p className='text-xs text-right text-red-500 font-semibold' >
                {moment(time).format('LT')} 
            </p>
        </div>
    )
});

export default Message;