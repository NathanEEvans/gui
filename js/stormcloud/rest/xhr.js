/*
 * Stormcloud IDE - stormcloud/rest/xhr
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
    'stormcloud/encoding/base64'], 
    function(
        base64){

        //
        // module      : stormcloud/rest/xhr
        // 
        // summary     : 
        // 
        // description : 
        //               

        return{
            
            get : function(args){
    
                // @todo make them cookies work
                // dojo.require('dojo.cookie');
            
                var str = 'martijn:1';
            
                var enc = base64.encode(str);
        
                args.headers = {
                    Authorization : 'Basic ' + enc
                };
               
                return dojo.xhr("GET", args);
            }, 
    
            post : function(args, contentType){
    
                var str = 'martijn:1';
            
                var enc = base64.encode(str);
        
                var conType;
            
                if(contentType == 'JSON'){
                    conType = 'application/json';
                }else{
                    conType = 'application/x-www-form-urlencoded';
                }
        
                args.headers = {
                    Authorization : 'Basic ' + enc,
                    'Content-Type' : conType
                };
               
    
                return dojo.xhr("POST", args);
            },
            
            put : function(){
                
                
            },
            
            del : function(){
                
                
            }
        };
    
    
    });