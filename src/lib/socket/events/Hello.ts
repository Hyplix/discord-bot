import { Client } from "../../client/Client";
import { Socket } from "../Socket";

export default {
    name: "Hello",
    exec: (client: Client, socket: Socket, data: { d: { heartbeat_interval: number } }) => {
        if (!client.token) return;

        socket.raw?.send(JSON.stringify({
            "op": 2,
            "d": {
                "token": client.token,
                "intents": 1 << 0,
                "properties": {
                    "$browser": "hyplix",
                    "$device": "hyplix"
                }
            }
        }));

        socket.heartbeat = setInterval(() => {
            socket.raw?.send(JSON.stringify({
                op: 1,
                d: null
            }));

        }, data.d.heartbeat_interval);
    },
};