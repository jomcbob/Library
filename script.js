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

input4.textContent = 'not read'
input4.addEventListener("click", () => {
    if (isRead) {
        input4.textContent = "not read"
        isRead = false
    } else {
        input4.textContent = "read"
        isRead = true
    }
})

class createBook {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }

    giveValue(){
        return ({title: this.title, author: this.author, pages: this.pages, read: this.read})
    }
}

addButton.addEventListener('click', () => {
    modal.classList.remove("hidden")
    addButton.classList.add('hidden')
})

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden")
    addButton.classList.remove('hidden')
})

submitBtn.addEventListener("click", () => {
    const book = createBook()
    myLibrary.push(book)
    displayBooks()
    modal.classList.add("hidden")
    addBook()
    document.getElementById("input1").value = ''
    document.getElementById("input2").value = ''
    document.getElementById("input3").value = ''
    document.getElementById("input4").textContent = 'not read'
    
})

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
                    <button id="read-${i}" class="yo" class="buttonIsRead">${readString(book.read)}</button>
                    <button id="delete-${i}" class="yo" class="delete">Delete</button>
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
