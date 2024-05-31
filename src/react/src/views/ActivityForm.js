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
import { ComboBoxPlus, ComboBoxPlusMulti } from '../libs/components/ComboBoxPlus';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { GeneratorCode, HelpButton } from './common';

export class ActivityForm extends Component {
    static defaultProps = {
        cmList: [],
        roleList: [],
        onClose: null
    };

    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.onInsert = this.onInsert.bind(this);

        this.state = {
            data: Object.assign({}, GeneratorCode.activityData)
        };
    }

    render() {       
        let main = 
        <Form>
            <Form.Group className="mb-3" controlId={"itemactivity1"}>
                <Form.Label className='d-flex align-items-center'>
                    <span className='mr-1'>{M.util.get_string('activity', 'atto_recitautolink')}</span> 
                    <HelpButton icon={faInfoCircle} helpText={<span>{M.util.get_string('resourceaccess', 'atto_recitautolink')}</span>}/>
                </Form.Label>
                <ComboBoxPlus options={this.props.cmList} name='activity' onChange={this.onChange} value={this.state.data.activity}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId={"itemactivity2"}>
                <Form.Label>{M.util.get_string('linktext', 'atto_recitautolink')}</Form.Label>
                <Form.Control placeholder={this.state.data.activity} type="text" name='linktext' onChange={this.onChange} value={this.state.data.linktext}/>
            </Form.Group>
                        
            <Form.Group ><hr/></Form.Group>

            <Form.Group className="mb-3" controlId={"itemactivity8"}>
                <Form.Label className='d-flex align-items-center'>
                    <span className='mr-1'>{M.util.get_string('displaybyrole', 'atto_recitautolink')}</span>
                    <HelpButton icon={faInfoCircle} helpText={<span>{M.util.get_string('displaybyroleinfo', 'atto_recitautolink')}</span>}/>
                </Form.Label>
                <ComboBoxPlusMulti name="roles" value={this.state.data.roles} onChange={this.onChange} options={this.props.roleList}/>
            </Form.Group> 
            
            <Form.Group ><hr/></Form.Group>

            <Form.Group controlId={"itemactivity3"}>
                <div className="d-flex align-items-center">
                    <Form.Check  className="m-1" id={`opening1`} inline type='radio' label={M.util.get_string('sametab', 'atto_recitautolink')} name='opening' onChange={this.onChange} value='sametab'/>
                </div>
                <div className="d-flex align-items-center">
                    <Form.Check  className="m-1" id={`opening2`} inline type='radio' label={M.util.get_string('newtab', 'atto_recitautolink')} name='opening' onChange={this.onChange} value='newtab'/>
                </div>
                <div className="d-flex align-items-center">
                    <Form.Check  className="m-1" id={`opening3`} inline type='radio' label={M.util.get_string('modal', 'atto_recitautolink')} name='opening' onChange={this.onChange} value='modal'/>
                </div>
                <div className="d-flex align-items-center">
                    <Form.Check  className="m-1" id={`opening4`} inline type='radio' label={M.util.get_string('modal16x9', 'atto_recitautolink')} name='opening' onChange={this.onChange} value='modal16x9'/>
                </div>
            </Form.Group>
            <Form.Group ><hr/></Form.Group>
            <Form.Group controlId={"itemactivity4"}>
                <div className="d-flex align-items-center">
                    <Form.Check className="m-1" id='otheroptions1' inline type='checkbox' label={M.util.get_string('icon', 'atto_recitautolink')} name='otheroptions' onChange={this.onChange} value='icon'/>
                </div>
                <div className="d-flex align-items-center">
                    <Form.Check className="m-1" id='otheroptions2' inline type='checkbox' label={M.util.get_string('completioncheckbox', 'atto_recitautolink')} name='otheroptions' onChange={this.onChange} value='completion'/>
                </div>
            </Form.Group>  

            <Form.Group ><hr/></Form.Group>

            <Form.Group controlId={"itemactivity5"}>
                <div className='d-flex align-items-center'>
                    <Form.Check className="m-1" id='activitybtn' inline type='checkbox' label={M.util.get_string('button', 'atto_recitautolink')} name='activitybtn' onChange={this.onChange} value='btn btn-primary'/>
                    <HelpButton helpText={<>
                            <span>{M.util.get_string('infobs', 'atto_recitautolink')}</span>
                            <br/>
                            <a href="https://getbootstrap.com/docs/4.6/utilities/borders/#border-radius" target="_blank">{M.util.get_string('btnshape', 'atto_recitautolink')} <i className='p-1 fa fa-info-circle'></i> </a><br/>
                            <a href="https://getbootstrap.com/docs/4.6/components/buttons/" target="_blank">{M.util.get_string('btnlook', 'atto_recitautolink')} <i className='p-1 fa fa-info-circle'></i> </a>
                            </>}
                        />
                </div> 
            </Form.Group>  
            <Form.Group className="mb-3" controlId={"itemactivity6"}>
                <Form.Label>{M.util.get_string('cssclass', 'atto_recitautolink')}</Form.Label>
                <Form.Control type="text" name='activitycss' onChange={this.onChange} value={this.state.data.activitycss}/>
            </Form.Group> 

            <Form.Group className="mb-3" controlId={"itemactivity7"}>
                <Form.Label className='d-flex'>{M.util.get_string('csspreview', 'atto_recitautolink')}</Form.Label>
                <a className={this.state.data.activitycss}>
                    {(this.state.data.linktext.length > 0 ? this.state.data.linktext : this.state.data.activity)}
                </a>
            </Form.Group>

            <Form.Group ><hr/></Form.Group>

            <ButtonGroup className='d-flex'>
                <Button variant="secondary" onClick={() => this.props.onClose(null)}>{M.util.get_string('cancel', 'atto_recitautolink')}</Button>
                <Button onClick={this.onInsert}>{M.util.get_string('insert', 'atto_recitautolink')}</Button>
            </ButtonGroup>  
        </Form>;
        

        return (main);
    }

    onChange(e){
        let data = this.state.data;

        let value = e.target.value;
        if(e.target.name === 'otheroptions'){
            value = data[e.target.name];
            if((e.target.checked)){
                value.add(e.target.value);
            }
            else{
                value.delete(e.target.value);
            }
        }
        else if((e.target.type == 'radio') || (e.target.type == 'checkbox')){
            value = (e.target.checked ? e.target.value : '');
        }  
        
        data[e.target.name] = value;

        if((e.target.name === 'activitybtn')){
            data.activitycss = data[e.target.name];
        }
        
        this.setState({data: data});
    }

    onInsert(){
        let result = GeneratorCode.getActivityCode(this.state.data);
        
        if(result !== null){
            this.props.onClose(result);
        }
    }
}
