import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { auth, db } from "../../scripts/firebase";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";

const Uid = (props) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  // const { currentUser } = useContext(AuthContext);
  // const { data, dispatch } = useContext(ChatContext);

  // useEffect(() => {
  //   // dispatch({ type: "CHANGE_USER", payload: router.query.uid });
  //   // console.log(data.chatId);
  //   // const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
  //   //   doc.exists() && setMessages(doc.data().messages);
  //   // });

  //   // return () => {
  //   //   unSub();
  //   // };
  // }, [data.chatId]);

  const handleSend = async (e) => {
    e.preventDefault();
    // await updateDoc(doc(db, "chats", data.chatId), {
    //   messages: arrayUnion({
    //     text,
    //     senderId: currentUser.uid,
    //     date: Timestamp.now(),
    //   }),
    // });

    // await updateDoc(doc(db, "userChats", currentUser.uid), {
    //   [data.chatId + ".lastMessage"]: {
    //     text,
    //   },
    //   [data.chatId + ".date"]: serverTimestamp(),
    // });

    // await updateDoc(doc(db, "userChats", data.user.uid), {
    //   [data.chatId + ".lastMessage"]: {
    //     text,
    //   },
    //   [data.chatId + ".date"]: serverTimestamp(),
    // });

    setText("");
  };

  return (
    <>
      <Navbar
        user={props.user}
        company={props.company}
        setCompany={props.setCompany}
        setUser={props.setUser}
      />
      <div className="mt-16">
        <form className="send-message" onSubmit={handleSend}>
          <label htmlFor="messageInput" hidden>
            Enter Message
          </label>
          <input
            id="messageInput"
            name="messageInput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            type="text"
            className="form-input__input"
            placeholder="type message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <Footer premium={props.user?.premium} />
    </>
  );
};

export default Uid;
