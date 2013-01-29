/*
 * Stormcloud IDE - stormcloud/_events/menu/context/sources
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
        // module      : stormcloud/_events/menu/context/sources
        // 
        // summary     : Sources ContextMenu click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                on(registry.byId('sourcesMenu_new_file'), EVENT.CLICK, function(e) {

                    alert('yo');

                    dialog.show(DIALOG.NEW_FILE);
                });


                on(registry.byId('sourcesMenu_open'), EVENT.CLICK, function(e) {

                    filesystem.open();
                });

                on(registry.byId('sourcesMenu_cut'), EVENT.CLICK, function(e) {

                    tree.setMoveSource();
                });

                on(registry.byId('sourcesMenu_copy'), EVENT.CLICK, function(e) {

                    tree.setCopySource();
                });

                on(registry.byId('sourcesMenu_paste'), EVENT.CLICK, function(e) {

                    tree.setDestination();
                });

                on(registry.byId('sourcesMenu_download'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourcesMenu_delete'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.DELETE);
                });

                on(registry.byId('sourcesMenu_rename'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });


                on(registry.byId('sourcesMenu_move'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourcesMenu_safe_delete'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });


            }
        };

    });