import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectCallService {
    mob;
    private subject = new Subject<any>();
    private notification_length  = new Subject<any>();
    private mobile = new Subject<any>();
    sendMessage(message: number) {
        this.subject.next({ isUpdate: message });
    }

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
    
    sendmobile(message: number) {
        this.mobile.next({ isUpdate1: message });
    }

    clearmobile() {
        this.mobile.next();
    }

    getmobile(): Observable<any> {
        return this.mobile.asObservable();
    }

    setnotificationvalue(message: number) {
        this.notification_length.next({ notification_length: message });
    }
    clearnotificationvalue() {
        this.notification_length.next();
    }
    getnotificationvalue(): Observable<any> {
        return this.notification_length.asObservable();
    }

}
