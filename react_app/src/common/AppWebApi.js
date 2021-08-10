import {WebApi, JsNx} from '../libs/utils/Utils';
import { Options } from './Options';

export class AppWebApi extends WebApi
{    
    constructor(){
        super(Options.getGateway());
                
        this.http.useCORS = true;
        this.sid = 0;
        this.observers = [];
        this.http.timeout = 30000; // 30 secs
    }

    addObserver(id, update, observables){
        this.observers.push({id:id, update:update, observables: observables});
    }

    removeObserver(id){
        JsNx.removeItem(this.observers, "id", id);
    }

    notifyObservers(observable){
        for(let o of this.observers){
            if(o.observables.includes(observable)){
                o.update();
            }
        }
    }

    getCmList(cId, onSuccess){
        let data = {cId: cId, service: "getCmList"};
        this.post(this.gateway, data, onSuccess);
    }

    getSectionList(cId, onSuccess){
        let data = {cId: cId, service: "getSectionList"};
        this.post(this.gateway, data, onSuccess);
    }

    getH5PList(cId, onSuccess){
        let data = {cId: cId, service: "getH5PList"};
        this.post(this.gateway, data, onSuccess);
    }

};
