import { nip19 } from 'nostr-tools';
import { Content } from 'src/app/types/post';

// kind 0 content - nostr
export interface Kind0Content {
    name?: string;
    username?: string;
    displayName?: string;
    website?: string;
    about?: string;
    picture?: string;
    banner?: string;
    lud06?: string;
    lud16?: string;
    nip05?: string;
    // can have other random stuff in here too
}

export interface SearchUser {
    pubkey: string,
    picture: string
}


export class BaseUser {
    pubkey: string;
    name: string;
    constructor(pubkey: string, name: string) {
        this.pubkey = pubkey;
        this.name = name;
    }
}

/* 
    Preprocesses a kind0 message into a User class to be nicely accessible
*/
export class User {
    name: string = "";
    username: string = "";
    displayName: string = "";
    website: string = "";
    about: string = "";
    aboutHTML: string;
    picture: string = "";
    banner: string = "";
    lud06: string = "";
    lud16: string = "";
    nip05: string = "";
    pubkey: string;
    npub: string;
    createdAt: number;
    apiKey: string;
    constructor(kind0: Kind0Content, createdAt: number, pubkey: string) {
        this.pubkey = pubkey;
        this.npub = nip19.npubEncode(this.pubkey);
        this.name = kind0.name || "";
        this.username = kind0.username || "";
        this.displayName = kind0.displayName || this.name || this.username || this.npub;
        this.website = this.getClickableWebsite(kind0.website || "");
        const fake = {
            reply: undefined,
            root: undefined,
            mentions: [],
            profiles: []
        }
        this.about = kind0.about || "";
        this.aboutHTML = new Content(1, kind0.about || "", fake).getParsedContent();
        this.picture = kind0.picture || "https://axiumradonmitigations.com/wp-content/uploads/2015/01/icon-user-default.png";
        this.banner = kind0.banner || "";
        this.lud06 = kind0.lud06 || "";
        this.lud16 = kind0.lud16 || "";
        this.nip05 = kind0.nip05 || "";
        this.createdAt = createdAt;

        this.cachePubkeyDisplayName()
        this.apiKey = "LIVDSRZULELA" // TODO;
    }

    getClickableWebsite(link: string) {
        if (link === "") return link;
        if (link.startsWith("http://") || link.startsWith("https://")) {
            return link;
        }
        return `http://${link}`;
    }

    cachePubkeyDisplayName() {
        localStorage.setItem(`${this.pubkey}`, this.displayName);
    }

    setLightningInfo(lud06: string, lud16: string) {
        // decode one into the other and vice versa if only has one
    }
}
