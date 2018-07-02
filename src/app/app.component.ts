import {Component} from '@angular/core';
import {ElectronService} from './providers/electron.service';
import {RedisClient} from 'redis';
import {faDatabase, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    public icons = {faDatabase, faTimes};
    public connections: any[] = [];
    public connection: RedisClient;

    constructor(private electronService: ElectronService) {

    }

    public add() {
        this.connections.push({
            name: `connection ${this.connections.length}`,
            connect: this.electronService.redis.createClient()
        });
    }

    public close(connection) {
        const index = this.connections.indexOf(connection);

        this.connections.splice(index, 1);

        if (this.connection === connection.connect) {
            delete this.connection;
        }

        connection.connect.quit();
    }

    public connect(connect: RedisClient) {
        this.connection = connect;
    }
}
