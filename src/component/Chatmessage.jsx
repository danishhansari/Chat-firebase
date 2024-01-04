import { RiDeleteBin5Line } from "react-icons/ri";
import { formatDate } from "../pages/Home";
const ChatMessage = ({ chat, user, deleteChat }) => {
  const isCurrentUser = user.uid === chat.userId;

  return (
    <div
      className={`chat-message ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
      key={chat.id}
    >
      <div
        className={`flex items-end ${
          isCurrentUser ? "justify-end" : "justify-start"
        }`}
      >
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <span className="dark:text-white text-gray-800">{chat.username}</span>
          <div className="relative flex">
            {isCurrentUser ? (
              <>
                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white">
                  {chat.input}
                </span>
                <button onClick={() => deleteChat(chat.id)}>
                  <RiDeleteBin5Line
                    className="text-red-500 self-end justify-self-end"
                    size={15}
                  />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => deleteChat(chat.id)}>
                  <RiDeleteBin5Line
                    className="text-red-500 self-end justify-self-end"
                    size={15}
                  />
                </button>
                <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-gray-600 text-white">
                  {chat.input}
                </span>
              </>
            )}
          </div>
          <span className="dark:text-white text-gray-800">
            {formatDate(chat.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;