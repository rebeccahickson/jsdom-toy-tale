let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const createBtn = document.getElementsByClassName("submit")[0];

  createBtn.addEventListener("click", handleSubmit);
  document
    .getElementById("toy-collection")
    .addEventListener("click", handleLike);

  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((data) => {
      handleToyArray(data);
    });
});

function handleToyArray(arr) {
  arr.map((toy) => {
    appendToy(toy);
  });
}

function handleSubmit(e) {
  e.preventDefault();

  const toyInfo = {
    name: document.getElementsByName("name")[0].value,
    image: document.getElementsByName("image")[0].value,
    likes: 0,
  };

  const configObj = {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toyInfo),
  };

  fetch("http://localhost:3000/toys", configObj)
    .then((r) => r.json())
    .then((json) => {
      appendToy(json);
    });
}

function appendToy(toy) {
  toyCard = document.createElement("div");
  toyCard.classList.add("card");
  toyCard.dataset.id = `${toy.id}`;
  toyCard.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar">
      <p>${toy.likes} Likes</p>
      <button class="like-btn">Like <3 </button>
      `;
  document.getElementById("toy-collection").append(toyCard);
}

function handleLike(e) {
  e.preventDefault();
  if (e.target.className != "like-btn") {
    return;
  }
  parentContainer = e.target.parentElement;
  pTag = parentContainer.children[2];
  toyId = parseInt(parentContainer.dataset["id"]);

  pTag.innerHTML = `${parseInt(pTag.innerText) + 1} Likes`;

  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: `${parseInt(pTag.innerText) + 1}`,
    }),
  };

  fetch(`http://localhost:3000/toys/${toyId}`, configObj);
}
