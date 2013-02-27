/*
 * Stormcloud IDE - stormcloud/_events/menu/context/tomcat
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
    'stormcloud/service/TomcatService'],
    function(
        EventManager,
        TomcatService) {

        //
        // module      : stormcloud/_events/menu/context/tomcat
        // 
        // summary     : Tomcat ContextMenu click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                EventManager.registerClick('tomcatAppMenu_view', function() {

                    TomcatService.view(dijit.byId('servicesTree').attr('selectedItem'));
                });
                
                EventManager.registerClick('tomcatAppMenu_stop', function() {

                    TomcatService.stopApplication(dijit.byId('servicesTree').attr('selectedItem'));
                });
                
                EventManager.registerClick('tomcatAppMenu_start', function() {

                    TomcatService.startApplication(dijit.byId('servicesTree').attr('selectedItem'));
                });
                
                EventManager.registerClick('tomcatAppMenu_reload', function() {

                    TomcatService.reload(dijit.byId('servicesTree').attr('selectedItem'));
                });
                
                EventManager.registerClick('tomcatAppMenu_undeploy', function() {

                    TomcatService.undeploy(dijit.byId('servicesTree').attr('selectedItem'));
                });
            }
        };
    });