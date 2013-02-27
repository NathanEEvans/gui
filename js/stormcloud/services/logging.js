/*
 * Stormcloud IDE - stormcloud/services/logging
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
    'stormcloud/manager/StatusManager',
    'stormcloud/rest/xhr',
    'stormcloud/manager/AnnotationManager'],
    function(
        SettingsManager,
        StatusManager,
        xhr,
        AnnotationManager){
   
        //
        // module      : stormcloud/services/logging
        // 
        // summary     : 
        //               

   
        var CONSTANTS = {
   
            MAVEN_LOG : SettingsManager.getApiUrl() + '/log/maven',
            TOMCAT_LOG : SettingsManager.getApiUrl() + '/log/tomcat'
            
        }
   
        var Poll = function(pollFunction, intervalTime) {
    
            var intervalId = null;

            this.start = function(newPollFunction, newIntervalTime) {
                pollFunction = newPollFunction || pollFunction;
                intervalTime = newIntervalTime || intervalTime;

                if ( intervalId ) {
                    this.stop();
                }

                intervalId = setInterval(pollFunction, intervalTime);
            };

            this.stop = function() {
                clearInterval(intervalId);
            };
        };
   
        var p;
       
        return {
       
            startTomcatDeploy : function(){
              
                StatusManager.showProgress();
                StatusManager.info('Deploying Project');
           
                // switch to tomcat window
                // get handle on the correct tab
                var tabs = dijit.byId('logTabs');
                var tab = dijit.byId('tomcatLogTab');
                tabs.selectChild(tab);
                
                p = new Poll(function() {
                
                    xhr.get({
                        url: CONSTANTS.TOMCAT_LOG,
                        load: function(data) {
            
                            var logWindow = document.getElementById('tomcatLogWindow');
                        
                            logWindow.value = data; 
                        
                            logWindow.scrollTop = logWindow.scrollHeight;
                        }
                    });
                
                }, 100);
            
                p.start();
           
            },
        
            stopTomcatDeploy: function(){
           
                p.stop();
          
                StatusManager.hideProgress();
                StatusManager.clear();
            
                var failed = false
            
                if(data != '0'){
                
                    // failure
                    failed = true;
                }
          
                xhr.get({
                    url: CONSTANTS.TOMCAT_LOG,
                    load: function(data) {
            
                        var logWindow = document.getElementById('tomcatLogWindow');
                        
                        logWindow.value = data; 
                        logWindow.scrollTop = logWindow.scrollHeight;
                    
                    
                        if(failed){
                            var lines = document.getElementById('tomcatLogWindow').value.split('\n');

                            for(var line in lines){
                        
                                if(lines[line].lastIndexOf('ERROR', 0) === 0){
                                    alert(lines[line]);
                                }
                            }
                        }
                    
                    }
                });
          
            
           
            },
       
       
            startMaven : function(){
           
                StatusManager.showProgress();
                StatusManager.info('Maven Running');
       
                // get handle on the correct tab
                var tabs = dijit.byId('logTabs');
                var tab = dijit.byId('mavenLogTab');
                tabs.selectChild(tab);
                    
                // start log polling
                p = new Poll(function() {
                
                    xhr.get({
                        url: CONSTANTS.MAVEN_LOG,
                        load: function(data) {
            
                            // write result to the logwindow
                            var logWindow = document.getElementById('mavenLogWindow');
                        
                            logWindow.value = data; 
                        
                            logWindow.scrollTop = logWindow.scrollHeight;
                        }
                    });
                
                }, 1000);
            
                p.start();
            },
       
            stopMaven : function(data){
           
                p.stop();
          
                StatusManager.hideProgress();
                StatusManager.clear();
            
                var failed = false
            
                if(data != '0'){
                
                    // failure
                    failed = true;
                }
          
                xhr.get({
                    url: CONSTANTS.MAVEN_LOG,
                    load: function(data) {
            
                        var logWindow = document.getElementById('mavenLogWindow');
                        
                        logWindow.value = data; 
                        logWindow.scrollTop = logWindow.scrollHeight;
                    
                        if(failed){
                    
                            var lines = document.getElementById('mavenLogWindow').value.split('\n');

                            var annotationLines = new Array();

                            for(var line in lines){
                        
                                if(lines[line].startsWith('[ERROR]')){
                                    
                                    var contains = false;
                                    // put the line in the annotation array
                                    // when not already in there
                                    for (var i = 0; i < annotationLines.length; i++) {
              
                                        if(annotationLines[i] == lines[line]){
                                            contains=true;
                                            break;
                                        }                              
                                    }
                                        
                                    if(!contains){
                                        annotationLines.push(lines[line]);
                                    }
                                }
                            }
                            
                            // process annotations
                            AnnotationManager.process(annotationLines);                              
                        }
                    }
                });
            }
        }
    });