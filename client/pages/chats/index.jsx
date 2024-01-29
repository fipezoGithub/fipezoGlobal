import ChatSideBar from "@/components/ChatSideBar";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useRef, useState } from "react";
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
  const router = useRouter();
  const chatBoxRef = useRef();

  const { data } = useContext(AuthContext);

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
      <div className='flex items-start justify-center md:gap-4 mt-16 md:mx-8 mb-8'>
        <button
          type='button'
          className='inline-block md:hidden z-10 left-0 text-3xl'
          onClick={() => setShowChatBar(!showChatBar)}
        >
          <TiThMenu />
        </button>
        <ChatSideBar
          user={data}
          showChatBar={showChatBar}
          setShowChatBar={setShowChatBar}
          style={sidebarStyle}
        />
        <div className='flex flex-col w-full md:w-[30vw] mx-2 md:mx-8 gap-6 items-center '>
          <Image src={"/no-chat.png"} width={600} height={400} />
          <h3 className='text-base md:text-lg'>
            To send message select user from right side
          </h3>
        </div>
      </div>
      <Footer />
    </>
  );
}
