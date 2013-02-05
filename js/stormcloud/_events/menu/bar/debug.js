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
    'dojo/on',
    'dijit/registry'],
    function(
        on,
        registry) {

        //
        // module      : stormcloud/_events/menu/bar/debug
        // 
        // summary     : Debug Menubar click events
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                on(registry.byId('debugMenu_debug_project'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_debug_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_debug_test_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_attach_debugger'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_finish_debugger_session'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_pause'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_continue'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_step_over'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_step_over_expression'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_step_into'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_step_into_next_method'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_step_out'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_run_to_cursor'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_apply_code_changes'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_take_gui_snapshot'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_set_current_thread'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_make_callee_current'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_make_caller_current'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_pop_topmost_call'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_toggle_line_breakpoint'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_new_breakpoint'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_new_watch'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_evaluate_expression'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_check_for_deadlocks'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });



            }
        };

    });