/*
 * Stormcloud IDE - stormcloud/dialogs/NewFile
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
    'dijit/Dialog',
    'dijit/form/ComboBox',
    'dijit/form/ValidationTextBox'], 
    function(
        JsonRest,
        ObjectStore,
        TreeStoreModel,
        Tree,
        Dialog,
        ComboBox,
        ValidationTextBox){
            
        //
        // module      : stormcloud/dialogs/NewFile
        // 
        // summary     : 
        //               

        var extension;
        var type;
        var template;
        
        return{
            
            init : function(){
            
                // populate the templates tree
                var fileRestStore = new JsonRest({
                
                    target : settingsManager.getApiUrl() + '/filesystem/templates'
              
                });
                
                var fileTreeModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : fileRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                });
       
                new Tree({
                    
                    model:fileTreeModel, 
                    
                    showRoot:false, 
                    // tree icon function
                    getIconClass : fileManager.getIcon,
                    // tree click
                    onClick : this.fileTreeOnClick
    
                }, 'fileTree');
            
                var availableProjectStore = new JsonRest({
                    
                    target : settingsManager.getApiUrl() + '/filesystem/projects/available'
                });
                
                new ComboBox({
                    
                    store: availableProjectStore,
                    searchAttr: 'label',
                    onChange : this.comboOnChange,
                    required : true
                    
                }, 'projectSelector');
            
            
                new ValidationTextBox({
            
                    id: 'fileName',
                    required : true,
                    onChange : this.fileNameOnChange
                    
                }, 'fileName');
            
            },
            
            fileNameOnChange : function(newValue){
                
                if(type == 'folder'){
               
                    dojo.byId('createdFile').value = newValue;
               
                }else{
                
                    dojo.byId('createdFile').value = newValue + extension;
                }
            },
            
            comboOnChange: function(newValue){
                
                dojo.byId('projectName').value = newValue;
            },
            
            
            fileTreeOnClick : function(item){
              
                dojo.byId('fileDescription').innerHTML = item.description;
                
                var regex = /(?:\.([^.]+))?$/;
              
                extension = '.' + regex.exec(item.label)[1];
                template = item.id;
                type = item.type;
                
            },
            
            
            browse : function(){
                
                
                var folderPicker = new Dialog({
                    
                    id : 'folderPicker',
                    title: 'Pick a folder',
                    content: '<div id="folderPickerTree"></div>',
                    style: "width: 300px"
                
                });
                
                var folderPickerRestStore = new JsonRest({
                
                    target : settingsManager.getApiUrl() + '/filesystem/folderpicker?filePath=' + settingsManager.getProjectFolder() + '/' + dojo.byId('projectName').value
              
                });
                
                var folderPickerTreeModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : folderPickerRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                });
       
                new Tree({
                    
                    model:folderPickerTreeModel, 
                    persist : false,
                    showRoot:false, 
                    // tree icon function
                    getIconClass : fileManager.getIcon,
                    // tree double click handler
                    onDblClick : this.openItem,
                    // tree click
                    onClick : this.folderPickerTreeOnClick
    
                }, 'folderPickerTree');
            
                
                
                folderPicker.show();    
              
            },
            
            // folder has been selected
            folderPickerTreeOnClick : function(item){
              
                // set the selected path
                dojo.byId('filePath').value = item.id;
                
                
                // update the created file preview  
                if(type == 'folder'){
                
                    dojo.byId('createdFile').value = item.id + '/' + dojo.byId('fileName').value;
                
                }else{
                    
                    dojo.byId('createdFile').value = item.id + '/' + dojo.byId('fileName').value + extension;
                }
              
                // destory the folder picker and components
                dijit.byId('folderPicker').destroyRecursive();
            },
            
            done : function() {
            
                // create the file item
                var item = {
                    
                    id : dojo.byId('createdFile').value,
                    label : dojo.byId('fileName').value + extension,
                    type : type,
                    template : template
                     
                    
                };
                
                fileManager.create(item);
                
                // hide the dialog
                dialogManager.hide(DIALOG.NEW_FILE);
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
