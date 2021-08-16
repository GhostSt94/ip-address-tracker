var ip=document.querySelector('input');
var button=document.querySelector('button');
var result=document.querySelector('.res');
var map_div=document.querySelector('#mapid');
var body=document.querySelector('body');
var div=document.createElement('div');
div.setAttribute('id','mapid');

button.addEventListener('click',()=>{
    var url="https://geo.ipify.org/api/v1?apiKey=at_vQAZHPfABok8HGt1UsjGKJCZqW1eE&ipAddress="+ip.value;
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (json) {
        result.innerHTML='';
        result.innerHTML='<div><h6>IP Address</h6><h3>'+json['ip']+'</h3></div><div><h6>Location</h6><h3>'+json['location']['country']+', '+json['location']['region']+', '+json['location']['city']+'</h3></div><div><h6>Timezone</h6><h3>UTC  '+json['location']['timezone']+'</h3></div><div><h6>ISP</h6><h3>'+json['isp']+'</h3></div></div>';
        
        const mapWrp = document.querySelector('.map-wrapper');
        const map = document.querySelector('#mapid');

        //Create a new map element
        const newMap = document.createElement('div');
        newMap.setAttribute('id', 'mapid');

        // Remove older/previous map element
        mapWrp.removeChild(map);

        // insert new map element
        mapWrp.append(newMap);

        var mymap = L.map('mapid').setView([json['location']['lat'], json['location']['lng']], 10);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1Ijoic3NzOTciLCJhIjoiY2tzZGFrOTZyMDU3bTJvb2Z1YWhxOTdhOSJ9.-cWbC9TrLPy6njsZyA-rVQ'
        }).addTo(mymap);
        var marker = L.marker([json['location']['lat'], json['location']['lng']]).addTo(mymap);
        ip.value='';
    });
})

    
