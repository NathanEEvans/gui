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
    'dojo/on',
    'dijit/registry'],
    function(
        on,
        registry) {

        //
        // module      : stormcloud/_events/menu/bar/view
        // 
        // summary     : View Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                on(registry.byId('viewMenu_source'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_history'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_collapse_fold'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_expand_fold'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_collapse_all'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_expand_all'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_ide_log'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_clipboard'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_undo_redo'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_run'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_debug'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_memory'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_quick_search'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_small_toolbar_icons'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_reset_toolbars'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_customize'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_show_editor_toolbar'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_show_line_numbers'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_show_non_printable_characters'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_show_diff_sidebar'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_show_versioning_labels'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_synchronize_editor_with_views'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });



            }
        };

    });