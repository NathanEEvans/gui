/*
 * Stormcloud IDE - stormcloud/auth
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
    'dojox/encoding/base64',
    'stormcloud/rest/xhr',
    'stormcloud/manager/SettingsManager'], 
    function(
        base64,
        xhr,
        SettingsManager){

        //
        // module   : stormcloud/auth
        //		
        // summary  :
        //		
    
        return{
    
    
            send: function(user, pass){
        
                var str = user + ':' + pass;
            
                var bytes = [];

                for (var i = 0; i < str.length; ++i){
                    bytes.push(str.charCodeAt(i));
                }
        
                var enc = base64.encode(bytes);
                
                var xhrArgs = {
                
                    url: 'http://' + window.location.host + '/stormcloud/api/login',
                    headers: {
                        Authorization: "Basic " + enc
                    },
                    load: function(data, ioargs){
                    
                        switch(ioargs.xhr.status ){
                            case 200:
                                document.location = 'http://' + window.location.host;
                                break;
                        }
                    },
                    error: function(error, ioargs){
                    
                        var message = "We do not recognize you as a registered user.";
                        var statusBar = document.getElementById('statusMessage');
                        statusBar.style.color = 'red';
                        statusBar.innerHTML = message;
                    }
                };
            
                dojo.xhrPost(xhrArgs);
            },
        
            // Make a call to get the user
            //
            verify : function(){
                
                // declare the settingsManager global
                settingsManager = SettingsManager;
                
                xhr.get({
                    url: 'http://' + window.location.host + '/stormcloud/api/user',
                    sync: true,
                    load: function(data, ioargs) {
            
                        var code = ioargs.xhr.status; 
                    
                        if(code == 200){
                        
                            // success, set the user in context
                            settingsManager.user = JSON.parse(data);
                            
                        }else{
                            
                            document.location = 'http://' + window.location.host + '/login.html'; 
                        }
                    },
                    error: function(error, ioargs){
            
                        document.location = 'http://' + window.location.host + '/login.html'; 
                        
                    }          
                });
            }
        };
    });