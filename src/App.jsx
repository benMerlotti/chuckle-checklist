import { useEffect, useState } from "react";
import {
  deleteJoke,
  getAllJokes,
  postJoke,
  toggleJoke,
} from "./services/jokeService.jsx";
import "./App.css";

export const App = () => {
  const [jokeInput, setJokeInput] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);

  useEffect(() => {
    const fetchJokes = async () => {
      const jokeArray = await getAllJokes(); // Wait for jokes to be fetched
      setAllJokes(jokeArray); // Set the jokes in state
    };
    fetchJokes();
  }, []);

  useEffect(() => {
    const told = allJokes.filter((joke) => joke.told === true);
    const untold = allJokes.filter((joke) => joke.told === false);

    setToldJokes(told);
    setUntoldJokes(untold);
  }, [allJokes]);

  const handlePostJoke = async () => {
    await postJoke(jokeInput); // Post the joke
    setJokeInput(""); // Reset the input field
    const updatedJokes = await getAllJokes(); // Re-fetch all jokes
    setAllJokes(updatedJokes); // Update the jokes in state
  };

  const handleToggleJoke = async (joke) => {
    //switch told status
    joke.told = !joke.told;
    console.log(joke);
    //Send the updated joke to the server and wait
    await toggleJoke(joke);
    const updatedJokes = await getAllJokes(); // Re-fetch all jokes
    setAllJokes(updatedJokes); // Update the jokes in state
  };

  const handleDeleteJoke = async (joke) => {
    await deleteJoke(joke);
    const updatedJokes = await getAllJokes(); // Re-fetch all jokes
    setAllJokes(updatedJokes); // Update the jokes in state
  };

  return (
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          value={jokeInput}
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          onChange={(event) => {
            // What's the value of event?
            setJokeInput(event.target.value);
          }}
        />
        <button className="joke-input-submit" onClick={() => handlePostJoke()}>
          Add
        </button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>
            TOLD JOKES<span className="told-count">{toldJokes.length}</span>
          </h2>
          {toldJokes.map((joke) => (
            <section key={joke.id}>
              <li className="joke-list-item">
                <p className="joke-list-item-text">{joke.text}</p>
                <button onClick={() => handleDeleteJoke(joke)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button onClick={() => handleToggleJoke(joke)}>
                  <i className="fa-regular fa-face-smile" />
                </button>
              </li>
            </section>
          ))}
        </div>
        <div className="joke-list-container">
          <h2>
            UNTOLD JOKES
            <span className="untold-count">{untoldJokes.length}</span>
          </h2>
          {untoldJokes.map((joke) => (
            <section key={joke.id}>
              <li className="joke-list-item">
                <p className="joke-list-item-text">{joke.text}</p>
                <button onClick={() => handleDeleteJoke(joke)}>
                  <i className="fa-solid fa-trash"></i>
                </button>
                <button onClick={() => handleToggleJoke(joke)}>
                  <i className="fa-regular fa-face-meh" />
                </button>
              </li>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
