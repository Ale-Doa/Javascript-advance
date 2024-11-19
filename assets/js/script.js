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
    article.target = '_blank';
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

function resizeArticlesText() {
    const articles = document.querySelectorAll('.article');
    if (articles.length === 0) return;
    const titles = document.querySelectorAll('.title');
    const dates = document.querySelectorAll('.date');
    const authors = document.querySelectorAll('.author');
    const articleHeight = articles[0].offsetHeight;

    titles.forEach(title => {
        title.style.fontSize = (articleHeight * 0.26) + 'px';
    });

    dates.forEach(date => {
        date.style.fontSize = (articleHeight * 0.15) + 'px';
    });

    authors.forEach(author => {
        author.style.fontSize = (articleHeight * 0.15) + 'px';
    });

    if(articles.offsetWidth < 790) {
        titles.forEach(title => {
            title.style.fontSize = (articleHeight * 0.30) + 'px';
        });
    
        dates.forEach(date => {
            date.style.fontSize = (articleHeight * 0.10) + 'px';
        });
    
        authors.forEach(author => {
            author.style.fontSize = (articleHeight * 0.10) + 'px';
        });
    };
};

// function showCustomAlert() {
//     const customAlert = document.querySelector('.custom-alert');
//     customAlert.classList.remove('hidden');
//     setTimeout(() => {customAlert.classList.add('hidden')}, 1500);
// };

async function loadArticle(shawAlert = false) {  //showAlert = false, serve nel caso si voglia utilizzare il custom-alert
    const lastArticle = currentArticle + newsPerLoad;
    const newsElement = newsId.slice(currentArticle, lastArticle);

    for (const id of newsElement) {
        const newsItem = await fetchNewsItem(id);
        const newArticol = createArticle(newsItem);
        news.appendChild(newArticol);
    };

    currentArticle = lastArticle;

    // Aspetta che il DOM sia aggiornato prima di ridimensionare il testo
    setTimeout(() => {
        resizeArticlesText();
    }, 0);

    resizeArticlesText();
    window.addEventListener('resize', resizeArticlesText);

    if(currentArticle >= newsId.length) {
        loadButton.textContent = 'NO MORE ARTICLE TO LOAD';
        loadButton.disabled = true;
    };

    if(shawAlert) {
        showCustomAlert();
    };
};

loadButton.addEventListener('click', () => loadArticle());  //aggiungere il parametro true per far funzionare il custom-alert

async function initApp() {
    await fetchNewsId();
    await loadArticle();
};

initApp();