import { Component, OnInit } from '@angular/core';
import { NostrService } from 'src/app/services/nostr.service';
import { SignerService } from 'src/app/services/signer.service';
import { 
    Event,
    UnsignedEvent,
    getEventHash,
    signEvent,
    Filter
 } from 'nostr-tools';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

    // Form Fields
    name: string = "";
    username: string = "";
    displayName: string = "";
    website: string = "";
    about: string = "";
    picture: string = "";
    banner: string = "";
    lud06: string = "";
    nip05: string = "";
    content: string = "";

    constructor(
        private signerService: SignerService,
        private nostrService: NostrService
    ) {}

    ngOnInit() {
        // need to make sure we have pubkey
        let pubkey = this.signerService.getPublicKey()
        if (pubkey === "") {
            // TODO probably make this whole thing flow better 
            // ie if not logged in dont allow this page or something
            this.signerService.handleLoginWithExtension();
        }
        this.setValues();
    }

    async setValues() {
        let filter: Filter = {authors: [this.signerService.getPublicKey()], kinds: [0], limit: 1}
        let kind0 = await this.nostrService.getUser(filter);
        if (kind0) {
            this.name = kind0.name
            this.username = kind0.username
            this.displayName = kind0.displayName
            this.website = kind0.website
            this.about = kind0.about
            this.picture = kind0.picture
            this.banner = kind0.banner
            this.lud06 = kind0.lud06
            this.nip05 = kind0.nip05
        }
    }

    async submit() {
        let x = {
            name: this.name,
            username: this.username,
            displayName: this.displayName,
            website: this.website,
            about: this.about,
            picture: this.picture,
            banner: this.banner,
            lud06: this.lud06,
            nip05: this.nip05
        }
        this.content = JSON.stringify(x)
        const privateKey = this.signerService.getPrivateKey();
        let unsignedEvent = this.getUnsignedEvent(0, []);
        let signedEvent: Event;
        if (privateKey !== "") {
            let eventId = getEventHash(unsignedEvent)
            signedEvent = this.getSignedEvent(eventId, privateKey, unsignedEvent);
        } else {
            console.log('using extension');
            signedEvent = await this.signerService.signEventWithExtension(unsignedEvent);
        }
        this.nostrService.sendEvent(signedEvent);
    }

    getUnsignedEvent(kind: number, tags: any) {
        const eventUnsigned: UnsignedEvent = {
            kind: kind,
            pubkey: this.signerService.getPublicKey(),
            tags: tags,
            content: this.content,
            created_at: Math.floor(Date.now() / 1000),
        }
        return eventUnsigned
    }

    getSignedEvent(eventId: string, privateKey: string, eventUnsigned: UnsignedEvent) {
        let signature = signEvent(eventUnsigned, privateKey);
        const signedEvent: Event = {
            id: eventId,
            kind: eventUnsigned.kind,
            pubkey: eventUnsigned.pubkey,
            tags: eventUnsigned.tags,
            content: eventUnsigned.content,
            created_at: eventUnsigned.created_at,
            sig: signature,
          };
          return signedEvent;
    }
}