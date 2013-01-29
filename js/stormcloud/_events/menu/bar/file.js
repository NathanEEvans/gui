/*
 * Stormcloud IDE - stormcloud/_events/menu/bar/file
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
    'dijit/registry',
    'stormcloud/gui/dialog',
    'stormcloud/gui/tree',
    'stormcloud/services/filesystem'],
    function(
        on,
        registry,
        dialog,
        tree,
        filesystem) {

        //
        // module      : stormcloud/_events/menu/bar/file
        // 
        // summary     : File Menubar click events
        //               

        return{

            // Bind the events to the widgets
            bind: function() {

                on(registry.byId('fileMenu_new_file'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.NEW_FILE);
                });

                on(registry.byId('fileMenu_new_project'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.NEW_PROJECT);
                });

                on(registry.byId('fileMenu_clone_remote'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.CLONE_REMOTE);
                });

                on(registry.byId('fileMenu_open_project'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.OPEN_PROJECT);

                    tree.refresh('closedProjectTree');
                });

                on(registry.byId('fileMenu_open_recent_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });


                on(registry.byId('fileMenu_close_project'), EVENT.CLICK, function(e) {

                    filesystem.close(dijit.byId('servicesTree').attr('selectedItem'));
                });

                on(registry.byId('fileMenu_open_recent_project'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_select_group'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_new_group'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_project_properties'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_import_project_zip'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_import_project_folder'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_export_to_zip'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_save'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_save_as'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_save_all'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_page_setup'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_print'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_print_to_html'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });
                
            }
        };

    });



