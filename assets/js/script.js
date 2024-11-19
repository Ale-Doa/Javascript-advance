const news = document.querySelector('.news');
const loadButton = document.querySelector('.load-button');

let newsId = [];
let currentArticle = 0;
const newsPerLoad = 10;

async function fetchNewsId() {
    try {
        const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');
        // Utilizzo di Lodash per gestire l'array di ID
        newsId = _.take(response.data, 500); // Limita a 500 ID come richiesto
    } catch (error) {
        console.error('Errore nel recupero degli ID delle notizie:', error);
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

// Utilizzo di Lodash per la creazione dell'articolo
function createArticle(newsItem) {
    // Utilizzo di _.get per un accesso sicuro alle proprietà
    const article = document.createElement('a');
    article.className = 'article';
    article.target = '_blank';
    article.href = _.get(newsItem, 'url', '#');

    const title = document.createElement('h2');
    title.textContent = _.get(newsItem, 'title', 'Titolo non disponibile');
    title.className = 'title';

    const date = document.createElement('p');
    date.className = 'date';
    date.textContent = _.get(newsItem, 'time') 
        ? new Date(newsItem.time * 1000).toLocaleString()
        : 'Data non disponibile';

    const author = document.createElement('p');
    author.className = 'author';
    author.textContent = `Written by: ${_.get(newsItem, 'by', 'Autore anonimo')}`;

    article.appendChild(title);
    article.appendChild(date);
    article.appendChild(author);

    return article;
}

// Utilizzo di Lodash per il ridimensionamento
function resizeArticlesText() {
    const articles = document.querySelectorAll('.article');
    if (_.isEmpty(articles)) return;

    const titles = document.querySelectorAll('.title');
    const dates = document.querySelectorAll('.date');
    const authors = document.querySelectorAll('.author');
    
    const articleHeight = _.first(articles).offsetHeight;

    // Utilizzo di Lodash forEach per iterare
    _.forEach(titles, title => {
        title.style.fontSize = `${articleHeight * 0.26}px`;
    });

    _.forEach(dates, date => {
        date.style.fontSize = `${articleHeight * 0.15}px`;
    });

    _.forEach(authors, author => {
        author.style.fontSize = `${articleHeight * 0.15}px`;
    });

    if(window.innerWidth < 790) {
        _.forEach(titles, title => {
            title.style.fontSize = `${articleHeight * 0.30}px`;
        });
    
        _.forEach(dates, date => {
            date.style.fontSize = `${articleHeight * 0.10}px`;
        });
    
        _.forEach(authors, author => {
            author.style.fontSize = `${articleHeight * 0.10}px`;
        });
    }
}

async function loadArticle(showAlert = false) {
    // Utilizzo di Lodash per gestire l'array di notizie
    const lastArticle = currentArticle + newsPerLoad;
    const newsElement = _.slice(newsId, currentArticle, lastArticle);

    // Utilizzo di Promise.all con Axios per chiamate parallele
    const newsItems = await Promise.all(
        _.map(newsElement, id => fetchNewsItem(id))
    );

    // Filtra gli elementi nulli
    const validNewsItems = _.compact(newsItems);

    _.forEach(validNewsItems, newsItem => {
        const newArticle = createArticle(newsItem);
        news.appendChild(newArticle);
    });

    currentArticle = lastArticle;

    // Aspetta che il DOM sia aggiornato prima di ridimensionare il testo
    setTimeout(resizeArticlesText, 0);

    if(currentArticle >= newsId.length) {
        loadButton.textContent = 'NO MORE ARTICLE TO LOAD';
        loadButton.disabled = true;
    }

    if(showAlert) {
        showCustomAlert();
    }
}

// Correzione dell'event listener del pulsante
loadButton.addEventListener('click', () => loadArticle());

window.addEventListener('resize', resizeArticlesText);

async function initApp() {
    await fetchNewsId();
    await loadArticle();
}

initApp();