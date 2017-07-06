import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class GlobalEventsManagerService {

    private _switchNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public switchNavBarEmitter: Observable<boolean> = this._switchNavBar.asObservable();

    constructor() {}

    switchNavBar(ifSwitch: boolean) {
        this._switchNavBar.next(ifSwitch);
    }


}
