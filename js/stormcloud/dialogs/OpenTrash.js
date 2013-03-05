/*
 * Stormcloud IDE - stormcloud/dialogs/OpenTrash
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
    'dojo/store/JsonRest',
    'dojo/data/ObjectStore',
    'dijit/tree/TreeStoreModel',
    'dijit/Tree'], 
    function(
        JsonRest,
        ObjectStore,
        TreeStoreModel,
        Tree){
            
        //
        // module      : stormcloud/dialogs/OpenTrash
        // 
        // summary     : 
        //               

        return{
            
            init : function(){
            
                var trashRestStore = new JsonRest({
                
                    target : settingsManager.getApiUrl() + '/filesystem/trash'
                });
                    
                
                var trashTreeModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : trashRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                });
       
       
                new Tree({
                    
                    model:trashTreeModel, 
                    showRoot:false, 
                    // tree icon function
                    getIconClass : fileManager.getIcon,
                    onDblClick : this.restore
                
                }, 'trashTree');
            
            
            },
            
            restore : function(item){
              
              
                var restore = confirm("Do you want to restore " + item.label + " from the Trash?");
                    
                if(restore == true){
               
                    console.info('move ' + item.id + ' to projects');
               
                }
              
            },
            
            empty : function(){
              
              
                fileManager.emptyTrash();
                
                dialogManager.hide(DIALOG.OPEN_TRASH);
            },
            
            iconClass : function(item, opened){
		
                return "projectIcon";
            },
            
            mayHaveChildren : function(item){
                return false;
            }
        }
    });

