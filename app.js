const key = '30c366dd80bbab904cccc937bc03ad5f';

const input = document.getElementById('that')
const submit = document.getElementById('submit')
var city = 'Los Angeles'
const unitSwitcher = document.getElementById('unitswitcher');
var trueForImperialFalseForMetric = true;
unit = 'imperial'

getcoords(city);

submit.addEventListener('click', ()=>{
    city = input.value;
    getcoords(city);
    input.value='';
})

unitSwitcher.addEventListener('click', ()=>{
    trueForImperialFalseForMetric = !trueForImperialFalseForMetric;
    unitSetter()
})

function unitSetter(){
    trueForImperialFalseForMetric ? unit='imperial':unit='metric'
    getcoords(city);
}

async function getcoords(city){
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},&appid=${key}`, {mode:"cors"});
    const data = await response.json();
    const long = data[0].lon;
    const lat=data[0].lat;
    hitAPI(long, lat, unit);
}
async function hitAPI(lon, lat, unit){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${key}`);
    const data = await response.json();
    feelsLike(data.current.feels_like);
    currentTempSetter(data.current.temp);
    currentAtmosphereSetter(data.current.weather[0].description);
    currentCitySetter(city);
    currentHumidity(data.current.humidity);
    currentWind(data.current.wind_speed);
}

function currentTempSetter(temp){
    var thisunit = unit==='imperial'?'F':'C';
    document.getElementById('currentTemp').innerText=`${Math.trunc(temp)}\u00B0${thisunit}`
}

function currentAtmosphereSetter(atmosphere){
    atmosphere = atmosphere.split(' ');
    for(var i = 0; i<atmosphere.length; i++){
        atmosphere[i] = atmosphere[i].charAt(0).toUpperCase() + atmosphere[i].slice(1);
    }
    atmosphere = atmosphere.join(' ');
    document.getElementById('currentAtmosphere').innerText = `${atmosphere}`;
}

function currentCitySetter(currentCity){
    document.getElementById('currentCity').innerHTML = `${currentCity}`;
}

function feelsLike(temp){
    var thisunit = unit==='imperial'?'F':'C';
    document.getElementById('feelslike').innerText=`${Math.trunc(temp)}\u00B0${thisunit}`;
}

function currentHumidity(info){
    document.getElementById('humidity').innerText = `${info}%`
}

function currentWind(info){
    var thisunit = unit==='imperial'?'mph':'km/h';
    document.getElementById('windspeed').innerText=`${Math.trunc(info)} ${thisunit}`;
}
