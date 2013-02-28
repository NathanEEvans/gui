/*
 * Stormcloud IDE - stormcloud/dialogs/Templates
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
        // module      : stormcloud/dialogs/Templates
        // 
        // summary     : 
        //               

        var selected;
        
        return{
            
            init : function(){
            
                // populate the templates tree
                var templateRestStore = new JsonRest({
                
                    target : settingsManager.getApiUrl() + '/filesystem/templates'
              
                });
                
                var templateTreeModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : templateRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                });
       
                new Tree({
                    
                    model:templateTreeModel, 
                    
                    showRoot:false, 
                    // tree icon function
                    getIconClass : fileManager.getIcon,
                    // tree double click handler
                    onDblClick : this.openItem,
                    // tree click
                    onClick : this.templateTreeOnClick
    
                }, 'templateTree');
            
            },
            
            
            cancel : function(){
              
                dialogManager.hide(DIALOG.TEMPLATES);
              
            },
            
            templateTreeOnClick : function(item){
              
                selected = item;
            },
            
            
            openItem : function(item, opened){
                
                
                fileManager.get(item, false);
                
                dialogManager.hide(DIALOG.TEMPLATES);
            },
            
            done : function() {
                
                fileManager.get(selected, false);
                
                // hide the dialog
                dialogManager.hide(DIALOG.TEMPLATES);
            },
            
            mayHaveChildren : function(item){
               
                if(item.children.length == 0){
                    return false;
                }else{
                    return true;
                }
            }
        }
            
    });
