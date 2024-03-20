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
import { GeneratorCode, HelpButton } from './common';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ComboBoxPlus } from '../libs/components/ComboBoxPlus';

export class InfoForm extends Component {
    static defaultProps = {
        sectionList: [],
        onClose: null
    };

    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.onInsert = this.onInsert.bind(this);

        this.state = {
            data: { ...GeneratorCode.infoData },
            tmp: {section: '', input: null}
        };
    }

    componentWillUnmount(){
        this.setState({data: { ...GeneratorCode.infoData }});
    }

    render() { 
        let radioId = 1; 

        let sectionListCopy = [...this.props.sectionList];
        sectionListCopy.unshift({value: 'all', label: `** ${M.util.get_string('allsections', 'atto_recitautolink')} **`});
        
        let main =  
        <Form>
            <div className='h6'>{M.util.get_string('progressbar', 'atto_recitautolink')}</div>
            <Form.Group className="mb-3" controlId={"itemsection1"} >
                <Form.Label className='d-flex align-items-center'>
                    <span className='mr-1'>{M.util.get_string('section', 'atto_recitautolink')}</span> 
                    <HelpButton icon={faInfoCircle} helpText={<span>{M.util.get_string('progressbarinfo', 'atto_recitautolink')}</span>}/>
                </Form.Label>
                <ComboBoxPlus options={sectionListCopy} name='section' onChange={this.onChange} value={this.state.tmp.section}/>
            </Form.Group>
           
            <Form.Group ><hr/></Form.Group> 

            <div className='h6'>{M.util.get_string('student', 'atto_recitautolink')}</div>
            <Form.Group className="mb-3" controlId={"iteminfo1"}>
                <Form.Check  className="m-2" id={`info${radioId++}`} inline type='radio' label={M.util.get_string('firstname', 'atto_recitautolink')} name='info' onChange={this.onChange} value='d/user.firstname'/>
                <Form.Check  className="m-2" id={`info${radioId++}`} inline type='radio' label={M.util.get_string('lastname', 'atto_recitautolink')} name='info' onChange={this.onChange} value='d/user.lastname'/>
                <Form.Check  className="m-2" id={`info${radioId++}`} inline type='radio' label={M.util.get_string('email', 'atto_recitautolink')} name='info' onChange={this.onChange} value='d/user.email'/>
                <Form.Check  className="m-2" id={`info${radioId++}`} inline type='radio' label={M.util.get_string('avatar', 'atto_recitautolink')} name='info' onChange={this.onChange} value='d/user.picture'/>
            </Form.Group>

            <Form.Group ><hr/></Form.Group>

            <div className='h6'>{M.util.get_string('course', 'atto_recitautolink')}</div>
            <Form.Group className="mb-3" controlId={"iteminfo2"}>
                <Form.Check  className="m-2" id={`info${radioId++}`} inline type='radio' label={M.util.get_string('fullname', 'atto_recitautolink')} name='info' onChange={this.onChange} value='d/course.fullname'/>
                <Form.Check  className="m-2" id={`info${radioId++}`} inline type='radio' label={M.util.get_string('shortname', 'atto_recitautolink')} name='info' onChange={this.onChange} value='d/course.shortname'/>
            </Form.Group>

            <Form.Group ><hr/></Form.Group>

            {[1, 2, 3].map((profId, index) => ( 
                <div key={index}>
                    <div className='h6'>{`${M.util.get_string('teacher', 'atto_recitautolink')} #${profId}`}</div>
                    <Form.Group className="mb-3" controlId={`iteminfo${index+3}`}>
                        <span className='d-inline-flex'>
                            <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={`${M.util.get_string('firstname', 'atto_recitautolink')}`} name='info' onChange={this.onChange} value={`d/teacher${profId}.firstname`}/>
                            {profId === 1 &&<HelpButton icon={faInfoCircle} helpText={<span>{M.util.get_string('infoteachernum', 'atto_recitautolink')}</span>}/>}
                        </span>
                        
                        <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={`${M.util.get_string('lastname', 'atto_recitautolink')}`} name='info' onChange={this.onChange} value={`d/teacher${profId}.lastname`}/>
                        <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={`${M.util.get_string('email', 'atto_recitautolink')}`} name='info' onChange={this.onChange} value={`d/teacher${profId}.email`}/>
                        <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={`${M.util.get_string('avatar', 'atto_recitautolink')}`} name='info' onChange={this.onChange} value={`d/teacher${profId}.picture`}/>                        
                    </Form.Group>
                </div>
            ))}

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
        let tmp = this.state.tmp;

        // reset data each on change
        data.info = '';
        tmp.section = '';

        if(tmp.input){
            tmp.input.checked = false;
        }

        let value = e.target.value;
        if((e.target.type == 'checkbox') || (e.target.type == 'radio')){
            value = (e.target.checked ? e.target.value : '');
            tmp.input = e.target;
        }        
        
        if(e.target.name === 'section'){
            tmp.section = value;

            if(value === 'all'){
                value = 'cpb/';
            }
            else{
                value = `spb/${value}`;
            }
        }

        data.info = value;

        this.setState({data: data, tmp: tmp});
    }

    onInsert(){
        let result = GeneratorCode.getInfoCode(this.state.data);
        
        if(result !== null){
            this.props.onClose(result);
        }
    }
}
