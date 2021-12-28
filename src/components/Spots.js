import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactDOM from "react-dom"
import { useAuthContext } from "../contexts/AuthContext"
import { useDatabaseContext } from "../contexts/DatabaseContext"
import SignInModal from "./SignInModal"
import SignUpModal from "./SignUpModal"
import ForgotPswdModal from "./ForgotPswdModal"
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import Menu from "./MenuComponents/Menu"
import InfoModal from "./MenuComponents/InfoModal";
import Search from "./Search";
import AddSpotModal2 from "../components/AddSpotModal";
import {PopUpOnMap} from "./PopUpOnMap";
import * as Style from "./SpotsStyle";
import { useModalContext } from "../contexts/ModalContext";
import GetLocationButton from "./GetLocationButton";
import { useSpotsContext } from "../contexts/SpotsContext";
import { useNavigationContext } from "../contexts/Navigation";
import NavContainer from "./NavigationsComponents/NavContainer";
import "./fades.css";
import { CSSTransition } from 'react-transition-group';
import UserProfile from "./UserProfile";

export default function Spots() {

    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
    const { profileToggle, infoModalToggle, setSigninWindow, setForgotPasswordWindow, setInfoModalToggle, setIdNumber, signinWindow, signupWindow, ForgotPasswordWindow }  = useModalContext()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const {setSpots} = useSpotsContext()
    const [chooseState, setChooseState] = useState(false)
    const [map, setMap] = useState()
    const auth = useAuthContext()
    const db = useDatabaseContext()
    const {navTo, setRouteError, sendUser, currentLatitude, currentLongitude, navType, setNavigationData} = useNavigationContext()

    const addMap = useCallback((map, mapContainer, spots = null) => {
        if (map) return map
        // mapboxgl.accessToken = 'pk.eyJ1Ijoib3BoaXJpIiwiYSI6Im'
        //     + 'NrdzRjc2o5YmJtNGIydXExcWlhdjJ2ZGwifQ.kF9dnidLOVE'
        //     + '-4DGtTuburA'
        mapboxgl.accessToken = 'pk.eyJ1IjoiYmFyYWtvcmVuNSIsImEiOiJja3hmNTloajcwdW9uMzJxdmM0a3Bwdm03In0.nYJTZosauPY-4eR_StTYwQ'
        map = new mapboxgl.Map({
            container: mapContainer,
            style: 'mapbox://styles/barakoren5/ckxf5gw99g6zl15o5qrv76hnu', 
            center: [34.789238, 32.0612484], 
            zoom: 12 
        })
        //getLocation
        map.addControl(
            new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
            })
        );
        // map.addControl(new mapboxgl.FullscreenControl());
        // remove/modify mapboxgl ctrl widgets
        document.querySelector('.mapboxgl-ctrl-bottom-left').remove()
        document.querySelector('.mapboxgl-ctrl-bottom-right').remove()
        if (!spots) return
        
        // Add markers and their event listeners (for marker pop-ups)
        map.on('load', () => {
            map.addSource('spots', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': spots.map(spot => {
                        return {
                            'type': 'Feature',
                            'properties': {
                                'key': `${spot.id}`,
                                'id': `${spot.id}`,
                                'title': `${spot.name}`,
                                'description': `${spot.info}`,
                                'image': `${spot.imgURLs[0]}`,
                                'obstacles' : `${spot.obstacles}`
                            },
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [spot.coordinates[1], spot.coordinates[0]]
                            }
                        }
                    })
                }
            })
            // add custom icon image
            map.loadImage('assets/pin2.png', (error, image) => {
                if (error) throw error
                map.addImage('spotMarker', image)
            })
            
            // Add a layer showing the markers.
            map.addLayer({
                'id': 'spots',
                'type': 'symbol',
                'source': 'spots',
                'layout': {
                    'icon-image': 'spotMarker',
                    'icon-size': 0.1,
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true
                },
            })
            map.on('click', (event) => {
                const features = map.queryRenderedFeatures(event.point, {
                    layers: ['spots']
                })
                if (!features.length) return
                const feature = features[0]
                const popupNode = document.createElement("div")
                ReactDOM.render(
                    <PopUpOnMap 
                        id={feature.properties.id}
                        name={feature.properties.title}
                        description={feature.properties.description}
                        obstacles={feature.properties.obstacles}
                        img={feature.properties.image}
                        setInfoModalToggle={setInfoModalToggle} 
                        setIdNumber={setIdNumber}
                    />,
                    popupNode
                  )
                  popUpRef.current
                    .setLngLat(feature.geometry.coordinates)
                    .setDOMContent(popupNode)
                    .addTo(map)     
            })
        })
        return map
    }, [setIdNumber, setInfoModalToggle])

    // Load map with spot markers (MapBox API)
    useEffect(() => {
        let mounted = true
        setLoading(true)
        db.getSpots()
            .then(spots => {
                if (!mounted) return
                setSpots(spots)  // save spots for later use
                setTimeout(() => {
                    setMap(addMap(map, 'map-container', spots))
                }, 10) // using setTimeout to give the component time to render
            })
            .finally(() => mounted && setLoading(false))
        return () => mounted = false
    }, [addMap, db, map, setSpots])

    // async function handleSignOut() {
    //     setError(null)
    //     auth.signOut()
    //         .catch((e) => {
    //         console.log(e.message)
    //         setError("Failed to sign out")})
    // }

   const getRoute = useCallback( async (end) => {
    try{
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${navType}/${currentLongitude},${currentLatitude};${end[0]},${end[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${mapboxgl.accessToken}`,
      { method: 'GET' }
    );
    const json = await query.json();
    const data = json.routes[0];
    setNavigationData(data)
    const route = data.geometry.coordinates;
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: route
      }
    }; 
    if (map.getSource('route')) {
      map.getSource('route').setData(geojson);
    }
    else {
      map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        }, 
        paint: {
          'line-color': '#ff7701',
          'line-width': 5,
          'line-opacity': 0.75,
        }
      });
    }
    } catch (e) {
        setRouteError("Please check your internet connection, Or if you denied access location to our website. if so, please enable location access and refresh the page.")
    }
    return (() => setNavigationData(null))
    }, [currentLatitude, currentLongitude, map, navType, setNavigationData, setRouteError])

  useEffect(() => {
    //works only when the user sets a place to navigate.
    if(navTo !== null){
        getRoute(navTo)
    }
  }, [navTo, navType, getRoute])

    function closeRoute(){
        if(navTo && map.getSource("route")){
            map.removeLayer('route')
            map.removeSource('route');
        }
    }

    useEffect(() => {
        if(sendUser !== null){
            map.flyTo({
                center: [sendUser[1],sendUser[0]],
                essential: true,
                curve: 0.5,
                zoom: 13,
                speed: 1.5
                });
        }
    }, [sendUser, map])


    return (
        <>
            <Style.MainContainer id="map-container" />  
            <Menu />  
            <GetLocationButton />
            <Search />
            {navTo ? <NavContainer closeRoute={closeRoute}/> : null }
            <Style.AddSpotButton style={{opacity: navTo === null ? 1 : 0.2}} disabled={navTo !== null} className="addSpot" onClick={() => setChooseState(true)}>Add A New Spot</Style.AddSpotButton>  
            <CSSTransition unmountOnExit in={infoModalToggle} timeout={300} classNames="fades">
                <InfoModal />
            </CSSTransition>
            {error && <Style.Error>He Had An Error, Please Try Again..</Style.Error>}
            {(!loading) &&
                <Style.TopLeft >
                    <Style.Title>SpotFinder</Style.Title>
                    {(auth.currentUser && db.userData) ?
                        <Style.HelloUser>Hello {db.userData.username}</Style.HelloUser>
                        :
                        <Style.HelloUser>Welcome Guest</Style.HelloUser>   
                    }
                </Style.TopLeft>
            }
            {auth.currentUser ? 
            <CSSTransition unmountOnExit in={profileToggle} timeout={300} classNames="fades">
                <UserProfile />
            </CSSTransition>
            : <>
            <CSSTransition unmountOnExit in={signinWindow} timeout={300} classNames="fades">
                <SignInModal />
            </CSSTransition>
            <CSSTransition unmountOnExit in={signupWindow} timeout={300} classNames="fades">
                <SignUpModal />
            </CSSTransition>
            <CSSTransition unmountOnExit in={ForgotPasswordWindow} timeout={300} classNames="fades">
                <ForgotPswdModal />
            </CSSTransition>
            </>
            }
            <AddSpotModal2 map={map} chooseState={chooseState} setChooseState={setChooseState} />
        </>
    );
}
