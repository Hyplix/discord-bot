import { Client } from "../client/Client";
import { WebSocket } from "ws";
import path from "path";
import fs from "fs";

export class Socket extends Map<string, any> {
    public client: Client;
    public raw: WebSocket | null;
    public connectedAt = 0;
    public session_id: string | null = null;
    public heartbeat?: NodeJS.Timer;

    constructor (client: Client) {
        super();

        this.client = client;
        this.raw = null;
        this.events();
        this.make();
    };

    private async make (): Promise<Socket | void> {
        if (!this.client.token) throw new Error("Token is not assigned in the client property");

        const ws = new WebSocket("wss://gateway.discord.gg/?v=9&encoding=json");
        this.raw = ws;

        ws.addEventListener("open", (e) => {
            this.connectedAt = Date.now();
            
            ws.onmessage = (e) => {
                const data = (JSON.parse(String(e.data)) as any) as Payload;

                switch (data.op) {
                    case 10: {
                        const event = this.get("Hello");

                        if (!event) {
                            return;
                        } else event.exec(this.client, this, data);
                    };

                    break;

                    case 0: {

                        if (!data.t) {
                            return;
                        };
                        
                        const event = this.get(data.t as string);

                        if (!event) {
                            return;      
                        } else event.exec(this.client, this, data);
                    };
                };
            };
        });
    };

    private events (): void {
        const dir = fs.readdirSync(__dirname + "/events").filter(ext => ext.endsWith(".js"));

        for (let i = 0; i < dir.length; i++) {
            const file = require(`./events/${dir[i]}`).default as { name: string; };
            
            this.set(file.name, file);
        };
    };

    public destroy (): void {
        if (this.heartbeat) {
            clearInterval(this.heartbeat);
        };

        return this.raw?.close();
    };
};

export interface Payload {
    op: number;
    d?: JSON;
    s?: number;
    t?: string;
};