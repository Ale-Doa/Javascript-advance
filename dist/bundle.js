/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/script.js":
/*!*****************************!*\
  !*** ./assets/js/script.js ***!
  \*****************************/
/***/ (() => {

eval("const news = document.querySelector('.news');\r\nconst loadButton = document.querySelector('.load-button');\r\n\r\nlet newsId = [];\r\nlet currentArticle = 0;\r\nconst newsPerLoad = 10;\r\n\r\nasync function fetchNewsId() {\r\n    try {\r\n        const response = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json');\r\n        // Utilizzo di Lodash per gestire l'array di ID\r\n        newsId = _.take(response.data, 500); // Limita a 500 ID come richiesto\r\n    } catch (error) {\r\n        console.error('Errore nel recupero degli ID delle notizie:', error);\r\n    }\r\n}\r\n\r\nasync function fetchNewsItem(id) {\r\n    try {\r\n        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);\r\n        return response.data;\r\n    } catch (error) {\r\n        console.error(`Errore nel recupero della notizia con ID ${id}:`, error);\r\n        return null;\r\n    }\r\n}\r\n\r\n// Utilizzo di Lodash per la creazione dell'articolo\r\nfunction createArticle(newsItem) {\r\n    // Utilizzo di _.get per un accesso sicuro alle proprietà\r\n    const article = document.createElement('a');\r\n    article.className = 'article';\r\n    article.target = '_blank';\r\n    article.href = _.get(newsItem, 'url', '#');\r\n\r\n    const title = document.createElement('h2');\r\n    title.textContent = _.get(newsItem, 'title', 'Titolo non disponibile');\r\n    title.className = 'title';\r\n\r\n    const date = document.createElement('p');\r\n    date.className = 'date';\r\n    date.textContent = _.get(newsItem, 'time') \r\n        ? new Date(newsItem.time * 1000).toLocaleString()\r\n        : 'Data non disponibile';\r\n\r\n    const author = document.createElement('p');\r\n    author.className = 'author';\r\n    author.textContent = `Written by: ${_.get(newsItem, 'by', 'Autore anonimo')}`;\r\n\r\n    article.appendChild(title);\r\n    article.appendChild(date);\r\n    article.appendChild(author);\r\n\r\n    return article;\r\n}\r\n\r\n// Utilizzo di Lodash per il ridimensionamento\r\nfunction resizeArticlesText() {\r\n    const articles = document.querySelectorAll('.article');\r\n    if (_.isEmpty(articles)) return;\r\n\r\n    const titles = document.querySelectorAll('.title');\r\n    const dates = document.querySelectorAll('.date');\r\n    const authors = document.querySelectorAll('.author');\r\n    \r\n    const articleHeight = _.first(articles).offsetHeight;\r\n\r\n    // Utilizzo di Lodash forEach per iterare\r\n    _.forEach(titles, title => {\r\n        title.style.fontSize = `${articleHeight * 0.26}px`;\r\n    });\r\n\r\n    _.forEach(dates, date => {\r\n        date.style.fontSize = `${articleHeight * 0.15}px`;\r\n    });\r\n\r\n    _.forEach(authors, author => {\r\n        author.style.fontSize = `${articleHeight * 0.15}px`;\r\n    });\r\n\r\n    if(window.innerWidth < 790) {\r\n        _.forEach(titles, title => {\r\n            title.style.fontSize = `${articleHeight * 0.30}px`;\r\n        });\r\n    \r\n        _.forEach(dates, date => {\r\n            date.style.fontSize = `${articleHeight * 0.10}px`;\r\n        });\r\n    \r\n        _.forEach(authors, author => {\r\n            author.style.fontSize = `${articleHeight * 0.10}px`;\r\n        });\r\n    }\r\n}\r\n\r\nasync function loadArticle(showAlert = false) {\r\n    // Utilizzo di Lodash per gestire l'array di notizie\r\n    const lastArticle = currentArticle + newsPerLoad;\r\n    const newsElement = _.slice(newsId, currentArticle, lastArticle);\r\n\r\n    // Utilizzo di Promise.all con Axios per chiamate parallele\r\n    const newsItems = await Promise.all(\r\n        _.map(newsElement, id => fetchNewsItem(id))\r\n    );\r\n\r\n    // Filtra gli elementi nulli\r\n    const validNewsItems = _.compact(newsItems);\r\n\r\n    _.forEach(validNewsItems, newsItem => {\r\n        const newArticle = createArticle(newsItem);\r\n        news.appendChild(newArticle);\r\n    });\r\n\r\n    currentArticle = lastArticle;\r\n\r\n    // Aspetta che il DOM sia aggiornato prima di ridimensionare il testo\r\n    setTimeout(resizeArticlesText, 0);\r\n\r\n    if(currentArticle >= newsId.length) {\r\n        loadButton.textContent = 'NO MORE ARTICLE TO LOAD';\r\n        loadButton.disabled = true;\r\n    }\r\n\r\n    if(showAlert) {\r\n        showCustomAlert();\r\n    }\r\n}\r\n\r\n// Correzione dell'event listener del pulsante\r\nloadButton.addEventListener('click', () => loadArticle());\r\n\r\nwindow.addEventListener('resize', resizeArticlesText);\r\n\r\nasync function initApp() {\r\n    await fetchNewsId();\r\n    await loadArticle();\r\n}\r\n\r\ninitApp();\n\n//# sourceURL=webpack://progetto-javascript-advance/./assets/js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/js/script.js"]();
/******/ 	
/******/ })()
;