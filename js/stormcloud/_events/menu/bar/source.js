/*
 * Stormcloud IDE - stormcloud/_events/menu/bar/source
 * 
 * Copyright (C) 2012 - 2013 Stormcloud IDE
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the 
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public 
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * 
 */
define([
    'stormcloud/manager/EventManager'],
    function(
        EventManager) {

        //
        // module      : stormcloud/_events/menu/bar/source
        // 
        // summary     : Source Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {

                EventManager.registerClick('sourceMenu_format', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_remove_trailing_spaces', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_shift_left', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_shift_right', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_move_up', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_move_down', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_move_code_element_up', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_move_code_element_down', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_duplicate_up', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_duplicate_down', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_toggle_comment', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_complete_code', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_insert_code', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_remove_surrounding_code', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_fix_code', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_fix_imports', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_fix_uses', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_show_method_parameters', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_show_documentation', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_insert_next_matching_word', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_insert_previous_matching_word', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_inspect', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('sourceMenu_scan_for_external_changes', function() {

                    alert('Not Implemented');
                });


            }
        };

    });