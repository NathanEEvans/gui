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
    'stormcloud/gui/state/projects',
    'stormcloud/services/maven'], 
    function(
        projects,
        maven){
   
        // module      : stormcloud/manager/MavenManager
        // 
        // summary     :
        //		
        //		
        
        var commands = {};
   
        return{
            
            lastCommand : '',
            
            run : function(command){
                
                this.lastCommand = command;
                
                maven.custom(command, projects.selected);
            },
            
            runLastCommand : function(){
                
                if(this.lastCommand != ''){
                    maven.custom(this.lastCommand, projects.selected);
                }    
            },
            
            
            compile : function(){
              
                this.run('compile');
                
            },
            
            clean : function(){
                
                this.run('clean');
            },
            
            install : function(){
              
                this.run('install');
              
            },
            
            save : function(command, name){
                
                this.commands[name] = command;
            },
            
            getSavedCommands : function(){
                
                return this.commands;
            }
            
        }
        
    });
