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
    'stormcloud/manager/EventManager'],
    function(
        EventManager) {

        //
        // module      : stormcloud/_events/menu/bar/run
        // 
        // summary     : Run Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {

                EventManager.registerClick('runMenu_run_project', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_test_project', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_build_project', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_clean_and_build_project', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_default', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_customize', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_none', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_select', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_generate_javadoc', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_run_file', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_test_file', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_compile_file', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_check_xml', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_validate_xml', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_repeat_buil_run', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('runMenu_stop_build_run', function() {

                    alert('Not Implemented');
                });

            }
        };

    });