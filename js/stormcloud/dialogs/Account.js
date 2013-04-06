/*
 * Stormcloud IDE - stormcloud/dialogs/Account
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
    'dojo/ready',
    'dijit/Dialog',
    'stormcloud/rest/xhr'], 
    function(
        ready,
        Dialog,
        xhr){
        
        //
        // module      : stormcloud/dialogs/Account
        // 
        // summary     : 
        //               

        return{
    
            init : function(){
                
                ready(function() {


                    dojo.byId('accountUserName').innerHTML = settingsManager.user.userName;
                    dojo.byId('accountAvatar').src = settingsManager.getInfo(INFO.GRAVATAR);
                    dojo.byId('FULL_NAME_Value').value = settingsManager.getInfo(INFO.FULL_NAME);
                    dojo.byId('EMAIL_ADDRESS_Value').value = settingsManager.getInfo(INFO.EMAIL_ADDRESS);
                    dojo.byId('CITY_Value').value = settingsManager.getInfo(INFO.CITY); 
                    dojo.byId('COUNTRY_Value').value = settingsManager.getInfo(INFO.COUNTRY);
                    
                    
                    var joined = settingsManager.getInfo(INFO.JOINED);
                    var joinedDate = new Date(Date.parse(joined.replace(/-/g, " ")));
                                
                    dojo.byId('accountJoined').innerHTML = joinedDate;
                
                    var codersList = dojo.byId('codersList');
                    
                    xhr.get({
                        url: settingsManager.getApiUrl() + '/user/coders',     
                        load: function(data) {
            
                            var coders = JSON.parse(data);
            
                            for(var i=0; i < coders.length; i++){
                                
                                
                                var coder = document.createElement('div');
                                coder.className = 'coderEntry';
                                
                                var date = coders[i].lastSeen;
                                date = new Date(Date.parse(date.replace(/-/g, " ")));
                                
                                var lastSeen = coders[i].lastSeen == null ? 'Has not been around yet. ' : 'Last seen on ' + date;
                                
                                coder.innerHTML = '<img src="' + coders[i].gravatar + '" width="22px" height="22px"><div class="name">' 
                                + coders[i].userName + '</div><div class="place"> from ' 
                                + coders[i].homeTown + ', ' + coders[i].country + '. ' + lastSeen + '</div>';
                             
                                codersList.appendChild(coder);
                            }
                        }
                    });
                   
                });
            },
            
            
            save : function(key, value){
                
                settingsManager.saveInfo(key, value);
            },
            
            
            
            deleteAccount : function(){
              
                settingsManager.deleteAccount();
            },
            
            close : function(){
              
                dialogManager.hide(DIALOG.ACCOUNT);
            }
        }
    });