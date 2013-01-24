/*
 * Stormcloud IDE - stormcloud/_base/context
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
    
        // module       : stormcloud/_base/context
        // 
        // summary      : Defines the application context
        // 
        // description  : This module defines the application wide scope contextual variables:
        //		
        //		- Stormcloud API Base URL
        //		- Loaded Projects
        //		- ...
    
        return {
    

            credentials:function(){
                
                /**
                 * create some way where to get the creds from
                 */
                
                return base64.encode('martijn:1');
                
            }

        }
       
   
    });

