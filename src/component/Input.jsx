import { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
const Input = () => {
  const [input, setInput] = useState("");

  const postMessage = async () => {
    if (input === "") {
      alert("Input is empty");
      return;
    }
    try {
      const user = auth.currentUser;
      console.log(user.displayName);
      await addDoc(collection(db, "post"), {
        input,
        userId: user.uid,
        timestamp: new Date().getTime(),
        username: user.displayName,
      });
      setInput("");
    } catch (error) {
      alert(error.message);
      console.log(error.message);
      console.log(error);
    }
  };
  return (
    <div className="px-1 pt-4 mb-2 sm:mb-0 sticky bottom-4">
      <div className="relative flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Write your message!"
          className="w-full focus:outline-none focus:placeholder-gray-400 dark:text-gray-100 text-gray-600 placeholder-gray-600 pl-4  bg-gray-200 dark:bg-gray-800 rounded-md py-3"
        />
        <div className="absolute right-0 items-center inset-y-0 sm:flex">
          <button
            type="button"
            onClick={postMessage}
            className="inline-flex items-center justify-center rounded-lg md:px-4 px-2 py-2  transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
          >
            <span className="text-xl h-full">Send</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-6 w-6 ml-2 transform rotate-90"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
