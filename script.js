const main = document.getElementById('main');

async function fetchUserData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Could not fetch data');
    }
    const data = await response.json();
    createCard(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}

fetchUserData('https://dan-collins-dev.github.io/dummy-data-fetching-repo/data/users.json');

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
      
      if (key !== 'id' && key !== 'lastName' && key !== 'yearsEmployed') {
        cardItem.append(document.createTextNode(item[key]));
        card.append(cardItem);
      }

    }

    main.append(card)
  })
  

  
  
}