import { useState } from "react";
import "./styles/App.css";
import { io } from "socket.io-client";
import Modal from "./components/Modal";
import Chat from "./components/Chat";

const serverUrl = "";

function App() {
  const [socket, setSocket] = useState();

  const isConnected = !!socket;

  function handleModalSubmit(name) {
    // const socketClient = io(serverUrl, { auth: { name } });
    // socketClient.once("connection", () => setSocket(socketClient));
    setSocket({ on: () => {}, off: () => {}, emit: () => {} });
  }

  return (
    <div className="App">
      {isConnected ? (
        <Chat socket={socket} />
      ) : (
        <Modal handleModalSubmit={handleModalSubmit} />
      )}
    </div>
  );
}

export default App;
