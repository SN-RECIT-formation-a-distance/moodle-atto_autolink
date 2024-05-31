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
import {Button, Form, ButtonGroup, } from 'react-bootstrap';
import { AppOptions } from '../common/Options';
import { GeneratorCode } from './common';

export class TestForm extends Component {
    static defaultProps = {
        cmList: [],
        sectionList: [],
        h5pList: [],
        onClose: null
    };

    constructor(props) {
        super(props);
        
        this.onGenerateTestCode = this.onGenerateTestCode.bind(this);

        this.state = {};
    }

    render() {       
        let main = 
        <div>
            <Form.Group className="mb-3" >
                <Form.Text className="text-muted">{M.util.get_string('testcase', 'atto_recitautolink')}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Text className="text-muted">{AppOptions.appVersion()}</Form.Text>
            </Form.Group>

            <ButtonGroup className='d-flex'>
                <Button variant="secondary" onClick={() => this.props.onClose(null)}>{M.util.get_string('cancel', 'atto_recitautolink')}</Button>
                <Button onClick={this.onGenerateTestCode}>{M.util.get_string('generatetestcode', 'atto_recitautolink')}</Button>
            </ButtonGroup>  
        </div>;
        
        return (main);
    }

    onGenerateTestCode(){
        let result = "";

        result = this.generateActivityTestCodes();
        result += this.generateSectionTestCodes();
        result += this.generateH5PTestCodes();
        result += this.generateInfoTestCodes();
        result += this.generateInjectionActivityTestCodes();

        this.props.onClose(result);
    }
 
    generateActivityTestCodes(){
        let result = [];

        if(this.props.cmList.length === 0){
            alert("There is no activity to generate any test code.");
            return;
        }

        let linktext = ['', M.util.get_string('linktext', 'atto_recitautolink')];
        let opening = ['newtab', 'modal', 'modal16x9']; //, 'qr', 'qr100'
        let otheroptions = ['icon', 'completion'];
        let activitycss = ['', 'btn btn-primary'];

        let data = Object.assign({}, GeneratorCode.activityData);
        let activity = this.props.cmList[0];

        for(let desc of linktext){
            for(let open of opening){
                for(let opt of otheroptions){
                    for(let css of activitycss){
                        data.activity = activity.value;
                        data.linktext = desc;
                        data.opening =  open;
                        data.otheroptions.add(opt);
                        data.activitycss = css;

                        let intCode = GeneratorCode.getActivityCode(data);
                        result.push(`${intCode} => ${intCode.replace('[[', '').replace(']]', '')}`);
                    }
                }
            }
        }

        return result.join("<br/><br/>");
    }

    generateSectionTestCodes(){
        let result = [];

        if(this.props.sectionList.length === 0){
            alert("There is no section to generate any test code.");
            return;
        }

        let linktext = ['', M.util.get_string('linktext', 'atto_recitautolink')];
        let sectioncss = ['', 'btn btn-primary'];

        let data = Object.assign({}, GeneratorCode.sectionData);
        let section = this.props.sectionList[0];

        for(let desc of linktext){
            for(let css of sectioncss){
                data.section = section.value;
                data.linktext = desc;
                data.sectioncss = css;

                let intCode = GeneratorCode.getSectionCode(data);
                result.push(`${intCode} => ${intCode.replace('[[', '').replace(']]', '')}`);
            }
        }

        return result.join("<br/><br/>");
    }

    generateH5PTestCodes(){
        let result = [];

        if(this.props.h5pList.length === 0){
            alert("There is no H5P to generate any test code.");
            return;
        }

        let data = Object.assign({}, GeneratorCode.h5pData);
        let item = this.props.h5pList[0];

        data.h5p = item.value;

        let intCode = GeneratorCode.getSectionCode(data);
        result.push(`${intCode} => ${intCode.replace('[[', '').replace(']]', '')}`);

        return result.join("<br/><br/>");
    }

    generateInfoTestCodes(){
        let result = [];

        let data = Object.assign({}, GeneratorCode.infoData);
        let infoList = ['d/user.firstname', 'd/user.lastname', 'd/user.email', 'd/user.picture',
                        'd/course.fullname', 'd/course.shortname', 'd/teacher1.firstname', 
                    'd/teacher1.lastname', 'd/teacher1.email', 'd/teacher1.picture',
                    'd/teacher2.firstname', 'd/teacher2.lastname', 'd/teacher2.email', 
                    'd/teacher2.picture','d/teacher3.firstname', 'd/teacher3.lastname', 
                    'd/teacher3.email', 'd/teacher3.picture',];

        for(let item of infoList){
            data.info = item;
            let intCode = GeneratorCode.getInfoCode(data);
            result.push(`${intCode} => ${intCode.replace('[[', '').replace(']]', '')}`);
        }

        return result.join("<br/><br/>");
    }

    generateInjectionActivityTestCodes(){
        let result = [];

        let cmListFiltered = this.props.cmList.filter((item) => {
            return (item.label.search(/\[page\]/g) >= 0)
        });

        if(cmListFiltered.length === 0){
            alert("There is no activity to generate any test code.");
            return;
        }

        let opening = ['newtab', 'modal', 'modal16x9'];
        let activitycss = ['', 'border rounded p-2'];

        let data = Object.assign({}, GeneratorCode.injectionActivityData);
        let activity = cmListFiltered[0];

        for(let open of opening){
            for(let css of activitycss){
                data.activity = activity.value;
                data.opening =  open;
                data.activitycss = css;

                let intCode = GeneratorCode.getInjectionActivityCode(data);
                result.push(`${intCode} => ${intCode.replace('[[', '').replace(']]', '')}`);
            }
        }

        return result.join("<br/><br/>");
    }
}
