import { useState, useRef, useEffect } from "react"   
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
mapboxgl.accessToken = 'pk.eyJ1IjoiYWRyaWFuYWoiLCJhIjoiY2xtN3RlMXVpMDRoajNwbG02cnZ4emJ5YiJ9.T8mtopEM4R2WcIXWX9983w';

function Map({selectedQuiz}) {
    const mapContainer = useRef(null);
    const mapRef = useRef<MapGl | null>(null);
    const mapMarker = useRef<mapboxgl.Marker | null>(null);
    const [lng, setLng] = useState(13.3);
    const [lat, setLat] = useState(57.4);
    const [zoom, setZoom] = useState(6);
    
    useEffect(() => {            
        mapRef.current = new MapGl({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        const map: MapGl = mapRef.current
        
        if(selectedQuiz) {
            //console.log(selectedQuiz);
            
            selectedQuiz.questions.forEach((question) => {
                if(!question.location || !question.location.longitude || !question.location.latitude || 
                    question.location.longitude === "" || question.location.latitude === "") { return } // skip question with no long and lat.
                //console.log(question); 
                const marker = new mapboxgl.Marker()
                marker.setLngLat([Number(question.location.longitude), Number(question.location.latitude)]);
                marker.addTo(map);
                marker.setPopup(
                new mapboxgl.Popup().setHTML(`<h1>Fråga: ${ question.question } Svar: ${ question.answer}</h1>`));

                setLng(Number(question.location.longitude));
                setLat(Number(question.location.latitude));
            });
        }
        if( mapRef.current || !mapContainer.current ) return
        map.on('move', () => {
        
            console.log("rtart")
            interface Position {
                lng: number;
                lat: number;
            }
            const position: Position = map.getCenter()
            setLat(Number(position.lat.toFixed(4)))
            setLng(Number(position.lng.toFixed(4)))
            setZoom(map.getZoom());
            
            
        })
        map.on('click',(e)=>{
            console.log('Click on map', e)
            const marker = new mapboxgl.Marker()
            .setLngLat([e.lngLat.lng, e.lngLat.lat])
            .addTo(map);
            // Du kanske behöver lägga till markers i en state-variabel senare (för att kunna ta bort markers)
            const lngLat = marker.getLngLat()
            setLngQuestion(e.lngLat.lng)
            setLatQuestion( e.lngLat.lat)
            
            console.log('lnglat klickat',lngLat);
            
        })
    


    }, [lat, lng, zoom, selectedQuiz])

  return (
    <div>
        Long: {lng} | Lat: {lat} | Zoom: {zoom}
        <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Map;




/*
async function markCurrentLocationOnMap(
  map: MapGl | null,
  marker: mapboxgl.Marker | null
) {
  // Get the current position (latitude and longitude)
  const position = await getCurrentPosition();
  const { latitude, longitude } = position;

  // Create a marker at the current location.
  if (map) {
    marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat([longitude, latitude])
      .addTo(map);
  } else {
    // TODO: Handle the case when the map object is not available.
  }

  // Create a popup.
  const popup = new mapboxgl.Popup({
    offset: 25,
    closeButton: false,
  }).setHTML("<h2 style='color: black;'>You are here!</h2>");

  // Add the popup to the map and specify its coordinates.
  if (map) {
    popup.addTo(map).setLngLat([longitude, latitude]);
  } else {
    // TODO: Handle the case when the map object is not available.
  }
*/
