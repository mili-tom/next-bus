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
  .then(response => response.json())
  .then(json => console.log(json))
} 
  

