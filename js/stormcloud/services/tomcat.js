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
    'stormcloud/manager/SettingsManager',
    'stormcloud/rest/xhr',
    'stormcloud/manager/StatusManager'],
    function(
        SettingsManager,
        xhr,
        StatusManager) {

        //
        // module      : stormcloud/tomcat/manager
        // 
        // summary     : Defines the Tomcat Manager for Tomcat instance operations
        // 
        

        // http://localhost:8180/manager/text/serverinfo
        // http://localhost:8180/manager/text/deploy?path=/Calculator&war=file:/filesystem/martijn/projects/MavenCalculator/target/Calculator.war
        // http://localhost:8180/manager/text/resources
        // http://localhost:8180/manager/text/sessions?path=/Calculator
        // http://localhost:8180/manager/text/findleaks?statusLine=true

        var TOMCAT = {
            
            LIST : SettingsManager.getTomcatManagerUrl() + '/list',
            
            VIEW : SettingsManager.getTomcatViewUrl() + "/",
            
            STOP_APPLICATION: SettingsManager.getTomcatManagerUrl() + 'stop?path=/',
            
            START_APPLICATION: SettingsManager.getTomcatManagerUrl() + 'start?path=/',
            
            RELOAD_APPLICATION: SettingsManager.getTomcatManagerUrl() + 'reload?path=/',
            
            DEPLOY_APPLICATION: SettingsManager.getTomcatManagerUrl() + 'deploy?path=/',
            
            UNDEPLOY_APPLICATION: SettingsManager.getTomcatManagerUrl() + 'undeploy?path=/',
            
            
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
            
                        StatusManager.info(data);
                        
                    },
                    function(error){
            
                        StatusManager.error(error);
                    });
            
                
            },
            
            
            startApplication: function(item) {
                
                var xhrArgs = {
                    url: TOMCAT.START_APPLICATION + item.label
                }
    
                var deferred = xhr.get(xhrArgs);
            
                deferred.then(
                    function(data){
            
                        StatusManager.info(data);
                        
                    },
                    function(error){
            
                        StatusManager.error(error);
                    });
            },
            
            
            reload: function(item) {

                var xhrArgs = {
                    url: TOMCAT.RELOAD_APPLICATION + item.label
                }
    
                var deferred = xhr.get(xhrArgs);
            
                deferred.then(
                    function(data){
            
                        StatusManager.info(data);
                        
                    },
                    function(error){
            
                        StatusManager.error(error);
                    });

            },
            
            
            undeploy: function(item) {
                
                var xhrArgs = {
                    url: TOMCAT.UNDEPLOY_APPLICATION + item.label
                }
    
                var deferred = xhr.get(xhrArgs);
            
                deferred.then(
                    function(data){
            
                        StatusManager.info(data);
                        
                    },
                    function(error){
            
                        StatusManager.error(error);
                    });
            },
            
            
            deploy: function(item) {

                var xhrArgs = {
                    url: TOMCAT.DEPLOY_APPLICATION + item.buildName + '&war=file:'+ item.id +'/target/' + item.buildName + '.war'
                }
    
                var deferred = xhr.get(xhrArgs);
            
                deferred.then(
                    function(data){
            
                        StatusManager.info(data);
                        
                    },
                    function(error){
            
                        StatusManager.error(error);
                    });

            },
            
            
            
            // private method
            // constructs the url to call
            _construct: function(args) {

                return SettingsManager.protocol
                + SettingsManager.host
                + ":"
                + SettingsManager.port
                + args.action.command
                + args.application;
            }
        };
    });

