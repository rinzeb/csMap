module ClientConnection {
    export class LayerSubscription {
        public id: string;
    }

    export class WebClient {
        public Name: string;
        public Layers: { [key: string]: LayerSubscription } = {};

        constructor(public Client: any) {
        }

        SubscribeLayer(sub: LayerSubscription) {
            this.Layers[sub.id] = sub;
            console.log('subscribed to layer : ' + sub);
        }
    }

    export class ConnectionManager {
        users: { [key: string]: WebClient } = {};
        io: SocketIO.Server;

        constructor(httpServer: any) {
            this.io = require('socket.io')(httpServer);

            this.io.on('connection',(socket: SocketIO.Socket) => {

                // store user
                console.log('user ' + socket.id + ' has connected');
                var wc = new WebClient(socket);
                this.users[socket.id] = wc;

                socket.on('disconnect',(s: SocketIO.Socket) => {
                    delete this.users[socket.id];
                    console.log('user ' + socket.id + ' disconnected');
                });

                socket.on('joinlayer',(msg: LayerSubscription) => {
                    wc.SubscribeLayer(msg);
                    wc.Client.emit('laag', 'test');
                    //socket.emit('laag', 'test');
                });

                // create layers room
                //var l = socket.join('layers');
                //l.on('join',(j) => {
                //    console.log("layers: "+ j);
                //});

            });
        }

        public registerLayer(id: string) {

        }

        public updateFeature(layer: string, feature: csComp.Services.IFeature) {
            for (var uId in this.users) {
                if (this.users[uId].Layers.hasOwnProperty(layer)) {
                    this.users[uId].Client.emit("layer-" + layer, { action: "update", data: [feature] });
                }
            }
        }

        public deleteFeature(layer: string, feature: csComp.Services.IFeature) {
            for (var uId in this.users) {
                if (this.users[uId].Layers.hasOwnProperty(layer)) {
                    this.users[uId].Client.emit("layer-" + layer, { action: "delete", data: [feature.id] });
                }
            }
        }



    }
}

export = ClientConnection;
