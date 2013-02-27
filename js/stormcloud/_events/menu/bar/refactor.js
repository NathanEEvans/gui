/*
 * Stormcloud IDE - stormcloud/_events/menu/bar/refactor
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
        // module      : stormcloud/_events/menu/bar/refactor
        // 
        // summary     : Refactor Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {

                EventManager.registerClick('refactorMenu_rename', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('refactorMenu_move', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('refactorMenu_copy', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('refactorMenu_safely_delete', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('refactorMenu_extract_inline_style', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('refactorMenu_inspect_and_transform', function() {

                    alert('Not Implemented');
                });

            }
        };

    });