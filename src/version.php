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

$plugin->version   = 2025021200;        // The current plugin version (Date: YYYYMMDDXX).
$plugin->requires  = 2024071200.00; // Moodle 4.5.0
$plugin->component = 'atto_recitautolink';  // Full name of the plugin (used for diagnostics).
$plugin->release = 'v2.0.0-stable';
$plugin->supported = [405, 405];      //  Moodle 3.9.x, 3.10.x and 3.11.x are supported.  
$plugin->dependencies = [
	'filter_recitactivity' => 2025013000
];
$plugin->maturity = MATURITY_STABLE; // MATURITY_ALPHA, MATURITY_BETA, MATURITY_RC or MATURITY_STABLE