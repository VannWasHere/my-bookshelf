const bookshelf = [];
const REFRESH_EVENT = 'refresh_event';

// Declare needed variable
const form = document.getElementById('input-book');
const input_complete = document.getElementById('finish-reading');

// Load Document when content ready
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', event => {
        insertInput();
        event.preventDefault(event);
    });
});

// Function 
const generateID = () => +new Date;
const generateObject = (id, title, author, year, isComplete) => {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}
const getItem = (id) => {
    for(const item of bookshelf) {
        if(item.id == id) return item;
    }
    return null;
}
const getId = (id) => {
    for(const item in bookshelf) {
        if(item.id == id) return id;
    }
    return -1;
}

const insertInput = () => {
    // Get Value
    const id = generateID();
    const input_title = document.getElementById('book-title').value;
    const input_author = document.getElementById('author-input').value;
    const input_year = document.getElementById('book-release').value;
    
    //Check if checked 
    let isComplete = false;
    if(input_complete.checked) {
        isComplete = true;
    } else {
        isComplete = false;
    }
    const convertIntoObject = generateObject(id, input_title, input_author, input_year, isComplete);
    bookshelf.push(convertIntoObject);
    document.dispatchEvent(new Event(REFRESH_EVENT));
}

const makeList = (bookshelfObject) => {
    // Create Container Element
    const container = document.createElement('div');
    container.classList.add('outter');

    const inner = document.createElement('div');
    inner.classList.add('inner-container');

    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('inner-button-container');

    const titleElement = document.createElement('h3');
    titleElement.classList.add('inner-title');
    titleElement.innerText = bookshelfObject.title;

    const authorElement = document.createElement('h4');
    authorElement.classList.add('inner-author');
    authorElement.innerText = bookshelfObject.author;

    const yearElement = document.createElement('p');
    yearElement.classList.add('inner-date');
    yearElement.innerText = bookshelfObject.year;

    inner.append(titleElement, authorElement, yearElement);
    
    // Check if complete or not
    if(bookshelfObject.isComplete) {
        const checkButton = document.createElement('button');
        checkButton.classList.add('finish-read');  
        checkButton.classList.add('inner-button');
        checkButton.innerText = 'Unread Book';
        buttonContainer.append(checkButton);

        checkButton.addEventListener('click', () => {
            moveToUnread(bookshelfObject.id);
        });
    } else {
        const checkButton = document.createElement('button');
        checkButton.classList.add('finish-read');  
        checkButton.classList.add('inner-button');
        checkButton.innerText = 'Finish Read';
        buttonContainer.append(checkButton);

        checkButton.addEventListener('click', () => {
            moveToRead(bookshelfObject.id);
            checkButton.innerText = 'Unread Book';
        });
    }

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-book');  
    deleteButton.classList.add('inner-button');
    deleteButton.innerText = 'Delete Book';

    deleteButton.addEventListener('click', () => {
        removeBook(bookshelfObject.id);
    })
    buttonContainer.append(deleteButton);

    container.append(inner, buttonContainer);

    return container;
}

const moveToRead = (id) => {
    const target = getItem(id);
    if(target == null) return;
    target.isComplete = true;
    document.dispatchEvent(new Event(REFRESH_EVENT));
};

const moveToUnread = (id) => {
    const target = getItem(id);
    if(target == null) return;
    target.isComplete = false;
    document.dispatchEvent(new Event(REFRESH_EVENT));
};

const removeBook = (id) => {
    const target = getId(id);
    if(target == null) return;
    bookshelf.splice(target, 1);
    document.dispatchEvent(new Event(REFRESH_EVENT));
}

document.addEventListener(REFRESH_EVENT, () => {
    const unread = document.getElementById('unread')
    unread.innerHTML = "";

    const read = document.getElementById('read');
    read.innerHTML = "";

    for(const item of bookshelf) {
        const nodeCreated = makeList(item);
        if(item.isComplete) {
            read.append(nodeCreated);
        } else {
            unread.append(nodeCreated);
        }
    }
});