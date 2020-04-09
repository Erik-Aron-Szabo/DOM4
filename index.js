const BASE_URL = 'https://jsonplaceholder.typicode.com';

let usersDivEl;
let postsDivEl;
let commentsDivEl;
let loadButtonEl;
let loadButtonPost;

function hideComment(unorderedList){
    unorderedList.style.display = none;
    
}

function getCommentsData(comments) {
    const unorderedList = document.createElement('ul');

    for (let i = 0; i < comments.length; i++) {
        const comment = comments[i];
        
        


        //why postID = comment ID?
        const strong = document.createElement('strong');
        strong.textContent = comment.name;

        const p = document.createElement('p');
        p.appendChild(strong);
        p.appendChild(document.createTextNode(`: ${comment.body}`));

        //creating list element
        const li = document.createElement('li');
        li.appendChild(p);

        unorderedList.appendChild(li);
        //postID to hide comment
        const postIdAttr = document.createAttribute('hideId');
        postIdAttr.textContent = comment.postId;
        unorderedList.setAttributeNode(postIdAttr);

    }
    return unorderedList;
}

function onCommentsReceived() {
    //loadButtonPost.remove();
    commentsDivEl.style.display = 'block';


    const text = this.responseText;
    const comments = JSON.parse(text);

    const div = document.getElementById('comments-content');
    div.appendChild(getCommentsData(comments)); // ezzel fogjuk beletenni valalmit a IDE (index.html)
}


//if you click on Posts, this will execute
function onLoadComments(){
    const el = this;
    const postId = el.getAttribute('data-post-id');


    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onCommentsReceived);
    xhr.open('GET', BASE_URL + '/comments?postId=' + postId);
    xhr.send();
}


function createPostsList(posts) {
    const ulEl = document.createElement('ul');

    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];

        //postID data
        const dataPostIdAttr = document.createAttribute('data-post-id');
        dataPostIdAttr.value = post.id; // or .id IDK

        
        

        // creating paragraph
        const strongEl = document.createElement('strong');
        strongEl.textContent = post.title;

        const pEl = document.createElement('p');
        pEl.appendChild(strongEl);
        pEl.appendChild(document.createTextNode(`: ${post.body}`));
        pEl.setAttribute("id", "load-komments");

        //clickable button to show comments
        const button = document.createElement('button');
        //button.textContent = pEl; //PROBLEM?
        button.textContent = post.body;
        button.setAttributeNode(dataPostIdAttr);
        button.addEventListener('click', onLoadComments);
        button.appendChild(strongEl);
        button.appendChild(pEl);
       
        // creating list item
        const liEl = document.createElement('li');
        liEl.appendChild(button);

        ulEl.appendChild(liEl);
    }

    return ulEl;
}

function onPostsReceived() {
    postsDivEl.style.display = 'block';

    const text = this.responseText;
    const posts = JSON.parse(text);

    const divEl = document.getElementById('posts-content');
    while (divEl.firstChild) {
        divEl.removeChild(divEl.firstChild);
    }
    divEl.appendChild(createPostsList(posts));
}

function onLoadPosts() {
    const el = this;
    const userId = el.getAttribute('data-user-id');

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onPostsReceived);
    xhr.open('GET', BASE_URL + '/posts?userId=' + userId);
    xhr.send();
}

function createUsersTableHeader() {
    const idTdEl = document.createElement('td');
    idTdEl.textContent = 'Id';

    const nameTdEl = document.createElement('td');
    nameTdEl.textContent = 'Name';

    const trEl = document.createElement('tr');
    trEl.appendChild(idTdEl);
    trEl.appendChild(nameTdEl);

    const theadEl = document.createElement('thead');
    theadEl.appendChild(trEl);
    return theadEl;
}

function createUsersTableBody(users) {
    const tbodyEl = document.createElement('tbody');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // creating id cell
        const idTdEl = document.createElement('td');
        idTdEl.textContent = user.id;

        // creating name cell
        const dataUserIdAttr = document.createAttribute('data-user-id');
        dataUserIdAttr.value = user.id;

        const buttonEl = document.createElement('button');
        buttonEl.textContent = user.name;
        buttonEl.setAttributeNode(dataUserIdAttr);
        buttonEl.addEventListener('click', onLoadPosts);

        const nameTdEl = document.createElement('td');
        nameTdEl.appendChild(buttonEl);

        // creating row
        const trEl = document.createElement('tr');
        trEl.appendChild(idTdEl);
        trEl.appendChild(nameTdEl);

        tbodyEl.appendChild(trEl);
    }

    return tbodyEl;
}

function createUsersTable(users) {
    const tableEl = document.createElement('table');
    tableEl.appendChild(createUsersTableHeader());
    tableEl.appendChild(createUsersTableBody(users));
    return tableEl;
}

function onUsersReceived() {
    loadButtonEl.remove();

    const text = this.responseText;
    const users = JSON.parse(text);

    const divEl = document.getElementById('users-content');
    divEl.appendChild(createUsersTable(users));
}

function onLoadUsers() {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onUsersReceived);
    xhr.open('GET', BASE_URL + '/users');
    xhr.send();
}

document.addEventListener('DOMContentLoaded', (event) => {
    usersDivEl = document.getElementById('users');
    postsDivEl = document.getElementById('posts');
    commentsDivEl = document.getElementById('comments');
    loadButtonEl = document.getElementById('load-users');
    loadButtonEl.addEventListener('click', onLoadUsers);
    //loadButtonPost = document.getElementById('postbutton');
   //loadButtonPost.addEventListener('click', onLoadComments);
});