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
import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {$glVars} from '../common/common';
import { ActivityForm } from './ActivityForm';
import { TestForm } from './TestForm';
import { SectionForm } from './SectionForm';
import { H5PForm } from './H5PForm';
import { InfoForm } from './InfoForm';
import { InjectionActivityForm } from './InjectionActivityForm';
import { QRCodeForm } from './QRCodeForm';


export class MainView extends Component {
    static defaultProps = {
        onClose: null
    };

    constructor(props) {
        super(props);
        this.state = {
            cmList: [], 
            sectionList: [], 
            h5pList: [], 
            roleList: [],
            activeTab: 'activity'
        };
        this.setTab = this.setTab.bind(this);
    }

    componentDidMount(){
        let that = this;
        
        $glVars.webApi.getCmList($glVars.classHandler.get("courseid"), function(result){
            if(result.error){
                alert(result.error);
                return;
            }

            let list = [];
            let modnameToExclude = ['label']; //Exclude label because it's not an activity
            for (let e of result[0].data){
                if (modnameToExclude.includes(e.modname)) continue;
                list.push({value: e.name, label: e.name + " [" + e.modname + "]"});
            }
            that.setState({cmList: list});
        });
        
        $glVars.webApi.getSectionList($glVars.classHandler.get("courseid"), function(result){
            if(result.error){
                alert(result.error);
                return;
            }

            let list = [];
            for (let e of result[0].data){
                list.push({value: e.name, label: e.name});
            }
            that.setState({sectionList: list});
        });
        
        $glVars.webApi.getH5PList($glVars.classHandler.get("courseid"), function(result){
            if(result.error){
                alert(result.error);
                return;
            }

            let list = [];
            for (let e of result[0].data){
                list.push({value: e.name, label: e.name});
            }
            that.setState({h5pList: list});
        });

        $glVars.webApi.getRoleList($glVars.classHandler.get("courseid"), function(result){
            if(result.error){
                alert(result.error);
                return;
            }

            let list = [];
            for (let e of result[0].data){
                list.push({value: e.archetype, label: e.localname});
            }
            that.setState({roleList: list});
        });
    }

    render() {             
        let style = {overflowY: "auto", maxHeight: "calc(90vh - 200px)", scrollbarWidth: 'thin'};
        let className = 'p-2';
        let main = 
            <Tabs activeKey={this.state.activeTab} onSelect={this.setTab} className="mb-3" variant="pills">
                <Tab className={className} title={M.util.get_string('activities', 'atto_recitautolink')} eventKey='activity' style={style}>
                    <ActivityForm cmList={this.state.cmList} roleList={this.state.roleList} onClose={this.props.onClose}/>             
                </Tab>
                <Tab className={className} title={M.util.get_string('qrcode', 'atto_recitautolink')} eventKey='qrcode' style={style}>
                    <QRCodeForm cmList={this.state.cmList} onClose={this.props.onClose}/>             
                </Tab>
                <Tab className={className} title={M.util.get_string('sections', 'atto_recitautolink')} eventKey='sections' style={style}>
                    <SectionForm sectionList={this.state.sectionList} onClose={this.props.onClose}/>             
                </Tab>
                <Tab className={className} title={M.util.get_string('h5p', 'atto_recitautolink')} eventKey='h5p' style={style}>
                    <H5PForm h5pList={this.state.h5pList} onClose={this.props.onClose}/>             
                </Tab>
                <Tab className={className} title={M.util.get_string('information', 'atto_recitautolink')} eventKey='information' style={style}>
                    <InfoForm sectionList={this.state.sectionList} onClose={this.props.onClose}/>             
                </Tab>
                <Tab className={className} title={M.util.get_string('injection', 'atto_recitautolink')} eventKey='injection' style={style}>
                    <InjectionActivityForm cmList={this.state.cmList} onClose={this.props.onClose}/>             
                </Tab>
                <Tab className={className} title={M.util.get_string('tests', 'atto_recitautolink')} eventKey='tests' style={style}>
                    <TestForm cmList={this.state.cmList} sectionList={this.state.sectionList} onClose={this.props.onClose}/>             
                </Tab>
            </Tabs>;
        
        return (main);
    }

    setTab(k){
        this.setState({activeTab: k});
    }
}
