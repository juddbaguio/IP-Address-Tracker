import React, { Component } from 'react';
import Head from 'next/head'
import styled from 'styled-components';

const Wrapper= styled.div`
  width: 100vw;
  height: 100vh;
`;

const location= [14.5995, 120.9842];

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: this.props.lat,
      lng: this.props.lng
    }
  }

  componentDidMount(){
    const L = require('leaflet');
    var myIcon = L.icon({
        iconUrl: '/assets/icon-location.svg',
        iconSize: [46, 56],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
        shadowUrl: 'marker-shadow.png',
        shadowSize: [46, 56],
        shadowAnchor: [22, 94]
    });
    this.map= L.map("map", {
      center:[this.state.lat, this.state.lng],
      zoom:12,
      zoomControl:true
    })
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    .addTo(this.map)

    var marker = L.marker([this.state.lat, this.state.lng], {icon: myIcon}).addTo(this.map);
    setTimeout( ()=> {
      marker.bindPopup("Come see us, it would be awesome!", {maxWidth: "500"});
      this.map.setView([this.state.lat, this.state.lng]);
      })
}
  render() {
    return (
      <div>
        <Head>


          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css"
          integrity="yyyy"
          crossOrigin=""/>

            <script src="https://unpkg.com/leaflet@1.4.0/dist/leaflet.js"
          integrity="yyyyy"
          crossOrigin=""></script>
        </Head>
        <Wrapper id="map"/>
      </div>
     );
  }
}

export default Map;
