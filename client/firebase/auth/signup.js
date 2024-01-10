import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, storage } from "../../scripts/firebase";
import { doc, setDoc } from "firebase/firestore";

async function signUp(email, password) {
  let res = null,
    error = null;
  try {
    res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      email,
    });
    //create empty user chats on firestore
    await setDoc(doc(db, "userChats", res.user.uid), {});
  } catch (e) {
    error = e;
  }

  return { res, error };
}

async function signIn(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", result.user.uid), {
      uid: result.user.uid,
      email,
    });
    //create empty user chats on firestore
    await setDoc(doc(db, "userChats", result.user.uid), {});
    return result;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { errorCode, errorMessage };
  }
}

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();

    const { user } = await signInWithPopup(auth, provider);

    return { user };
  } catch (error) {
    if (error.code !== "auth/cancelled-popup-request") {
      console.error(error);
    }

    return null;
  }
}

export { signUp, loginWithGoogle, signIn };
