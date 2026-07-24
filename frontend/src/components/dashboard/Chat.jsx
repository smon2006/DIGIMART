import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineMessage, AiOutlinePlus } from 'react-icons/ai'
import { GrEmoji } from 'react-icons/gr'
import { IoSend } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { add_friend, messageClear, send_message,updateMessage } from '../../store/reducers/chatReducer';
import toast from 'react-hot-toast';
import io from 'socket.io-client'
import {FaList} from 'react-icons/fa'

const socket = io('http://localhost:5000')

const Chat = () => {

    const scrollRef = useRef()

    const dispatch = useDispatch()
    const {sellerId} = useParams()
    const {userInfo } = useSelector(state => state.auth)
    const {fb_messages,currentFd,my_friends,successMessage } = useSelector(state => state.chat)
    const [text,setText] = useState('')
    const [receverMessage,setReceverMessage] = useState('')
    const [activeSeller,setActiveSeller] = useState([])
    const [show, setShow] = useState(false)
    
    useEffect(() => {
        socket.emit('add_user',userInfo.id, userInfo)
    },[])

    useEffect(() => {
        dispatch(add_friend({
            sellerId: sellerId || "",
            userId: userInfo.id
        }))
    },[sellerId])

    const send = () => {
        if (text) {
            dispatch(send_message({
                userId: userInfo.id,
                text,
                sellerId,
                name: userInfo.name 
            }))
            setText('')
        }
    }

    useEffect(() => {
        socket.on('seller_message', msg => {
            setReceverMessage(msg)
        })
        socket.on('activeSeller', (sellers) => {
            setActiveSeller(sellers)
        })
    },[])

    useEffect(() => {
        if (successMessage) {
            socket.emit('send_customer_message',fb_messages[fb_messages.length - 1])
            dispatch(messageClear())
        }
    },[successMessage])

    useEffect(() => {
        if (receverMessage) {
            if (sellerId === receverMessage.senderId && userInfo.id === receverMessage.receverId) {
                dispatch(updateMessage(receverMessage))
            } else {
                toast.success(receverMessage.senderName + " " + "Send A message")
                dispatch(messageClear())
            }
        }

    },[receverMessage])
    
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth'})
    },[fb_messages])

    return (
        <div className='bg-white p-4 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden'>
    <div className='w-full flex'>
        
        <div className={`w-[230px] shrink-0 md-lg:absolute bg-white md-lg:h-full md-lg:z-20 md-lg:shadow-2xl md-lg:rounded-xl transition-all duration-200 ${show ? 'md-lg:left-0' : 'md-lg:-left-[350px]'}`}>
            <div className='flex justify-start gap-2 items-center text-slate-700 font-bold text-base h-[46px] border-b border-slate-100 mb-2'>
                <span className='text-[#2563EB]'><AiOutlineMessage /></span>
                <span>Messages</span>
            </div>
            <div className='w-full flex flex-col text-slate-600 gap-1 h-[400px] pr-2 overflow-y-auto'>
               {
                my_friends.map((f,i) => <Link to={`/dashboard/chat/${f.fdId}`} key={i}  className={`flex gap-2 justify-start items-center px-2 py-2 rounded-lg hover:bg-slate-50 transition-colors ${currentFd?.fdId === f.fdId ? 'bg-blue-50' : ''}`} >
                <div className='w-[34px] h-[34px] rounded-full relative shrink-0'>
                   
                   {
                    activeSeller.some(c => c.sellerId === f.fdId ) && <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 ring-2 ring-white'></div> 
                   } 
                    
                    <img className='w-full h-full rounded-full object-cover' src={f.image} alt="" />
                </div>
                <span className='text-sm font-medium truncate'>{f.name}</span>
            </Link> )
               }
                
            </div>
        </div>

        <div className='w-[calc(100%-230px)] md-lg:w-full'>
            {
                currentFd ? <div className='w-full h-full'>
                <div className='flex justify-between gap-3 items-center text-slate-700 h-[46px] border-b border-slate-100 mb-3'>
           
            <div className='flex gap-2 items-center'>
            <div className='w-[34px] h-[34px] rounded-full relative'>
            {
            activeSeller.some(c => c.sellerId === currentFd.fdId) && <div className='w-[10px] h-[10px] rounded-full bg-green-500 absolute right-0 bottom-0 ring-2 ring-white'></div>
            } 
              <img className='w-full h-full rounded-full object-cover' src={currentFd.image} alt="" />
                    </div>
                    <span className='font-semibold text-sm'>{currentFd.name}</span>
                
            </div> 

                <div onClick={()=> setShow(!show)} className='w-[34px] h-[34px] hidden md-lg:flex cursor-pointer rounded-lg justify-center items-center bg-slate-100 hover:bg-[#2563EB] hover:text-white text-slate-500 transition-colors'>
                    <FaList/>
                </div>      
               
                </div>
                <div className='h-[400px] w-full bg-slate-50 p-3 rounded-xl'>
                    <div className='w-full h-full overflow-y-auto flex flex-col gap-3'>

        {
            fb_messages.map((m, i) => {
                if (currentFd?.fdId !== m.receverId) {
                    return(
                 <div ref={scrollRef} key={i} className='w-full flex gap-2 justify-start items-center text-[13px]'>
            <img className='w-[28px] h-[28px] rounded-full object-cover shrink-0' src="/images/user.png" alt="" />
            <div className='py-2 px-3 bg-white border border-slate-200 shadow-sm text-slate-700 rounded-2xl rounded-tl-none max-w-[75%]'>
                <span>{m.message}</span>
            </div>
        </div>
              )     
                }else{ 
                  return (
                    <div ref={scrollRef} key={i} className='w-full flex gap-2 justify-end items-center text-[13px]'>
                    <div className='py-2 px-3 bg-[#2563EB] text-white rounded-2xl rounded-tr-none max-w-[75%]'>
                        <span>{m.message}</span>
                    </div>
                    <img className='w-[28px] h-[28px] rounded-full object-cover shrink-0' src="/images/user.png" alt="" />
                </div> 
                  ) 
                }
            })
        } 
                    </div>
                </div>
                <div className='flex p-2 justify-between items-center w-full gap-2'>
                    <div className='w-[40px] h-[40px] shrink-0 border border-slate-200 justify-center items-center flex rounded-full text-slate-500 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors'>
                        <label className='cursor-pointer flex' htmlFor=""><AiOutlinePlus /></label>
                        <input className='hidden' type="file" />
                    </div>
                    <div className='border border-slate-300 h-[40px] p-0 w-full rounded-full relative focus-within:border-[#2563EB] transition-colors'>
                        <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder='Type a message' className='w-full rounded-full h-full outline-none pl-4 pr-10 text-sm' />
                        <div className='text-lg right-3 top-2 absolute cursor-auto text-slate-400'>
                            <span><GrEmoji /></span>
                        </div>

                    </div>
                    <div className='w-[40px] h-[40px] shrink-0 justify-center items-center flex rounded-full bg-[#2563EB] hover:bg-[#1d4ed8] transition-colors text-white'>
                        <div onClick={send} className='text-lg cursor-pointer flex'>
                            <IoSend />
                        </div>
                    </div>
                </div>
            </div> : <div onClick={() => setShow(true)} className='w-full h-[400px] flex justify-center items-center text-sm font-medium text-slate-400'>
                <span>Select a seller to start chatting</span>
            </div>
            }
            
        </div>
    </div>
</div>
    );
};

export default Chat;
