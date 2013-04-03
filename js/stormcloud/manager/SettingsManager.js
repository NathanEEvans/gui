/*
 * Stormcloud IDE - stormcloud/manager/SettingsManager
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
    function(){
    
        //
        // module       : stormcloud/manager/SettingsManager
        // 
        // summary      : 
        //
        
        SETTING = {  
    
            API_URL : 'API_URL',
            GITHUB_API_URL : 'GITHUB_API_URL', 
            PROJECT_FOLDER : 'PROJECT_FOLDER',
            CLOSED_PROJECTS_FOLDER : 'CLOSED_PROJECTS_FOLDER',
            TOMCAT_HOME : 'TOMCAT_HOME',
            TOMCAT_MANAGER_URL : 'TOMCAT_MANAGER_URL',
            TOMCAT_VIEW_URL : 'TOMCAT_PRIVATE_URL'
        }
        
        PREFERENCE = {
            
            SHOW_WELCOME_TAB : 'SHOW_WELCOME_TAB',
            SYNC_EDITOR_VIEWS : 'SYNC_EDITOR_VIEWS',
            GITHUB_USER : 'GITHUB_USER',
            GITHUB_PASSWORD : 'GITHUB_PASSWORD'
            
        }
    
        return {

            // The user object retrieved from the server on
            // succesfull auth verification
            user : null,
            
            // convenience method to get the api url from user settings
            getApiUrl : function(){
            
                return 'https://' + window.location.host + this.getSetting(SETTING.API_URL);
            },
            
            // convenience method to get the users project folder
            getProjectFolder : function(){
              
                return this.getSetting(SETTING.PROJECT_FOLDER);
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
            
            getGitHubApiUrl : function(){
              
                return this.getSetting(SETTING.GITHUB_API_URL);    
            },
            
            getGitHubUser : function(){
                
                return this.getPreference(PREFERENCE.GITHUB_USER);
            },
            
            
            getGitHubPassword : function(){
              
                return this.getPreference(PREFERENCE.GITHUB_PASSWORD);
            },
            
            getPreference : function(key){
                
                // summary : Get a User preference based on the given key
                
                for(var preference in this.user.preferences){
                    
                    for(var x in this.user.preferences[preference]){
                    
                        if(x == 'key' && this.user.preferences[preference][x] == key){
                            
                            return this.user.preferences[preference].value;
                        }
                    }   
                }  
            
                return undefined;
              
            },
            
            getSetting : function(key){
              
                // summary : Get a User setting based on the given key
              
                for(var setting in this.user.settings){
                    
                    for(var x in this.user.settings[setting]){
                    
                        if(x == 'key' && this.user.settings[setting][x] == key){
                            
                            return this.user.settings[setting].value;
                        }
                    }   
                }  
            
                return undefined;
            },
            
            savePreference : function(key, value){
                
                console.info('set ' + key + ' = ' + value );
                
                
            }
            
        };

    });
