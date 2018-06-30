import {Component} from '@angular/core';
import {ElectronService} from './providers/electron.service';
import {RedisClient} from 'redis';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    public connections: any[] = [];
    public keys: string[] = [];
    public connect: RedisClient;
    public value: any;

    constructor(private electronService: ElectronService) {

    }

    public addConnection() {
        this.connections.push({
            name: `connection ${this.connections.length}`,
            connect: this.electronService.redis.createClient()
        });
    }

    public showConnection(connect: RedisClient) {
        if (connect) {
            this.connect = connect;
        }

        this.connect.keys('*', (err, keys) => {
            if (err) return console.log(err);

            this.keys = keys;
        });
    }

    public getValue(key) {
        this.connect.get(key, (err, value) => {
            if (err) return console.log(err);

            this.value = value;
        });
    }
}
