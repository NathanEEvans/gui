/*
 * Stormcloud IDE - stormcloud/manager/CookieManager
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
    'dojo/cookie'], 
    function(
        cookie){
            
        //
        // module   : stormcloud/manager/CookieManager
        //		
        // summary  :
        //		

        return {


            set : function(name, value){

                // summary : Set a cookie with default expiry
                //           of 30 days
                
                cookie(name, value, {
                    expires : 30
                });
            },
            
            get : function(name){

                // summary : Retrieve a cookie value
                
                return cookie(name);
            },
            
            
            destroy : function(name){
                
                cookie(name, null, {
                    expires: -1
                });
            }
            
            
        }
    });