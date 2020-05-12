const apiKey = "eM0x2PJKCyqqY7BOlun";
const search = document.querySelector('form');
const listElem = document.querySelector('.streets');
const table = document.querySelector('tbody');

search.addEventListener('submit', event => {
  table.innerHTML = '';
  const input = event.target.querySelector('input');
  event.preventDefault();
  findStreet(input.value);  
})

function findStreet(nameOfStreet) {
fetch(`https://api.winnipegtransit.com/v3/streets.json?name=${nameOfStreet}&usage=long&api-key=${apiKey}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Sorry, error was occured!');
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
  });
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

listElem.addEventListener('click', function(event) {
  if (event.target.nodeName === 'A') {    
    const streetKey = parseInt(event.target.dataset.streetKey);
    //console.log(streetKey);
    findStops(streetKey);

    const selectedStreet = event.target.textContent;
    displayStreet(selectedStreet);
  }
})

function findStops(key) {
  fetch(`https://api.winnipegtransit.com/v3/stops.json?street=${key}&usage=long&api-key=${apiKey}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Sorry, error was occured!');
      }
    })
    .then(json => {
      //console.log(json);
      json.stops.forEach(stop => {
        fetch(`https://api.winnipegtransit.com/v3/stops/${stop.key}/schedule.json?api-key=${apiKey}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Sorry, error was occured!')
            }
          })
          .then(json => {
            const stopSchedule = json['stop-schedule']['stop'];
            const routes = json['stop-schedule']['route-schedules'];         
            routes.forEach(route => {
              console.log(route);
              //displayBus(route, stopSchedule);
            })
          })
      });
    });
}

function displayStreet(street) {
  const titleElem = document.querySelector('#street-name')
  titleElem.textContent = `Displaying results for ${street}`;
}

