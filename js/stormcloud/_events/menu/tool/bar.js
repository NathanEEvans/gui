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
    'dojo/on',
    'dijit/registry',
    'stormcloud/manager/DialogManager'],
    function(
        on,
        registry,
        DialogManager) {

        //
        // module      : stormcloud/_events/menu/tool/bar
        // 
        // summary     : Toolbar (icons) click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {
                
                on(registry.byId('toolBar_new_file'), EVENT.CLICK, function(e) {

                    DialogManager.show(DIALOG.NEW_FILE);
                });

                on(registry.byId('toolBar_new_project'), EVENT.CLICK, function(e) {

                    DialogManager.show(DIALOG.NEW_PROJECT);
                });

                on(registry.byId('toolBar_open_project'), EVENT.CLICK, function(e) {

                    DialogManager.show(DIALOG.OPEN_PROJECT);

                    tree.refresh('closedProjectTree');
                });

                on(registry.byId('toolBar_save_all'), EVENT.CLICK, function(e) {
                    //Filesystem.saveAll();
                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_cut'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_copy'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_paste'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_undo'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_project_configuration'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_compile'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_clean'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_install'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_trash'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                
            }
        };

    });