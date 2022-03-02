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
 * Atto uninstall script. Removes atto_recitautolink icon to Atto toolbar.
 *
 * @package    atto
 * @subpackage atto_recitautolink
 * @copyright  2019 RECIT
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

function xmldb_atto_recitautolink_uninstall() {
    $pluginname = "atto_recitautolink";

    // Remove 'recit_editor' from the toolbar editor_atto config variable.
    $toolbar = get_config('editor_atto', 'toolbar');
    if (strpos($toolbar, $pluginname) !== false) {
        $groups = explode("\n", $toolbar);
        $newgroups = array();
        foreach ($groups as $group) {
            if (strpos($group, $pluginname) !== false) {
                $parts = explode('=', $group);
                $items = explode(',', $parts[1]);
                $newitems = array();
                foreach ($items as $item) {
                    if (trim($item) != $pluginname) {
                        $newitems[] = $item;
                    }
                }
                if (!empty($newitems)) {
                    $parts[1] = implode(',', $newitems);
                    $newgroups[] = implode('=', $parts);
                }
            } else {
                $newgroups[] = $group;
            }
        }
        $toolbar = implode("\n", $newgroups);
        set_config('toolbar', $toolbar, 'editor_atto');
    }
}
