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
    'stormcloud/_base/context',
    'stormcloud/gui/statusbar',
    'stormcloud/rest/xhr'], 
    function(
        context,
        statusbar,
        xhr){
   
        //
        // module      : stormcloud/services/logging
        // 
        // summary     : 
        // 
        // description : 
        //              
        //               

   
        var CONSTANTS = {
   
            MAVEN_LOG : context.getApiUrl() + 'log/maven',
            TOMCAT_LOG : context.getApiUrl() + 'log/tomcat'
            
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
              
                statusbar.showProgress();
                statusbar.infoStatus('Deploying Project');
           
                // switch to tomcat window
                
                p = new Poll(function() {
                
                    xhr.get({
                        url: CONSTANTS.TOMCAT_LOG,
                        load: function(data) {
            
                            var logWindow = document.getElementById('tomcatLogWindow');
                        
                            logWindow.value = data; 
                        
                            logWindow.scrollTop = logWindow.scrollHeight;
                        }
                    });
                
                }, 1000);
            
                p.start();
           
              
              
            },
        
            stopTomcatDeploy: function(){
           
                p.stop();
          
                statusbar.hideProgress();
                statusbar.clearStatus();
            
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

                            for(line in lines){
                        
                                if(lines[line].lastIndexOf('ERROR', 0) === 0){
                                    alert(lines[line]);
                                }
                            }
                        }
                    
                    }
                });
          
            
           
            },
       
       
            startMaven : function(){
           
                statusbar.showProgress();
                statusbar.infoStatus('Maven Running');
           
                p = new Poll(function() {
                
                    xhr.get({
                        url: CONSTANTS.MAVEN_LOG,
                        load: function(data) {
            
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
          
                statusbar.hideProgress();
                statusbar.clearStatus();
            
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

                            for(line in lines){
                        
                                if(lines[line].lastIndexOf('[ERROR]', 0) === 0){
                                    alert(lines[line]);
                                }
                            }
                        }
                    
                    }
                });
          
            }
       
        }
   
   
    
    });
