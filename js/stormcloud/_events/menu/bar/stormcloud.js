/*
 * Stormcloud IDE - stormcloud/_events/menu/bar/stormcloud
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
        // module      : stormcloud/_events/menu/bar/stormcloud
        // 
        // summary     : Stormcloud Menubar click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                EventManager.registerClick('stormcloudMenu_about', function() {

                    DialogManager.show(DIALOG.ABOUT);
                });

                EventManager.registerClick('stormcloudMenu_preferences', function() {

                    DialogManager.show(DIALOG.PREFERENCES);
                });

                EventManager.registerClick('stormcloudMenu_my_account', function() {

                    DialogManager.show(DIALOG.MY_ACCOUNT);
                });
            }
        };

    });


