import * as http from 'http'
import * as serverHandler from '@config/eventhandlers/httpServer.eventHandler'
import server from '@config/server/serverExpressApp'

const Server: http.Server = http.createServer(server)
const Port: number = server.get('port')

/**
 * Binds and listens for connections on the specified host
 */
Server.listen(Port, () => {
  console.log(`Listening on ${Port}. Health Check at http://localhost:${Port}/health`)
})

/**
 * Server Events
 */
Server.on('error', (error: Error) => {
  serverHandler.onError(error, server.get('port'))
})
Server.on('listening', serverHandler.onListening.bind(Server))
