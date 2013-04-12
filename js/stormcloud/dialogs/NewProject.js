/*
 * Stormcloud IDE - stormcloud/dialogs/NewProject
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
    'stormcloud/service/MavenService'], 
    function(
        JsonRest,
        ObjectStore,
        TreeStoreModel,
        Tree,
        MavenService){
        
        //
        // module      : stormcloud/dialogs/NewProject
        // 
        // summary     : 
        //               

        return{
    
            init : function(){
                
               
                var archetypeRestStore = new JsonRest({
                
                    target : settingsManager.getApiUrl() + '/maven/archetypes'
                });
                
                var archetypeTreeModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : archetypeRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                });
       
                new Tree({
                    
                    model:archetypeTreeModel, 
                    showRoot:false, 
                    // tree icon function
                    getIconClass : this.iconClass,
                    // tree double click handler
                    onDblClick : this.openItem,
                    // tree click
                    onClick : this.onClick
    
                }, 'archetypeTree');
                
                
            },
            
            onClick : function(item){
              
                dojo.byId('archetypeGroupId').innerHTML = item.groupId;
                dojo.byId('archetypeArtifactId').innerHTML = item.artifactId;
                dojo.byId('archetypeVersion').innerHTML = item.version;
                dojo.byId('archetypeDescription').innerHTML = item.description;

                dojo.byId('archetypeGroupId2').innerHTML = item.groupId;
                dojo.byId('archetypeArtifactId2').innerHTML = item.artifactId;
                dojo.byId('archetypeVersion2').innerHTML = item.version;
                dojo.byId('archetypeDescription2').innerHTML = item.description;
            },
            
            done : function() {
            
                var data = {
                    archetypeGroupId : dojo.byId('archetypeGroupId').innerHTML,
                    archetypeArtifactId : dojo.byId('archetypeArtifactId').innerHTML,
                    archetypeVersion : dojo.byId('archetypeVersion').innerHTML,
                    projectName : projectName.value,
                    groupId : groupId.value,
                    artifactId : artifactId.value,
                    description : description.value,
                    version : version.value,
                    javaPackage : javaPackage.value
                };
            
            
                MavenService.create(data);
            
                dialogManager.hide(DIALOG.NEW_PROJECT);
                dijit.byId('newProjectWizard').selectChild('step1');
            
            },
            
            
            cancel : function(){
              
                dialogManager.hide(DIALOG.NEW_PROJECT);
              
                dijit.byId('newProjectWizard').selectChild('step1');
            },
            
            mayHaveChildren : function(item){
                return false;
            },
            
            iconClass : function(item, opened){
                return 'projectIcon';
            }
    
        }

    });