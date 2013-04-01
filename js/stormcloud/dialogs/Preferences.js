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


                    dojo.byId('preferencesAvatar').src = settingsManager.user.gravatar;
                    
                    dojo.byId('preferencesFullName').innerHTML = settingsManager.user.fullName;
                    
                    dojo.byId('preferencesUserName').innerHTML = settingsManager.user.userName;
                    
                    dojo.byId('preferencesEmail').innerHTML = settingsManager.user.emailAddress;
                    
                    dojo.byId('preferencesCity').innerHTML = settingsManager.user.city 
                    
                    dojo.byId('preferencesCountry').innerHTML = settingsManager.user.country
                    
                    dojo.byId('preferencesJoined').innerHTML = settingsManager.user.joined;
                
                   
                   
                   
                   
                });
                
            },
            
            close : function(){
              
                dialogManager.hide(DIALOG.PREFERENCES);
            }
        }
    });