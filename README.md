# Progetto Jvascript advance
---
## News about tech

News-About-Tech è un'applicazione web che fornisce le ultime notizie tecnologiche utilizzando l'API di Hacker News. L'applicazione presenta un'interfaccia utente moderna e reattiva, con un design accattivante che include bolle di sfondo animate e un layout adattivo.

## Caratteristiche

- Visualizzazione delle ultime notizie tecnologiche da Hacker News.
- Design responsive con effetto vetro e "bolle" per rendere apprezzabile la sfocatura.
- Caricamento incrementale degli articoli con il pulsante "LOAD MORE".
- Visualizzazione del titolo, della data e dell'autore per ogni articolo
- Ridimensionamento automatico del testo in base alle dimensioni dello schermo
- Supporto per schermi di diverse dimensioni, inclusi dispositivi mobili

## Tecmologie utilizzate 

- HTML5
- CSS3 (SCSS)
- JavaScript (Vanilla JS per le chiamate API e la manipolazione del DOM)
- API di Hacker News

## Utilizzo 

1. All'apertura della pagina, verranno caricate automaticamente le prime 10 notizie.
2. Scorri verso il basso per leggere gli articoli.
3. Clicca sul titolo di un articolo per aprire la notizia originale in una nuova scheda.
4. Clicca sul pulsante "LOAD MORE" in fondo alla pagina per caricare altri 10 articoli.

## Struttura del progetto 

```
news-about-tech/
│
├── index.html
├── assets/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── README.md
```

## Licenza

Distribuito sotto licenza MIT.

## Demo 

Puoi trovare l'applicazione funzionante [qui](https://news-about-tech.netlify.app).