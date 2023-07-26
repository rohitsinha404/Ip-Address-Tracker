// Variable declarations
mapboxgl.accessToken = 'pk.eyJ1IjoiZmZkMjM0MzQiLCJhIjoiY2xqbWc2ZmpiMHBuNjNscjdtN2Z3Z3NidCJ9.YwMCLIXng5gUDgC9LiAoEg';

const ip = document.querySelector("#ipBox");
const loc = document.querySelector("#locBox");
const timezone = document.querySelector("#timeBox");
const isp = document.querySelector("#ispBox");

const input = document.getElementById("myInput");

// Event listeners
document.getElementById("myInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btn").click();
    }
});

document.getElementById("btn").addEventListener("click", async function () {
    const input = document.getElementById("myInput").value;
    await fetchIPData(input);
});

// Map initialization
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [77.20, 28.61], // default starting position [lng, lat]
    zoom: 12, // default starting zoom
});

// Fetch IP data
async function fetchIPData(ipAddress) {
    try {
        const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        const jsonData = await response.json();
        const { latitude, longitude, city, country_name, timezone, utc_offset, org } = jsonData;

        ip.innerText = ipAddress;
        loc.innerText = `${city} ${country_name}`;
        timezone.innerText = `${timezone} ${utc_offset}`;
        isp.innerText = org;

        // Update the map's center coordinates
        map.setCenter([longitude, latitude]);
    } catch (error) {
        console.log('An error occurred:', error);
    }
}

fetch('https://ipapi.co/json/')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
    .then(function (data) {
        jsonData = data;
        ipAdd = jsonData.ip;
        fetchIPData();
    })
    .catch(function (error) {
        console.log(error);
    });
