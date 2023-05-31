import { DBconnect, routing, setupServer } from './config'

setupServer()
// corsConfig()
void DBconnect()
routing()

/**
 * TODO: Optimizar la llamada a las variables de entorno
 */
