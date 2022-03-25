import { Payload, Socket } from "../Socket";
import { Client } from "../../client/Client";

export default {
    name: "READY",
    exec: (client: Client, socket: Socket, data: {}) => {
        const { d } = data as Payload | any;
        socket.session_id = d.session_id;
        client.user.setProps(d.user);

        return client.emit("ready");
    },
};