const myLibrary = [];
let book;
let index = 0;

let check = "M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z";
let cross = "M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z";
let trash = "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z";

class Book {
    
    constructor () {
        this.title = document.querySelector('#bookTitle').value; ;
        this.author = document.querySelector('#author').value;
        this.pages = document.querySelector('#pages').value;
        this.read = document.querySelector('#read').checked;
        this.index = index;
    }

    //method()
    addBookToLibrary() {
        //adds to array
        myLibrary.push(book);
        //updates the cards
        const shelf = document.getElementById('shelf');
    
        const bookCard = document.createElement('div');
        bookCard.className = 'bookCard';
        bookCard.setAttribute('index', index);
        shelf.appendChild(bookCard);
    
        const top = document.createElement('div');
        top.className = 'top';
        bookCard.appendChild(top);
        
        const bookTitle = document.createElement('div');
        bookTitle.className = 'bookTitle';
        bookTitle.innerText = book.title;
        
        const author = document.createElement('div');
        author.className = 'author';
        author.innerText = book.author;
        
        const pages = document.createElement('div');
        pages.className = 'pages';
        pages.innerText = `${book.pages} pages`;
        
        top.appendChild(bookTitle);
        top.appendChild(author);
        top.appendChild(pages);
    
        const bottom = document.createElement('div');
        bottom.className = 'bottom';
        bookCard.appendChild(bottom);
        
        const left = document.createElement('left');
        left.className = 'left';
        bottom.appendChild(left);
    
        const status = document.createElement('div');
        status.className = 'status';
        status.setAttribute ('index', index);
    
        const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        svg.setAttribute ('class', 'statusLogo');
        svg.setAttribute ('index', index);
        const path = document.createElementNS("http://www.w3.org/2000/svg", 'path')
        path.setAttribute ('index', index);
        svg.setAttribute('viewBox', "0 0 24 24");
        svg.appendChild(path);
        
        //changes svg and text
        readUnread(book, status, path);
    
        left.appendChild(svg);
        svg.style.fill = 'darkslategray';
        
        left.appendChild(status);
        
        const del = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        del.setAttribute('class', 'delete');
        del.setAttribute ('index', index);
        const delPath = document.createElementNS("http://www.w3.org/2000/svg", 'path')
        svg.setAttribute('viewBox', "0 0 24 24");
        del.appendChild(delPath);
        delPath.setAttribute('d', trash);
        del.style.fill = 'darkslategray';
        bottom.appendChild(del);
    
    
        /* ^ produces this
        <div class="bookCard">
            <div class="top">
                <div class="bookTitle"></div>
                <div class="author"></div>
                <div class="pages"></div> 
            </div>
            <div class="bottom">
                left div
                    svg check/cross
                    <div class="status"></div>
                /div
                svg delete
            </div>
        </div>
        */
        
    
        // change status 
        svg.addEventListener('click', () =>
        {
            let search = svg.getAttribute('index');
            let bookSearch = myLibrary.at(search);
            if (bookSearch.read === true)
            {
                bookSearch.read = false;
            } else {
                bookSearch.read = true;
            }
            readUnread(bookSearch, status, path);
        });
    
        del.addEventListener('click', () =>
        {
            let search = del.getAttribute('index');
            //delete parent node of bookCard
            document.querySelector(`.bookCard[index='${search}']`).remove();
            //delete from array leaving empty spot
            delete myLibrary[search];
        });
    
        index += 1;
        return index;
    }
}


//event listeners
const form = document.getElementById('myForm');
form.addEventListener('submit', (event) => {
    book = new Book();
    event.preventDefault();
    book.addBookToLibrary();
    closeForm();
});

const myForm = document.getElementById("myForm");
const gray = document.getElementById("gray");
const add = document.getElementById("add");

//form for adding new books
function openForm() {
    myForm.style.display = "block";
    gray.style.backgroundColor = "rgba(61, 61, 61, 0.7)";
    gray.style.zIndex= 20;
    add.style.backgroundColor = "rgba(61, 61, 61, 0.7)"
    add.style.color = "lightslategray";
}

function closeForm() {
    myForm.style.display = "none";
    gray.style.backgroundColor = "rgba(61, 61, 61, 0.0)";
    gray.style.zIndex= -1;
    add.style.backgroundColor = "darkslategray"
    add.style.color = "whitesmoke"; 
    document.getElementById('form').reset();
}


//associate DOM elements with actual book objects
//give them a data-atrribute that correponds to index number

function readUnread(book, status, path) {
    //find correct book
    if (book.read === true) {
        path.setAttribute('d', check);
        status.innerText = 'read';
    } else {
        path.setAttribute('d', cross);
        status.innerText = 'unread';
    }
} 

