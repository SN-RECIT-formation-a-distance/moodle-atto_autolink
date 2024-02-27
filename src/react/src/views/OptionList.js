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

import React, { Component, useRef } from 'react';

export const Options = [
    {
        name: M.util.get_string('sections', 'atto_recitautolink'),
        key: 'section',
        cssClasses: true,
        tagName: 'a',
        options: [
            {
                input: 'select',
                name: M.util.get_string('section', 'atto_recitautolink'),
                key: 'section',
                infoButton: <>
                <span>{M.util.get_string('resourceaccess', 'atto_recitautolink')}</span>
                </>,
                dataProvider: 'sectionList',
                required: true,
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/s/"+ input.value;
                    }
                }
            },
            {
                input: 'text',
                name: M.util.get_string('linktext', 'atto_recitautolink'),
                key: 'linktext',
                placeholderKey: 'section',
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/desc:\""+ input.value+"\"";
                    }
                }
            },
            {
                input: 'separator',
            },
            {
                name: 'checkboxbtn2',
                input: 'checkbox',
                label: M.util.get_string('button', 'atto_recitautolink'),
                helpButton: <>
                <span>{M.util.get_string('infobs', 'atto_recitautolink')}</span>
                <br/>
                <a href="https://getbootstrap.com/docs/4.6/utilities/borders/#border-radius" target="_blank">{M.util.get_string('btnshape', 'atto_recitautolink')} <i className='p-1 fa fa-info-circle'></i> </a><br/>
                <a href="https://getbootstrap.com/docs/4.6/components/buttons/" target="_blank">{M.util.get_string('btnlook', 'atto_recitautolink')} <i className='p-1 fa fa-info-circle'></i> </a>
                </>,
                 key: 'sectionbtn',
                 assignTo: 'sectioncss',
                 getOption: function(input){
                     if (input.checked){
                         return "btn btn-primary";
                     }
                     else{
                         return "";
                     }
                 }
            },
            {
                input: 'text',
                name: M.util.get_string('cssclass', 'atto_recitautolink'),
                key: 'sectioncss',
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/class:\""+ input.value+"\"";
                    }
                    return "";
                }
            },
        ]
    },
    {
        name: M.util.get_string('h5p', 'atto_recitautolink'),
        key: 'h5p',
        options: [
            {
                input: 'select',
                name: M.util.get_string('h5p', 'atto_recitautolink'),
                key: 'h5p',
                infoButton: <>
                <span>{M.util.get_string('resourceaccess', 'atto_recitautolink')}</span>
                </>,
                dataProvider: 'h5pList',
                required: true,
                getOption: function(input){
                    if (input.value.length > 0){
                        //return "/h5p/"+input.value.substr(0, input.value.length -4); //Remove .h5p
                        return "/h5p/"+input.value; 
                    }
                }
            },
        ]
    },
    {
        name: M.util.get_string('information', 'atto_recitautolink'),
        key: 'info',
        singleInput: true,
        options: [
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('studentfirstname', 'atto_recitautolink'),
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/user.firstname";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('studentlastname', 'atto_recitautolink'),
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/user.lastname";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('studentemail', 'atto_recitautolink'),
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/user.email";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('studentavatar', 'atto_recitautolink'),
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/user.picture";
                    }
                }
            },

            {
                input: 'separator',
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('coursename', 'atto_recitautolink'),
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/course.fullname";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('shortcoursename', 'atto_recitautolink'),
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/course.shortname";
                    }
                }
            },
            {
                input: 'separator',
            },
            {
                name: 'information',
                input: 'radio',
                helpButton: <>
                <span>{M.util.get_string('infoteachernum', 'atto_recitautolink')}</span>
                </>,
                label: M.util.get_string('teacherfirstname', 'atto_recitautolink')+' #1',
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher1.firstname";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('teacherlastname', 'atto_recitautolink')+' #1',
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher1.lastname";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('teacheremail', 'atto_recitautolink')+' #1',
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher1.email";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('teacheravatar', 'atto_recitautolink')+' #1',
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher1.picture";
                    }
                }
            },

            {
                input: 'separator',
            },

            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('teacherfirstname', 'atto_recitautolink')+' #2',
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher2.firstname";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('teacherlastname', 'atto_recitautolink')+' #2',
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher2.lastname";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('teacheremail', 'atto_recitautolink')+' #2',
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher2.email";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('teacheravatar', 'atto_recitautolink')+' #2',
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher2.picture";
                    }
                }
            },

            {
                input: 'separator',
            },

            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('teacherfirstname', 'atto_recitautolink')+' #3',
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher3.firstname";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('teacherlastname', 'atto_recitautolink')+' #3',
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher3.lastname";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('teacheremail', 'atto_recitautolink')+' #3',
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher3.email";
                    }
                }
            },
            {
                name: 'information',
                input: 'radio',
                label: M.util.get_string('teacheravatar', 'atto_recitautolink')+' #3',
                key: 'information',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher3.picture";
                    }
                }
            },
        ]
    },
    {
        name: M.util.get_string('injection', 'atto_recitautolink'),
        key: 'injectionactivity',
        cssClasses: true,
        tagName: 'div',
        options: [
            {
                input: 'select',
                name: M.util.get_string('activity', 'atto_recitautolink'),
                key: 'injectionactivity',
                infoButton: <>
                <span>{M.util.get_string('injectionresources', 'atto_recitautolink')}</span>
                </>,
                dataProvider: 'cmList',
                required: true,
                filter: function(item){
                    return (item.label.search(/\[page\]/g) >= 0)
                },
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/f/" + input.value;
                    }
                }
            },
            {
                name: 'checkboxbtn3',
                input: 'checkbox',
                label: M.util.get_string('border', 'atto_recitautolink'),
                helpButton: <>
                <span>{M.util.get_string('infobs', 'atto_recitautolink')}</span>
                <br/>
                <a href="https://getbootstrap.com/docs/4.6/utilities/borders/#border-radius" target="_blank">{M.util.get_string('btnshape', 'atto_recitautolink')} <i className='p-1 fa fa-info-circle'></i> </a><br/>
                </>,
                key: 'injectionactivityborder',
                assignTo: 'injectionactivitycss',
                getOption: function(input){
                    if (input.checked){
                        return "border rounded p-2";
                    }
                    else{
                        return "";
                    }
                }
            },
            {
                input: 'text',
                name: M.util.get_string('cssclass', 'atto_recitautolink'),
                key: 'injectionactivitycss',
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/class:\""+ input.value+"\"";
                    }
                    return "";
                }
            }
        ]
    },
    
]

