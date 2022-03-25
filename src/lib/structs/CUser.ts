import { Client } from "../client/Client";

export class CUser {
    public verified = false;
    public username: string | null = null;
    public mfa_enabled = false;
    public id: string | null = null;
    public flags = 0;
    public email: string | null = null;
    public discriminator: string | null = null;
    public bot = false;
    public avatar: string | null = null;

    constructor (client: Client, data: ClientData) {
        this.verified = data.verified;
        this.username = data.username;
        this.mfa_enabled = data.mfa_enabled;
        this.id = data.id;
        this.flags = data.flags;
        this.email = data.email;
        this.discriminator = data.discriminator;
        this.bot = data.bot;
        this.avatar = data.avatar;
    };

    public setProps (data: ClientData) {
        const keys = Object.keys(data);

        for (const k of keys) {
            const v = (data as {[key: string]: any})[k];
            (this as {[key: string]: any})[k] = v;
        };

        return this;
    };
};

export interface ClientData {
    verified: boolean;
    username: string | null;
    mfa_enabled: boolean;
    id: string | null;
    flags: number;
    email: string | null;
    discriminator: string | null;
    bot: boolean;
    avatar: string | null;
};