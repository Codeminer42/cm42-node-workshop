import { useState } from "react";

function Modal({ handleModalSubmit }) {
  const [name, setName] = useState();

  function onSubmit(event) {
    event.preventDefault();
    handleModalSubmit(name);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  return (
    <div id="modal">
      <span>What's your name?</span>
      <form onSubmit={onSubmit}>
        <input onChange={handleNameChange} />
        <button type="submit">Connect</button>
      </form>
    </div>
  );
}

export default Modal;
