import {Component, ViewChild} from '@angular/core';
import {ElectronService} from './providers/electron.service';
import {RedisClient} from 'redis';
import {faDatabase, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {ModalComponent} from './components/modal/modal.component';
import {RedisUtil} from './utils/redis.util';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.less',
        './styles/modal.style.less',
        './styles/list.style.less'
    ]
})
export class AppComponent {
    public icons = {faDatabase, faTimes, faInfoCircle};
    public connections: any[] = [];
    public redisConnection: RedisClient;
    public connectInfo: string;

    @ViewChild('add_connect_modal') addConnectModal: ModalComponent;
    @ViewChild('connect_info_modal') connectInfoModal: ModalComponent;

    constructor(private electronService: ElectronService) {

    }

    public addConnect(name: string, host: string, port: number): void {
        this.addConnectModal.close();
        const connect = (<any>this.electronService.redis).createClient(port, host);

        this.connections.push({name, connect});
    }

    public async redisInfo(connect: RedisClient) {
        this.connectInfo = await new RedisUtil(connect).info();
        this.connectInfoModal.show();
    }

    public closeConnect(connection): void {
        const index = this.connections.indexOf(connection);

        this.connections.splice(index, 1);

        if (this.redisConnection === connection.connect) {
            delete this.redisConnection;
        }

        connection.connect.quit();
    }

    public connect(connect: RedisClient): void {
        this.redisConnection = connect;
    }
}
