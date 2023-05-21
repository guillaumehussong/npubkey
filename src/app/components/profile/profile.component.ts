import { Component, OnInit } from '@angular/core';
import { NostrService } from 'src/app/services/nostr.service';
import { SignerService } from 'src/app/services/signer.service';
import { Filter } from 'nostr-tools';
import { User } from '../../types/user';
import { Post } from '../../types/post';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    welcomeMessage: string = "Welcome to the nostr network. Create a profile or start looking around";
    loading: boolean = true;
    user: User | null | undefined = undefined;
    posts: Post[] = [];

    constructor(
        private signerService: SignerService,
        private nostrService: NostrService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.loading = true;
        // need to make sure we have pubkey
        if (this.signerService.usingNostrBrowserExtension()) {
            // TODO probably make this whole thing flow better 
            // ie if not logged in dont allow this page or something
            this.signerService.handleLoginWithExtension();
        }
        this.getUser();
    }

    signOut() {
        this.signerService.clearKeys();
        this.openSnackBar("Successfully signed out", "dismiss");
        this.router.navigate(["/login"]);
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {duration: 1300});
    }

    async getUser() {
        let pubkey = this.signerService.getPublicKey()
        if (pubkey === "") {
            this.router.navigate(["/login"])
        }
        this.user = await this.nostrService.getUser(pubkey);
        this.getPosts();
        this.loading = false;
    }

    async getPosts() {
        // if (this.user) {
        //     this.posts = await this.nostrService.getUserPosts(this.user.pubkey);
        // }
    }
}
