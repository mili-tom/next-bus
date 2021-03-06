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
      json.stops.forEach(stop => {
        fetch(`https://api.winnipegtransit.com/v3/stops/${stop.key}/schedule.json?api-key=${apiKey}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Sorry, error was occured!');
            }
          })
          .then(json => {
            const stopSchedule = json['stop-schedule']['stop'];
            const routesSchedule = json['stop-schedule']['route-schedules'];
            routesSchedule.forEach(route => {
              displayBus(route, stopSchedule);
            })
          })
      });
    });
}

function displayStreet(street) {
  const titleElem = document.querySelector('#street-name');
  titleElem.textContent = `Displaying results for ${street}`;
}

function displayBus(route, stop) {
  let time = route['scheduled-stops'][0].times.departure.scheduled;
  table.insertAdjacentHTML('afterbegin', 
    `<tr>
      <td>${stop.name}</td>
      <td>${stop['cross-street']['name']}</td>
      <td>${stop.direction}</td>
      <td>${route.route.key}</td>
      <td>${getTime(time)}</td>
    </tr>`)
}

function getTime(time) {
  let scheduledTime = new Date(time);
  return scheduledTime.toLocaleTimeString();
}