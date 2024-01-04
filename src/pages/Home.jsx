import { useEffect, useState } from "react";
import Input from "../component/Input";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiSignOut } from "react-icons/pi";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const postCollection = collection(db, "post");

    const unsubscribe = onSnapshot(postCollection, (snapshot) => {
      const updatedPost = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(updatedPost);
    });

    return () => unsubscribe();
  }, []);

  const deleteChat = async (id) => {
    const user = auth.currentUser;
    console.log(user.uid);
    const postCollection = collection(db, "post");
    const deleteRef = doc(postCollection, id);

    const docSnapshot = await getDoc(deleteRef);
    if (!docSnapshot.exists()) {
      console.log("document does not exist");
      return;
    }
    const messageData = docSnapshot.data();

    if (messageData.userId === user.uid) {
      await deleteDoc(deleteRef);
      console.log("Successfully deleted");
    } else {
      console.log("Only sender can delete their message");
      alert("Only sender can delete their message");
    }
  };

  const formatDate = (timestamp) => {
    const time = new Date(timestamp);
    return time.toLocaleTimeString();
  };

  const signOutUser = () => {
    signOut(auth);
    localStorage.clear("user");
    navigate("/signup");
  };
  return (
    <>
      <div className="flex-1 p:2 sm:p-6 justify-between flex px-3 flex-col h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex sm:items-center justify-between border-b-2 border-gray-200">
          <div className="relative flex justify-between w-full items-center space-x-4">
            <div className="flex flex-col leading-tight">
              <div className="text-xl md:text-2xl flex items-center py-4">
                <span className="text-gray-700 mr-3 dark:text-white">
                  Chat With Your Love Ones
                </span>
              </div>
            </div>
            <button onClick={signOutUser} className="py-4 dark:text-white">
              <PiSignOut size={25} />
            </button>
          </div>
        </div>
        <div
          id="messages"
          className="flex flex-col min-h-[10vh] space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {chats.map((chat) => {
            console.log(user.uid === chat.userId);
            if (user.uid === chat.userId) {
              return (
                <>
                  <div className="chat-message" key={chat.id}>
                    <div className="flex items-end justify-end">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <span className="dark:text-white text-gray-800">
                          {chat.username}
                        </span>
                        <div className="relative flex">
                          <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                            {chat.input}
                          </span>
                          <button onClick={() => deleteChat(chat.id)}>
                            <RiDeleteBin5Line
                              className="text-red-500 self-end justify-self-end"
                              size={15}
                            />
                          </button>
                        </div>
                        <span className="dark:text-white text-gray-800">
                          {formatDate(chat.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="chat-message" key={chat.id}>
                    <div className="flex items-end justify-start">
                      <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                        <span className="dark:text-white text-gray-800">
                          {chat.username}
                        </span>
                        <div className="relative flex">
                          <button onClick={() => deleteChat(chat.id)}>
                            <RiDeleteBin5Line
                              className="text-red-500 self-end justify-self-end"
                              size={15}
                            />
                          </button>
                          <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-600 text-white ">
                            {chat.input}
                          </span>
                        </div>
                        <span className="dark:text-white text-gray-800">
                          {formatDate(chat.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
        <Input />
      </div>
    </>
  );
};

export default Home;
