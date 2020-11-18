import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { Route, Switch, Link } from "react-router-dom";

const Maps = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBp9ntlNiyAFvV8qxdXrBvBAOz_xasmvS0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  const [isOpen, setIsOpen] = React.useState(-1);
  console.log('hjfb');
  console.log(props.isMarkerShown &&
    props.cor ? [...props.cor] : []);
  return (
    <GoogleMap defaultZoom={6} defaultCenter={{ lat: 31.52037, lng: 74.358749 }}>
      {(props.isMarkerShown &&
        props.cor ? [...props.cor] : []).map((cord, key) =>
          <Marker key={key}
            onClick={() =>
              setIsOpen(key)
            }
            position={{ lat: parseFloat(cord.lat), lng: parseFloat(cord.long) }}>
            {key === isOpen && <InfoWindow>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100px'
              }}>
                <img src={cord.user ? cord.user.profile.profile_picture : ''} style={{ borderRadius: '50%', width: '60px' }} />
                <p style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginBottom: '5px'
                }}>{cord.title}</p>
                <Link style={{
                  backgroundColor: '#17a2b7',
                  padding: '5px',
                  color: 'white'
                }} to={'/dashboard/?p=' + cord._id}>View Post</Link>
              </div>

            </InfoWindow>}
          </Marker>
        )}
    </GoogleMap>
  )
}
);

export default Maps;
// lat: (props.lat) ? props.lat : 31.52037, lng: (props.long) ? props.long : 74.358749
{
  /* <Marker position={{ lat: props.lat, lng: props.long }} /> */
}
