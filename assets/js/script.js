const news = document.querySelector('.news');
const loadButton = document.querySelector('.load-button');

let newsId = [];
let currentArticle = 0;
const newsPerLoad = 10;

function resetApplicationState() {
    newsId = [];
    currentArticle = 0;
    loadButton.disabled = false;
    loadButton.textContent = 'LOAD MORE';
}

async function fetchNewsId() {
    try {
        showLoadingState();
        const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
        newsId = _.take(response.data, 500);
    } catch (error) {
        console.error('Errore nel recupero degli ID delle notizie:', error);
    } finally {
        hideLoadingState();
    }
}

async function fetchNewsItem(id) {
    try {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return response.data;
    } catch (error) {
        console.error(`Errore nel recupero della notizia con ID ${id}:`, error);
        return null;
    }
}

function showLoadingState() {
    loadButton.textContent = 'Loading...';
    loadButton.disabled = true;
}

function hideLoadingState() {
    loadButton.textContent = 'LOAD MORE';
    loadButton.disabled = false;
}

function createElement(tagName, className, innerHTML) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (innerHTML) element.innerHTML = innerHTML;
    return element;
}

function createArticle(newsItem) {
    const article = createElement('a', 'article');
    article.target = '_blank';
    article.href = _.get(newsItem, 'url', '#');

    const title = createElement('h2', 'title', _.get(newsItem, 'title', 'Titolo non disponibile'));
    const date = createElement('p', 'date', _.get(newsItem, 'time') 
        ? new Date(newsItem.time * 1000).toLocaleString()
        : 'Data non disponibile');
    const author = createElement('p', 'author', `Written by: ${_.get(newsItem, 'by', 'Autore anonimo')}`);

    article.appendChild(title);
    article.appendChild(date);
    article.appendChild(author);

    return article;
}

function resizeArticlesText() {
    const articles = document.querySelectorAll('.article');
    if (_.isEmpty(articles)) return;

    const articleHeight = _.first(articles).offsetHeight;

    const adjustFontSize = (selector, sizeRatio) => {
        _.forEach(document.querySelectorAll(selector), element => {
            element.style.fontSize = `${articleHeight * sizeRatio}px`;
        });
    };

    adjustFontSize('.title', 0.26);
    adjustFontSize('.date', 0.15);
    adjustFontSize('.author', 0.15);

    if (window.innerWidth < 790) {
        adjustFontSize('.title', 0.30);
        adjustFontSize('.date', 0.10);
        adjustFontSize('.author', 0.10);
    }
}

async function loadArticle(showAlert = false) {
    showLoadingState();
    try {
        const lastArticle = currentArticle + newsPerLoad;
        const newsElement = _.slice(newsId, currentArticle, lastArticle);

        const newsItems = await Promise.all(
            _.map(newsElement, id => fetchNewsItem(id))
        );

        const validNewsItems = _.compact(newsItems);

        _.forEach(validNewsItems, newsItem => {
            const newArticle = createArticle(newsItem);
            news.appendChild(newArticle);
        });

        currentArticle = lastArticle;

        setTimeout(resizeArticlesText, 0);

        if (currentArticle >= newsId.length) {
            loadButton.textContent = 'NO MORE ARTICLES TO LOAD';
            loadButton.disabled = true;
        }

        if (showAlert) {
            showCustomAlert();
        }
    } catch (error) {
        console.error('Errore durante il caricamento degli articoli:', error);
    } finally {
        hideLoadingState();
    }
}

loadButton.addEventListener('click', () => loadArticle());
window.addEventListener('resize', resizeArticlesText);

async function initApp() {
    await fetchNewsId();
    await loadArticle();
}

resetApplicationState();
initApp();
