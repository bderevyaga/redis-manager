import {Component, Input} from '@angular/core';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {RedisUtil} from '../../utils/redis.util';

@Component({
    selector: 'app-value',
    templateUrl: './value.component.html',
    styleUrls: ['./value.component.less']
})

export class ValueComponent {
    public icons = {faSave};
    public value: string;
    public bitcount: number;

    private _key: string;

    @Input() connect: RedisUtil;

    @Input()
    set key(key: string) {
        this._key = key;

        this.redisGet(key).catch();
        this.redisBitcount(key).catch();
    }

    public async redisGet(key: string = this._key): Promise<void> {
        this.value = await this.connect.get(key);
    }

    public async redisBitcount(key: string = this._key): Promise<void> {
        this.bitcount = await this.connect.bitcount(key);
    }

    public async redisSet(key: string = this._key, value: string = this.value): Promise<void> {
        await this.connect.set(key, value);

        this.redisBitcount(key).catch();
    }
}
