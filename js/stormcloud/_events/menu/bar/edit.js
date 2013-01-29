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
    'dojo/on',
    'dijit/registry'],
    function(
        on,
        registry) {

        //
        // module      : stormcloud/_events/menu/bar/edit
        // 
        // summary     : Edit Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {

                on(registry.byId('editMenu_undo'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_redo'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_cut'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_copy'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_paste'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_paste_formatted'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_delete'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_select_all'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_select_identifier'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_find_selection'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_find_next'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_find_previous'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_find'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_replace'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_find_usages'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_find_in_projects'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_replace_in_projects'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

            }
        };

    });