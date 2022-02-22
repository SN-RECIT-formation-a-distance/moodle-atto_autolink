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

$functions = array(

    'atto_recitautolink_get_cm_list' => array(
        'classname'   => 'atto_recitautolink_external',
        'methodname'  => 'get_cm_list',
        'classpath'   => '/lib/editor/atto/plugins/recitautolink/externallib.php',
        'description' => 'Returns cm list',
        'type'        => 'read',
        'ajax'        => true,
),
'atto_recitautolink_get_section_list' => array(
        'classname'   => 'atto_recitautolink_external',
        'methodname'  => 'get_section_list',
        'classpath'   => '/lib/editor/atto/plugins/recitautolink/externallib.php',
        'description' => 'Returns section list',
        'type'        => 'read',
        'ajax'        => true,
),
'atto_recitautolink_get_h5p_list' => array(
        'classname'   => 'atto_recitautolink_external',
        'methodname'  => 'get_h5p_list',
        'classpath'   => '/lib/editor/atto/plugins/recitautolink/externallib.php',
        'description' => 'Returns h5p list',
        'type'        => 'read',
        'ajax'        => true,
),


);