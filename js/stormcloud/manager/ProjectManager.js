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
    'stormcloud/service/FilesystemService'], 
    function(
        filesystemService){
            
        //
        // module   : stormcloud/manager/ProjectManager
        //		
        // summary  : Manager for Project handling
        //		


        return {
        
            // the currently selected project
            selected : null,
            mainProject : null,
        
            init : function(){
              
                // summary : Get the initial selected project from cookie
                //           and set it as selected
            
                // check if there is a project marked as main project
                var id = cookieManager.get('mainProject');
            
                if(id){
            
                    // get the node from the tree
                    var node = treeManager.getNode('projectTree', id);
                    
                    if(node){
                        
                        // if found set it as selected project
                        this.selected = node[0].item;
                        
                        // and mark it as main project in the tree
                        treeManager.markMain('projectTree', node[0].item);
                        
                        // and set it as main project
                        this.mainProject = this.selected;
                    }
                    
                }else{
                    
                // no known main project, take the first in the tree, if any,
                // as the selected project
                    
                }
            
            
              
            },
        
            setMainProject : function(){
              
                // summary : Mark the currently selected project as mainProject
              
                // check if there is a current main project
                if(this.mainProject){
                    // unmark it
                    treeManager.unmarkMain('projectTree', this.mainProject);
                }
              
                // set the currently selected as main 
                this.mainProject = this.selected;
              
                // set a cookie for future reference
                cookieManager.set('mainProject', this.selected.id);
                
                // mark it main in the tree
                treeManager.markMain('projectTree', this.selected);
            },
        
            open : function(item){
            
                // summary : Open a project if the item represents
                //           an actually closed project    
            
                if(item.type == 'closedProject'){
            
                    filesystemService.open(item);
                }
            },
            
            close : function(item){
            
                //
            
                if(item.type=='project'){
                  
                    filesystemService.close(item);
                }
              
              
            },
        
            setSelected : function(item){
            
                // summary : set the currently selected project based on a 
                //           selected item in the project tree
                
                if(item.type =='project' || item.type == 'closedProject'){
            
                    this.selected = item;
                    
                }else{
                    
                    var path = item.id;
                
                    // chop off the project folder
                    var s = path.replace(settingsManager.getProjectFolder() + '/','');
                
                    var project = settingsManager.getProjectFolder() + '/' + s.substring(0,s.indexOf('/'));
                
                    var selectedTree = dijit.byId('projectTree');
                
                    var node = selectedTree._itemNodesMap[project];
                
                    this.selected = node[0].item;                
                }
            }
        };
        
    });
