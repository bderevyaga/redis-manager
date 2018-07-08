import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {ElectronService} from './providers/electron.service';
import {ConectionComponent} from './components/conection/conection.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ModalComponent} from './components/modal/modal.component';
import {ValueComponent} from './components/value/value.component';

@NgModule({
    declarations: [
        AppComponent,
        ConectionComponent,
        ValueComponent,
        ModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        FontAwesomeModule
    ],
    providers: [ElectronService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
