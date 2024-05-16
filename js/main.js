//today variables
let todayName=document.getElementById("todayName")
let todayNumber =document.getElementById("todayNumber")
let todayMonth=document.getElementById("todayMonth")
let todayLocation=document.getElementById("todayLocation")
let todayTemp=document.getElementById("todayTemp")
let todayConditionImg=document.getElementById("todayConditionImg")
let todayConditionText=document.getElementById("todayConditionText")
let humidity=document.getElementById("humidity")
let wind=document.getElementById("wind")
let windDirection=document.getElementById("windDirection")

//next data
let nextDay=document.getElementsByClassName("nextDay")
let nextDayImg=document.getElementsByClassName("nextDayImg")
let nextMaxTemp=document.getElementsByClassName("nextMaxTemp")
let nextMinTemp=document.getElementsByClassName("nextMinTemp")
let nextTextCondition=document.getElementsByClassName("nextTextCondition")

//searchInput
let searchInput=document.getElementById("search")

//date
let date=new Date()
console.log(date.getDate());
console.log(date.toLocaleDateString("en-us",{weekday:"long"}));
console.log(date.toLocaleDateString("en-us",{month:"long"}));
//fetch data
async function getWeatherData(cityName){
let weatherResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a611705631c24602861200642240801&q=${cityName}&days=3`) 
   let weatherData= await weatherResponse.json()
//    console.log(weatherData);
   return weatherData;
}
//display today
function displayTodayData(data){
todayLocation.innerHTML=data.location.name;
todayTemp.innerHTML=data.current.temp_c;
todayConditionImg.setAttribute("src",data.current.condition.icon)
todayConditionText.innerHTML=data.current.condition.text
humidity.innerHTML=data.current.humidity+"%"
wind.innerHTML=data.current.wind_kph+"km/h"
windDirection.innerHTML=data.current.wind_dir
todayName.innerHTML=date.toLocaleDateString("en-us",{weekday:"long"})
todayNumber.innerHTML=date.getDate()
todayMonth.innerHTML=date.toLocaleDateString("en-us",{month:"long"})

}

//display next dayss
function displayNextData(data){
    let forecastData=data.forecast.forecastday
    console.log(forecastData);//array
    for(let i=0;i<2;i++){
        nextMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML=forecastData[i+1].day.mintemp_c
        nextTextCondition[i].innerHTML=forecastData[i+1].day.condition.text
        nextDayImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        let nextDate=new Date(forecastData[i+1].date)
        nextDay[i].innerHTML=nextDate.toLocaleDateString("en-us",{weekday:"long"})
    }
}
//startApp
async function startApp(city="germany"){
    let weatherData=await getWeatherData(city)
    console.log(weatherData);
    if(!weatherData.error){
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }
 
}
startApp()

searchInput.addEventListener("keyup",function(){
    console.log(searchInput.value);
    startApp(searchInput.value)
})





// //api response
// async function getWeatherData(cityName){
//     let weatherResponse= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a611705631c24602861200642240801&q=${cityName}&days=3`)
//     let weatherData=await weatherResponse.json()
//     console.log(weatherData);
//     return weatherData
// }
// //displayToday
// function displayTodayData(data){
//     todayLocation.innerHTML=data.location.name
//     todayTemp.innerHTML=data.current.temp_c
//     todayConditionImg.setAttribute("src",data.current.condition.icon)
//     todayConditionText.innerHTML=data.current.condition.text
//     humidity.innerHTML=data.current.humidity+"%"
//     wind.innerHTML=data.current.wind_kph+"km/h"
//     windDirection.innerHTML=data.current.wind_dir
//     let todayDate=new Date() //tare5 anhrda
//     todayName.innerHTML=todayDate.toLocaleDateString("en-us",{weekday:"long"})
//     todayNumber.innerHTML=todayDate.getDate()
//     todayDate.innerHTML=todayDate.toLocaleDateString("en-us",{month:"long"})
// }
// //displayNext
// function displayNextData(data){
//     let forecastData=data.forecast.forecastday
// for(let i=0;i<nextDayImg.length;i++){
//     nextMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c
//     nextMinTemp[i].innerHTML=forecastData[i+1].day.mintemp_c
//     nextTextCondition[i].innerHTML=forecastData[i+1].day.condition.text
//     nextDayImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
//     let nextDate=new Date(forecastData[i+1].date)
//     nextDay[i].innerHTML=nextDate.toLocaleDateString("en-us",{weekday:"long"})
// }
// }

// //fire function
// async function fire(city="germany"){ //fe halet input fady hot by default el germany
//     let weatherData= await getWeatherData(city)
//     if(!weatherData.error){
//     displayTodayData(weatherData)
//     displayNextData(weatherData)
// }
// }
// fire()

// searchInput.addEventListener("input",function(){
//     fire(searchInput.value)
// })


