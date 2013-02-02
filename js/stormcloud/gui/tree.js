/*
 * Stormcloud IDE - stormcloud/gui/tree
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
    'dijit/registry',
    'dojo/store/JsonRest',
    'dojo/data/ObjectStore',
    'dijit/tree/TreeStoreModel',
    'dijit/Tree',
    'stormcloud/_base/context',
    'stormcloud/services/filesystem'], 
    function(
        registry,
        JsonRest,
        ObjectStore,
        TreeStoreModel,
        Tree,
        context,
        filesystem){

        // module:
        //		stormcloud/gui/tree
        // summary:
        //		
        // description:
        //		
        //		
        
        return{

            initialize : function(){
            
            
                // create project tree
                var projectRestStore = new JsonRest({
                
                    target : context.getApiUrl() + 'filesystem/opened'
                });
                    
                
                var treeModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : projectRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                });
       
       
                var projectTree = new Tree({
                    
                    model:treeModel, 
                    persist:true, 
                    showRoot:false, 
                    openOnDblClick:true, 
                    // tree icon function
                    getIconClass : this.iconClass,
                    // tree double click handler
                    onDblClick : this.openItem
    
                }, 'projectTree');
                
                
                // create filesystem tree
                var filesystemRestStore = new JsonRest({
                
                    target : context.getApiUrl() + 'filesystem/bare'
                });
                    
                
                var filesystemModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : filesystemRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                    
                });
                
                var filesystemTree = new Tree({
                    
                    model:filesystemModel, 
                    persist:true, 
                    showRoot:false, 
                    openOnDblClick:true, 
                    // tree icon function
                    getIconClass : this.iconClass,
                    // tree double click handler
                    onDblClick : this.openItem
    
                }, 'filesystemTree');
                
                // create services tree
                var servicesRestStore = new JsonRest({
                
                    target : context.getApiUrl() + 'services'
                });
                   
                var servicesTreeModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : servicesRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                    
                });

                var servicesTree = new Tree({
                    
                    model:servicesTreeModel, 
                    persist:true, 
                    showRoot:false, 
                    openOnDblClick:true, 
                    // tree icon function
                    getIconClass : this.iconClass,
                    // tree double click handler
                    onDblClick : this.openItemReadonly
    
                }, 'servicesTree');
            
                this.bindContextMenus(projectTree);
                this.bindContextMenus(filesystemTree);    
                this.bindContextMenus(servicesTree);
                
            },

            mayHaveChildren : function(item){
    
                if(item.children.length == 0){
                    return false;
                }else{
                    return true;
                }
            },


            bindContextMenus : function(widget){
    
                console.info('Binding menus');
    
                var menus = {
                    tomcat : registry.byId('tomcatMenu'),
                    tomcatWebApps : registry.byId('tomcatWebAppsMenu'),
                    tomcatApp : registry.byId('tomcatAppMenu'),
                    folder : registry.byId('filesystemMenu'),
                    project : registry.byId('projectMenu')
                };

    
                widget.onOpen = function(item, node) {

                    function bindProperMenu(node, item){

                        console.info('Check binding for type '+item.type);

                        for(var menu in menus){    
                            menus[menu].unBindDomNode(node);
                        }

                        if (item.type){

                            var menuType = menus[item.type];

                            if(menuType){
                                menuType.bindDomNode(node);                            
                            }
                        }
                    }

                    var children = node.containerNode.childNodes;
                    var n = children.length;
                    var thisWidget;

                    while(n--){

                        thisWidget = dijit.getEnclosingWidget(children[n]);
                        bindProperMenu(thisWidget.domNode, thisWidget.item);
                    }

                    if (!item.root){
                        bindProperMenu(node.domNode, item);
                    }
                }
            },
            
            // @todo revise the following methods.
            // setSelectedTreeItem 
            // setCopySource
            // setMoveSource
            // setDestination
            setSelectedTreeItem : function(){
    
                // set the selected item
                context.selectedTreeItem = dijit.byId('projectTree').attr('selectedItem');
    
                // set the selected project in which the selected item resides
                var item = context.selectedTreeItem.id;
    
                // @todo bug: this does not always capture the correct project
                var pattern = /^([/](\w*\s*)*[/](\w*\s*)*[/](\w*\s*)*)/i;
    
                context.selectedProject = item.match(pattern)[1];
            },
            
            setCopySource : function(){
                context.copySource = dijit.byId('projectTree').attr('selectedItem');
                dijit.byId('paste').attr('disabled',false);
            },
            
            setMoveSource : function(){
                context.moveSource = dijit.byId('projectTree').attr('selectedItem');
                dijit.byId('paste').attr('disabled',false);
            },
            
            setDestination : function(){
    
                if(context.copySource == null){
    
                    context.moveDestination = dijit.byId('projectTree').attr('selectedItem');
        
                    if(context.moveSource.id == context.moveDestination.id){
            
                        alert('Source and Destination cannot be the same');
            
                    }else{
            
                        filesystem.rename(context.moveSource.id, context.moveDestination.id);
                    }
        
                }else{
    
                    context.copyDestination = dijit.byId('projectTree').attr('selectedItem');

                    if(context.copySource.id == context.copyDestination.id){
            
                        alert('Source and Destination cannot be the same');
            
                    }else{
            
                        filesystem.copy(context.copySource.id, context.copyDestination.id);
                    }
                }
    
                context.copySource = null;
                context.copyDestination = null;
                context.moveSource = null;
                context.moveDestination = null;

                dijit.byId('sourcesMenu_paste').attr('disabled',true);
            },
            
            // @author martijn
            // This is quite a brute force refresh of the tree. 
            // It's like chopping down the tree to get the apples 
            // and growing a new one to have more, but i have
            // spent a long polish night figuring out how to do
            // this other ways, not succesful in the endeavour.
            refresh : function(item){
            
                var tree = dijit.byId(item);
    
                if(tree != undefined){
                    tree.dndController.selectNone();
                    tree._itemNodesMap = {};
                    tree.model.root = null;
                    tree.rootNode.destroyRecursive();
                    tree._load();
                }
            },

            openItemReadonly : function(item, opened){
              
                require(['stormcloud/services/filesystem'], function(fs){
                
                    fs.get(item, true);
                    
                });
            },


            openItem : function(item, opened){
                
                require(['stormcloud/services/filesystem'], function(fs){
                
                    fs.get(item, false);
                    
                });
                
            },
            
            getTarget : function(target){
    
                return dijit.byNode(target.getParent().currentTarget).item;
            },

            iconClass : function(item, opened){
		
                // default value when nothing applies            
                var icon = "folderIcon";            
                
                if(item.type == 'project' ){	
        
                    return "projectIcon";
    		
                }else if(item.type == 'projectSettings'){
			
                    icon = "projectSettingsIcon";	
			
                    if(item.status == 'untracked'){
                        icon = "projectSettingsUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "projectSettingsModifiedIcon";
                    }	
			
                    return icon;
			
                }else if(item.type == 'mavenSettings'){
			
                    icon = "mavenSettingsIcon";	
			
                    if(item.status == 'untracked'){
                        icon = "mavenSettingsUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "mavenSettingsModifiedIcon";
                    }	
			
                    return icon;
                        
                        
                }else if(item.type == 'flowDesign'){
		
                    icon = "flowDesignIcon";	
			
                    if(item.status == 'untracked'){
                        icon = "flowDesignUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "flowDesignModifiedIcon";
                    }
			
                    return icon;
			
                }else if(item.type == 'sources'){
		
                    icon = "sourceFolderIcon";	
			
                    if(item.status == 'untracked'){
                        icon = "sourceFolderUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "sourceFolderModifiedIcon";
                    }
		
                    if(item.status == 'missing'){
                        icon = "sourceFolderMissingIcon";
                    }
		
                    return icon;
        
                }else if(item.type == 'webapp'){
		
                    icon = "webappFolderIcon";	
			
                    if(item.status == 'untracked'){
                        icon = "webappFolderUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "webappFolderModifiedIcon";
                    }
		
                    if(item.status == 'missing'){
                        icon = "webappFolderMissingIcon";
                    }
		
                    return icon;
    		
                }else if(item.type == 'javaFile'){
			
                    icon = "javaFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "javaFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "javaFileModifiedIcon";
                    }
		
                    return icon;

                }else if(item.type == 'jspFile'){
			
                    icon = "jspFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "jspFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "jspFileModifiedIcon";
                    }
		
                    return icon;

                }else if(item.type == 'xmlFile'){
			
                    icon = "xmlFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "xmlFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "xmlFileModifiedIcon";
                    }
		
                    return icon;
		
                }else if(item.type == 'xhtmlFile'){
			
                    icon = "xhtmlFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "xhtmlFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "xhtmlFileModifiedIcon";
                    }
		
                    return icon;
		
                }else if(item.type == 'htmlFile'){
			
                    icon = "htmlFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "htmlFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "htmlFileModifiedIcon";
                    }
		
                    return icon;
		
                
                }else if(item.type == 'wsdlFile'){
			
                    icon = "wsdlFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "wsdlFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "wsdlFileModifiedIcon";
                    }
		
                    return icon;
		
                }else if(item.type == 'xsdFile'){
			
                    icon = "xsdFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "xsdFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "xsdFileModifiedIcon";
                    }
		
                    return icon;
		
                }else if(item.type == 'textFile'){
			
                    icon = "textFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "textFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "textFileModifiedIcon";
                    }
		
                    return icon;
                
                }else if(item.type == 'cssFile'){
			
                    icon = "cssFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "cssFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "cssFileModifiedIcon";
                    }
		
                    return icon;
                
                }else if(item.type == 'jsFile'){
			
                    icon = "jsFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "jsFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "jsFileModifiedIcon";
                    }
		
                    return icon;
                
                }else if(item.type == 'imageFile'){
			
                    icon = "imageFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "imageFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "imageFileModifiedIcon";
                    }
		
                    return icon;
                
                }else if(item.type == 'tldFile'){
			
                    icon = "tldFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "tldFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "tldFileModifiedIcon";
                    }
		
                    return icon;
		
                }else if(item.type == 'sqlFile'){
			
                    icon = "sqlFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "sqlFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "sqlFileModifiedIcon";
                    }
		
                    return icon;
		
                }else if(item.type == 'resources'){
		
                    icon = "resourceFolderIcon";
		
                    if(item.status == 'untracked'){
                        icon = "resourceFolderUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){	    
                        icon = "resourceFolderModifiedIcon";
                    }
		
                    if(item.status == 'missing'){
                        icon = "resourceFolderMissingIcon";
                    }
			
                    return icon;
                    
                }else if(item.type == 'propertiesFile'){
		
                    icon = "propertiesFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "propertiesFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){	    
                        icon = "propertiesFileModifiedIcon";
                    }
		
                    if(item.status == 'missing'){
                        icon = "propertiesFileMissingIcon";
                    }
			
                    return icon;
                    
                }else if(item.type == 'tomcat'){
		
                    icon = "tomcatIcon";
			
                    return icon;
                    
                }else if(item.type == 'tomcatWebApps'){
		
                    icon = "tomcatWebAppsIcon";
			
                    return icon;
                    
                }else if(item.type == 'tomcatApp'){
		
                    icon = "tomcatAppIcon";
			
                    return icon;
                
                }else if(item.type == 'jarFile'){
		
                    icon = "jarFileIcon";
			
                    return icon;
                
                }else if(item.type == 'sha1File'){
		
                    icon = "sha1FileIcon";
			
                    return icon;
                
                }else if(item.type == 'mysql'){
		
                    icon = "mysqlIcon";
			
                    return icon;
                
                }else if(item.type == 'javadb'){
		
                    icon = "javadbIcon";
			
                    return icon;
                
                }else if(item.type == 'oracle'){
		
                    icon = "oracleIcon";
			
                    return icon;
                
                }else if(item.type == 'rdbms'){
		
                    icon = "databasesIcon";
			
                    return icon;
                    
                }else if(item.type == 'webServices'){
		
                    icon = "webServicesIcon";
			
                    return icon;
                    
                }else if(item.type == 'servers'){
		
                    icon = "serverIcon";
			
                    return icon;
                    
                }else if(item.type == 'mavenRepositories'){
		
                    icon = "mavenRepositoriesIcon";
			
                    return icon;
                
                }else if(item.type == 'continuousIntegration'){
		
                    icon = "continuousIntegrationIcon";
			
                    return icon;
                
                }else if(item.type == 'issueTrackers'){
		
                    icon = "issueTrackersIcon";
			
                    return icon;
                
                }else{
		
                    if(item.status == 'untracked'){
                        icon = "folderUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "folderModifiedIcon";
                    }
		
                    if(item.status == 'missing'){
                        icon = "folderMissingIcon";
                    }
		
                    return icon;	
                }
            }
        }

    });
