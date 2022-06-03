import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useQuery, gql } from "@apollo/client";

import Toster from '../toster';
import AddresBox from '../addressBox';
import PickMarker from '../../assets/pickUpMarker.svg'
import DropMarker from '../../assets/dropOffMarker.svg'

import './styles.css'

const google = window.google = window.google ? window.google : {}
let map

function initMap() {
    const uluru = { lat: 48.864716, lng: 2.349014 };

    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: uluru,
    });
}

function addMarker(pick = {}, drop = {}){
    if (pick && pick.geocode) {
        const pickMarker = new google.maps.Marker({
            position: { lat: pick.geocode.latitude || '', lng: pick.geocode.longitude || '' },
            map: map,
            icon: PickMarker,
            id: 'pick'
        });
    }

    if (drop && drop.geocode) {
        const dropMarker = new google.maps.Marker({
            position: { lat: 48.8590453, lng: 2.3180404 },
            map: map,
            icon: DropMarker,
            id: 'drop'
        })
    }
}

const GET_PICK = gql`
  query GET_PICK($inputPick: String!) {
    geocode(address: $inputPick){
        address
        latitude
        longitude
    }
  }
`;

const GET_DROP = gql`
  query GET_DROP($inputDrop: String!) {
    geocode(address: $inputDrop){
        address
        latitude
        longitude
    }
  }
`;

const InitMap = () => {
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState({
        pick: '',
        drop: ''
    })

    const pick = useQuery(GET_PICK, {
        variables: {
            inputPick: ''
        },
        onError({res}){
            setStatus({ ...status, pick: 'error'})
        },
        onCompleted(){
            setStatus({ ...status, pick: 'completed'})
        }
    });
    const drop = useQuery(GET_DROP, {
        variables: {
            inputDrop: ''
        },
        onError({res}){
            setStatus({ ...status, drop: 'error'})
        },
        onCompleted(){
            setStatus({ ...status, drop: 'completed'})
        }
    });

    useLayoutEffect(() => {
        window.initMap = initMap();
    },[])

    useEffect(() => {
        addMarker(pick.data, drop.data)
    }, [pick, drop])
    

    const pickupHandleChange = value => {
        pick.refetch({ inputPick: value })
    }

    const dropoffHandleChange = value => {
        drop.refetch({ inputDrop: value })
    }

    return (
        <div className="init-map">
            <AddresBox 
                pickupHandleChange={ pickupHandleChange } 
                dropoffHandleChange={ dropoffHandleChange } 
                show={ val => setShow(val) }
                statusCheck={ status }
            />
            <Toster show={ show }/>
            <div id="map"></div>
        </div>
    )
}

export default InitMap;

