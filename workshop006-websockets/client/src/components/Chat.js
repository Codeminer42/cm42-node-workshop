import { useEffect, useState } from "react";
import { messagesTypes } from "../context";
import Message from "./Message";

function Chat({ socket }) {
  const [currentMessage, setCurrentMessage] = useState();
  const [chatHistory, setChatHistory] = useState([
    { message: "eai", name: "André", type: messagesTypes.talk },
    { message: "Oi, galera!", name: "André", type: messagesTypes.talk },
    { name: "André", type: messagesTypes.joined },
  ]);

  useEffect(() => {
    socket?.on("message", onMessage);
    socket?.on("userJoined", onUserJoined);

    return () => {
      socket?.off("message");
      socket?.off("userJoined");
    };
  }, [socket]);

  function onMessage({ message, name }) {
    setChatHistory([
      { message, name, type: messagesTypes.talk },
      ...chatHistory,
    ]);
  }

  function onUserJoined({ name }) {
    setChatHistory([
      { name: name, type: messagesTypes.joined },
      ...chatHistory,
    ]);
  }

  function handleWriteMessage(event) {
    setCurrentMessage(event.target.value);
  }

  function handleSendMessage(event) {
    event.preventDefault();
    socket.emit("message", { message: currentMessage });
    setCurrentMessage("");
  }

  return (
    <div id="chat">
      <div id="messages">
        {chatHistory.map(({ message = "", name, type }) => (
          <Message message={message} name={name} type={type} />
        ))}
      </div>
      <form onSubmit={handleSendMessage} id="text-box">
        <input
          onChange={handleWriteMessage}
          id="message-input"
          value={currentMessage}
        ></input>
        <button id="message-send">send</button>
      </form>
    </div>
  );
}

export default Chat;
