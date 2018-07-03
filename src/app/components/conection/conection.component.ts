import {Component, Input, ViewChild} from '@angular/core';
import {RedisClient} from 'redis';
import {faHashtag, faTrashAlt, faSyncAlt, faEdit} from '@fortawesome/free-solid-svg-icons';
import {ModalComponent} from '../modal/modal.component';

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

    private _connect: RedisClient;

    @Input()
    set connect(connect) {
        if (connect) {
            this._connect = connect;
            this.keys();
        }
    }

    public keys(pattern = '*') {
        this._connect.keys(pattern, (err, redisKeys) => {
            this.keyList = redisKeys;
        });
    }

    public rename(newKey) {
        const key = this.newKeyModal.close();
        this._connect.rename(key, newKey, () => {
            this.keys();
        });
    }

    public del(key) {
        this._connect.del(key, () => {
            this.keys();
        });
    }

    public get(key) {
        this._connect.get(key, (err, redisValue) => {
            this.value = redisValue;
        });
    }
}
