/*
 * Stormcloud IDE - stormcloud/_events/menu/bar/window
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
        // module      : stormcloud/_events/menu/bar/window
        // 
        // summary     : Window Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {

                on(registry.byId('windowMenu_projects'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_files'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_favorites'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_services'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_action_items'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_palette'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_properties'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_chat'), EVENT.CLICK, function(e) {

                    // dijit.byId('dFloatingPane').show();
                    alert('Not Implemented');
                });

            }
        };

    });