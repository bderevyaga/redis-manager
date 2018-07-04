import {Component, ViewChild} from '@angular/core';
import {ElectronService} from './providers/electron.service';
import {RedisClient} from 'redis';
import {faDatabase, faTimes} from '@fortawesome/free-solid-svg-icons';
import {ModalComponent} from './components/modal/modal.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    public icons = {faDatabase, faTimes};
    public connections: any[] = [];
    public connection: RedisClient;

    @ViewChild('add_connect_modal') addConnectModal: ModalComponent;

    constructor(private electronService: ElectronService) {

    }

    public add(name: string, host: string, port: number): void {
        this.addConnectModal.close();
        const connect = this.electronService.redis.createClient(port, host);

        this.connections.push({name, connect});
    }

    public close(connection): void {
        const index = this.connections.indexOf(connection);

        this.connections.splice(index, 1);

        if (this.connection === connection.connect) {
            delete this.connection;
        }

        connection.connect.quit();
    }

    public connect(connect: RedisClient): void {
        this.connection = connect;
    }
}
