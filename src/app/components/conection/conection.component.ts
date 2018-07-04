import {Component, Input, ViewChild} from '@angular/core';
import {RedisClient} from 'redis';
import {faHashtag, faTrashAlt, faSyncAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
import {ModalComponent} from '../modal/modal.component';
import {RedisUtil} from '../../utils/redis.util';

@Component({
    selector: 'app-conection',
    templateUrl: './conection.component.html',
    styleUrls: ['./conection.component.less']
})
export class ConectionComponent {
    public icons = {faSyncAlt, faHashtag, faTrashAlt, faEdit};
    public keyList: string[] = [];
    public value: any;

    @ViewChild('new_key_modal')
    public newKeyModal: ModalComponent;

    private _connect: RedisUtil;

    @Input()
    set connect(connect: RedisClient) {
        if (connect) {
            this._connect = new RedisUtil(connect);
            this.keys();
        }
    }

    public async keys(pattern: string = '*'): Promise<void> {
        this.keyList = await this._connect.keys(pattern);
    }

    public async rename(newKey: string): Promise<void> {
        const key = this.newKeyModal.close();

        await this._connect.rename(key, newKey);
        await this.keys();
    }

    public async del(key: string): Promise<void> {
        await this._connect.del(key);
        await this.keys();
    }

    public async get(key: string): Promise<void> {
        this.value = await this._connect.get(key);
    }
}
