import Server from "ada-cloud-hub/boot";
import static from 'koa-static';
import bodyParser from 'koa-bodyparser';

let server = new Server();
server.use(static(__dirname + './dist'));
server.use(bodyParser());
server.startup();

export default server;