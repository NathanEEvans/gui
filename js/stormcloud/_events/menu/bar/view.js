/*
 * Stormcloud IDE - stormcloud/_events/menu/bar/view
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
        // module      : stormcloud/_events/menu/bar/view
        // 
        // summary     : View Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                EventManager.registerClick('viewMenu_source', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_history', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_collapse_fold', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_expand_fold', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_collapse_all', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_expand_all', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_file', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_clipboard', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_undo_redo', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_run', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_debug', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_memory', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_quick_search', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_small_toolbar_icons', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_reset_toolbars', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_customize', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_show_editor_toolbar', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_show_line_numbers', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_show_non_printable_characters', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_show_diff_sidebar', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_show_versioning_labels', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('viewMenu_synchronize_editor_with_views', function() {

                    alert('Not Implemented');
                });
            }
        };

    });