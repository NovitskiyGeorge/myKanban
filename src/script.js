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
    {id: 1, name: 'vova', img: '...'},
    {id: 2, name: 'gena', img: '...'},
    {id: 3, name: 'kote', img: '...'},
    {id: 4, name: 'pes', img: '...'},
  ];
  
  
const APP_ELEMENT = document.querySelector('.app');

function getColumnHtml(column) {
  return `<div class="column">
    <div class="column__title">${column.title}</div>     
    <div class="column__cards" data-id="${column.id}"></div>     
  </div>`;
}

function getCardHtml(card) {
  return `<div class="card">
    <div class="card__top">
      <div class="card__title">${card.title}</div>
      <div class="card__id">${card.id}</div>
    </div>
    <div class="card__description">${card.description}</div>
    <div class="card__bottom">
      <div class="card__left">
        <select class="card__column-list"><option value="${card.columnId}">${card.columnId}</option></select>
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
}

main();


function selectsColumn() {
    let select = document.querySelectorAll('select');
    select.forEach(function(item) {
        let option = item.querySelector('option');

        let idSelect = COLUMNS.filter(select => select.id === +option.value);
        idSelect.forEach(function(item) {
            console.log(item.title);
            option.innerText = item.title;
        });
    });
}

selectsColumn();