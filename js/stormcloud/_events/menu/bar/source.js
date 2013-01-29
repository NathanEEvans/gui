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
    'dojo/on',
    'dijit/registry'],
    function(
        on,
        registry) {

        //
        // module      : stormcloud/_events/menu/bar/source
        // 
        // summary     : Source Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {

                on(registry.byId('sourceMenu_format'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_remove_trailing_spaces'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_shift_left'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_shift_right'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_move_up'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_move_down'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_move_code_element_up'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_move_code_element_down'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_duplicate_up'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_duplicate_down'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_toggle_comment'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_complete_code'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_insert_code'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_remove_surrounding_code'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_fix_code'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_fix_imports'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_fix_uses'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_show_method_parameters'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_show_documentation'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_insert_next_matching_word'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_insert_previous_matching_word'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_inspect'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_scan_for_external_changes'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });


            }
        };

    });