"use strict"

// https://dan-collins-dev.github.io/dummy-data-fetching-repo/data/users.json

const main = document.getElementById('main');
const getAllUsers = document.getElementById('get-all-users');
const usersUnderTen = document.getElementById('users-under-ten');
const reset = document.getElementById('reset');
const jsonUrl = 'https://dan-collins-dev.github.io/dummy-data-fetching-repo/data/users.json';

async function fetchUserData(url, fx) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Could not fetch data');
    }
    const data = await response.json();
    fx(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

function createFilteredCard(arr) {
  const filtered = arr.filter(obj => obj.yearsEmployed < 10);
  createCard(filtered);
}

function createCard(arr) {

  arr.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    for (const key in item) {
      const fullName = `${item['firstName']} ${item['lastName']}`
      
      const cardItem = document.createElement('div');
      cardItem.className = 'card-item';

      if (key === 'firstName') {
        cardItem.append(document.createTextNode(fullName));
        card.append(cardItem);
      } 

      if (key === 'yearsEmployed') {
        const years = `Years Employed: ${item[key]}`;
        cardItem.append(document.createTextNode(years));
        card.append(cardItem);
      }
      
      if (key === 'email' || key === 'companyName') {
        cardItem.append(document.createTextNode(item[key]));
        card.append(cardItem);
      }
    }

    main.append(card)
  })
}

getAllUsers.addEventListener('click', () => {
  fetchUserData(jsonUrl, createCard);
});

usersUnderTen.addEventListener('click', (e) => {
  fetchUserData(jsonUrl, createFilteredCard);
})

// I would like to use this if the other buttons are clicked a 2nd time
function resetDom() {
  main.innerText = '';
}

reset.addEventListener('click', resetDom);