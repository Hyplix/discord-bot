import { Client } from "../client/Client";
import { Guild } from "./Guild";
import fetch from "node-fetch";

export class Message {
    public type = 0;
    public tts = false;
    public timestamp = "";
    public referenced_message = "";
    public pinned = false;
    public nonce = "";
    public mentions = [];
    public mention_roles = [];
    public mention_everyone = false;
    public member = {};
    public id = "";
    public flags = 0;
    public embeds = [];
    public edited_timestamp = "";
    public content = "";
    public channel_id = "";
    public author?: MessageStructure["author"];
    public attachments = [];
    public guild_id = "";
    public guild: Guild | undefined;
    public client!: Client;

    constructor (client: Client, data: MessageStructure & any) {
        Object.defineProperty(this, "client", {
            value: client,
            enumerable: false
        });

        for (const key of Object.keys(data)) {
            (this as {[key: string]: any})[key] = (data as {[key: string]: any})[key];
        };

        this.guild = client.guilds.get(this.guild_id);
    };

    public async createMessage (data: MessageParams) {

        if (!Object.keys(data).length) throw new Error("Message content cannot be empty.");

        return fetch(this.client.apiURL + `/channels/${this.channel_id}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bot ${this.client.token}`
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.ok) return;

            res.json().then(data => {
                console.log(data);
            });
        });
    };
};

export interface MessageStructure {
    type: 0;
    tts: boolean;
    timestamp: string;
    referenced_message: string;
    pinned: boolean;
    nonce: string;
    mentions: string[];
    mention_roles: [];
    mention_everyone: boolean;
    member: {
        roles: string[];
        premium_since: string;
        pending: boolean;
        nick: string;
        mute: boolean;
        joined_at: Date;
        is_pending: boolean;
        hoisted_role: string;
        deaf: boolean;
        avatar: null
    };
    id: string;
    flags: number;
    embeds: string[];
    edited_timestamp: string;
    content: string;
    channel_id: string;
    author: {
        username: string;
        public_flags: number;
        id: string;
        discriminator: string;
        avatar: string;
    };
    attachments: [];
    guild_id: string;
};

export interface MessageParams {
    content?: string;
    embeds?: object[];
    message_reference?: {
        message_id: string;
        channel_id: string;
        guild_id: string;
    };
    allowed_mentions?: boolean;
};