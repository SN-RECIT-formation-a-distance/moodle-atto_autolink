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

    queryMoodle(methodName, args, onSuccess){
        let data = {index:0, args:args, methodname: methodName};
        this.post(this.gateway + "&info=" + methodName, [data], onSuccess);
    }

    getCmList(cId, onSuccess){
        this.queryMoodle('atto_recitautolink_get_cm_list', {courseid: parseInt(cId)}, onSuccess);
    }

    getSectionList(cId, onSuccess){
        this.queryMoodle('atto_recitautolink_get_section_list', {courseid: parseInt(cId)}, onSuccess);
    }

    getH5PList(cId, onSuccess){
        this.queryMoodle('atto_recitautolink_get_h5p_list', {courseid: parseInt(cId)}, onSuccess);
    }

};
