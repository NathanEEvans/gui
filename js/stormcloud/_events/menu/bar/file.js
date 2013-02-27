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
    'stormcloud/manager/EventManager',
    'stormcloud/manager/DialogManager',
    'stormcloud/manager/TreeManager'],
    function(
        EventManager,
        DialogManager,
        TreeManager) {

        //
        // module      : stormcloud/_events/menu/bar/file
        // 
        // summary     : File Menubar click events
        //               

        return{

            // Bind the events to the widgets
            bind: function() {

                EventManager.registerClick('fileMenu_new_file', function() {

                    DialogManager.show(DIALOG.NEW_FILE);
                });

                EventManager.registerClick('fileMenu_new_project', function() {

                    DialogManager.show(DIALOG.NEW_PROJECT);
                });

                EventManager.registerClick('fileMenu_clone_remote', function() {

                    DialogManager.show(DIALOG.CLONE_REMOTE);
                });

                EventManager.registerClick('fileMenu_open_project', function() {

                    DialogManager.show(DIALOG.OPEN_PROJECT);

                    TreeManager.refresh('closedProjectTree');
                });

                EventManager.registerClick('fileMenu_open_recent_file', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('fileMenu_open_recent_project', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('fileMenu_select_group', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('fileMenu_new_group', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('fileMenu_import_project_zip', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('fileMenu_import_project_folder', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('fileMenu_export_to_zip', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('fileMenu_save', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('fileMenu_save_as', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('fileMenu_save_all', function() {

                    alert('Not Implemented');
                });
                
            }
        };

    });



