import {Component, HostBinding} from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['./modal.component.less']
})

export class ModalComponent {
    public icons = {faTimes};
    public value: any;

    @HostBinding('class.close')
    private _close = true;

    public close(): any {
        this._close = true;
        return this.value;
    }

    public show(value?: any) {
        this.value = value;
        this._close = false;
    }
}
