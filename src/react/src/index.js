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
import { createRoot } from 'react-dom/client';
import {$glVars} from "./common/common";
import { MainView } from './views/MainView';
 
class App extends Component { 
    static defaultProps = {
        classHandler: null,
    };

    constructor(props) {
        super(props);

        this.onClose = this.onClose.bind(this);

        $glVars.classHandler = props.classHandler;
    }

    render() {       
        let main = <MainView onClose={this.onClose}/>

        return (main);
    }

    onClose(val){
        $glVars.classHandler.close(val);
    }
}

window.openRecitAutolinkUI = function(classHandler){  
    const domContainer = document.getElementById('recitautolink_container');
    const root = createRoot(domContainer);
    root.render(<App classHandler={classHandler}/>);
    return root;
};
