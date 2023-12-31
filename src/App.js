import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";

function App() {
  const [username, setUsername] = useState("username");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('512d7029f2827465a231', {
      cluster: "ap1",
      // Add this line if you're using HTTPS
    });

    const channel = pusher.subscribe("chat");
    channel.bind("App\\Events\\Message", function (data) {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      // Unsubscribe from the Pusher channel when the component unmounts
      channel.unbind("message");
      pusher.unsubscribe("chat");
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        message,
      }),
    });

    setMessage("");
  };

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <div
          className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom"
        >
          <input
            className="fs-5 fw-semibold"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="list-group list-group-flush border-bottom scrollarea">
          {messages.map((message) => {
            return (
              <div className="list-group-item list-group-item-action py-3 lh-tight">
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <strong className="mb-1">{message.username}</strong>
                </div>
                <div className="col-10 mb-1 small">{message.message}</div>
              </div>
            );
          })}
        </div>
      </div>
      <form onSubmit={submit}>
        <input
          className="form-control"
          placeholder="Write a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>

      <style>
        {`
          /* Media query for phone screens */
          @media (max-width: 768px) {
            .container {
              padding: 10px; /* Adjust padding as needed */
            }
            /* Add more styles for responsiveness as needed */
          }
        `}
      </style>
    </div>
  );
}

export default App;
