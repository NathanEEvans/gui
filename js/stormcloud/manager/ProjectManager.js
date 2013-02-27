/*
 * Stormcloud IDE - stormcloud/manager/ProjectManager
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
    'stormcloud/manager/SettingsManager'], 
    function(
        SettingsManager){
            
        //
        // module   : stormcloud/manager/ProjectManager
        //		
        // summary  :
        //		


        return {
        
            selected : null,
        
            close : function(){
              
              
              
              
            },
        
        
        
            setSelected : function(item){
            
                // summary : set the currently selected project based on a 
                //           selected item in the project tree
                
                if(item.type =='project' || item.type == 'closedProject'){
            
                    this.selected = item;
                    
                }else{
                    
                    var path = item.id;
                
                    // chop off the project folder
                    var s = path.replace(SettingsManager.getProjectFolder() + '/','');
                
                    var project = SettingsManager.getProjectFolder() + '/' + s.substring(0,s.indexOf('/'));
                
                    var selectedTree = dijit.byId('projectTree');
                
                    var node = selectedTree._itemNodesMap[project];
                
                    this.selected = node[0].item;                
                }
            }
        };
        
    });