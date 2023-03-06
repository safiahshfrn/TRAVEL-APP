/* tempat nak manipulate api
displa dulu kat console and baru amik choose 5 informative data yg bantu travel from api utk display kat html page 
contoh bila sunrise temperature(kelvin to celcius)
places of interest tu buat sendiri (kena ada 5)
page meals api kalau japan select japenese meal pastu select 5 japanese meal dengan ingredients sekali
nak panggil api 
kena id letak country
country.appendChild(countryNode)
div 
*/ 
const cityForm = document.querySelector("#weatherForm");

const getWeatherConditions = async(city) => {
//letak cn sebelah city untuk china
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9fd7a449d055dba26a982a3220f32aa2`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
    
        let div = document.createElement("div");
        div.setAttribute("id", "conditions");
        let city = document.createElement("h2");
        let cityNode = document.createTextNode(data.name);
        city.appendChild(cityNode);

        div.setAttribute("id", "conditions");
        let country = document.createElement("h1");
        let countryNode = document.createTextNode(data.sys.country);
        country.appendChild(countryNode);

        let temp = document.createElement("div");
        let tempNode = document.createTextNode("🌡\t"+data.main.temp + " °C ");
        temp.appendChild(tempNode);
        div.appendChild(tempNode)

        let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: "Asia/Shanghai" });
        let rise = document.createElement("div");
        let riseLabelNode = document.createTextNode("Sunrise 🌅 | ");
        rise.appendChild(riseLabelNode);
        let riseTimeNode = document.createTextNode(sunrise);
        rise.appendChild(riseTimeNode);
        div.appendChild(rise);

        let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: "Asia/Shanghai" });
        let sunsetLabelNode = document.createTextNode("Sunset 🌇 | ");
        let sunsetTimeNode = document.createTextNode(sunset);
        let set = document.createElement("div");
        set.appendChild(sunsetLabelNode);
        set.appendChild(sunsetTimeNode);
        div.appendChild(set);

        let desc = document.createElement("div");
        let descNode = document.createTextNode(data.weather[0].description + " \t " );
        desc.appendChild(descNode);
        //style the desc (description weather)
        desc.style.display= "inline-block";
        desc.style.verticalAlign= "middle";
        div.appendChild(desc);

        let icon = document.createElement("img");
        icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
        icon.setAttribute("alt", data.weather[0].description);
        //style the icon make it side by side with descripiton
        icon.style.display= "inline-block";
        icon.style.verticalAlign= "middle";
        div.appendChild(icon);

        document.querySelector("main").appendChild(div);
    }).catch(err => console.log(err))
}


document.addEventListener("DOMContentLoaded", (e) => {
    cityForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if(document.querySelector("#city").value != ""){
            let conditionsDiv = document.querySelector("#conditions");
            if(conditionsDiv){
                document.querySelector("main").removeChild(conditionsDiv);
            }
            getWeatherConditions(document.getElementById("city").value);
        }else{
            console.log("You must provide a city");
        }
    })
})