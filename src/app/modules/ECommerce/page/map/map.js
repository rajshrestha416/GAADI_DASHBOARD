import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";


function Maps() {
    return (
        <div>
            {/* <UserHeader /> */}
            {/* Page content */}
            {/* <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow border-0"></Card>
            <ShowMap />
          </div>
        </Row>
      </Container> */}
            <MapContainer center={[27.717, 85.323]}
                style={{height: "500px"}}
                zoom={15}
                scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>

        </div>
    );
}

// Maps.layout = Admin;

export default Maps;
