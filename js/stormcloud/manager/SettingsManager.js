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
define([
    'stormcloud/rest/xhr'], 
    function(
        xhr){
    
        //
        // module       : stormcloud/manager/SettingsManager
        // 
        // summary      : 
        //
        
        
        INFO = {
            
            FULL_NAME : 'FULL_NAME',
            SCREEN_NAME : 'SCREEN_NAME',
            EMAIL_ADDRESS : 'EMAIL_ADDRESS',
            CITY : 'CITY',
            COUNTRY : 'COUNTRY',
            GRAVATAR : 'GRAVATAR',
            JOINED : 'JOINED',
            WEBSITE : 'WEBSITE'
        }
        
        
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
            
            EDITOR_THEME : 'EDITOR_THEME',
            EDITOR_FONT_SIZE : 'EDITOR_FONT_SIZE',
            EDITOR_CODE_FOLDING : 'EDITOR_CODE_FOLDING',
            EDITOR_KEY_BINDINGS : 'EDITOR_KEY_BINDINGS',
            EDITOR_SOFT_WRAP : 'EDITOR_SOFT_WRAP',
            EDITOR_FULL_LINE_SELECT : 'EDITOR_FULL_LINE_SELECT',
            EDITOR_HIGHLIGHT_ACTIVE_LINE : 'EDITOR_HIGHLIGHT_ACTIVE_LINE',
            EDITOR_SHOW_INVISIBLES : 'EDITOR_SHOW_INVISIBLES',
            EDITOR_SHOW_INDENT_GUIDES : 'EDITOR_SHOW_INDENT_GUIDES',
            EDITOR_SHOW_GUTTER : 'EDITOR_SHOW_GUTTER',
            EDITOR_SHOW_PRINT_MARGIN : 'EDITOR_SHOW_PRINT_MARGIN',
            EDITOR_USE_SOFT_TAB : 'EDITOR_USE_SOFT_TAB',
            EDITOR_HIGHLIGHT_SELECTED_WORD : 'EDITOR_HIGHLIGHT_SELECTED_WORD',
            EDITOR_FADE_FOLD_WIDGETS : 'EDITOR_FADE_FOLD_WIDGETS'
            
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
            
            setPreference : function(key, value){
                
                for(var i in this.user.preferences){
                    
                    for(var x in this.user.preferences[i]){
                    
                        if(x == 'key' && this.user.preferences[i][x] == key){
                            
                            this.user.preferences[i].value = value;
                        }
                    }   
                }    
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
            
            getInfo : function(key){
              
                for(var i in this.user.info){
                    
                    for(var x in this.user.info[i]){
                    
                        if(x == 'key' && this.user.info[i][x] == key){
                            
                            return this.user.info[i].value;
                        }
                    }   
                }  
            
                return undefined;
            },
            
            setInfo : function(key, value){
              
                for(var i in this.user.info){
                    
                    for(var x in this.user.info[i]){
                    
                        if(x == 'key' && this.user.info[i][x] == key){
                            
                            this.user.info[i].value = value;
                        }
                    }   
                }  
            },
            
            
            changePassword : function(currentPassword, newPassword){
              
                var xhrArgs = {
                    url: this.getApiUrl() + '/user/password',
                    content : {
                        currentPassword : currentPassword,
                        newPassword : newPassword
                    }
                }
    
                var deferred = xhr.post(xhrArgs);
            
                deferred.then(
                    function(data){
                    
                        if(data == '0'){
                            applicationManager.logout();
                        }else{
                            dojo.byId(changePasswordMessage).innerHTML = data;
                        }
                        
                    },
                    function(error){
            
                        statusManager.error(error);
                    });    
            },
            
            
            deleteAccount : function(){
              
              
              
            },
            
            saveInfo : function(key, value){
                
                var xhrArgs = {
                    url: this.getApiUrl() + '/user/info',
                    content : {
                        key : key,
                        value : value
                    }
                }
    
                var deferred = xhr.post(xhrArgs);
            
                deferred.then(
                    function(data){
                    
                        if(data == '0'){
                            settingsManager.setInfo(key, value);
                        }else{
                            statusManager.error(data);
                        }
                        
                    },
                    function(error){
            
                        statusManager.error(error);
                    });    
              
              
            },
            
            savePreference : function(key, value){
                
                var xhrArgs = {
                    url: this.getApiUrl() + '/user/preference',
                    content : {
                        key : key,
                        value : value
                    }
                }
    
                var deferred = xhr.post(xhrArgs);
            
                deferred.then(
                    function(data){
                    
                        if(data == '0'){
                            settingsManager.setPreference(key, value);
                        }else{
                            statusManager.error(data);
                        }
                        
                    },
                    function(error){
            
                        statusManager.error(error);
                    });    
            }
            
        };

    });
