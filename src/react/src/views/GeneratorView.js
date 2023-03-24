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
import {Tabs, Tab, Button, Form, ButtonGroup, Card, OverlayTrigger, Popover} from 'react-bootstrap';
import { Options } from './OptionList';
import {$glVars} from '../common/common';
import { ComboBoxPlus } from '../libs/components/ComboBoxPlus';
import { faInfoCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export class GeneratorView extends Component {
    constructor(props) {
        super(props);
        this.state = {cmList: [], sectionList: [], h5pList: [], activeTab: 'activity', data: [], values: {}, validated: false, initialized: false};
        this.setTab = this.setTab.bind(this);
        this.onChange = this.onChange.bind(this);
        this.generateCSSButton = this.generateCSSButton.bind(this);
        this.generateCode = this.generateCode.bind(this);
        this.generateTestCode = this.generateTestCode.bind(this);
    }

    render() {       
        if (!this.state.initialized) return null;
        let main = 
        <Card style={{height: 500}}> 
            <Card.Body style={{overflowY: "auto"}} >
                <Tabs activeKey={this.state.activeTab} onSelect={this.setTab} className="mb-3" variant="pills">
                    {Options.map((item, index) => (
                        <Tab title={item.name} eventKey={item.key} key={index}>
                            {item.options.map((input, i) => {
                                return this.getInput(input, i);
                            })}
                            {(item.key == 'activity' || item.key == 'section') &&
                            <>
                                <hr/>
                                <Form.Group className="mb-3" key={"css"+index} controlId={"css"+index}><Form.Label>{M.util.get_string('csspreview', 'atto_recitautolink')}</Form.Label><br/><a href="#" className={this.state.values['css']}>{this.state.values['linktext']}</a></Form.Group>                    
                            </>}                        
                        </Tab>
                    ))}
                </Tabs>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
                <ButtonGroup>
                    <Button variant="secondary" onClick={() => this.props.onClose()}>{M.util.get_string('cancel', 'atto_recitautolink')}</Button>
                    <Button onClick={this.generateCode}>{M.util.get_string('insert', 'atto_recitautolink')}</Button>
                </ButtonGroup>
            </Card.Footer>
        </Card>;
        

        return (main);
    }

    generateCSSButton(css){
        let values = this.state.values;
        let data = this.state.data;
        let btn = ' btn btn-'+css+' ';
        let name = 'css';
        if (!values[name]){
            values[name] = '';
        }
        if (values[name].includes('btn')){
            values[name] = values[name].replace(btn, '');
        }else{
            values[name] += btn;
        }
        let option = this.getOption(name);
        let opt = option.getOption({value:values[name]});
        data[name] = {opt: opt, required: option.required};

        this.setState({data: data, values: values});
    }

    getTab(k){
        for (let i in Options){
            if (Options[i].key == k){
                return Options[i];
            }
        }
    }

    setTab(k){
        this.setState({activeTab: k, data: {}, validated: false});
        this.resetValues();
    }

    getOption(key){
        for (let i in Options){
            for (let v of Options[i].options){
                if (v.key == key){
                    return v;
                }
            }
        }
    }

    resetValues(group){
        let values = this.state.values;
        for (let i in Options){
            for (let v of Options[i].options){
                if (!group || group == v.group){
                    if (v.input == 'radio' || v.input == 'checkbox'){
                        values[v.key] = false;
                    }else{
                        values[v.key] = "";
                    }
                    if (v.default){
                        values[v.key] = v.default;
                    }
                }
            }
        }

        if (!group) this.setState({values:values});
        return values;
    }

    onChange(e, option){
        let data = this.state.data;
        let values = this.state.values;
        let name = option.key;
        let validated = this.state.validated;

        let opt = option.getOption(e.target, this);
        
        if((option.required) || (['information', 'testcase'].includes(option.name))){
            validated = true;
            this.resetValues();
        }
      
        if((e.target.type == 'checkbox') || (e.target.type == 'radio')){
            values[name] = e.target.checked;
        }else{
            values[name] = e.target.value;
        }
        
        data[name] = {opt: opt, required: option.required};
        this.setState({data: data, values: values, validated: validated});

        if (name == 'btn'){
            this.generateCSSButton('primary');
        }
    }

    getInput(option, key){
        let id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); //Generate a random id for form id

        if (option.input == 'checkbox'){
            return <div key={key} className="d-flex align-items-center"><Form.Check className="m-1" id={option.name+option.key+id} inline type={option.input} label={option.label} name={option.name} onChange={(e) => this.onChange(e, option)} checked={this.state.values[option.key]}/>{option.helpButton && <HelpButton helpText={option.helpButton}/>}</div>;
        }
        
        if (option.input == 'radio'){
            return <div key={key} className="d-flex align-items-center"><Form.Check  className="m-1" id={option.name+option.key+id} inline type={option.input} label={option.label} name={option.name} onChange={(e) => this.onChange(e, option)} value={this.state.values[option.key]}/>{option.helpButton && <HelpButton helpText={option.helpButton}/>}</div>;
        }
        
        if (option.input == 'text'){
            return <Form.Group key={key} className="mb-3" controlId={"item"+id}><Form.Label>{option.name}</Form.Label><Form.Control type="text" name={option.key} data-key={option.key} onChange={(e) => this.onChange(e, option)} value={this.state.values[option.key]}/></Form.Group>;
        }
        
        if (option.input == 'desc'){
            return <Form.Group key={key} className="mb-3" controlId={"item"+id}><Form.Text className="text-muted">{option.label}</Form.Text></Form.Group>;
        }
        
        if (option.input == 'select'){
            let dataProvider = [];
            if (this.state[option.dataProvider]){
                dataProvider = this.state[option.dataProvider];
            }
            return <Form.Group key={key} className="mb-3" controlId={"item"+id}><Form.Label>{option.name} {option.infoButton && <HelpButton icon={faInfoCircle} helpText={option.infoButton}/>}</Form.Label><ComboBoxPlus options={dataProvider} name={option.key} data-key={option.key} onChange={(e) => this.onChange(e, option)} value={this.state.values[option.key]}/></Form.Group>;
        }
        
        if (option.input == 'separator'){
            return <Form.Group key={key}><hr/></Form.Group>;
        }
    }

    generateCode(save, data){
        if(!this.state.validated && save){
            alert(M.util.get_string('invalidcode', 'atto_recitautolink'));
            return;
        }

        data = data || this.state.data;

        let code = "";
        for (let i in data){
            if (!data[i].required && data[i].opt){//Options first, then required data last
                code += data[i].opt;
            }
        }
        for (let i in data){
            if (data[i].required && data[i].opt){
                code += data[i].opt;
            }
        }
        code = "[[" + code.substr(1) + "]]"; //Remove first slash
        if (save){
            this.props.onClose(code);
        }
        return code;
    }

    generateTestCode(){
        let code = "";

        //Hardcoded tests for edge cases
        let dataProvider = this.state.cmList;
        let obj = dataProvider[Math.floor(Math.random() * dataProvider.length)].value;
        code += this.formatTestOption('[[desc:"'+M.util.get_string('linktext', 'atto_recitautolink')+'"/c/'+obj+']]');
        code += this.formatTestOption('[[desc:"'+M.util.get_string('linktext', 'atto_recitautolink')+'"/c/i/'+obj+']]');
        code += this.formatTestOption('[[desc:"'+M.util.get_string('linktext', 'atto_recitautolink')+'"/i/'+obj+']]');
        code += this.formatTestOption('[[desc:"'+M.util.get_string('linktext', 'atto_recitautolink')+'"/c/class:"btn btn-primary"/'+obj+']]');
        code += this.formatTestOption('[[desc:"'+M.util.get_string('linktext', 'atto_recitautolink')+'"/i/b/class:"btn btn-primary"/'+obj+']]');
        code += this.formatTestOption('[[desc:"'+M.util.get_string('linktext', 'atto_recitautolink')+'"/i/p/class:"btn btn-primary"/'+obj+']]');
        code += this.formatTestOption('[[desc:"'+M.util.get_string('linktext', 'atto_recitautolink')+'"/c/i/class:"btn btn-primary"/'+obj+']]');
        code += this.formatTestOption('[[desc:"'+M.util.get_string('linktext', 'atto_recitautolink')+'"/c/i/p/class:"btn btn-primary"/'+obj+']]');
        
        for (let i in Options){
            for (let v of Options[i].options){
                if (!v.ignoreTest){
                    let opt = this.getTestOption(Options[i], v);
                    if (opt.length > 0 && opt != "[[]]"){
                        code += this.formatTestOption(opt);
                    }
                }
            }
        }

        
        return code;
    }

    formatTestOption(opt){
        return "<p>"+opt+" => "+opt.replace('[', '{')+"</p>";
    }

    getTestOption(tab, option){
        let data = {};
        if (!tab.singleInput){
            let mainTarget = tab.options[0];
            data[mainTarget.key] = {opt: this.getTestOptionValue(mainTarget), required: true};
        }
        data[option.key] = {opt: this.getTestOptionValue(option), required: false};

        return this.generateCode(false, data);
    }

    getTestOptionValue(option){
        if (!option.getOption) return "";

        let obj = {};
        if (option.input == 'checkbox'){
            obj = {checked: true}
        }
        if (option.input == 'text'){
            if (option.key == 'linktext'){
                obj = {value: M.util.get_string('getstarted', 'atto_recitautolink')}
            }else{
                obj = {value: 'btn btn-secondary'}
            }
        }
        if (option.input == 'select'){
            let dataProvider = [];
            if (this.state[option.dataProvider]){
                dataProvider = this.state[option.dataProvider];
            }
            if (dataProvider.length == 0) return "";
            obj = {value: dataProvider[Math.floor(Math.random() * dataProvider.length)].value};
        }

        return option.getOption(obj);
    }

    componentDidMount(){
        this.setTab(this.state.activeTab);
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

        this.setState({initialized: true});
    }
 
}

export class HelpButton extends Component {
    static defaultProps = {
        helpText: '',
        icon: faQuestionCircle
    }

    constructor(props) {
        super(props);
    }

    render(){
        const popover = (
            <Popover id="popover-help">
              <Popover.Content>
                {this.props.helpText}
              </Popover.Content>
            </Popover>
          );

         
        let main =
            <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
                 <Button variant="link" className='p-0'><FontAwesomeIcon icon={this.props.icon}/></Button>
            </OverlayTrigger>;

        return main;
    }
}