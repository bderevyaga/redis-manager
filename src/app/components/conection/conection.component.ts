import {Component, Input, ViewChild} from '@angular/core';
import {faHashtag, faTrashAlt, faSyncAlt, faEdit, faSave, faFile} from '@fortawesome/free-solid-svg-icons';
import {ModalComponent} from '../modal/modal.component';
import {RedisUtil} from '../../utils/redis.util';

@Component({
    selector: 'app-conection',
    templateUrl: './conection.component.html',
    styleUrls: [
        './conection.component.less',
        '../../styles/modal.style.less',
        '../../styles/list.style.less'
    ]
})
export class ConectionComponent {
    public icons = {faSyncAlt, faHashtag, faTrashAlt, faEdit, faSave, faFile};
    public keyList: string[] = [];
    public redisKey: string;

    @ViewChild('new_key_modal') newKeyModal: ModalComponent;
    @ViewChild('set_key_modal') setKeyModal: ModalComponent;

    private _connect: RedisUtil;

    @Input()
    set connect(connect) {
        if (connect) {
            this._connect = new RedisUtil(connect);
            this.redisKeys().catch();
        }
    }

    public async redisKeys(pattern: string = '*'): Promise<void> {
        this.keyList = await this._connect.scan(pattern);
    }

    public async redisRename(newKey: string): Promise<void> {
        const key = this.newKeyModal.close();

        await this._connect.rename(key, newKey);
        await this.redisKeys();
    }

    public async redisDel(key: string): Promise<void> {
        await this._connect.del(key);
        await this.redisKeys();
    }

    public async redisSet(key: string, value: string): Promise<void> {
        this.setKeyModal.close();

        await this._connect.set(key, value);
        await this.redisKeys();
    }
}
