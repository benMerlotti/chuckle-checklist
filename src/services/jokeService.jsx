export const getAllJokes = async () => {
  const response = await fetch("http://localhost:8088/jokes");
  const jokes = await response.json();
  return jokes;
};

export const postJoke = async (newJoke) => {
  await fetch("http://localhost:8088/jokes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: newJoke,
      told: false,
    }),
  });
  console.log(newJoke);
};

export const toggleJoke = async (toldJoke) => {
  console.log("untell working");
  await fetch(`http://localhost:8088/jokes/${toldJoke.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toldJoke),
  });
};

export const deleteJoke = async (joke) => {
  await fetch(`http://localhost:8088/jokes/${joke.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
