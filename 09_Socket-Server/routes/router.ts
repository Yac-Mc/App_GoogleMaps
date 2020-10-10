
import {Router, Request, Response} from 'express';
import { mapa } from '../sockets/sockets';
// import Server from '../class/server';


const router = Router();
// const server = Server.instance;


router.get('/map', (req: Request, res: Response) => {

    res.json(mapa.getMarkers());
});


export default router;