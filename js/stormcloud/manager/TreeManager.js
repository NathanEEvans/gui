/*
 * Stormcloud IDE - stormcloud/manager/TreeManager
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
    'dijit/Tree'], 
    function(
        registry,
        JsonRest,
        ObjectStore,
        TreeStoreModel,
        Tree){

        //
        // module:
        //		stormcloud/manager/TreeManager
        // summary:
        //		
        
        return{

            initialize : function(){
            
            
                // create project tree
                var projectRestStore = new JsonRest({
                
                    target : settingsManager.getApiUrl() + '/filesystem/opened'
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
                    getIconClass : fileManager.getIcon,
                    // tree double click handler
                    onDblClick : this.openItem,
                    
                    onClick : this.setProject
                    
                }, 'projectTree');
                
                
                // create filesystem tree
                var filesystemRestStore = new JsonRest({
                
                    target : settingsManager.getApiUrl() + '/filesystem/bare'
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
                    getIconClass : fileManager.getIcon,
                    // tree double click handler
                    onDblClick : this.openItem
    
                }, 'filesystemTree');
                
                // create services tree
                var servicesRestStore = new JsonRest({
                
                    target : settingsManager.getApiUrl() + '/services'
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
                    getIconClass : fileManager.getIcon,
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
    
                var menus = {
                    tomcat : registry.byId('tomcatMenu'),
                    tomcatWebApps : registry.byId('tomcatWebAppsMenu'),
                    tomcatApp : registry.byId('tomcatAppMenu'),
                    folder : registry.byId('filesystemMenu'),
                    sources : registry.byId('filesystemMenu'),
                    resources : registry.byId('filesystemMenu'),
                    webapp : registry.byId('filesystemMenu'),
                    project : registry.byId('projectMenu')
                };

    
                widget.onOpen = function(item, node) {

                    function bindProperMenu(node, item){

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
            
            setProject : function(item, opened){
                
                projectManager.setSelected(item);
            },
            
            // @author martijn
            // This is quite a brute force refresh of the tree. 
            // It's like chopping down the tree to get the apples 
            // and growing a new one to have more, but i have
            // spent a long polish night figuring out how to do
            // this other ways, not succesful in the endeavour.
            refresh : function(tree){
            
                var selectedTree = dijit.byId(tree);
    
                if(selectedTree != undefined){
                    selectedTree.dndController.selectNone();
                    selectedTree._itemNodesMap = {};
                    selectedTree.model.root = null;
                    selectedTree.rootNode.destroyRecursive();
                    selectedTree._load();
                }
            },


            select : function(tree, item){
                
                var selectedTree = dijit.byId(tree);
                
                var path = Array(); 
                var chop = item.id;
                
                // add filesystem root
                path.push('filesystem');
                
                // get the projects folder + project
                var projectFolder = settingsManager.getSetting(SETTING.PROJECT_FOLDER);
                
                // remove project folder from the input
                chop = chop.replace(projectFolder+'/','');
                
                // get the project name
                var projectName = chop.substring(0,chop.indexOf('/')); 
                    
                // push the project name
                path.push(projectFolder + '/' + projectName);
                
                // remove the project name from chop
                chop = chop.replace(projectName,'');
                
                // check for /src/main/java, /src/main/resources, /src/main/webapp, 
                //           /src/test/java, /src/test/resources
                var sourceFolder;
                var srcMainJava = '/src/main/java';
                var srcMainResources = '/src/main/resources';
                var srcMainWebapp = '/src/main/webapp';
                var srcTestJava = '/src/test/java';
                var srcTestResources = '/src/test/resources';
                
                if(chop.slice(0, srcMainJava.length) == srcMainJava){
                    sourceFolder = srcMainJava;
                }else if(chop.slice(0, srcMainResources.length) == srcMainResources){
                    sourceFolder = srcMainResources;
                }else if(chop.slice(0, srcMainWebapp.length) == srcMainWebapp){
                    sourceFolder = srcMainWebapp;
                }else if(chop.slice(0, srcTestJava.length) == srcTestJava){
                    sourceFolder = srcTestJava;
                }else if(chop.slice(0, srcTestResources.length) == srcTestResources){
                    sourceFolder = srcTestResources;
                }else{
                    
                // pfff, no idea yet. I think this way of chopping the path is far
                // from ideal but have to think on how to do this with
                // the 'fixed' src/main/java etc grouping...
                }
                
                path.push(projectFolder + '/' + projectName + sourceFolder);
                
                // remove from the chop
                chop = chop.replace(sourceFolder+'/','');
                
                // from here we loop trough the remaining folders and add them
                var folderArray = chop.split('/');
                
                var folderPath ='';
                
                for(var i=0;i<folderArray.length;i++){
                    
                    folderPath += '/' + folderArray[i];
                    path.push(projectFolder + '/' + projectName + sourceFolder + folderPath);    
                }
                
                // set the path in the tree
                selectedTree.set('paths', [path]);
                
            // @issue #47 scroll to the actual selected node
            // does not work properly now. looks like it
            // is called multiple times.
            // maybe because focus event is also picked
            // up by the ace editor and tries to set
            // focus again, rsulting in focus event to
            // be emitted etc...
            // It also hangs up the editor, no being able to
            // type anything. 
            // 
            // https://github.com/stormcloud-ide/gui/issues/47
            // 
            // scroll the file into view
            //    var node = selectedTree._itemNodesMap[item.id];
            //    
            //require([ 'dijit/focus' ], function(focusUtil){
            //    focusUtil.focus(node[0].domNode);
            //});
                
                
                
            },

            openItemReadonly : function(item, opened){
              
                
                fileManager.get(item, true);
            },


            openItem : function(item, opened){
                
                
                fileManager.get(item, false);
            },
            
            getTarget : function(target){
    
                return dijit.byNode(target.getParent().currentTarget).item;
            }
        }

    });
