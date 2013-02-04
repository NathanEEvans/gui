/*
 * Stormcloud IDE - stormcloud/_base/context
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
define([], 
    function(
        ){
    
        // module       : stormcloud/_base/context
        // 
        // summary      : Defines the application context
        // 
        //
        
        SETTING = {  
    
            API_URL : 'API_URL',
            TOMCAT_HOME : 'TOMCAT_HOME',
            TOMCAT_MANAGER_URL : 'TOMCAT_MANAGER_URL',
            TOMCAT_VIEW_URL : 'TOMCAT_PRIVATE_URL'
        }
    
        return {

            user : null,
            
            // convenience method to get the api url from user settings
            getApiUrl : function(){
            
                return this.getSetting(SETTING.API_URL);
            },
            
            // convenience method to get the 'private' tomcat view url
            // from settings
            getTomcatViewUrl: function(){
                
                return this.getSetting(SETTING.TOMCAT_VIEW_URL);
            },
            
            // convenience method to get the 'private' tomcat manager url
            // from the user settings
            getTomcatManagerUrl : function(){
                
                return this.getSetting(SETTING.TOMCAT_MANAGER_URL);
            },
            
            // generic method to get a user setting based on a
            // SETTING key
            getSetting : function(key){
              
                for(var setting in this.user.settings){
                    
                    for(var x in this.user.settings[setting]){
                    
                        if(x == 'key' && this.user.settings[setting][x] == key){
                            
                            return this.user.settings[setting].value;
                        }
                    }   
                }  
            
                return undefined;
            },
            
            
            /**
             * @todo this is going to move in a treecontext object
             * of some sort.
             */
            // The item currently selected in the tree.
            selectedTreeItem : null,

            // The project in which the selectedTreeItem resides.
            selectedProject : null,

            availableProjects : [],

            // contents of a file busy opening.
            fileContents : null,

            // source and destination for copy action
            copySource : null,
            copyDestination : null,

            // source and destination for move action
            moveSource : null,
            moveDestination : null,

            // Array holding recently opened projects
            recentProjects : new Array(),

            // Array holding any changed / edited files
            changedFiles : new Array()
    
        };

    });
