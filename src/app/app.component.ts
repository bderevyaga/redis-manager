import {Component} from '@angular/core';
import {ElectronService} from './providers/electron.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    public connections: any[] = [];

    constructor(private electronService: ElectronService) {

    }

    public addConnection() {
        this.connections.push({
            name: `connection ${this.connections.length}`,
            connect: this.electronService.redis.createClient()
        });
    }
}
