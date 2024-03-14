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
import Select from 'react-select'

export class ComboBoxPlus extends Component {
    static defaultProps = {        
        onChange: null,    
        value: "",
        name: "",
        disabled: false,
        multiple: false,
        required: false,
        data: {},
        size: 1,
        placeholder: "",
        options: [],
        style: null,
        selectedIndex: -1
    };
    
    constructor(props){
        super(props);
        
        this.onChange = this.onChange.bind(this);
        
    }
    
    render() {     
        let options = this.props.options;

        let val = null;
        for (let o of options){
            if (o.value.toString() === this.props.value.toString()){
                val = o;
            }
        }
        //  spread attributes <div {...this.props}>    
        let spreadAttr = {required: this.props.required, isDisabled: this.props.disabled, size: this.props.size, style: this.props.style, options: options};
        if (this.props.multiple){
            spreadAttr.isMulti = true;
        }

        let main = 
            <Select {...spreadAttr} onChange={this.onChange} value={val} placeholder={this.props.placeholder}>
            </Select>;            
        return (main);
    }   
    
    onChange(event){
        let value = event.value || "";
        let text = event.label;
        this.setState({value:value});
        if (this.props.multiple){
            value = event;
        }

        this.props.onChange({target:{name: this.props.name, value: value, text: text, data: event.data}});
    }   
}


export class ComboBoxPlusMulti extends Component {
    static defaultProps = {        
        onChange: null,    
        value: "",
        name: "",
        disabled: false,
        required: false,
        data: {},
        size: 1,
        placeholder: "",
        options: [],
        style: null,
        selectedIndex: -1
    };
    
    constructor(props){
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.state = {value: this.props.value};
    }
    
    render() { 
        //  spread attributes <div {...this.props}>    
        let spreadAttr = {isMulti: true, required: this.props.required, disabled: this.props.disabled, size: this.props.size, style: this.props.style, options: this.props.options};

        let values = [];

        for(let item1 of this.props.value){
            for(let item2 of this.props.options){
                if(item1 === item2.value){
                    values.push({...item2});
                    break;
                }
            }
        } 

        let main = 
            <Select {...spreadAttr} onChange={this.onChange} defaultValue={values} placeholder={this.props.placeholder}>
            </Select>;            
        return (main);
    }   
    
    onChange(event){
        let value = [];
        let text = event.label;

        for(let item of event){
            value.push(item.value);
        }
        this.setState({value:value});
        this.props.onChange({target:{name: this.props.name, value: value, text: text, data: this.props.data}});
    }   
}
