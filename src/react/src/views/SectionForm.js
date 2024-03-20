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
import { ComboBoxPlus } from '../libs/components/ComboBoxPlus';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { GeneratorCode, HelpButton } from './common';

export class SectionForm extends Component {
    static defaultProps = {
        sectionList: [],
        onClose: null
    };

    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.onInsert = this.onInsert.bind(this);

        this.state = {
            data: { ...GeneratorCode.sectionData }
        };
    }

    componentWillUnmount(){
        this.setState({data: { ...GeneratorCode.sectionData }});
    }

    render() {       
        let main = 
        <Form>
            <Form.Group className="mb-3" controlId={"itemsection1"}>
                <Form.Label className='d-flex align-items-center'>
                    <span className='mr-1'>{M.util.get_string('section', 'atto_recitautolink')}</span>
                    <HelpButton icon={faInfoCircle} helpText={<span>{M.util.get_string('resourceaccess', 'atto_recitautolink')}</span>}/>
                </Form.Label>
                <ComboBoxPlus options={this.props.sectionList} name='section' onChange={this.onChange} value={this.state.data.section}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId={"itemsection2"}>
                <Form.Label>{M.util.get_string('linktext', 'atto_recitautolink')}</Form.Label>
                <Form.Control placeholder={this.state.data.section} type="text" name='linktext' onChange={this.onChange} value={this.state.data.linktext}/>
            </Form.Group>
            <Form.Group ><hr/></Form.Group>

            <Form.Group controlId={"itemsection3"}>
                <div className='d-flex align-items-center'>
                    <Form.Check className="m-1" id='sectionbtn' inline type='checkbox' label={M.util.get_string('button', 'atto_recitautolink')} name='sectionbtn' onChange={this.onChange} value='btn btn-primary'/>
                    <HelpButton helpText={<>
                            <span>{M.util.get_string('infobs', 'atto_recitautolink')}</span>
                            <br/>
                            <a href="https://getbootstrap.com/docs/4.6/utilities/borders/#border-radius" target="_blank">{M.util.get_string('btnshape', 'atto_recitautolink')} <i className='p-1 fa fa-info-circle'></i> </a><br/>
                            <a href="https://getbootstrap.com/docs/4.6/components/buttons/" target="_blank">{M.util.get_string('btnlook', 'atto_recitautolink')} <i className='p-1 fa fa-info-circle'></i> </a>
                            </>}
                        />
                </div> 
            </Form.Group>  
            <Form.Group className="mb-3" controlId={"itemsection4"}>
                <Form.Label>{M.util.get_string('cssclass', 'atto_recitautolink')}</Form.Label>
                <Form.Control type="text" name='sectioncss' onChange={this.onChange} value={this.state.data.sectioncss}/>
            </Form.Group> 

            <Form.Group className="mb-3" controlId={"itemsection5"}>
                <Form.Label className='d-flex'>{M.util.get_string('csspreview', 'atto_recitautolink')}</Form.Label>
                <a className={this.state.data.sectioncss}>
                    {(this.state.data.linktext.length > 0 ? this.state.data.linktext : this.state.data.section)}    
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
        if(e.target.type == 'checkbox'){
            value = (e.target.checked ? e.target.value : '');
        }        
        
        data[e.target.name] = value;

        if((e.target.name === 'sectionbtn')){
            data.sectioncss = data[e.target.name];
        }
        
        this.setState({data: data});
    }

    onInsert(){
        let result = GeneratorCode.getSectionCode(this.state.data);
        
        if(result !== null){
            this.props.onClose(result);
        }
    }
}
