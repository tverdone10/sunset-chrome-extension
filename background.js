// background.ts

// 1. default set to 30 minutes. idk might make seconds depends on api res
let minutesToSunset = 30;
let sunset;

// 2. Set the users settings on install to what we declared above
chrome.runtime.onInstalled.addListener( () => {
  let userSettings = {
    minutesToSunset
  }
  chrome.storage.sync.set(
    { 'userSettings': userSettings },
  () => {
    console.log(`You'll be alerted ${minutesToSunset} minutes before the sun sets`)
  })
});

// 3. Set an alarm for one minute on install
chrome.runtime.onInstalled.addListener(() => {
  console.log("~on installed~")
  chrome.alarms.create({periodInMinutes: 1})

  console.log("hey")
})

// 4. Set up our API call. 
fetchSunsetTime = () => {
  fetch("https://api.sunrise-sunset.org/json?lat=34.0244&lng=-118.4075&date=today",{
    "method": "GET"
})
  .then(res => {
    res.json() 
  .then( json => {
    console.log(json)
    sunset = json.results.sunset
  })
  .catch(err => {
    console.log(err)
  })
})
}

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log("alarm", alarm)
  let date = new Date()
  
  console.log("sunset", sunset)
  if (sunset) {
    console.log("currengt time", date.toUTC("hh:mm:ss"))
    console.log(`sun sets at ${sunset}`)
  }
  fetchSunsetTime()
})
