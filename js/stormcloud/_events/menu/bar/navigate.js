/*
 * Stormcloud IDE - stormcloud/_events/menu/bar/navigate
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
        // module      : stormcloud/_events/menu/bar/navigate
        // 
        // summary     : Navigate Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                on(registry.byId('navigateMenu_goto_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_type'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_symbol'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_spring_bean'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_test'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_previous_document'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_source'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_declaration'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_super_implementation'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_members'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_file_members'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_hierarchy'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_file_hierarchy'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_last_edit_location'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_back'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_forward'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_line'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_toggle_bookmarks'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_bookmark_history_popup_next'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_bookmark_history_popup_previous'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_next_error'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_previous_error'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_select_in_projects'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_select_in_files'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_select_in_favorites'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });


            }
        };

    });