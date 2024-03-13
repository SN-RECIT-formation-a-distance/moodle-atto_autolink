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

export class InfoForm extends Component {
    static defaultProps = {
        onClose: null
    };

    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.onInsert = this.onInsert.bind(this);

        this.state = {
            data: { ...GeneratorCode.infoData }
        };
    }

    componentWillUnmount(){
        this.setState({data: { ...GeneratorCode.infoData }});
    }

    render() { 
        let radioId = 1;

        let main = 
        <Form>
            <Form.Group className="mb-3" controlId={"iteminfo1"}>
                <div className="d-flex align-items-center">
                    <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={M.util.get_string('studentfirstname', 'atto_recitautolink')} name='info' onChange={this.onChange} value='d/user.firstname'/>
                </div>
                <div className="d-flex align-items-center">
                    <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={M.util.get_string('studentlastname', 'atto_recitautolink')} name='info' onChange={this.onChange} value='d/user.lastname'/>
                </div>
                <div className="d-flex align-items-center">
                    <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={M.util.get_string('studentemail', 'atto_recitautolink')} name='info' onChange={this.onChange} value='d/user.email'/>
                </div>
                <div className="d-flex align-items-center">
                    <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={M.util.get_string('studentavatar', 'atto_recitautolink')} name='info' onChange={this.onChange} value='d/user.picture'/>
                </div>
            </Form.Group>

            <Form.Group ><hr/></Form.Group>

            <Form.Group className="mb-3" controlId={"iteminfo2"}>
                <div className="d-flex align-items-center">
                    <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={M.util.get_string('coursename', 'atto_recitautolink')} name='info' onChange={this.onChange} value='d/course.fullname'/>
                </div>
                <div className="d-flex align-items-center">
                    <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={M.util.get_string('shortcoursename', 'atto_recitautolink')} name='info' onChange={this.onChange} value='d/course.shortname'/>
                </div>
            </Form.Group>

            <Form.Group ><hr/></Form.Group>

            {[1, 2, 3].map((profId, index) => (
                <div key={index}>
                    <Form.Group className="mb-3" controlId={`iteminfo${index+3}`}>
                        <div className="d-flex align-items-center">
                            <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={`${M.util.get_string('teacherfirstname', 'atto_recitautolink')} #${profId}`} name='info' onChange={this.onChange} value={`d/teacher${profId}.firstname`}/>
                            {profId === 1 &&<HelpButton helpText={<span>{M.util.get_string('infoteachernum', 'atto_recitautolink')}</span>}/>}
                        </div>
                        <div className="d-flex align-items-center">
                            <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={`${M.util.get_string('teacherlastname', 'atto_recitautolink')} #${profId}`} name='info' onChange={this.onChange} value={`d/teacher${profId}.lastname`}/>
                        </div>
                        <div className="d-flex align-items-center">
                            <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={`${M.util.get_string('teacheremail', 'atto_recitautolink')} #${profId}`} name='info' onChange={this.onChange} value={`d/teacher${profId}.email`}/>
                        </div>
                        <div className="d-flex align-items-center">
                            <Form.Check  className="m-1" id={`info${radioId++}`} inline type='radio' label={`${M.util.get_string('teacheravatar', 'atto_recitautolink')} #${profId}`} name='info' onChange={this.onChange} value={`d/teacher${profId}.picture`}/>
                        </div>
                    </Form.Group>
                    <Form.Group ><hr/></Form.Group>
                </div>
            ))}
           
            <ButtonGroup className='d-flex'>
                <Button variant="secondary" onClick={this.props.onClose}>{M.util.get_string('cancel', 'atto_recitautolink')}</Button>
                <Button onClick={this.onInsert}>{M.util.get_string('insert', 'atto_recitautolink')}</Button>
            </ButtonGroup>  
        </Form>;
        

        return (main);
    }

    onChange(e){
        let data = this.state.data;

        let value = e.target.value;
        if((e.target.type == 'checkbox') || (e.target.type == 'radio')){
            value = (e.target.checked ? e.target.value : '');
        }        
        
        data[e.target.name] = value;
        
        this.setState({data: data});
    }

    onInsert(){
        let result = GeneratorCode.getInfoCode(this.state.data);
        
        if(result !== null){
            this.props.onClose(result);
        }
    }
}
