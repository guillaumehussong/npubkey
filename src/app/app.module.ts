import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';

// Material
import { MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FeedComponent } from './components/feed/feed.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostComponent } from './components/post/post.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { RelayComponent } from './components/relay/relay.component';
import { GenerateComponent } from './components/generate/generate.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './components/users/users.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { Kind1Component } from './components/kind1/kind1.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { UsernamePipe } from './pipes/username.pipe';
import { SearchComponent } from './components/search/search.component';
import { NpubPipe } from './pipes/npub.pipe';
import { HashtagPipe } from './pipes/hashtag.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { FollowingComponent } from './components/following/following.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { NeventPipe } from './pipes/nevent.pipe';
import { FollowersComponent } from './components/followers/followers.component';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { HumantimePipe } from './pipes/humantime.pipe';
import { FollowComponent } from './components/follow/follow.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HashtagFeedComponent } from './components/hashtag-feed/hashtag-feed.component';
import { ZapComponent } from './components/zap/zap.component';

// indexed db
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';

const dbConfig: DBConfig  = {
    name: 'npubkeydb',
    version: 1,
    objectStoresMeta: [
        {
            store: 'users',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                { name: 'name', keypath: 'name', options: { unique: false } },
                { name: 'username', keypath: 'username', options: { unique: false } },
                { name: 'displayName', keypath: 'displayName', options: { unique: false } },
                { name: 'website', keypath: 'website', options: { unique: false } },
                { name: 'about', keypath: 'about', options: { unique: false } },
                { name: 'picture', keypath: 'picture', options: { unique: false } },
                { name: 'banner', keypath: 'banner', options: { unique: false } },
                { name: 'lud06', keypath: 'lud06', options: { unique: false } },
                { name: 'lud16', keypath: 'lud16', options: { unique: false } },
                { name: 'nip05', keypath: 'nip05', options: { unique: false } },
                { name: 'pubkey', keypath: 'pubkey', options: { unique: true } },
                { name: 'npub', keypath: 'npub', options: { unique: true } },
                { name: 'createdAt', keypath: 'createdAt', options: { unique: false } },
                { name: 'apiKey', keypath: 'apiKey', options: { unique: false } },
                { name: 'following', keypath: 'following', options: {unique: false}}
            ]
        },
    ]
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FeedComponent,
    ProfileComponent,
    PostComponent,
    SettingsComponent,
    LoginComponent,
    RelayComponent,
    GenerateComponent,
    CreateEventComponent,
    UsersComponent,
    MessengerComponent,
    UserComponent,
    UserDetailComponent,
    Kind1Component,
    ProfileEditComponent,
    UsernamePipe,
    SearchComponent,
    NpubPipe,
    HashtagPipe,
    SafePipe,
    TruncatePipe,
    FollowingComponent,
    PostDetailComponent,
    NeventPipe,
    FollowersComponent,
    EllipsisPipe,
    ContactListComponent,
    HumantimePipe,
    FollowComponent,
    LoadingComponent,
    HashtagFeedComponent,
    ZapComponent,
    ImageDialogComponent,
  ],
  entryComponents: [ImageDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatCheckboxModule,
    MatSliderModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatChipsModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatTabsModule,
    MatSelectModule,
    MatIconModule,
    MatProgressBarModule,
    MatGridListModule,
    FlexLayoutModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    AppRoutingModule,
    QRCodeModule,
    InfiniteScrollModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ReactiveFormsModule,
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
