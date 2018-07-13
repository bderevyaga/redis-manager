import { Component, Input } from '@angular/core';
import { faSave, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { RedisUtil } from '../../utils/redis.util';

@Component({
    selector: 'app-value',
    templateUrl: './value.component.html',
    styleUrls: ['./value.component.less']
})

export class ValueComponent {
    public icons = { faSave, faSyncAlt };
    public value: string;
    public bitcount: number;
    public strlen: number;

    private _key: string;

    @Input() connect: RedisUtil;

    @Input()
    set key(key: string) {
        if (key) {
            this._key = key;

            this.redisGet(key).catch();
        }
    }

    public async redisGet(key: string = this._key): Promise<void> {
        this.value = await this.connect.get(key);

        this.redisBitcount(key).catch();
        this.redisStrlen(key).catch();
    }

    public async redisBitcount(key: string = this._key): Promise<void> {
        this.bitcount = await this.connect.bitcount(key);
    }

    public async redisStrlen(key: string = this._key): Promise<void> {
        this.strlen = await this.connect.strlen(key);
    }

    public async redisSet(key: string = this._key, value: string = this.value): Promise<void> {
        await this.connect.set(key, value);

        this.redisBitcount(key).catch();
        this.redisStrlen(key).catch();
    }
}
