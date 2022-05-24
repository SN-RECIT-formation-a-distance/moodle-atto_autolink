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
        name: M.util.get_string('activities', 'atto_recitautolink'),
        key: 'activity',
        options: [
            {
                input: 'select',
                name: M.util.get_string('activity', 'atto_recitautolink'),
                key: 'activity',
                infoButton: <>
                <span>{M.util.get_string('resourceaccess', 'atto_recitautolink')}</span>
                </>,
                dataProvider: 'cmList',
                required: true,
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/"+ input.value;
                    }
                }
            },
            {
                input: 'text',
                name: M.util.get_string('linktext', 'atto_recitautolink'),
                key: 'linktext',
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/desc:\""+ input.value+"\"";
                    }
                }
            },
            {
                name: 'opening',
                input: 'radio',
                default: true,
                label: M.util.get_string('sametab', 'atto_recitautolink'),
                key: 'oldtab',
                getOption: function(input){
                    if (input.checked){
                        return "";
                    }
                }
            },
            {
                name: 'opening',
                input: 'radio',
                label: M.util.get_string('newtab', 'atto_recitautolink'),
                key: 'newtab',
                getOption: function(input){
                    if (input.checked){
                        return "/b";
                    }
                }
            },
            {
                name: 'opening',
                input: 'radio',
                label: M.util.get_string('modal', 'atto_recitautolink'),
                key: 'modal',
                getOption: function(input){
                    if (input.checked){
                        return "/p";
                    }
                }
            },
            {
                name: 'opening',
                input: 'radio',
                label: M.util.get_string('modal16x9', 'atto_recitautolink'),
                key: 'modal',
                getOption: function(input){
                    if (input.checked){
                        return "/p16x9";
                    }
                }
            },
            {
                input: 'separator',
            },
            {
                name: 'otheroptions',
                input: 'checkbox',
                label: M.util.get_string('icon', 'atto_recitautolink'),
                key: 'icon',
                getOption: function(input){
                    if (input.checked){
                        return "/i";
                    }
                }
            },
            {
                name: 'otheroptions',
                input: 'checkbox',
                label: M.util.get_string('completioncheckbox', 'atto_recitautolink'),
                key: 'completion',
                getOption: function(input){
                    if (input.checked){
                        return "/c";
                    }
                }
            },
            {
                input: 'separator',
            },
            {
                name: 'otheroptions',
                input: 'checkbox',
                label: M.util.get_string('button', 'atto_recitautolink'),
                helpButton: <>
                <span>{M.util.get_string('infobs', 'atto_recitautolink')}</span>
                <br/>
                <a href="https://getbootstrap.com/docs/4.6/utilities/borders/#border-radius" target="_blank">{M.util.get_string('btnshape', 'atto_recitautolink')} <i className='p-1 fa fa-info-circle'></i> </a><br/>
                <a href="https://getbootstrap.com/docs/4.6/components/buttons/" target="_blank">{M.util.get_string('btnlook', 'atto_recitautolink')} <i className='p-1 fa fa-info-circle'></i> </a>
                </>,
                key: 'btn',
                getOption: function(input){
                    if (input.checked){
                        return "";
                    }
                }
            },
            {
                input: 'text',
                name: M.util.get_string('cssclass', 'atto_recitautolink'),
                key: 'css',
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/class:\""+ input.value+"\"";
                    }
                }
            },
        ]
    },
    {
        name: M.util.get_string('sections', 'atto_recitautolink'),
        key: 'section',
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
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/desc:\""+ input.value+"\"";
                    }
                }
            },
            /*{
                name: 'opening',
                input: 'radio',
                default: true,
                label: 'Même onglet',
                key: 'oldtab',
                getOption: function(input){
                    if (input.checked){
                        return "";
                    }
                }
            },
            {
                name: 'opening',
                input: 'radio',
                label: 'Nouvel onglet',
                key: 'newtab',
                getOption: function(input){
                    if (input.checked){
                        return "/b";
                    }
                }
            },
            {
                name: 'opening',
                input: 'radio',
                label: 'Modal',
                key: 'modal',
                getOption: function(input){
                    if (input.checked){
                        return "/p";
                    }
                }
            },*/
            {
                input: 'separator',
            },
            {
                name: 'otheroptions',
                input: 'checkbox',
                label: M.util.get_string('button', 'atto_recitautolink'),
                helpButton: <>
                <span>{M.util.get_string('infobs', 'atto_recitautolink')}</span>
                <br/>
                <a href="https://getbootstrap.com/docs/4.6/utilities/borders/#border-radius" target="_blank">{M.util.get_string('btnshape', 'atto_recitautolink')} <i className='p-1 fa fa-info-circle'></i> </a><br/>
                <a href="https://getbootstrap.com/docs/4.6/components/buttons/" target="_blank">{M.util.get_string('btnlook', 'atto_recitautolink')} <i className='p-1 fa fa-info-circle'></i> </a>
                </>,
                key: 'btn',
                getOption: function(input){
                    if (input.checked){
                        return "";
                    }
                }
            },
            {
                input: 'text',
                name: M.util.get_string('cssclass', 'atto_recitautolink'),
                key: 'css',
                getOption: function(input){
                    if (input.value.length > 0){
                        return "/class:\""+ input.value+"\"";
                    }
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
                name: 'infocourse',
                input: 'checkbox',
                label: M.util.get_string('coursename', 'atto_recitautolink'),
                key: 'info1',
                getOption: function(input){
                    if (input.checked){
                        return "/d/course.fullname";
                    }
                }
            },
            {
                name: 'infocourse',
                input: 'checkbox',
                label: M.util.get_string('shortcoursename', 'atto_recitautolink'),
                key: 'info2',
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
                name: 'infostudent',
                input: 'checkbox',
                label: M.util.get_string('studentfirstname', 'atto_recitautolink'),
                key: 'info3',
                getOption: function(input){
                    if (input.checked){
                        return "/d/user.firstname";
                    }
                }
            },
            {
                name: 'infostudent',
                input: 'checkbox',
                label: M.util.get_string('studentlastname', 'atto_recitautolink'),
                key: 'info4',
                getOption: function(input){
                    if (input.checked){
                        return "/d/user.lastname";
                    }
                }
            },
            {
                name: 'infostudent',
                input: 'checkbox',
                label: M.util.get_string('studentemail', 'atto_recitautolink'),
                key: 'info5',
                getOption: function(input){
                    if (input.checked){
                        return "/d/user.email";
                    }
                }
            },
            {
                name: 'infostudent',
                input: 'checkbox',
                label: M.util.get_string('studentavatar', 'atto_recitautolink'),
                key: 'info6',
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
                name: 'infoteacher1',
                input: 'checkbox',
                label: M.util.get_string('teacherfirstname', 'atto_recitautolink')+' #1',
                key: 'info7',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher1.firstname";
                    }
                }
            },
            {
                name: 'infoteacher1',
                input: 'checkbox',
                label: M.util.get_string('teacherlastname', 'atto_recitautolink')+' #1',
                key: 'info8',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher1.lastname";
                    }
                }
            },
            {
                name: 'infoteacher1',
                input: 'checkbox',
                label: M.util.get_string('teacheremail', 'atto_recitautolink')+' #1',
                key: 'info9',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher1.email";
                    }
                }
            },
            {
                name: 'infoteacher1',
                input: 'checkbox',
                label: M.util.get_string('teacheravatar', 'atto_recitautolink')+' #1',
                key: 'info18',
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
                name: 'infoteacher2',
                input: 'checkbox',
                label: M.util.get_string('teacherfirstname', 'atto_recitautolink')+' #2',
                key: 'info10',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher2.firstname";
                    }
                }
            },
            {
                name: 'infoteacher2',
                input: 'checkbox',
                label: M.util.get_string('teacherlastname', 'atto_recitautolink')+' #2',
                key: 'info11',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher2.lastname";
                    }
                }
            },
            {
                name: 'infoteacher2',
                input: 'checkbox',
                label: M.util.get_string('teacheremail', 'atto_recitautolink')+' #2',
                key: 'info12',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher2.email";
                    }
                }
            },
            {
                name: 'infoteacher2',
                input: 'checkbox',
                label: M.util.get_string('teacheravatar', 'atto_recitautolink')+' #2',
                key: 'info17',
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
                name: 'infoteacher3',
                input: 'checkbox',
                label: M.util.get_string('teacherfirstname', 'atto_recitautolink')+' #3',
                key: 'info13',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher3.firstname";
                    }
                }
            },
            {
                name: 'infoteacher3',
                input: 'checkbox',
                label: M.util.get_string('teacherlastname', 'atto_recitautolink')+' #3',
                key: 'info14',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher3.lastname";
                    }
                }
            },
            {
                name: 'infoteacher3',
                input: 'checkbox',
                label: M.util.get_string('teacheremail', 'atto_recitautolink')+' #3',
                key: 'info15',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher3.email";
                    }
                }
            },
            {
                name: 'infoteacher3',
                input: 'checkbox',
                label: M.util.get_string('teacheravatar', 'atto_recitautolink')+' #3',
                key: 'info16',
                getOption: function(input){
                    if (input.checked){
                        return "/d/teacher3.picture";
                    }
                }
            },
        ]
    },
    {
        name: M.util.get_string('tests', 'atto_recitautolink'),
        key: 'tests',
        singleInput: true,
        options: [
            {
                name: 'testcase',
                input: 'checkbox',
                label: M.util.get_string('generatetestcode', 'atto_recitautolink'),
                key: 'info17',
                ignoreTest: true,
                getOption: function(input, obj){
                    if (input.checked){
                        return obj.generateTestCode();
                    }
                }
            },
            {
                name: 'testcasedesc',
                input: 'desc',
                label: M.util.get_string('testcase', 'atto_recitautolink'),
                key: 'info18',
                getOption: function(input){
                    return '';
                }
            },
        ]
    }
]

