
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

class createBook {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read
        }  // true for 'read', false for 'not read'

    giveValue(){
        return ({title: this.title, author: this.author, pages: this.pages, read: this.read})
    }
}

addButton.addEventListener('click', () => {
    modal.classList.remove("hidden")
})

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden")
})

let titlePara = document.createElement('p')
input1.addEventListener("input", () => {
    titlePara.classList.add('invalid')
    const titleError = document.querySelector('.titleError')
        if (input1.validity.tooShort || input1.validity.valueMissing) {
            showError(input1, titleError, titlePara, 'title')
        } else {
            titlePara.textContent = ''
        }
}) 

let authorPara = document.createElement('p')
input2.addEventListener("input", () => {
    authorPara.classList.add('invalid')
    const authorError = document.querySelector('.authorError')
        if (input2.validity.tooShort || input2.validity.valueMissing) {
            showError(input2, authorError, authorPara, 'author')
        } else {
            authorPara.textContent = ''
        }
}) 

let pagesPara = document.createElement('p')
input3.addEventListener("input", () => {
    pagesPara.classList.add('invalid')
    const pagesError = document.querySelector('.pageError')
    if (input3.value < 5){
        pagesPara.textContent = 'there needs to be at least 5 pages'
    } else {
        pagesPara.textContent = ''
    }
    pagesError.appendChild(pagesPara)
}) 

function showError(input, appendTo, para, leadText) {
    titlePara.classList.add('invalid')
    if (input.validity.valueMissing) {
        para.textContent = `${leadText} must not be empty.`
    } else if (input.validity.tooShort) {
        para.textContent = `${leadText} should be at least ${input.minLength} characters.`;
    } else {
        para.textContent = ''
    }
    appendTo.appendChild(para)
}

submitBtn.addEventListener("click", () => {
    if (input1.validity.valid && input2.validity.valid && input3.validity.valid){
    modal.classList.add("hidden")
    addBook()
    document.getElementById("input1").value = ''
    document.getElementById("input2").value = ''
    document.getElementById("input3").value = ''
    document.getElementById("input4").textContent = 'not read'
    }
})

const addBook = function (){
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
})}

const readString = (read) => {
    return read ? 'not read' : 'read'
}