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
    'dojo/on',
    'dijit/registry',
    'stormcloud/manager/DialogManager',
    'stormcloud/gui/tree',
    'stormcloud/services/filesystem'],
    function(
        on,
        registry,
        DialogManager,
        tree,
        filesystem) {

        //
        // module      : stormcloud/_events/menu/context/filesystem
        // 
        // summary     : Filesystem ContextMenu click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                on(registry.byId('filesystemMenu_new'), EVENT.CLICK, function(e) {

                    DialogManager.show(DIALOG.NEW_FILE);
                });

                on(registry.byId('filesystemMenu_open'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('filesystemMenu_cut'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('filesystemMenu_copy'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('filesystemMenu_paste'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('filesystemMenu_download'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('filesystemMenu_delete'), EVENT.CLICK, function(e) {

                
                    DialogManager.show(DIALOG.DELETE);

                });

                on(registry.byId('filesystemMenu_rename'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');

                });

                on(registry.byId('filesystemMenu_move'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');

                });

                on(registry.byId('filesystemMenu_safe_delete'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');

                });

            }
        };

    });