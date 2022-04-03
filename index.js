
const sevenDaysMs = 604800000;

let lastAppearance = localStorage.getItem('last-appearance');
let interval = localStorage.getItem('interval');
if (lastAppearance === null || interval === null) {
    lastAppearance = Date.now();

    interval = randomIntFromInterval(1, sevenDaysMs);
    localStorage.setItem('last-appearance', lastAppearance);
    localStorage.setItem('interval', interval);
}
// shows up once. next time is x days between 0 and 7 days
if (lastAppearance.valueOf() + interval > Date.now().valueOf()) {
    fetchFriend();
    localStorage.setItem('last-appearance', Date.now());
    localStorage.setItem('interval', randomIntFromInterval(1, sevenDaysMs));
}

function fetchFriend() {

    fetch(chrome.extension.getURL('friend-bar/header.html')).then(async res => {

        const text = await res.text()
        const container = document.createElement('div');
        container.innerHTML = text

        document.body.prepend(container)
    })
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const rndInt = randomIntFromInterval(1, 6)
