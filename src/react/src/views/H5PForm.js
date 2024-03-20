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

export class H5PForm extends Component {
    static defaultProps = {
        h5pList: [],
        onClose: null
    };

    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.onInsert = this.onInsert.bind(this);

        this.state = {
            data:  { ...GeneratorCode.h5pData }
        };
    }

    componentWillUnmount(){
        this.setState({data: { ...GeneratorCode.h5pData }});
    }

    render() {       
        let main = 
        <Form>
            <Form.Group className="mb-3" controlId={"itemh5p1"} style={{height: 200}}>
                <Form.Label className='d-flex align-items-center'>
                    <span className='mr-1'>{M.util.get_string('h5p', 'atto_recitautolink')}</span>
                    <HelpButton icon={faInfoCircle} helpText={<span>{M.util.get_string('resourceaccess', 'atto_recitautolink')}</span>}/>
                </Form.Label>
                <ComboBoxPlus options={this.props.h5pList} name='h5p' onChange={this.onChange} value={this.state.data.h5p}/>
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
        data[e.target.name] = e.target.value;
        this.setState({data: data});
    }

    onInsert(){
        let result = GeneratorCode.getH5PCode(this.state.data);

        if(result !== null){
            this.props.onClose(result);
        }
    }
}
