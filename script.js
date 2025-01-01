const myLibrary = [];
let isRead = false

const toggleIsRead = document.querySelector(".read")
toggleIsRead.addEventListener("click", () => {
    if (isRead == true) {
        toggleIsRead.textContent = "not read"
        isRead = false
    } else if (isRead == false) {
        toggleIsRead.textContent = "read"
        isRead = true
    }
})


const createBook = () => {
    return {
        title: document.getElementById("input1").value,
        author: document.getElementById("input2").value,
        pages: document.getElementById("input3").value,
        read: document.getElementById("input4").textContent,
    }
}

const modal = document.getElementById("my-modal")
const input1 = document.getElementById("input1")
const input2 = document.getElementById("input2")
const input3 = document.getElementById("input3")
const input4 = document.getElementById("input4")

const addButton = document.querySelector('.add')
const cancelBtn = document.getElementById("close")
const submitBtn = document.getElementById("submitButton")

addButton.addEventListener("click", () => {
    modal.classList.remove("hidden")
})

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden")
})

submitBtn.addEventListener("click", () => {
    const book = createBook()
    myLibrary.push(book)
    displayBooks()

    modal.classList.add("hidden")
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
                    <button id="read-${i}" class="buttonIsRead">${book.read}</button>
                    <button id="delete-${i}" class="delete">Delete</button>
                </div>
            </div>
        `

        content.appendChild(div);

        deleteBtn = document.getElementById(`delete-${i}`)
        deleteBtn.addEventListener("click", () => {
            myLibrary.splice(i, 1)
            displayBooks()
        })

        buttonIsRead = document.getElementById(`read-${i}`)
        buttonIsRead.addEventListener("click", () => {
            if (buttonIsRead.textContent == "read"){
                i.buttonIsRead.textContent = "not read"
            } else {
                i.buttonIsRead.textContent = 'read'
            }

        })
    
})}

