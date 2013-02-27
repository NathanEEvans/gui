/*
 * Stormcloud IDE - stormcloud/_events/menu/bar/help
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
    'stormcloud/manager/EventManager',
    'stormcloud/manager/DialogManager'],
    function(
        EventManager,
        DialogManager) {

        //
        // module      : stormcloud/_events/menu/bar/help
        // 
        // summary     : Help Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                EventManager.registerClick('helpMenu_search', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('helpMenu_help_contents', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('helpMenu_online_docs_and_support', function() {

                    alert('Not Implemented');
                });

                EventManager.registerClick('helpMenu_report_issue', function() {

                    DialogManager.show(DIALOG.DEFECTS_AND_ENHANCEMENTS);
                });

                EventManager.registerClick('helpMenu_start_page', function() {

                    alert('Not Implemented');
                });


            }
        };

    });