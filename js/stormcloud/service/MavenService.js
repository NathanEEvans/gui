/*
 * Stormcloud IDE - stormcloud/service/MavenService
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
    'stormcloud/service/LogService',
    'stormcloud/rest/xhr'], 
    function(
        LogService,
        xhr){

        //
        // module   : stormcloud/service/MavenService
        //		
        // summary  :
        //		
        
        var URL = {
      
            MAVEN_EXECUTE : settingsManager.getApiUrl() + '/maven/execute',
            MAVEN_CREATE : settingsManager.getApiUrl() + '/maven/create'
        };
    
    
        var COMMAND = {
        
            INSTALL : 'install',
            CLEAN : 'clean',
            COMPILE : 'compile'
        }

        return{
        
            custom: function(command, item){
              
                statusManager.info('Running Maven command [' + command + ']');
                
                var xhrArgs = {
                    url: URL.MAVEN_EXECUTE,
                    content : {
                        commands : command,
                        filePath : item.id
                    }
                }
    
                var deferred = xhr.post(xhrArgs);
            
                LogService.startMaven();
            
                deferred.then(
                    function(data){
            
                        LogService.stopMaven(data);
                    
                    },
                    function(error){
            
                        statusManager.error(error);
                    });
            },
        
            compile: function(item){
    
                var xhrArgs = {
                    url: URL.MAVEN_EXECUTE,
                    content : {
                        commands : COMMAND.COMPILE,
                        filePath : item.id
                    }
                }
    
                var deferred = xhr.post(xhrArgs);
            
                LogService.startMaven();
            
                deferred.then(
                    function(data){
            
                        LogService.stopMaven(data);
                    
                    },
                    function(error){
            
                        statusManager.error(error);
                    });
            },
    
            clean: function(item){
    
                var xhrArgs = {
                    url: URL.MAVEN_EXECUTE,
                    content : {
                        commands : COMMAND.CLEAN,
                        filePath : item.id
                    }
                }
    
                var deferred = xhr.post(xhrArgs);
            
                LogService.startMaven();
            
                deferred.then(
                    function(data){
            
                        LogService.stopMaven(data);
                    
                    },
                    function(error){
            
                        statusManager.error(error);
                    });
            },
    
            install: function(item){
    
                var xhrArgs = {
                    url: URL.MAVEN_EXECUTE,
                    content : {
                        commands : COMMAND.INSTALL,
                        filePath : item.id
                    }
                }
    
                var deferred = xhr.post(xhrArgs);
            
                LogService.startMaven();
            
                deferred.then(
                    function(data){
            
                        LogService.stopMaven(data);
                    
                    },
                    function(error){
            
                        statusManager.error(error);
                    });
            
            
            },
        
        
            create: function(postData){
    
                statusManager.startProcess('Creating Project');
            
                var xhrArgs = {
                    url: URL.MAVEN_CREATE,
                    handleAs: 'json',
                    postData: dojo.toJson(postData)
                }
    
                var deferred = xhr.post(xhrArgs,'JSON');
            
                LogService.startMaven();
            
                deferred.then(
                    function(data){
            
                        LogService.stopMaven(data);
            
                        if(data == '0'){
            
                            statusManager.stopProcess('Project Created Successfully.');
                            
                            treeManager.refresh('projectTree');
                
                        }else{
            
                            statusManager.error('Failed to create your project. Please review the <a href=\"javascript:alert(\'Open logfile window\');">log</a>');
                        }
            
                        // reset the form
                        var btn = dijit.byId('newProjectOkButton');
                        btn.setAttribute('disabled', true);
                
                        btn = dijit.byId('newProjectCancelButton');
                        btn.setAttribute('label', 'Cancel');
            
                        dojo.forEach(dijit.byId('newProjectForm').getDescendants(), function(widget) {
                            widget.attr('value', null);
                        });  
                    },

                    function(error){
            
                        statusManager.error(error);
                    });
                    
                    
                    
                    
            }
        
        };
    
    });