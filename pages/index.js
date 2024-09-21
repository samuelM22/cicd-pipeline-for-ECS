import { useState } from "react";
import { Amplify } from "aws-amplify";

import { Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsmobile from "@/src/aws-exports";

Amplify.configure(awsmobile);



export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main style={{ position: "relative", minHeight: "100vh" }}>
          <h1>Hey there!</h1>
          <button 
            onClick={signOut}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              padding: "10px 20px",
              backgroundColor: "#ff3b3b",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              
            }}
          > 
              Sign out
            </button>

          <div style={{ padding: "20px" }}>
            <h1>Eden To-do List</h1>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="New Task Addition"
              style={{ padding: "10px", width: "160px", marginRight: "10px" }}
            />
            <button onClick={addTask} style={{ padding: "10px 20px" }}>
              Add Task
            </button>

            <ul>
              {tasks.map((task, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <span
                    onClick={() => toggleTask(index)}
                    style={{
                      textDecoration: task.completed
                        ? "line-through"
                        : "none",
                      cursor: "pointer",
                    }}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(index)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </main>
      )}
    </Authenticator>
  );
}
