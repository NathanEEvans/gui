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
    'stormcloud/manager/EventManager'],
    function(
        EventManager) {

        //
        // module      : stormcloud/_events/menu/bar/navigate
        // 
        // summary     : Navigate Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                EventManager.registerClick('navigateMenu_goto_file', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_goto_type', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_goto_symbol', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_goto_spring_bean', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_goto_test', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_goto_previous_document', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_goto_source', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_goto_declaration', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_goto_super_implementation', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_members', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_file_members', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_hierarchy', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_file_hierarchy', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_last_edit_location', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_back', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_forward', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_goto_line', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_toggle_bookmarks', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_bookmark_history_popup_next', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_bookmark_history_popup_previous', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_next_error', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_previous_error', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_select_in_projects', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_select_in_files', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('navigateMenu_select_in_favorites', function() {

                    alert('Not Implemented');
                });


            }
        };

    });