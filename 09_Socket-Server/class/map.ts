import { Marker } from './marker';


export class Map{

    private markers: Marker[] = [
        {
            id: '1',
            nombre: 'Yoe',
            lat: 4.58971,
            lng: -74.08200
        },
        {
            id: '2',
            nombre: 'Luisa',
            lat: 4.59971,
            lng: -74.08175
        },
        {
            id: '3',
            nombre: 'Tita',
            lat: 4.60971,
            lng: -74.08175
        }
    ];

    constructor(){}

    getMarkers(){
        return this.markers;
    }

    deleteMarker( id: string){
        this.markers = this.markers.filter( mark => mark.id != id);
        return this.getMarkers();
    }

    moveMarker( marker: Marker){
        for (const i in this.markers) {
            if (this.markers[i].id == marker.id) {
                this.markers[i].lng = marker.lng;
                this.markers[i].lat = marker.lat;
                break;
            }
        }
    }

    addMarker( marker: Marker){

        this.markers.push(marker);
    }
}