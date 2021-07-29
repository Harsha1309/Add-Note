console.log('Welcome to notes app.This is app.js');
showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addText = document.getElementById('addText');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addText.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addText.value = "";
    // console.log(notesObj);
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        html += `<div class="notesCard my-2 mx-1 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`;
    });

    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes`;
    }

}

// Function to delete a note

function deleteNote(index) {
    // console.log("I am deleting", index);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById('searchText');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!',inputVal);
    let noteCards = document.getElementsByClassName('notesCard');
    Array.from(noteCards).forEach(function (element) {
        let cardText = element.getElementsByTagName("p")[0].innerText;
        //    console.log(cardText);
        if (cardText.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";

        }
    })
});