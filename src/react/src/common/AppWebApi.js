// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * This atto plugin allows to generate code for filter autolink and integrate them to your text.
 *
 * @package    atto_recitautolink
 * @copyright  2019 RECIT
 * @license    {@link http://www.gnu.org/licenses/gpl-3.0.html} GNU GPL v3 or later
 */
import {WebApi, JsNx} from '../libs/utils/Utils';
import { AppOptions } from './Options';

export class AppWebApi extends WebApi
{    
    constructor(){
        super(AppOptions.getGateway());
                
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

    getRoleList(cId, onSuccess){
        this.queryMoodle('atto_recitautolink_get_role_list', {courseid: parseInt(cId)}, onSuccess);
    }

};
