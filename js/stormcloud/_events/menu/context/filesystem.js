/*
 * Stormcloud IDE - stormcloud/_events/menu/context/filesystem
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
    'stormcloud/manager/DialogManager'],
    function(
        EventManager,
        DialogManager) {

        //
        // module      : stormcloud/_events/menu/context/filesystem
        // 
        // summary     : Filesystem ContextMenu click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                EventManager.registerClick('filesystemMenu_new', function() {

                    DialogManager.show(DIALOG.NEW_FILE);
                });

                EventManager.registerClick('filesystemMenu_open', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('filesystemMenu_cut', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('filesystemMenu_copy', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('filesystemMenu_paste', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('filesystemMenu_download', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('filesystemMenu_delete', function() {

                
                    DialogManager.show(DIALOG.DELETE);

                });

                EventManager.registerClick('filesystemMenu_rename', function() {

                    alert('Not Implemented');

                });

                EventManager.registerClick('filesystemMenu_move', function() {

                    alert('Not Implemented');

                });

                EventManager.registerClick('filesystemMenu_safe_delete', function() {

                    alert('Not Implemented');

                });

            }
        };

    });