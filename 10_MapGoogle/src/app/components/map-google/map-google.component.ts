import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Lugar } from '../../interfaces/interfaces';
import { MapService } from '../../../services/map.service';
import { WebsocketService } from 'src/services/websocket.service';

@Component({
  selector: 'app-map-google',
  templateUrl: './map-google.component.html',
  styleUrls: ['./map-google.component.css']
})
export class MapGoogleComponent implements OnInit {

  @ViewChild('map') mapElment: ElementRef;
  map: google.maps.Map;

  lat = 4.60971;
  lng = -74.08175;

  markers: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];

  lugares: Lugar[] = [];

  constructor(private mapServices: MapService, private wsService: WebsocketService) { }

  ngOnInit(): void {

    this.mapServices.getMarkersMap().subscribe( (lugares: Lugar[]) => {
      this.lugares = lugares;
      this.loadMap();
    });

    this.escucharSockets();
  }

  escucharSockets() {

    // marcador-nuevo
    this.wsService.listen('marcador-nuevo').subscribe( ( marker: Lugar ) => this.addMarker( marker ) );

    // marcador-mover
    this.wsService.listen('marcador-mover').subscribe( ( marker: Lugar ) => {
      for (const i in this.markers) {
        if ( this.markers[i].getTitle() === marker.id ){
          const latLng = new google.maps.LatLng(marker.lat, marker.lng);
          this.markers[i].setPosition(latLng);
          break;
        }
      }
    });

    // marcador-borrar
    this.wsService.listen('marcador-borrar').subscribe( ( id: string ) => {

      for (const i in this.markers) {
        if ( this.markers[i].getTitle() === id ){
          this.markers[i].setMap(null);
          break;
        }
      }
    });

  }

  loadMap(){
    const latLng = new google.maps.LatLng(this.lat, this.lng);

    const optionsMap: google.maps.MapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map( this.mapElment.nativeElement, optionsMap);

    this.map.addListener('click', (coors: any) => {

      const newMarker: Lugar = {
        id: new Date().toISOString(),
        nombre: 'Nuevo lugar',
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng()
      };

      this.addMarker(newMarker);

      this.wsService.emit('marcador-nuevo', newMarker);

    });

    for (const lugar of this.lugares) {
      this.addMarker(lugar);
    }

  }

  addMarker( lugar: Lugar ){

    const latLng = new google.maps.LatLng(lugar.lat, lugar.lng);

    const marker = new google.maps.Marker({

      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      draggable: true,
      title: lugar.id

    });

    this.markers.push(marker);

    const content = `<b>${lugar.nombre}</b>`;
    const infoWindow = new google.maps.InfoWindow({
      content
    });

    this.infoWindows.push(infoWindow);

    google.maps.event.addDomListener(marker, 'click', () => {

      this.infoWindows.forEach( infoW => infoW.close() );
      infoWindow.open(this.map, marker);

    });

    google.maps.event.addDomListener(marker, 'dblclick', (coors) => {

      marker.setMap(null);

      this.wsService.emit('marcador-borrar', lugar.id);

    });

    google.maps.event.addDomListener(marker, 'drag', (coors: any) => {

      const newMarker = {
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        nombre: lugar.nombre,
        id: lugar.id
      };

      this.wsService.emit('marcador-mover', newMarker );
    });

  }

}
