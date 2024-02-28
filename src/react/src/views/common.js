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
import {Button,  OverlayTrigger, Popover} from 'react-bootstrap';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class GeneratorCode{
	static activityData = {
		activity: '',
		linktext: '',
		opening: '',
		otheroptions: '',
		activitybtn: false,
		activitycss: ''
	};

	static sectionData = {
		section: '',
		linktext: '',
		sectionbtn: false,
		sectioncss: ''
	};

	static h5pData = {
		h5p: '',
	};

  	static getActivityCode(data){
		if(data.activity.length === 0){
			alert(M.util.get_string('invalidcode', 'atto_recitautolink'));
			return null;
		}

		let result = '';
		//Options first, then required data last
		if (data.linktext.length > 0){
			result = `desc:"${data.linktext}"/`;
		}

		switch(data.opening){
			case 'newtab':
				result += `b/`;
				break;
			case 'modal':
				result += `p/`;
				break;
			case 'modal16x9':
				result += `p16x9/`;
				break;
			default:
				result += '';
		}

		switch(data.otheroptions){
			case 'icon':
				result += `i/`;
				break;
			case 'completion':
				result += `c/`;
				break;
			default:
				result += ''; 
		}

		if (data.activitycss.length > 0){
			result = `class:"${data.activitycss}"/`;
		}

		result += `${data.activity}`;

		result = `[[${result}]]`;

		return result;
  	}

	static getSectionCode(data){
		if(data.section.length === 0){
			alert(M.util.get_string('invalidcode', 'atto_recitautolink'));
			return null;
		}

		let result = '';
		//Options first, then required data last
		if (data.linktext.length > 0){
			result = `desc:"${data.linktext}"/`;
		}

		if (data.sectioncss.length > 0){
			result = `class:"${data.sectioncss}"/`;
		}

		result += `s/${data.section}`;

		result = `[[${result}]]`;

		return result;
  	}
	 
	static getH5PCode(data){
		if(data.h5p.length === 0){
			alert(M.util.get_string('invalidcode', 'atto_recitautolink'));
			return null;
		}

		let result = `h5p/${data.h5p}`;
		result = `[[${result}]]`;
		return result;
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