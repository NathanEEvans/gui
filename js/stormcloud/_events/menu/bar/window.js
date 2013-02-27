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
    'stormcloud/manager/EventManager'],
    function(
        EventManager) {

        //
        // module      : stormcloud/_events/menu/bar/window
        // 
        // summary     : Window Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {

                EventManager.registerClick('windowMenu_projects', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('windowMenu_files', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('windowMenu_favorites', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('windowMenu_services', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('windowMenu_action_items', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('windowMenu_palette', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('windowMenu_properties', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('windowMenu_chat', function() {

                    // dijit.byId('dFloatingPane').show();
                    alert('Not Implemented');
                });

            }
        };

    });