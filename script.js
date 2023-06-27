const input = document.querySelector("input");
const button = document.querySelector("button");
const toDos = document.querySelector(".toDos");

const notice = document.getElementById("notice");

let storedToDos = localStorage.getItem("toDos");
let parsedToDos = JSON.parse(storedToDos);

let toDosArray = [];

const noticeDurationMS = 2000;

if (storedToDos) {
  toDosArray = parsedToDos;
}

button.addEventListener("click", () => {
  if (input.value !== "") {
    const isDuplicate = toDosArray.includes(input.value);

    if (isDuplicate) {
      // alert("This task has already been recorded!");
      showNotice("This task has already been recorded!");
      input.value = "";
    } else {
      toDosArray.push(input.value);
      localStorage.setItem("toDos", JSON.stringify(toDosArray));

      addToDos();

      input.value = "";
    }
  }
});

addToDos();

function addToDos() {
  storedToDos = localStorage.getItem("toDos");
  parsedToDos = JSON.parse(storedToDos);

  if (storedToDos) {
    toDos.innerHTML = "";

    for (let index = 0; index < parsedToDos.length; index++) {
      const container = document.createElement("div");

      const par = document.createElement("p");
      par.textContent = parsedToDos[index];
      container.appendChild(par);

      const button = document.createElement("button");
      button.textContent = "delete";
      button.setAttribute("data-index", index);
      container.appendChild(button);

      toDos.appendChild(container);

      button.addEventListener("click", function () {
        const index = button.getAttribute("data-index");
        toDosArray.splice(index, 1);

        localStorage.setItem("toDos", JSON.stringify(toDosArray));

        toDos.removeChild(container);
      });
    }
  }
}

function showNotice(msg) {
  notice.innerText = msg;
  setTimeout(() => {
    notice.innerText = "";
  }, noticeDurationMS);
}
