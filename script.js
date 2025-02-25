const myLibrary = []
const modal = document.getElementById("my-modal")
const input1 = document.getElementById("input1")
const input2 = document.getElementById("input2")
const input3 = document.getElementById("input3")
const input4 = document.getElementById("input4")
const addButton = document.querySelector('.add')
const cancelBtn = document.getElementById("close")
const submitBtn = document.getElementById("submitButton")
let isRead = false

const toggleIsRead = document.querySelector(".read")
toggleIsRead.textContent = 'not read'
toggleIsRead.addEventListener("click", () => {
    if (isRead) {
        toggleIsRead.textContent = "not read"
        isRead = false
    } else {
        toggleIsRead.textContent = "read"
        isRead = true
    }
})

input1.addEventListener('input', () => {
    hideError(input1)
})

input2.addEventListener('input', () => {
    hideError(input2)
})

input3.addEventListener('input', () => {
    hideError(input3)
})

let showError = (message, input) => {
    // Check if an error already exists
    let existingError = input.parentElement.querySelector('.error');
    if (!existingError) {
        const error = document.createElement('span');
        error.classList.add('error');
        error.textContent = message;
        input.parentElement.appendChild(error);
        input.classList.add('invalid');
    }
}

let hideError = (input) => {
    const error = input.parentElement.querySelector('.error');
    if (error) {
        error.remove();
    }
    input.classList.remove('invalid');
}

// Reset the form when the modal is closed
const resetForm = () => {
    hideError(input1);
    hideError(input2);
    hideError(input3);
    input1.value = '';
    input2.value = '';
    input3.value = '';
    toggleIsRead.textContent = 'not read';
    isRead = false;
}

class createBook {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read
    }

    giveValue() {
        return {title: this.title, author: this.author, pages: this.pages, read: this.read}
    }
}

addButton.addEventListener('click', () => {
    modal.classList.remove("hidden")
})

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    resetForm();  // Reset form when modal is closed
})

submitBtn.addEventListener("click", () => {
    if (validateForm()) {
        modal.classList.add("hidden");
        addBook();
        resetForm();  // Reset form after successful submission
    }
})

const addBook = function () {
    let book = new createBook(input1.value, input2.value, input3.value, !isRead)
    myLibrary.push(book.giveValue())
    displayBooks()
    isRead = false
}

function displayBooks() {
    const content = document.querySelector(".content");
    content.innerHTML = "";

    myLibrary.forEach((book, i) => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <div class="infoHeader">
                <h1> ${book.title} </h1>
                <h2>by ${book.author}</h2>
                <h3>${book.pages} pages</h3>
            </div>
            <div class="actions">
                <div class="actionButtons">
                    <button id="read-${i}" class="buttonIsRead">${readString(book.read)}</button>
                    <button id="delete-${i}" class="delete">Delete</button>
                </div>
            </div>
        `

        content.appendChild(div);

        let deleteBtn = document.getElementById(`delete-${i}`)
        deleteBtn.addEventListener("click", () => {
            myLibrary.splice(i, 1)
            displayBooks()
        })

        let buttonIsRead = document.getElementById(`read-${i}`)
        buttonIsRead.addEventListener("click", () => {
            const book = myLibrary[i]
            book.read = !book.read
            buttonIsRead.textContent = readString(book.read)
        })
    })
}

const readString = (read) => {
    return read ? 'not read' : 'read'
}

const validateForm = () => {
    let isValid = true

    if (input1.value === "") {
        showError("Title is required.", input1)
        isValid = false
    } else {
        hideError(input1)
    }

    if (input2.value === "") {
        showError("Author is required.", input2)
        isValid = false;
    } else {
        hideError(input2)
    }

    if (input3.value === "") {
        showError("Pages are required.", input3)
        isValid = false
    } else if (isNaN(input3.value) || Number(input3.value) <= 0) {
        showError("Please enter a valid number of pages.", input3)
        isValid = false
    } else {
        hideError(input3)
    }

    return isValid
}
