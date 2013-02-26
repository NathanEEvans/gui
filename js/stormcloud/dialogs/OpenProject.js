/*
 * Stormcloud IDE - stormcloud/dialogs/OpenProject
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
    'dijit/Tree',
    'stormcloud/_base/context',
    'stormcloud/services/filesystem',
    'stormcloud/manager/DialogManager'], 
    function(
        JsonRest,
        ObjectStore,
        TreeStoreModel,
        Tree,
        context,
        filesystem,
        DialogManager){
            
        //
        // module      : stormcloud/dialogs/OpenProject
        // 
        // summary     : 
        //               

        return{
            
            init : function(){
            
                var closedProjectRestStore = new JsonRest({
                
                    target : context.getApiUrl() + '/filesystem/closed'
                });
                    
                
                var closedTreeModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : closedProjectRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                });
       
       
                new Tree({
                    
                    model:closedTreeModel, 
                    showRoot:false, 
                    // tree icon function
                    getIconClass : this.iconClass,
                    // tree double click handler
                    onDblClick : this.openItem
    
                }, 'closedProjectTree');
            
            
            },
            
            
            cancel : function(){
                
                DialogManager.hide(DIALOG.OPEN_PROJECT);
            },
            
            done : function() {
            
                var item = dijit.byId('closedProjectTree').attr('selectedItem');

                filesystem.open(item);
                
                DialogManager.hide(DIALOG.OPEN_PROJECT);            
            },
            
            mayHaveChildren : function(item){
                return false;
            },
            
            iconClass : function(item, opened){
		
                return "projectIcon";
            }
        }
    });

