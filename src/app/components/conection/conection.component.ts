import {Component, Input, ViewChild} from '@angular/core';
import {faHashtag, faTrashAlt, faSyncAlt, faEdit, faSave, faFile} from '@fortawesome/free-solid-svg-icons';
import {ModalComponent} from '../modal/modal.component';
import {RedisUtil} from '../../utils/redis.util';

@Component({
    selector: 'app-conection',
    templateUrl: './conection.component.html',
    styleUrls: ['./conection.component.less']
})
export class ConectionComponent {
    public icons = {faSyncAlt, faHashtag, faTrashAlt, faEdit, faSave, faFile};
    public keyList: string[] = [];
    public value: string;

    private key: string;

    @ViewChild('new_key_modal') newKeyModal: ModalComponent;
    @ViewChild('set_key_modal') setKeyModal: ModalComponent;

    private _connect: RedisUtil;

    @Input()
    set connect(connect) {
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

    public async get(key: string = this.key): Promise<void> {
        this.key = key;
        this.value = await this._connect.get(key);
    }

    public async set(key: string = this.key, value: string = this.value): Promise<void> {
        this.setKeyModal.close();

        await this._connect.set(key, value);
        await this.keys();
    }
}
