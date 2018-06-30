import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule
} from '@angular/material';

import {AppComponent} from './app.component';
import {ElectronService} from './providers/electron.service';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
        MatInputModule
    ],
    providers: [ElectronService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
