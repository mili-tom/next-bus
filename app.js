const apiKey = "eM0x2PJKCyqqY7BOlun";
const search = document.querySelector('form');

search.addEventListener('submit', function(event) {
  const input = event.target.querySelector('input');
  event.preventDefault();
  console.log(input.value); 
  findStreet(input.value);
})

function findStreet(nameOfStreet) {
fetch(`https://api.winnipegtransit.com/v2/streets.json?name=${nameOfStreet}&usage=short&api-key=${apiKey}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Sorry, error was occured!")
    }
  })  
  .then(json => json.streets.forEach(street => {
    insertStreetList(street);
  }))
} 

function insertStreetList(street) {
  const listElem = document.querySelector('.streets');    
  listElem.insertAdjacentHTML('afterbegin',
    `<a href="#" data-street-key=${street.key}>${street.name}</a>`
  );  
}
  
// fetch(`https://api.winnipegtransit.com/v2/stops/10064.json?usage=short&api-key=eM0x2PJKCyqqY7BOlun`)
//   .then(response => response.json())
//   .then(json => console.log(json))

//fetch(`https://api.winnipegtransit.com/v2/stops/10064.schedule.json?api-key=eM0x2PJKCyqqY7BOlun`)
//   .then(response => response.json())
//   .then(json => console.log(json))

