import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { Map } from '../class/map';
import { Marker } from '../class/marker';

export const mapa = new Map();

// Evnetos de mapa

export const MAPSOCKETS = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('marcador-nuevo', ( marker: Marker ) => {

        mapa.addMarker(marker);
        cliente.broadcast.emit('marcador-nuevo', marker );
    })

    cliente.on('marcador-borrar', ( id: string ) => {

        mapa.deleteMarker(id);
        cliente.broadcast.emit('marcador-borrar', id );
    })

    cliente.on('marcador-mover', ( marker: Marker ) => {

        mapa.moveMarker(marker);
        cliente.broadcast.emit('marcador-mover', marker );
    })

}