import {Component} from '@angular/core';
import {ElectronService} from './providers/electron.service';
import {RedisClient} from 'redis';
import {faDatabase} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    public faDatabase = faDatabase;
    public connections: any[] = [];
    public connection: RedisClient;

    constructor(private electronService: ElectronService) {

    }

    public addConnection() {
        this.connections.push({
            name: `connection ${this.connections.length}`,
            connect: this.electronService.redis.createClient()
        });
    }

    public onConnect(connect: RedisClient) {
        this.connection = connect;
    }
}
