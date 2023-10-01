const addButton = document.querySelector("#add");

const updateLocalStorageData = () => {
  const allData = document.querySelectorAll("textarea");
  const notes = [];
  allData.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  const htmldata = `
    <div class="operation">
        <button class="edit" ><i class="fas fa-edit"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="here ${
      text ? "hidden" : ""
    } " cols="20" rows="7"></textarea>`;
  note.insertAdjacentHTML("afterbegin", htmldata);
  //   console.log(note);

  // get all references
  const editButton = note.querySelector(".edit");
  const delButton = note.querySelector(".delete");
  const mainDiv = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  // for deleting the current note->
  delButton.addEventListener("click", () => {
    note.remove();
    updateLocalStorageData();
  });

  //toggle using edit button

  textArea.value = text;
  mainDiv.innerHTML = text;

  editButton.addEventListener("click", () => {
    mainDiv.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("change", (event) => {
    const value = event.target.value;
    mainDiv.innerHTML = value;
    updateLocalStorageData();
  });

  const area = document.getElementById("mainNotesSection");
  area.appendChild(note);
};

// getting data back from local storage - will use when even when page refreshes then still we end up with notes that we had.
const curNotes = JSON.parse(localStorage.getItem("notes"));

if (curNotes) {
  // there is any note then proceeded here
  curNotes.forEach((note) => {
    addNewNote(note);
  });
}

const todayDate = new Date();
document.querySelector(
  "footer"
).innerHTML = `PranK Production - Copyright ${todayDate.getFullYear()} `;

addButton.addEventListener("click", () => {
  addNewNote();
});
