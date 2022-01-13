import React, { Component } from 'react';
import {Tabs, Tab, Button, Form, ButtonGroup, Card} from 'react-bootstrap';
import { Options } from './OptionList';
import {$glVars} from '../common/common';
import { ComboBox } from '../libs/components/ComboBox';
import { ComboBoxPlus } from '../libs/components/ComboBoxPlus';


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
        <Card style={{maxHeight: 650, minHeight: 500}}> 
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
                                <Form.Group className="mb-3" key={"css"+index} controlId={"css"+index}><Form.Label>Aperçu du CSS</Form.Label><br/><a href="#" className={this.state.values['css']}>{this.state.values['linktext']}</a></Form.Group>                    
                            </>}                        
                        </Tab>
                    ))}
                </Tabs>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
                <ButtonGroup>
                    <Button onClick={this.generateTestCode}>Générer cas de tests</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button variant="secondary" onClick={() => this.props.onClose()}>Annuler</Button>
                    <Button onClick={this.generateCode}>Insérer</Button>
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

        let opt = option.getOption(e.target);
        
        if((option.required) || (['infocourse', 'infostudent', 'infoteacher1', 'infoteacher2', 'infoteacher3'].includes(option.name))){
            validated = true;
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
            return <Form.Check  key={key} className="m-1" id={option.name+option.key+id} inline type={option.input} label={option.label} name={option.name} onChange={(e) => this.onChange(e, option)} value={this.state.values[option.key]}/>;
        }
        
        if (option.input == 'radio'){
            return <Form.Check  key={key} className="m-1" id={option.name+option.key+id} inline type={option.input} label={option.label} name={option.name} onChange={(e) => this.onChange(e, option)} value={this.state.values[option.key]}/>;
        }
        
        if (option.input == 'text'){
            return <Form.Group  key={key} className="mb-3" controlId={"item"+id}><Form.Label>{option.name}</Form.Label><Form.Control type="text" name={option.key} data-key={option.key} onChange={(e) => this.onChange(e, option)} value={this.state.values[option.key]}/></Form.Group>;
        }
        
        if (option.input == 'select'){
            let dataProvider = [];
            if (this.state[option.dataProvider]){
                dataProvider = this.state[option.dataProvider];
            }
            return <Form.Group  key={key} className="mb-3"  controlId={"item"+id}><Form.Label>{option.name}</Form.Label><ComboBoxPlus options={dataProvider} name={option.key} data-key={option.key} onChange={(e) => this.onChange(e, option)} value={this.state.values[option.key]}/></Form.Group>;
        }
        
        
        if (option.input == 'separator'){
            return <Form.Group  key={key}><hr/></Form.Group>;
        }
    }

    generateCode(save, data){
        if(!this.state.validated && save){
            alert("Le code d'intégration n'est pas valide.");
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
        if (!window.confirm('Êtes-vous sûre de vouloir générer tous les possibilités de code?')) return;
        let code = "";

        //Hardcoded tests for edge cases
        let dataProvider = this.state.cmList;
        let obj = dataProvider[Math.floor(Math.random() * dataProvider.length)].value;
        code += this.formatTestOption('[[desc:"Texte du lien"/c/'+obj+']]');
        code += this.formatTestOption('[[desc:"Texte du lien"/c/i/'+obj+']]');
        code += this.formatTestOption('[[desc:"Texte du lien"/i/'+obj+']]');
        code += this.formatTestOption('[[desc:"Texte du lien"/c/class:"btn btn-primary"/'+obj+']]');
        code += this.formatTestOption('[[desc:"Texte du lien"/i/b/class:"btn btn-primary"/'+obj+']]');
        code += this.formatTestOption('[[desc:"Texte du lien"/i/p/class:"btn btn-primary"/'+obj+']]');
        code += this.formatTestOption('[[desc:"Texte du lien"/c/i/class:"btn btn-primary"/'+obj+']]');
        code += this.formatTestOption('[[desc:"Texte du lien"/c/i/p/class:"btn btn-primary"/'+obj+']]');
        
        for (let i in Options){
            for (let v of Options[i].options){
                let opt = this.getTestOption(Options[i], v);
                if (opt.length > 0 && opt != "[[]]"){
                    code += this.formatTestOption(opt);
                }
            }
        }

        
        this.props.onClose(code);
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
                obj = {value: 'Commencer'}
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
            if(!result.success){
                alert(result.msg);
                return;
            }

            let list = [];
            for (let e of result.data){
                list.push({value: e.name, label: e.name + " [" + e.modname + "]"});
            }
            that.setState({cmList: list});
        });
        
        $glVars.webApi.getSectionList($glVars.classHandler.get("courseid"), function(result){
            if(!result.success){
                alert(result.msg);
                return;
            }

            let list = [];
            for (let e of result.data){
                list.push({value: e.name, label: e.name});
            }
            that.setState({sectionList: list});
        });
        
        $glVars.webApi.getH5PList($glVars.classHandler.get("courseid"), function(result){
            if(!result.success){
                alert(result.msg);
                return;
            }

            let list = [];
            for (let e of result.data){
                list.push({value: e.name, label: e.name});
            }
            that.setState({h5pList: list});
        });

        this.setState({initialized: true});
    }
}