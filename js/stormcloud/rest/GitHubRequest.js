/*
 * Stormcloud IDE - stormcloud/rest/GitHubRequest
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
    'dojox/encoding/base64'], 
    function(
        base64){

        //
        // module      : stormcloud/rest/GitHubRequest
        // 
        // summary     : 
        // 

        return{
            
            get : function(args){
    
                var userName = settingsManager.getGitHubUser();
                var password = settingsManager.getGitHubPassword();
              
                var str = userName + ':' + password;
            
                var bytes = [];

                for (var i = 0; i < str.length; ++i){
                    bytes.push(str.charCodeAt(i));
                }
        
                var enc = base64.encode(bytes);
                
                args.headers = {
                    Authorization: "Basic " + enc
                };
    
                return dojo.xhr("GET", args);
            }, 
    
            post : function(args){
        
                args.headers = {
                    'Content-Type' : 'application/json'
                };
               
    
                return dojo.xhr("POST", args);
            },
            
            put : function(){
                
                
            },
            
            del : function(args){
                
                var userName = settingsManager.getGitHubUser();
                var password = settingsManager.getGitHubPassword();
              
                var str = userName + ':' + password;
            
                var bytes = [];

                for (var i = 0; i < str.length; ++i){
                    bytes.push(str.charCodeAt(i));
                }
        
                var enc = base64.encode(bytes);
                
                args.headers = {
                    Authorization: "Basic " + enc,
                    'Content-Type' :'application/json'    
                };
                
    
                return dojo.xhr("DELETE", args);
            }
        };
    
    
    });