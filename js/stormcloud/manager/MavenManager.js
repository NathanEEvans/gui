/*
 * Stormcloud IDE - stormcloud/manager/MavenManager
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
    'stormcloud/services/maven'], 
    function(
        maven){
   
        // module      : stormcloud/manager/MavenManager
        // 
        // summary     :
        //		
        //		
   
   
        return{
            
            command : '',
            
            run : function(command){
                
                this.command = command;
                
                maven.custom(command, dijit.byId('projectTree').attr('selectedItem'));
            },
            
            runLastCommand : function(){
                
                if(this.command != ''){
                    maven.custom(this.command, dijit.byId('projectTree').attr('selectedItem'));
                }    
            }
        }
        
    });
