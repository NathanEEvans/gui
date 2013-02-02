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
    'stormcloud/rest/request',
    'stormcloud/services/logging',
    'stormcloud/gui/statusbar',],
    function(
        context,
        xhr,
        request,
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


        // http://localhost:8180/manager/text/serverinfo
        // http://localhost:8180/manager/text/deploy?path=/Calculator&war=file:/filesystem/martijn/projects/MavenCalculator/target/Calculator.war
        // http://localhost:8180/manager/text/resources
        // http://localhost:8180/manager/text/sessions?path=/Calculator
        // http://localhost:8180/manager/text/findleaks?statusLine=true

        var TOMCAT = {
            
            LIST : context.getTomcatManagerUrl() + 'list',
            
            VIEW : context.getTomcatViewUrl() + "/",
            
            STOP_APPLICATION: context.getTomcatManagerUrl() + 'stop?path=/',
            
            START_APPLICATION: context.getTomcatManagerUrl() + 'start?path=/',
            
            RELOAD_APPLICATION: context.getTomcatManagerUrl() + 'reload?path=/',
            
            DEPLOY_APPLICATION: context.getTomcatManagerUrl() + 'deploy?path=/',
            
            UNDEPLOY_APPLICATION: context.getTomcatManagerUrl() + 'undeploy?path=/',
            
            
            STOP_CONTAINER: '',
            
            START_CONTAINER: ''
        };

        return {
            
            
            view: function(item){
                
                window.open(TOMCAT.VIEW + item.label);
                
            },
            
            stopApplication: function(item) {  
                
                var xhrArgs = {
                    url: TOMCAT.STOP_APPLICATION + item.label
                }
    
                var deferred = xhr.get(xhrArgs);
            
                deferred.then(
                    function(data){
            
                        statusbar.infoStatus(data);
                        
                    },
                    function(error){
            
                        statusbar.errorStatus(error);
                    });
            
                
            },
            
            
            startApplication: function(item) {
                
                var xhrArgs = {
                    url: TOMCAT.START_APPLICATION + item.label
                }
    
                var deferred = xhr.get(xhrArgs);
            
                deferred.then(
                    function(data){
            
                        statusbar.infoStatus(data);
                        
                    },
                    function(error){
            
                        statusbar.errorStatus(error);
                    });
            },
            
            
            reload: function(item) {

                var xhrArgs = {
                    url: TOMCAT.RELOAD_APPLICATION + item.label
                }
    
                var deferred = xhr.get(xhrArgs);
            
                deferred.then(
                    function(data){
            
                        statusbar.infoStatus(data);
                        
                    },
                    function(error){
            
                        statusbar.errorStatus(error);
                    });

            },
            
            
            undeploy: function(item) {
                
                var xhrArgs = {
                    url: TOMCAT.UNDEPLOY_APPLICATION + item.label
                }
    
                var deferred = xhr.get(xhrArgs);
            
                deferred.then(
                    function(data){
            
                        statusbar.infoStatus(data);
                        
                    },
                    function(error){
            
                        statusbar.errorStatus(error);
                    });
            },
            
            
            deploy: function(item) {

                var xhrArgs = {
                    url: TOMCAT.DEPLOY_APPLICATION + item.buildName + '&war=file:'+ item.id +'/target/' + item.buildName + '.war'
                }
    
                var deferred = xhr.get(xhrArgs);
            
                deferred.then(
                    function(data){
            
                        statusbar.infoStatus(data);
                        
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

