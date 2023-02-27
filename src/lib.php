<?php
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
 * This plugin is an interface for filter_recitautolink
 *
 * @package    atto_recitautolink
 * @copyright  2019 RECIT
 * @license    {@link http://www.gnu.org/licenses/gpl-3.0.html} GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();
/**
 * Initialise the js strings required for this module.
 */
function atto_recitautolink_strings_for_js() {
    global $PAGE; 

    $PAGE->requires->strings_for_js(array(
                                            'pluginname',
                                            'activity',
                                            'activities',
                                            'generatetestcode',
                                            'insert',
                                            'cancel',
                                            'csspreview',
                                            'infoteachernum',
                                            'getstarted',
                                            'linktext',
                                            'invalidcode',
                                            'button',
                                            'cssclass',
                                            'completioncheckbox',
                                            'section',
                                            'sections',
                                            'information',
                                            'tests',
                                            'testcase',
                                            'btnlook',
                                            'btnshape',
                                            'infobs',
                                            'icon',
                                            'modal',
                                            'modal16x9',
                                            'resourceaccess',
                                            'sametab',
                                            'newtab',
                                            'h5p',
                                            'coursename',
                                            'shortcoursename',
                                            'studentfirstname',
                                            'studentlastname',
                                            'studentemail',
                                            'studentavatar',
                                            'teacherfirstname',
                                            'teacherlastname',
                                            'teacheremail',
                                            'teacheravatar',
                                        ),
                                    'atto_recitautolink');
}


/**
 * Set params for this plugin.
 *
 * @param string $elementid
 * @param stdClass $options - the options for the editor, including the context.
 * @param stdClass $fpoptions - unused.
 * @return array of params to pass to the JavaScript.
 */
function atto_recitautolink_params_for_js($elementid, $options, $fpoptions) {
    global $PAGE;
    if (!isset($PAGE->course->id) || $PAGE->course->id <= 1) {
        return array('courseid' => null);
    }

    return array('courseid' => $PAGE->course->id);
}
