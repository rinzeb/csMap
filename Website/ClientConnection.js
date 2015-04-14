var ClientConnection;
(function (ClientConnection) {
    var LayerSubscription = (function () {
        function LayerSubscription() {
        }
        return LayerSubscription;
    })();
    ClientConnection.LayerSubscription = LayerSubscription;
    var WebClient = (function () {
        function WebClient(Client) {
            this.Client = Client;
            this.Layers = {};
        }
        WebClient.prototype.SubscribeLayer = function (sub) {
            this.Layers[sub.id] = sub;
            console.log('subscribed to layer : ' + sub);
        };
        return WebClient;
    })();
    ClientConnection.WebClient = WebClient;
    var ConnectionManager = (function () {
        function ConnectionManager(httpServer) {
            var _this = this;
            this.users = {};
            this.io = require('socket.io')(httpServer);
            this.io.on('connection', function (socket) {
                // store user
                console.log('user ' + socket.id + ' has connected');
                var wc = new WebClient(socket);
                _this.users[socket.id] = wc;
                socket.on('disconnect', function (s) {
                    delete _this.users[socket.id];
                    console.log('user ' + socket.id + ' disconnected');
                });
                socket.on('joinlayer', function (msg) {
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
        ConnectionManager.prototype.registerLayer = function (id) {
        };
        ConnectionManager.prototype.updateFeature = function (layer, feature) {
            for (var uId in this.users) {
                if (this.users[uId].Layers.hasOwnProperty(layer)) {
                    this.users[uId].Client.emit("layer-" + layer, { action: "update", data: [feature] });
                }
            }
        };
        ConnectionManager.prototype.deleteFeature = function (layer, feature) {
            for (var uId in this.users) {
                if (this.users[uId].Layers.hasOwnProperty(layer)) {
                    this.users[uId].Client.emit("layer-" + layer, { action: "delete", data: [feature.id] });
                }
            }
        };
        return ConnectionManager;
    })();
    ClientConnection.ConnectionManager = ConnectionManager;
})(ClientConnection || (ClientConnection = {}));
module.exports = ClientConnection;
//# sourceMappingURL=ClientConnection.js.map