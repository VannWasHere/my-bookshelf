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


document.addEventListener(REFRESH_EVENT, () => {
    console.log(bookshelf);
});