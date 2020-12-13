let COLUMNS = [
  {id: 1, title: 'todo'},
  {id: 2, title: 'dev'},
  {id: 3, title: 'qa'},
  {id: 4, title: 'done'},
];
let CARDS = [
  {id: 1, title: 'first1', description: 'Kanban доска', reportId: 1, assignId: 2, columnId: 2},
  {id: 2, title: 'first2', description: 'Тестовое задание', reportId: 1, assignId: 2, columnId: 2},
  {id: 3, title: 'first3', description: 'Pet проект', reportId: 2, assignId: 1, columnId: 4},
  {id: 4, title: 'first4', description: 'HTML', reportId: 3, assignId: 2, columnId: 2},
];

let USERS = [
  {id: 1, name: 'Alex', img: '...'},
  {id: 2, name: 'Dmitriy', img: '...'},
  {id: 3, name: 'Petr', img: '...'},
  {id: 4, name: 'Sofy', img: '...'},
];


const APP_ELEMENT = document.querySelector('.app');

function getColumnHtml(column) {
return `<div class="column">
  <div class="column__title">${column.title}</div>     
  <div class="column__cards" data-id="${column.id}"></div>     
</div>`;
}

function getCardHtml(card) {
return `<div class="card" data-id="${card.id}" data-report="${card.reportId}" data-assign="${card.assignId}">
  <div class="card__top">
    <div class="card__title">${card.title}</div>
    <div class="card__id">${card.id}</div>
  </div>
  <div class="card__description">${card.description}</div>
  <div class="card__bottom">
    <div class="card__left">
      <select class="card__column-list" data-id="${card.columnId}"></select>
    </div>
    <div class="card__right">
      <div class="card__reports">
        <div class="card__reporter">${card.reportId}</div>
        <div class="card__reporter-img">${card.reportId}</div>
      </div>
      <div class="card__assigns">
        <div class="card__assign">${card.assignId}</div>
        <div class="card__assign-img">${card.assignId}</div>
      </div>
    </div>
  </div>
</div>`;
}

function getAllColumns() {
return COLUMNS.map(column => getColumnHtml(column)).join('');
}

function getCardsHtml(cards) {
return cards.map(card => getCardHtml(card)).join('');
}

function getCardsByColumnId(columnId) {
let cards = CARDS.filter(card => card.columnId === columnId);
return getCardsHtml(cards);
}

function setCardsToColumns() {
COLUMNS.forEach(column => {
  let cardsHtml = getCardsByColumnId(column.id);
  let cardListElement = document.querySelector(`.column__cards[data-id="${column.id}"]`);
  cardListElement.innerHTML = cardsHtml;
});
}

function main() {
APP_ELEMENT.innerHTML = getAllColumns();
setCardsToColumns();
initReports();

}

main();


function selectsColumn() {
  let select = document.querySelectorAll('select');
  select.forEach(function(item) {
      if(item.options.length >= 4) return;
      let idColumn = +item.getAttribute('data-id');


      COLUMNS.forEach(function(i) {
        if(i.id === idColumn) {
          let newOption = new Option(i.title, i.id, true, true);
          item.append(newOption);
          return;
        }
        let newOption = new Option(i.title, i.id);
        item.append(newOption);
      });
  });
}

selectsColumn();


function getUsers(arr, id) {  
  let nameReport = arr.find(arr => arr.id === id);      
  return nameReport.name;
}


function initReports() {
  let cardsReport = document.querySelectorAll('.card__reports');
  cardsReport.forEach(item => {
    let cardReportId = +item.parentElement.parentElement.parentElement.getAttribute('data-report');

    let nameReport = getUsers(USERS, cardReportId);
    item.firstElementChild.innerHTML = nameReport;
  });
}



function getNewCard(cardId, selectId) {
  let card = CARDS.filter(card => card.id === cardId);
  card.forEach(item => {
    item.columnId = selectId;
  });
  return getCardsHtml(card);
}



function movingCards() {

document.addEventListener('change', function(e) {
  if(e.target.parentElement.parentElement.parentElement.className === 'card') {
    let card = e.target.parentElement.parentElement.parentElement;
    let cardId = +card.getAttribute('data-id');
    let selectId = +e.target.value;    

    let newCard = getNewCard(cardId, selectId);

    card.remove();
    let cardListElement = document.querySelector(`.column__cards[data-id="${selectId}"]`);
    cardListElement.insertAdjacentHTML('beforeend', newCard);
    selectsColumn();
    initReports();
  } 
});
}
movingCards();

