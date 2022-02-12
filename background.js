// background.ts

let minutesToSunset = 30;

console.log("hey")
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

chrome.runtime.onInstalled.addListener(() => {
  console.log("~on installed~")
  chrome.alarms.create({periodInMinutes: 1})

  console.log("hey")
})