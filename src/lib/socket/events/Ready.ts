import { Payload, Socket } from "../Socket";
import { Client } from "../../client/Client";
import fetch from "node-fetch";
import { Guild } from "../../structs/Guild";

export default {
    name: "READY",
    exec: (client: Client, socket: Socket, data: {}) => {
        const { d } = data as Payload | any;
        socket.session_id = d.session_id;
        client.user.setProps(d.user);

        d.guilds.forEach(async (g: { unavailable: boolean, id: string }) => {
            const req = await fetch(client.apiURL + `/guilds/${g.id}`, {
                headers: {
                    "Authorization": `Bot ${client.token}`
                }
            });
            
            if (req.ok) {
                const res = await req.json();
                return client.guilds.set(res.id, new Guild(client, res));
            };
        });

        return client.emit("ready");
    },
};