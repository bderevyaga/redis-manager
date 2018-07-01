import {Component, Input, ChangeDetectorRef} from '@angular/core';
import {RedisClient} from 'redis';
import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-conection',
    templateUrl: './conection.component.html',
    styleUrls: ['./conection.component.less']
})
export class ConectionComponent {
    public faSyncAlt = faSyncAlt;
    public keys: string[] = [];
    public value: any;

    private _connect: RedisClient;

    @Input()
    set connect(connect) {
        if (connect) {
            this._connect = connect;
            this.show();
        }
    }

    constructor(private ref: ChangeDetectorRef) {
    }

    public show() {
        this._connect.keys('*', (err, redisKeys) => {
            this.keys = redisKeys;
            this.ref.detectChanges();
        });
    }

    public getValue(key) {
        this._connect.get(key, (err, redisValue) => {
            this.value = redisValue;
            this.ref.detectChanges();
        });
    }
}
