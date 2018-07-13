import { Component, ViewChild, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { RedisClient } from 'redis';
import { faDatabase, faTimes, faInfoCircle, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from './components/modal/modal.component';
import { RedisUtil } from './utils/redis.util';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.less',
        './styles/modal.style.less',
        './styles/list.style.less'
    ]
})
export class AppComponent implements OnInit {
    public icons = { faDatabase, faTimes, faInfoCircle, faAddressBook };
    public connections: Map<string, any> = new Map();
    public redisConnection: RedisClient;
    public activeName: string;
    public connectInfo: string;

    @ViewChild('add_connect_modal') addConnectModal: ModalComponent;
    @ViewChild('connect_info_modal') connectInfoModal: ModalComponent;

    constructor(private electronService: ElectronService) {

    }

    ngOnInit() {
        for (let index = 0; index < localStorage.length; index++) {
            const name = localStorage.key(index);
            const {port, host, password} = JSON.parse(localStorage.getItem(name));

            const connect = (<any>this.electronService.redis).createClient(port, host, { password });

            this.connections.set(name, connect);
        }
    }

    public addConnect(name: string, host: string, port: number, password: string = null): void {
        this.addConnectModal.close();

        const connect = (<any>this.electronService.redis).createClient(port, host, { password });

        localStorage.setItem(name, JSON.stringify({port, host, password}));
        this.connections.set(name, connect);
    }

    public async redisInfo(name: string) {
        const connect = this.connections.get(name);

        this.connectInfo = await (<any>new RedisUtil(connect)).info();
        this.connectInfoModal.show();
    }

    public closeConnect(name: string): void {
        this.connections.get(name).quit();
        this.connections.delete(name);

        localStorage.removeItem(name);

        if (name === this.activeName) {
            delete this.redisConnection;
            delete this.activeName;
        }
    }

    public connect(name: string): void {
        this.activeName = name;
        this.redisConnection = this.connections.get(name);
    }

    public getKeys(map): string[] {
        return Array.from(map.keys());
    }
}
