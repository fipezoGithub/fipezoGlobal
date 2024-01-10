import { auth, db } from "../../scripts/firebase";
import {
  addDoc,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const sendMessage = async (text, senderID, chatID) => {
  const { uid, displayName, photoURL } = auth.currentUser;
  if (text.trim() === "") {
    alert("Enter valid message");
    return;
  }
  await updateDoc(doc(db, "chats", uid), {
    messages: arrayUnion({
      text,
      senderId: senderID,
      date: Timestamp.now(),
    }),
  });
};


export { sendMessage };
