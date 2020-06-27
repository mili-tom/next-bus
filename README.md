# next-bus
Simple web app which displays scheduled buses.
<p>Project page: https://mili-tom.github.io/next-bus/ </p>

<p>
  <img src="/images/Winnipeg_Transit_Flying-T.png">
</p>

## Getting Started
Web app shows upcoming bus at each stop, in both directions, for particular street (based on user query) in realtime using Winnipeg Tranist Data API.

### Installing
<li>$ git clone https://github.com/mili-tom/next-bus.git</li>
<li>$ cd next-bus</li>
<li>$ code .</li>
<li>run html file in browser</li>

### Features
<li>Call Winnipeg Tranist Data API</li> 
<li>Parse and display the predicted arrival times</li>

## API Usage
The next-bus app uses the Winnipeg Tranist Data API, which is free and provides a way to retrieve live information about Winnipeg Transit's services by sending GET requests to URLs like: https://api.winnipegtransit.com/web-service-path?and=parameters. Details of usage:
<li>data is returned in XML format by default and JSON data can be requested by appending ".json" to the path</li>
<li>by signing up, every user gets API key which must be included in all requests</li>
<li>each API key is allowed 100 requests per IP address per minute</li>
<li>for this app are used 3 endpoints: streets, stops and stop-schedules</li>

### Time converting
Considering that time format which is parsed from database is not adequate for displaying, it should be converted using:
```
function getTime(time) {
  let scheduledTime = new Date(time);
  return scheduledTime.toLocaleTimeString();
}
```
## Built With
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
