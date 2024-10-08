const news = document.querySelector('.news');
const loadButton = document.querySelector('.load-button');

let newsId = [];
let currentArticle = 0;
let newsPerLoad = 10;

async function fetchNewsId() {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json');
    newsId = await response.json();
};

async function fetchNewsItem(id) {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    return await response.json();
};

function createArticle(newsItem) {
    const article = document.createElement('a');
    article.className = 'article';
    article.target = '_blunk';
    article.href = newsItem.url;

    const title = document.createElement('h2');
    title.textContent = newsItem.title;
    title.className = 'title';

    const date = document.createElement('p');
    date.className = 'date';
    date.textContent = new Date(newsItem.time * 1000).toLocaleString();

    const author = document.createElement('p');
    author.className = 'author';
    author.textContent = 'Written by: ' + newsItem.by;

    article.appendChild(title);
    article.appendChild(date);
    article.appendChild(author);

    return article;
};

async function loadArticle() {
    const lastArticle = currentArticle + newsPerLoad;
    const newsElement = newsId.slice(currentArticle, lastArticle);

    for (const id of newsElement) {
        const newsItem = await fetchNewsItem(id);
        const newArticol = createArticle(newsItem);
        news.appendChild(newArticol);
    };

    currentArticle = lastArticle;

    if(currentArticle >= newsId.length) {
        loadButton.style.display = 'none';
    };
};

loadButton.addEventListener('click', loadArticle);  

async function initApp() {
    await fetchNewsId();
    await loadArticle();
};

initApp();