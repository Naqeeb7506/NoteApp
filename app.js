let box = document.querySelector(".container");

let savenotes = () => {
  let notes = document.querySelectorAll(".notes textarea");

  let data = [];

  notes.forEach((note) => {
    data.push(note.value);
  });
  // console.log(data);
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

let addnote = (text = "") => {
  let note = document.createElement("div");
  note.classList.add("notes");
  note.innerHTML = `
    <div class="note">
    <i class="save fa-solid fa-floppy-disk"></i>
    <i class="dlt fa-solid fa-trash"></i>
    </div>
    <textarea>${text}</textarea>
  `;

  note.querySelector(".dlt").addEventListener("click", function () {
    note.remove();
    savenotes();
  });

  note.querySelector(".save").addEventListener("click", function () {
    savenotes();
  });

  note.querySelector("textarea").addEventListener("focusout", function () {
    savenotes();
  });
  box.appendChild(note);
  savenotes();
};

(function () {
  let lsnotes = JSON.parse(localStorage.getItem("notes"));
  if (lsnotes === null) {
    addnote();
  } else {
    lsnotes.forEach((lsnote) => {
      addnote(lsnote);
    });
  }
})();
