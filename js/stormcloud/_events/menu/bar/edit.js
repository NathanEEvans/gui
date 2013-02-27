/*
 * Stormcloud IDE - stormcloud/_events/menu/bar/edit
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
        // module      : stormcloud/_events/menu/bar/edit
        // 
        // summary     : Edit Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {

                EventManager.registerClick('editMenu_undo', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_redo', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_cut', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_copy', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_paste', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_paste_formatted', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_delete', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_select_all', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_select_identifier', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_find_selection', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_find_next', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_find_previous', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_find', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_replace', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_find_usages', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_find_in_projects', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('editMenu_replace_in_projects', function() {

                    alert('Not Implemented');
                });

            }
        };

    });