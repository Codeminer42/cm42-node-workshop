import { useCallback } from "react";
import { messagesTypes } from "../context";

const JoinMessage = ({ name }) => <p>{name} has joined the chat</p>;

const TalkMessage = ({ name, message }) => (
  <p>
    {name}: {message}
  </p>
);

const messageTypesMap = {
  [messagesTypes.joined]: JoinMessage,
  [messagesTypes.talk]: TalkMessage,
};

function Message({ message, name, type }) {
  const renderMessage = useCallback(
    () => messageTypesMap[type]({ name: name, message: message }) || null,
    [type]
  );

  return <div class="message">{renderMessage()}</div>;
}

export default Message;
