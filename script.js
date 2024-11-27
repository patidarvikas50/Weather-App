let btn = document.getElementById("searchBtn");
let input = document.getElementById("input");
let cityName = document.getElementById("cityName");
let temp = document.getElementById("temperature");
let time = document.getElementById("time");
let country = document.getElementById("country");
let region = document.getElementById("region");
let errorMessage = document.createElement("p"); 
errorMessage.style.color = "red"; 

document.querySelector(".container").appendChild(errorMessage);

async function getData(cityName) {
  try {
    let promise = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=a06040f0b4934c9c89394204241311&q=${cityName}&aqi=yes`
    );
    
    if (!promise.ok) {
      throw new Error("City not found");
    }

    return await promise.json();
  } catch (error) {
    console.error(error);
    return null; 
  }
}

btn.addEventListener("click", async () => {
  const value = input.value;
  const result = await getData(value);
  console.log(result)

  if (result) {
    
    errorMessage.innerText = "";
    time.innerText = result.location.localtime;
    cityName.innerText = result.location.name;
    country.innerText = result.location.country;
    region.innerText = result.location.region;
    temp.innerText = result.current.temp_c;
  } else {
  
    errorMessage.innerText = "Invalid city name. Please try again.";
    time.innerText = "-";
    cityName.innerText = "-";
    temp.innerText = "-";
    region.innerText = "-";
    country.innerText = "-";
  }
});
