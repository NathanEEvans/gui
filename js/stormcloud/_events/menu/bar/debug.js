/*
 * Stormcloud IDE - stormcloud/_events/menu/bar/debug
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
        // module      : stormcloud/_events/menu/bar/debug
        // 
        // summary     : Debug Menubar click events
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                EventManager.registerClick('debugMenu_debug_project', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_debug_file', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_debug_test_file', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_attach_debugger', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_finish_debugger_session', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_pause', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_continue', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_step_over', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_step_over_expression', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_step_into', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_step_into_next_method', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_step_out', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_run_to_cursor', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_apply_code_changes', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_take_gui_snapshot', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_set_current_thread', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_make_callee_current', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_make_caller_current', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_pop_topmost_call', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_toggle_line_breakpoint', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_new_breakpoint', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_new_watch', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_evaluate_expression', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('debugMenu_check_for_deadlocks', function() {

                    alert('Not Implemented');
                });



            }
        };

    });