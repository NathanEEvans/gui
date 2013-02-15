/*
 * Stormcloud IDE - stormcloud/_events/tab/tool/bar
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
    'stormcloud/gui/search'],
    function(
        on,
        registry,
        dialog,
        search) {

        //
        // module      : stormcloud/_events/tab/tool/bar
        // 
        // summary     : Tab Toolbar (icons) click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {
                
                
                on(registry.byId('toolbarSearch_redefine'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.FIND);
                });


                on(registry.byId('toolbarSearch_rerun'), EVENT.CLICK, function(e) {

                    // tot run with previous provided args
                    });
                
                
                on(registry.byId('toolbarSearch_clear'), EVENT.CLICK, function(e) {

                    search.clear();
                });
            }
        }
    });
            
