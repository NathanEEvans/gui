/*
 * Stormcloud IDE - stormcloud/services/tomcat
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
    'stormcloud/_base/context',
    'stormcloud/rest/xhr',
    'stormcloud/services/logging',
    'stormcloud/gui/statusbar',],
    function(
        context,
        xhr,
        logging,
        statusbar) {

        //
        // module      : stormcloud/tomcat/manager
        // 
        // summary     : Defines the Tomcat Manager for Tomcat instance operations
        // 
        // description : This module defines the operations that can be performed
        //               on the remote Tomcat instance.
        //


        // Some convenience 'constants'
        var TOMCAT = {
            
            STOP_APPLICATION: {
                command: "/manager/html/stop?path="
            },
            
            START_APPLICATION: {
                command: "/manager/html/start?path="
            },
            
            RELOAD_APPLICATION: {
                command: "/manager/html/reload?path="
            },
            
            UNDEPLOY_APPLICATION: {
                command: "/manager/html/undeploy?path="
            },
            
            DEPLOY_APPLICATION: context.getApiUrl() + 'services/tomcat/deploy',
            
            
            
            STOP_CONTAINER: "",
            
            START_CONTAINER: ""
        };

        return {
            
            
            stop: function(args) {

                // construct and add the url based on the given arguments 
                args.url = this._construct(args);
                xhr.get(args);
            },
            
            
            // http://localhost:8080/manager/html/start?path=/cometd%2Ddemo%2D2%2E5%2E0
            start: function() {



            },
            
            
            // http://localhost:8080/manager/html/reload?path=/cometd%2Ddemo%2D2%2E5%2E0
            reload: function() {



            },
            
            
            // http://localhost:8080/manager/html/undeploy?path=/cometd%2Ddemo%2D2%2E5%2E0
            undeploy: function() {

            },
            
            
            deploy: function(item) {

                var data = {
                    filePath : item.id
                };

                var xhrArgs = {
                    url: TOMCAT.DEPLOY_APPLICATION,
                    handleAs: 'json',
                    postData: dojo.toJson(data)
                }
    
                var deferred = xhr.post(xhrArgs,'JSON');
            
                logging.startTomcatDeploy();
            
                deferred.then(
                    function(data){
            
                        logging.stopTomcatDeploy(data);
                    
                    },
                    function(error){
            
                        statusbar.errorStatus(error);
                    });

            },
            
            
            
            // private method
            // constructs the url to call
            _construct: function(args) {

                return context.protocol
                + context.host
                + ":"
                + context.port
                + args.action.command
                + args.application;
            }
        };
    });

