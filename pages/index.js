import React, { Component, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';
import axios from 'axios';

function Home() {
  const Map = dynamic(() => import('../components/map'),
    {ssr: false}
  )

  const ip_ref = useRef();

  const [coordinates,setCoordinates] = useState([14.5995,120.9842])

  const search_ip = (ip) => {
    axios.get(`https://geo.ipify.org/api/v1?apiKey=at_HKXjloNbA1CO9roerRWJLziT37pce&ipAddress=${ip}`)
          .then((response) => {
            console.log(response)
            setCoordinates([response.data.location.lat, response.data.location.lng]);
          }).catch((err) => {
             if(process.browser) {
               alert('Wrong IP address!');
               ip_ref.current.value = '';
             }
             setCoordinates([14.5995,120.9842])
          })

  }

  return(
    <div className={styles.container}>
      <header className={styles.navbar_container}>
          <h1>IP Address Tracker</h1>
          <div className={styles.input_container}>
            <input ref={ip_ref} type="text" placeholder="Enter your IP Address..." className={styles.IP_input} />
            <div onClick={() => search_ip(ip_ref.current.value)} className={styles.image_container}>
              <img src="/assets/icon-arrow.svg" alt="search" className={styles.image}/>
            </div>
          </div>
          <h1 style={{color: 'black'}}>Latitude: {coordinates[0]}, Longitude: {coordinates[1]}</h1>
          <h3>By Judd Misael R. Baguio</h3>
      </header>
      <Map lat={coordinates[0]} lng={coordinates[1]} />
    </div>
  )
}

export default Home;
