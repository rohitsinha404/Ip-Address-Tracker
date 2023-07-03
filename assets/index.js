
let jsonData;
let ipAdd = "8.8.8.8";
let lat = 28.61;
let lon = 77.20;

const ip = document.querySelector("#ipBox");
const loc = document.querySelector("#locBox");
const timezone = document.querySelector("#timeBox");
const isp = document.querySelector("#ispBox");

const input = document.getElementById("myInput");

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btn").click();
    }
});

mapboxgl.accessToken = 'pk.eyJ1IjoiZmZkMjM0MzQiLCJhIjoiY2xqbWc2ZmpiMHBuNjNscjdtN2Z3Z3NidCJ9.YwMCLIXng5gUDgC9LiAoEg';

const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [lon, lat], // default starting position [lng, lat]
    zoom: 12, // default starting zoom
});

function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btn").click();
    }
}

input.addEventListener("keypress", handleEnterKeyPress);

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

function getIp() {
    const input = document.getElementById("myInput").value;
    ipAdd = input;
    console.log(input);
    fetchIPData();
}

function fetchIPData() {
    fetch(`https://ipapi.co/${ipAdd}/json/`)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then(function (data) {
            jsonData = data;
            lat = jsonData.latitude;
            lon = jsonData.longitude;
            ip.innerText = ipAdd;
            loc.innerText = `${jsonData.city} ${jsonData.country_name}`;
            timezone.innerText = `${jsonData.timezone} ${jsonData.utc_offset}`;
            isp.innerText = jsonData.org;

            // Update the map's center coordinates
            map.setCenter([lon, lat]);
        })
        .catch(function (error) {
            console.log('An error occurred:', error);
        });
}

