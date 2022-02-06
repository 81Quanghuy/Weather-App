const loadingUX = document.querySelector(".loadingUX");
const searchIcon = document.querySelector(".search-icon");
const input = document.querySelector("input[name='search'");

async function Search(inputs) {
    const apiURL =`https://api.openweathermap.org/data/2.5/weather?q=${inputs}&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`
    let data = await fetch(apiURL).then((response)=>response.json());
        if(data.name !== undefined){
            handleChangeUX(data);
        }
        else{
            alert('No weather found.');
            input.focus();
        }
}
input.addEventListener('keyup',e=>{
    if(e.key =="Enter"){
        Search(input.value.trim());
    }
})
searchIcon.onclick = function(){
    if(input.value.trim() !='')
    {
        Search(input.value.trim());
    }
    else{
        alert('No weather found.');
        input.focus();
    }
}

function handleChangeUX(data){
    let dataset = data.name.split(" ");
        document.querySelector('body').style.backgroundImage  = `url(https://source.unsplash.com/1600x950/?${dataset[0]})`;
        document.querySelector(".database").classList.remove("loading");
        document.querySelector(".place").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = data.main.temp;
        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.querySelector(".humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `Wind speed: ${data.wind.speed} km/h`
        loadingUX.remove();
}

