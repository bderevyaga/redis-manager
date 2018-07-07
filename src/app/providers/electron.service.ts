import {Injectable} from '@angular/core';
import * as redis from 'redis';

@Injectable()
export class ElectronService {
    public redis: typeof redis;

    constructor() {
        if (this.isElectron()) {
            this.redis = window.require('redis');
        }
    }

    isElectron = () => {
        return window && window.process && window.process.type;
    }
}
