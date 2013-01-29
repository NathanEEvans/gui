/*
 * Stormcloud IDE - stormcloud/_events/menu/bar/run
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
        // module      : stormcloud/_events/menu/bar/run
        // 
        // summary     : Run Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {

                on(registry.byId('runMenu_run_project'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_test_project'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_build_project'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_clean_and_build_project'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_default'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_customize'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_none'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_select'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_generate_javadoc'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_run_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_test_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_compile_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_check_xml'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_validate_xml'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_repeat_buil_run'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_stop_build_run'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

            }
        };

    });