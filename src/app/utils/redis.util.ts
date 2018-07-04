import {RedisClient} from 'redis';

export class RedisUtil {

    constructor(public connect: RedisClient) {

    }

    public async keys(pattern: string): Promise<string[]> {
        return await new Promise((resolve, reject) => {
            this.connect.keys(pattern, (err, reply) => {
                err && reject(err);
                resolve(reply);
            });
        });
    }

    public async rename(key: string, newkey: string): Promise<'OK'> {
        return await new Promise((resolve, reject) => {
            this.connect.rename(key, newkey, (err, reply) => {
                err && reject(err);
                resolve(reply);
            });
        });
    }

    public async del(key: string): Promise<any> {
        return await new Promise((resolve, reject) => {
            this.connect.del(key, (err, reply) => {
                err && reject(err);
                resolve(reply);
            });
        });
    }

    public async get(key: string): Promise<string> {
        return await new Promise((resolve, reject) => {
            this.connect.get(key, (err, reply) => {
                err && reject(err);
                resolve(reply);
            });
        });
    }
}
