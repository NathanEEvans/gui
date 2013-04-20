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
    'dijit/Tree',
    'dojo/store/Observable',
    'dijit/tree/ObjectStoreModel',
    'dojo/store/Memory',
    'stormcloud/service/FilesystemService'],
    function(
        registry,
        JsonRest,
        ObjectStore,
        TreeStoreModel,
        Tree,
        Observable,
        ObjectStoreModel,
        Memory,
        FilesystemService){

        //
        // module:
        //		stormcloud/manager/TreeManager
        // summary:
        //

        return{

            projectStore : null,

            initialize : function(){

                var projectData = FilesystemService.projects();

                this.projectStore = new Memory({

                    data : projectData,
                    getChildren: function(object){
                        return this.query({
                            parent: object.id
                        });
                    }
                });

                this.projectStore = new Observable(this.projectStore);

                var projectModel = new ObjectStoreModel({
                    store: this.projectStore,
                    query: {
                        id: 'root'
                    },
                    mayHaveChildren: function (object){

                        return this.store.getChildren(object).length > 0;
                    }
                });

                var projectTree = new Tree({

                    model:projectModel,
                    persist:false,
                    showRoot:false,
                    openOnDblClick:true,
                    // tree icon function
                    getIconClass : fileManager.getIcon,
                    getLabelClass : fileManager.getLabelClass,
                    getLabel : fileManager.getLabel,
                    // tree double click handler
                    onDblClick : this.openItem,
                    onClick : this.setSelected,
                    getItem : function(item){
                        return this._itemNodesMap[item.id][0];
                    }
                }, 'projectTree');


                // Initialize the project manager as soon as the tree
                // finished loading
                projectTree.onLoadDeferred.then(function(){

                    projectManager.init();

                    document.getElementById('projectTreeLoading').style.display = 'none';
                });



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
                    persist:false,
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
                    persist:false,
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

            mayHaveChildren : function(object){


            },


            bindContextMenus : function(widget){

                var menus = {
                    folder : registry.byId('filesystemMenu'),
                    sources : registry.byId('filesystemMenu'),
                    resources : registry.byId('filesystemMenu'),
                    modules : registry.byId('modulesMenu'),
                    pomProject : registry.byId('projectMenu'),
                    warProject : registry.byId('projectMenu'),
                    jarProject : registry.byId('projectMenu'),
                    projectFiles : registry.byId('projectFilesMenu')
                };


                widget.onOpen = function(item, node) {

                    function bindProperMenu(node, item){

                        for(var menu in menus){
                            menus[menu].unBindDomNode(node);
                        }

                        if (item.style){

                            var menuType = menus[item.style];

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


            deleteItem : function(item){

                // summary: removes an item from the tree trough
                //          deletion from the store.

                this.projectStore.remove(item.id);
            },


            addItem : function(item){

                // summary : adds an item to the tree trough
                //           adding it in the store.
                
                this.projectStore.add(item);
            },


            setSavedChanges : function(item){

                var tree = dijit.byId('projectTree');

                var node = tree.getItem(item);

                console.info(node);


                node.labelNode.innerHTML = node.label + ' [-/M]';

                node.labelNode.style.fontWeight = '';
                node.labelNode.style.color = 'blue';

                node.labelNode.style.fontStyle = '';

            },

            setUnsavedChanges : function(item){

                var tree = dijit.byId('projectTree');

                var node = tree.getItem(item);

                node.labelNode.style.fontWeight = 'bold';
                node.labelNode.style.fontStyle = 'italic';
            },

            setSelected : function(item, opened){

                // set the selected project
                projectManager.setSelected(item);

                // set selected file
                fileManager.setSelected(item);
            },

            refresh : function(tree){

                // show loading message

                var selectedTree = dijit.byId(tree);

                if(tree == 'projectTree'){

                    document.getElementById('projectTreeLoading').style.display = 'block';


                    registry.remove(selectedTree.id);

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
                        persist:false,
                        showRoot:false,
                        openOnDblClick:true,
                        // tree icon function
                        getIconClass : fileManager.getIcon,
                        getLabelClass : fileManager.getLabelClass,
                        getLabel : fileManager.getLabel,
                        // tree double click handler
                        onDblClick : this.openItem,
                        onClick : this.setSelected,
                        getItem : function(item){
                            return this._itemNodesMap[item.id][0];
                        }

                    }, 'projectTree');

                    projectTree.onLoadDeferred.then(function(){

                        projectManager.init();

                        document.getElementById('projectTreeLoading').style.display = 'none';
                    });

                    this.bindContextMenus(projectTree);

                }else{

                    if(selectedTree){

                        selectedTree.dndController.selectNone();
                        selectedTree._itemNodesMap = {};
                        selectedTree.model.root = null;
                        selectedTree.rootNode.destroyRecursive();
                        selectedTree._load();
                    }
                }
            },


            select : function(tree, item){

                // summary : select the item in the given tree

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
                    path.push(projectFolder + '/' + projectName + sourceFolder);
                    chop = chop.replace(sourceFolder+'/','');

                }else if(chop.slice(0, srcMainResources.length) == srcMainResources){

                    sourceFolder = srcMainResources;
                    path.push(projectFolder + '/' + projectName + sourceFolder);
                    chop = chop.replace(sourceFolder+'/','');

                }else if(chop.slice(0, srcMainWebapp.length) == srcMainWebapp){

                    sourceFolder = srcMainWebapp;
                    path.push(projectFolder + '/' + projectName + sourceFolder);
                    chop = chop.replace(sourceFolder+'/','');

                }else if(chop.slice(0, srcTestJava.length) == srcTestJava){

                    sourceFolder = srcTestJava;
                    path.push(projectFolder + '/' + projectName + sourceFolder);
                    chop = chop.replace(sourceFolder+'/','');

                }else if(chop.slice(0, srcTestResources.length) == srcTestResources){

                    sourceFolder = srcTestResources;
                    path.push(projectFolder + '/' + projectName + sourceFolder);
                    chop = chop.replace(sourceFolder+'/','');

                }else{

                    // if we came here we might have to deal with the fact
                    // that it's a module. test it

                    chop = chop.substring(1, chop.length);

                    var module = chop.substring(0,chop.indexOf('/'));

                    // remove module
                    chop = chop.replace(module,'');

                    var isModule = false;

                    if(chop.slice(0, srcMainJava.length) == srcMainJava){

                        isModule=true;
                        sourceFolder = srcMainJava;
                        path.push(projectFolder + '/' + projectName + '/' + module);
                        path.push(projectFolder + '/' + projectName + '/' + module + sourceFolder);
                        chop = chop.replace(sourceFolder+'/','');

                    }else if(chop.slice(0, srcMainResources.length) == srcMainResources){

                        isModule=true;
                        sourceFolder = srcMainResources;
                        path.push(projectFolder + '/' + projectName + '/' + module);
                        path.push(projectFolder + '/' + projectName + '/' + module + sourceFolder);
                        chop = chop.replace(sourceFolder+'/','');

                    }else if(chop.slice(0, srcMainWebapp.length) == srcMainWebapp){

                        isModule=true;
                        sourceFolder = srcMainWebapp;
                        path.push(projectFolder + '/' + projectName + '/' + module);
                        path.push(projectFolder + '/' + projectName + '/' + module + sourceFolder);
                        chop = chop.replace(sourceFolder+'/','');

                    }else if(chop.slice(0, srcTestJava.length) == srcTestJava){

                        isModule=true;
                        sourceFolder = srcTestJava;
                        path.push(projectFolder + '/' + projectName + '/' + module);
                        path.push(projectFolder + '/' + projectName + '/' + module + sourceFolder);
                        chop = chop.replace(sourceFolder+'/','');

                    }else if(chop.slice(0, srcTestResources.length) == srcTestResources){

                        isModule=true;
                        sourceFolder = srcTestResources;
                        path.push(projectFolder + '/' + projectName + '/' + module);
                        path.push(projectFolder + '/' + projectName + '/' + module + sourceFolder);
                        chop = chop.replace(sourceFolder+'/','');

                    }else{

                    // pfff, no idea yet. I think this way of chopping the path is far
                    // from ideal but have to think on how to do this with
                    // the 'fixed' src/main/java etc grouping...

                    }

                }

                // from here we loop trough the remaining folders and add them
                var folderArray = chop.split('/');

                var folderPath ='';

                for(var i=0;i<folderArray.length;i++){

                    folderPath += '/' + folderArray[i];

                    if(isModule){
                        path.push(projectFolder + '/' + projectName + '/' + module + sourceFolder + folderPath);
                    }else{
                        path.push(projectFolder + '/' + projectName + sourceFolder + folderPath);
                    }
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
            // It also hangs up the editor, not being able to
            // type anything. Looks like some race condition.
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

            getNode : function(tree, id){

                // summary : Get a tree (widget) node from the tree based on id

                var targetTree = dijit.byId(tree);

                var node  = targetTree._itemNodesMap[id];

                return node;
            },

            markMain : function(tree, item){

                // summary : Get the given item from the tree and mark it as
                //           main project.

                var selectedTree = dijit.byId(tree);


                if(selectedTree){
                    var node = selectedTree._itemNodesMap[item.id];
                }

                if(node){
                    node[0].labelNode.className = 'mainProject';
                }
            },

            unmarkMain : function(tree, item){

                // summary : Get the given item from the tree and mark it as
                //           a 'normal' project (as in not the main project)

                var selectedTree = dijit.byId(tree);

                if(selectedTree){
                    var node = selectedTree._itemNodesMap[item.id];
                }

                if(node){
                    node[0].labelNode.className = 'dijitTreeLabel';
                }
            },

            openItemReadonly : function(item, opened){

                if(item.type == ITEM_TYPE.FILE){
                    fileManager.get(item, true);
                }
            },


            openItem : function(item, opened){

                if(item.type == ITEM_TYPE.FILE){
                    fileManager.get(item, false);
                }
            },

            getTarget : function(target){

                return dijit.byNode(target.getParent().currentTarget).item;
            }
        }

    });
