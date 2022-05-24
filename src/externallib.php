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

defined('MOODLE_INTERNAL') || die;

require_once("$CFG->libdir/externallib.php");

class atto_recitautolink_external extends external_api {


    public static function get_cm_list_parameters() {
        return new external_function_parameters(array('courseid' => new external_value(PARAM_INT, VALUE_REQUIRED)));
    }
    
    public static function get_cm_list_returns() {
        return new external_multiple_structure(
            new external_single_structure(
                array(
                    'id' => new external_value(PARAM_INT, 'cm id'),
                    'modname' => new external_value(PARAM_TEXT, 'module name of cm'),
                    'name' => new external_value(PARAM_TEXT, 'cm name'),
                )
            )
        );
    }

    public static function get_cm_list($courseid) {
        $params = self::validate_parameters(
                        self::get_cm_list_parameters(),
                        array('courseid' => $courseid));

        $result = array();
        $modinfo = get_fast_modinfo($params['courseid']);

        foreach ($modinfo->cms as $cm){
            if ($cm->uservisible) {
                $result[] = array('id' => $cm->id, 'name' => $cm->name, 'modname' => $cm->modname);
            }
        }
        return $result;
    }

    public static function get_section_list_parameters() {
        return new external_function_parameters(array('courseid' => new external_value(PARAM_INT, VALUE_REQUIRED)));
    }
    
    public static function get_section_list_returns() {
        return new external_multiple_structure(
            new external_single_structure(
                array(
                    'id' => new external_value(PARAM_INT, 'section id'),
                    'name' => new external_value(PARAM_TEXT, 'section name'),
                )
            )
        );
    }

    public static function get_section_list($courseid) {
        $params = self::validate_parameters(
                        self::get_section_list_parameters(),
                        array('courseid' => $courseid));

        $result = array();
        $modinfo = get_fast_modinfo($params['courseid']);

        foreach ($modinfo->get_section_info_all() as $section){
            if ($section->uservisible) {
                $result[] = array('id' => $section->section, 'name' => (empty($section->name) ? get_string('section') . '' . $section->section : $section->name));
            }
        }
        return $result;
    }

    public static function get_h5p_list_parameters() {
        return new external_function_parameters(array('courseid' => new external_value(PARAM_INT, VALUE_REQUIRED)));
    }
    
    public static function get_h5p_list_returns() {
        return new external_multiple_structure(
            new external_single_structure(
                array(
                    'id' => new external_value(PARAM_TEXT, 'h5p id'),
                    'name' => new external_value(PARAM_TEXT, 'h5p name'),
                )
            )
        );
    }

    public static function get_h5p_list($courseid) {
        global $PAGE;
        $params = self::validate_parameters(
                        self::get_h5p_list_parameters(),
                        array('courseid' => $courseid));

        $result = array();
        $coursecontext = \context_course::instance($params['courseid']);

        $PAGE->set_context($coursecontext);

        if (!has_capability('moodle/contentbank:access', $coursecontext)) {
            return $result;
        }

        $contentbank = new \core_contentbank\contentbank();
        $contents = $contentbank->search_contents('', $coursecontext->id);
        foreach ($contents as $content){
            if ($contentnode = \repository_contentbank\helper::create_contentbank_content_node($content)) {
                $result[] = array('id' => $contentnode['title'], 'name' => $contentnode['shorttitle']);
            }
        }
        return $result;
    }
}
