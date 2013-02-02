/*
 * Stormcloud IDE - stormcloud/rest/request
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
    'dojo/request/xhr'], 
    function(
        xhr){

        //
        // module      : stormcloud/rest/xhr
        // 
        // summary     : 
        // 
        // description : 
        //               

        return{

            get : function(args){
    
    
                xhr(args.url, {
                    
                    method : 'GET'
                    
                }).then(function(data){
                    
                    alert(data);
                    
                }, function(err){
        
                    alert(err);
            
                }, function(evt){
                    
                    //
                    });
    
                
            }

        }
    });

