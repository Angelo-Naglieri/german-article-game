const sourceArticles = [
  [
    {type: "Bestimmte", genus: "Maskulin", casus: "Nominativ", result: "der"},
    {type: "Bestimmte", genus: "Maskulin", casus: "Akkustativ", result: "den"},
    {type: "Bestimmte", genus: "Maskulin", casus: "Dativ", result: "dem"},
    {type: "Bestimmte", genus: "Maskulin", casus: "Genitiv", result: "des"},

    {type: "Bestimmte", genus: "Neutrum", casus: "Nominativ", result: "das"},
    {type: "Bestimmte", genus: "Neutrum", casus: "Akkustativ", result: "das"},
    {type: "Bestimmte", genus: "Neutrum", casus: "Dativ", result: "dem"},
    {type: "Bestimmte", genus: "Neutrum", casus: "Genitiv", result: "des"},

    {type: "Bestimmte", genus: "Feminin", casus: "Nominativ", result: "die"},
    {type: "Bestimmte", genus: "Feminin", casus: "Akkustativ", result: "die"},
    {type: "Bestimmte", genus: "Feminin", casus: "Dativ", result: "der"},
    {type: "Bestimmte", genus: "Feminin", casus: "Genitiv", result: "der"},

    {type: "Bestimmte", genus: "Plural", casus: "Nominativ", result: "die"},
    {type: "Bestimmte", genus: "Plural", casus: "Akkustativ", result: "die"},
    {type: "Bestimmte", genus: "Plural", casus: "Dativ", result: "den"},
    {type: "Bestimmte", genus: "Plural", casus: "Genitiv", result: "der"}
  ],

  [
    {type: "Unbestimmte", genus: "Maskulin", casus: "Nominativ", result: "ein"},
    {type: "Unbestimmte", genus: "Maskulin", casus: "Akkustativ", result: "einen"},
    {type: "Unbestimmte", genus: "Maskulin", casus: "Dativ", result: "einem"},
    {type: "Unbestimmte", genus: "Maskulin", casus: "Genitiv", result: "eines"},

    {type: "Unbestimmte", genus: "Neutrum", casus: "Nominativ", result: "ein"},
    {type: "Unbestimmte", genus: "Neutrum", casus: "Akkustativ", result: "ein"},
    {type: "Unbestimmte", genus: "Neutrum", casus: "Dativ", result: "einem"},
    {type: "Unbestimmte", genus: "Neutrum", casus: "Genitiv", result: "eines"},

    {type: "Unbestimmte", genus: "Feminin", casus: "Nominativ", result: "eine"},
    {type: "Unbestimmte", genus: "Feminin", casus: "Akkustativ", result: "eine"},
    {type: "Unbestimmte", genus: "Feminin", casus: "Dativ", result: "einer"},
    {type: "Unbestimmte", genus: "Feminin", casus: "Genitiv", result: "einer"}
  ]
]

// HTML ELEMENTS
const artTypeForm = document.getElementById('artType-form')

const artTypeDisplay = document.getElementById('type-display')
const genusDisplay = document.getElementById('genus-display')
const casusDisplay = document.getElementById('casus-display')

const userGuessInput = document.getElementById('user-guess')
const correctAnswer = document.getElementById('correct-answer')

// VARIABLES
const lastArticle = []

// HOTKEYS
  // Space = get a new article
document.addEventListener("keypress", function (event) {
  if (event.key === " ") {
    getNewQuestion()
  };
});
  // Enter = send answer
userGuessInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    checkAnswer()
  };
});
  // Load page with an article
document.addEventListener("DOMContentLoaded", function() {
getNewQuestion();
});


// MAIN FUNCTIONS
function checkAnswer() {
  if ((lastArticle[0].result === userGuessInput.value) || (` ${lastArticle[0].result}` === userGuessInput.value)) {
    document.documentElement.style.setProperty(
      '--answer-color', window.getComputedStyle(document.documentElement).getPropertyValue('--green')
    );
  } else {
    document.documentElement.style.setProperty(
      '--answer-color', window.getComputedStyle(document.documentElement).getPropertyValue('--red')
    );
  };
  correctAnswer.innerText = lastArticle[0].result;
}


function getNewQuestion () {
  let artType = getArtType();

  if ((artType[0] === false) && (artType[1] === false)) {
    console.log("pass")
    alert("You must choose at least one type of article to start your practise.")
  } else {
  let article
  if (lastArticle.length === 0) {
    article = getRandomArticle(getArtType());
  } else {
    do {
      article = getRandomArticle(getArtType());
    } while (article === lastArticle[0]);
  };
  lastArticle[0] = article;

  artTypeDisplay.innerText = article.type;
  genusDisplay.innerText = article.genus;
  casusDisplay.innerText = article.casus;

  userGuessInput.value = "";
  correctAnswer.innerText = "";
  document.documentElement.style.setProperty('--answer-color', 'transparent')}
}


// SECONDARY FUNCTIONS

function getRandomArticle(articleType) {
  let articleList;

  if ((articleType[0] === true) && (articleType[1] === true)) {
    let articleIndex = getRandom01();
    articleList = sourceArticles[articleIndex];
  } else if ((articleType[0] === true) && (articleType[1] === false)) {
    articleList = sourceArticles[0];
  } else if ((articleType[0] === false) && (articleType[1] === true)) {
    articleList = sourceArticles[1];
  };
  
  return articleList[Math.floor(Math.random() * (articleList.length))];
};

function getArtType() {
  const bestimmteArticleCheckbox = document.getElementById('b-checkbox').checked;
  const unbestimmteArticleCheckbox = document.getElementById('unb-checkbox').checked;
  return [bestimmteArticleCheckbox, unbestimmteArticleCheckbox];
};

function getRandom01 () {
  let randomNumber = Math.random();
    if (randomNumber < 0.5) {
      return 0;
    } else {
      return 1;
    };
};

// #.