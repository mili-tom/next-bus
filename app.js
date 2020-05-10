const apiKey = "eM0x2PJKCyqqY7BOlun";
const search = document.querySelector('form');
const listElem = document.querySelector('.streets');
const streetElem = document.querySelector('a');

search.addEventListener('submit', event => {
  const input = event.target.querySelector('input');
  event.preventDefault();
  console.log(input.value); 
  findStreet(input.value);
})

function findStreet(nameOfStreet) {
fetch(`https://api.winnipegtransit.com/v3/streets.json?name=${nameOfStreet}&usage=short&api-key=${apiKey}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Sorry, error was occured!')
    }
  })  
  .then(function(json) {
    if (json.streets.length === 0) {
      insertEmptyList();
    } else {
      json.streets.forEach(street => {
      insertStreetsList(street);
      })
    }
  })
  listElem.innerHTML = '';  
} 

function insertStreetsList(street) { 
  listElem.insertAdjacentHTML('afterbegin',
    `<a href="#" data-street-key=${street.key}>${street.name}</a>`
  );  
}

function insertEmptyList() { 
  listElem.insertAdjacentHTML('afterbegin',
    `<div class="no-results">No Streets found</div>`
  );  
}
  
// fetch(`https://api.winnipegtransit.com/v3/stops/10064.json?usage=short&api-key=eM0x2PJKCyqqY7BOlun`)
//   .then(response => response.json())
//   .then(json => console.log(json))

//fetch(`https://api.winnipegtransit.com/v3/stops/10064.schedule.json?api-key=eM0x2PJKCyqqY7BOlun`)
//   .then(response => response.json())
//   .then(json => console.log(json))

