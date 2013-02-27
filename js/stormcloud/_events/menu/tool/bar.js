/*
 * Stormcloud IDE - stormcloud/_events/menu/tool/bar
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
        // module      : stormcloud/_events/menu/tool/bar
        // 
        // summary     : Toolbar (icons) click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {
                
                EventManager.registerClick('toolBar_new_file', function() {

                    DialogManager.show(DIALOG.NEW_FILE);
                });

                EventManager.registerClick('toolBar_new_project', function() {

                    DialogManager.show(DIALOG.NEW_PROJECT);
                });

                EventManager.registerClick('toolBar_open_project', function() {

                    DialogManager.show(DIALOG.OPEN_PROJECT);

                    TreeManager.refresh('closedProjectTree');
                });

                EventManager.registerClick('toolBar_save_all', function() {
                    //Filesystem.saveAll();
                    alert('Not Implemented');
                });

                EventManager.registerClick('toolBar_cut', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('toolBar_copy', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('toolBar_paste', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('toolBar_undo', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('toolBar_project_configuration', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('toolBar_compile', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('toolBar_clean', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('toolBar_install', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('toolBar_trash', function() {

                    alert('Not Implemented');
                });

                
            }
        };

    });