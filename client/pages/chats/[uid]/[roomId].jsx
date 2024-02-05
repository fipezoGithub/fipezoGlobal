import ChatSideBar from "@/components/ChatSideBar";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";

export default function Chats(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState({});
  const [showChatBar, setShowChatBar] = useState(false);
  const [chatHeaderUrl, setChatHeaderUrl] = useState("");
  const [sidebarStyle, setSidebarStyle] = useState({
    transform: "translateX(0%)",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const chatBoxRef = useRef();

  const { data } = useContext(AuthContext);

  useEffect(() => {
    props.socket.on("messageResponse", (data) => {
      setMessages(data.messages);
    });
  }, [props.socket]);

  useEffect(() => {
    if (!data.userDetails) {
      return;
    }
    props.socket.emit("all-messages", { messageId: router.query.roomId });
    props.socket.on("messages", async (receivedData) => {
      setLoading(true);
      try {
        if (
          receivedData.freelancer &&
          receivedData.freelancer._id !== data.userDetails._id
        ) {
          setReceiver(receivedData.freelancer);
          setChatHeaderUrl(`/profile/${receivedData.freelancer.uid}`);
        } else if (
          receivedData.user &&
          receivedData.user._id !== data.userDetails._id
        ) {
          setReceiver(receivedData.user);
        } else {
          setReceiver(receivedData.company);
          setChatHeaderUrl(`/profile/${receivedData.company.uid}`);
        }
        setMessages(receivedData.messages);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    });
  }, [data.isLoggedIn, data.userDetails]);

  useEffect(() => {
    if (!chatBoxRef.current) {
      return;
    }
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [data.isLoggedIn, messages]);

  useEffect(() => {
    window.innerWidth > 640 && setShowChatBar(true);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).token
      : null;
    if (message.trim()) {
      props.socket.emit("send-message", {
        token: token,
        messageId: router.query.roomId,
        message: JSON.stringify({
          text: message,
          sender: data.userType,
          time: new Date().toLocaleString(),
        }),
      });
    }
    setMessage("");
  };

  return (
    <>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
        socket={props.socket}
      />
      <div className='flex items-start justify-center md:gap-4 mt-16 md:mx-8'>
        <button
          type='button'
          className='inline-block md:hidden z-10 left-0 text-3xl'
          onClick={() => setShowChatBar(!showChatBar)}
        >
          <TiThMenu />
        </button>
        {showChatBar && (
          <ChatSideBar
            user={data}
            showChatBar={showChatBar}
            setShowChatBar={setShowChatBar}
            style={sidebarStyle}
          />
        )}
        {!loading ? (
          <div className='flex flex-col w-full md:w-[30vw] mx-2 md:mx-8 gap-6'>
            <div className='bg-neutral-300 py-2 rounded-md'>
              <Link
                className='flex items-center gap-2 mx-2'
                href={chatHeaderUrl}
              >
                <Image
                  src={`https://fipezo-bucket.s3.ap-south-1.amazonaws.com/${receiver?.profilePicture}`}
                  width={300}
                  height={300}
                  alt='Company profile'
                  className='w-8 md:w-16 h-8 md:h-16 rounded-full'
                />
                {receiver?.companyname ? (
                  <h1 className='text-lg md:text-2xl font-semibold'>
                    {receiver.companyname}
                  </h1>
                ) : (
                  <h1 className='text-2xl font-semibold'>
                    {receiver?.firstname} {receiver?.lastname}
                  </h1>
                )}
              </Link>
            </div>
            <div
              className='flex flex-col items-start max-h-[28rem] md:max-h-[30rem] overflow-hidden overflow-y-scroll gap-4 px-2'
              ref={chatBoxRef}
            >
              {messages.length > 0 &&
                messages.map((mes, i) => {
                  const det = JSON.parse(mes);
                  if (det.sender !== data.userType) {
                    return (
                      <div key={i} className='flex flex-col gap-1'>
                        <p className='text-lg px-4 py-2 bg-neutral-200 rounded-lg rounded-bl-none'>
                          {det.text}
                        </p>
                        <p className='text-xs text-neutral-500'>{det.time}</p>
                      </div>
                    );
                  } else {
                    return (
                      <div key={i} className='flex flex-col self-end gap-1'>
                        <p className='text-lg px-4 py-2 bg-orange-500 text-white rounded-lg rounded-br-none'>
                          {det.text}
                        </p>
                        <p className='text-xs text-neutral-500'>{det.time}</p>
                      </div>
                    );
                  }
                })}
            </div>
            <form onSubmit={handleSendMessage} className='flex gap-2'>
              <input
                type='text'
                placeholder='Write message...'
                value={message}
                className='border px-4 py-2 rounded-md w-full'
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type='submit'
                className='bg-orange-500 text-white px-4 py-2 rounded-md text-lg'
              >
                <BsSendFill />
              </button>
            </form>
          </div>
        ) : (
          <div className='flex flex-col gap-4 items-center justify-center w-full md:w-[30vw]'>
            <Image
              src='/mini-loading.gif'
              width={200}
              height={100}
              alt='loading'
            />
            <p className='text-lg'>Loading messages. Please wait ...</p>
          </div>
        )}
      </div>
    </>
  );
}
