/*
 * Stormcloud IDE - stormcloud/dialogs/Preferences
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
    'dojo/ready'], 
    function(
        ready){
        
        //
        // module      : stormcloud/dialogs/Preferences
        // 
        // summary     : 
        //               

        return{
    
            init : function(){
                
                ready(function() {

                    dojo.byId('gitHubSettingsUserName').value = settingsManager.getGitHubUser();                
                    dojo.byId('gitHubSettingsPassword').value = settingsManager.getGitHubPassword();
                });
                
            },
            
            
            verifyGitHubCredentials : function(){
              
                var credentials = {
                  
                    user : dojo.byId('gitHubSettingsUserName').value,
                    pass : dojo.byId('gitHubSettingsPassword').value    
                }
              
                gitHubManager.verify(credentials);
              
            },
            
            close : function(){
              
                dialogManager.hide(DIALOG.PREFERENCES);
            }
        }
    });