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
  return (
    <div className="message">
      {/* {messageTypesMap[type]({ name: name, message: message })} */}
      <p>
        {name}: {message}
      </p>
    </div>
  );
}

export default Message;
