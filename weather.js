const apiKey = `c397b3cc663bd6db8f2ad13abb6dd9b7`;
const apiUrl = `https://api.openweathermap.org/data/2.5/weather`
let tempC = null;

const getWeather = cityName => {
    // Send a request to the api
    fetch(`${apiUrl}?q=${cityName}&units=metric&appid=${apiKey}`)

    .then(response => {
        if(!response.ok){
            throw (`Invalid city: ${cityName}`);
        }
        
        response.json()
            .then(data => {
                tempC = Math.round(data.main.temp);
                weatherDegree.innerHTML = tempC;
                city__name.innerHTML = data.name

                // Humidity and Air pressure
                humidity__percent.innerHTML = data.main.humidity;
                pressure__num.innerHTML = data.main.pressure;

                // checking weather status
                let status = data.weather[0].main;
                let source = null;

                if(status === 'Rain'){
                    source = `https://openweathermap.org/img/wn/10d@2x.png`;
                } else if(status === 'Clouds'){
                    source = `https://openweathermap.org/img/wn/04d@2x.png`;
                } else if(status === 'Drizzle'){
                    source = `https://openweathermap.org/img/wn/09d@2x.png`;
                } else if(status === 'Snow'){
                    source = `https://openweathermap.org/img/wn/13d@2x.png`;
                } else if(status === 'Clear'){
                    source = `https://openweathermap.org/img/wn/01d@2x.png`;
                } 
                
                weather__img.src = source;
            });
    })
    .catch((error) => {
        errorEl.innerHTML = error;
        errorEl.style.display = 'block';
    });
}

const handleForm = evt => {
    evt.preventDefault();

    let value = input.value.trim();

    if(!value){
        errorEl.innerHTML = `Enter city name`;
        input.value = '';
        errorEl.style.display = 'block';
        return;
    } else {
        errorEl.innerHTML = '';
    }

    input.value = '';
    getWeather(value);
}

getWeather('termez');

const weatherDegree = document.querySelector('.weather__degree');
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const search__btn = document.querySelector('.search__btn');
const weather__img = document.querySelector('.weather__img');
const city__name = document.querySelector('.city__name');
const errorEl = document.querySelector('.error');

const humidity__percent = document.querySelector('.humidity__percent');
const humidity__text = document.querySelector('.humidity__text');
const pressure__num = document.querySelector('.pressure__num');
const pressure__text = document.querySelector('.pressure__text');

form.addEventListener('submit', handleForm);
