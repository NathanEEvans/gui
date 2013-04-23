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
                FilesystemService) {

            //
            // module:
            //		stormcloud/manager/TreeManager
            // summary:
            //

            return{
                projectStore: null,
                initialize: function() {

                    var projectData = FilesystemService.getProjects();

                    this.projectStore = new Memory({
                        data: projectData,
                        getChildren: function(object) {
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
                        mayHaveChildren: function(object) {

                            return this.store.getChildren(object).length > 0;
                        }
                    });

                    var projectTree = new Tree({
                        model: projectModel,
                        persist: false,
                        showRoot: false,
                        openOnDblClick: true,
                        // tree icon function
                        getIconClass: fileManager.getIcon,
                        getLabelClass: fileManager.getLabelClass,
                        getLabel: fileManager.getLabel,
                        // tree double click handler
                        onDblClick: this.openItem,
                        onClick: this.setSelected,
                        getNode: function(item) {
                            var found = this._itemNodesMap[item.id];
                            if (found) {
                                return found[0];
                            } else {
                                return null;
                            }
                        }
                    }, 'projectTree');

                    // only one selection at a time for now...
                    projectTree.dndController.singular = true;

                    // Initialize the project manager as soon as the tree
                    // finished loading
                    projectTree.onLoadDeferred.then(function() {

                        projectManager.init();

                        document.getElementById('projectTreeLoading').style.display = 'none';
                    });



                    // create filesystem tree
                    var filesystemRestStore = new JsonRest({
                        target: settingsManager.getApiUrl() + '/filesystem/bare'
                    });


                    var filesystemModel = new TreeStoreModel({
                        store: new ObjectStore({
                            objectStore: filesystemRestStore
                        }),
                        mayHaveChildren: this.mayHaveChildren

                    });

                    var filesystemTree = new Tree({
                        model: filesystemModel,
                        persist: false,
                        showRoot: false,
                        openOnDblClick: true,
                        // tree icon function
                        getIconClass: fileManager.getIcon,
                        // tree double click handler
                        onDblClick: this.openItem

                    }, 'filesystemTree');

                    // create services tree
                    var servicesRestStore = new JsonRest({
                        target: settingsManager.getApiUrl() + '/services'
                    });

                    var servicesTreeModel = new TreeStoreModel({
                        store: new ObjectStore({
                            objectStore: servicesRestStore
                        }),
                        mayHaveChildren: this.mayHaveChildren

                    });

                    var servicesTree = new Tree({
                        model: servicesTreeModel,
                        persist: false,
                        showRoot: false,
                        openOnDblClick: true,
                        // tree icon function
                        getIconClass: fileManager.getIcon,
                        // tree double click handler
                        onDblClick: this.openItemReadonly

                    }, 'servicesTree');

                    this.bindContextMenus(projectTree);
                    this.bindContextMenus(filesystemTree);
                    this.bindContextMenus(servicesTree);

                },
                mayHaveChildren: function(item) {

                    if (item.children.length === 0) {
                        return false;
                    } else {
                        return true;
                    }
                },
                bindContextMenus: function(widget) {

                    var menus = {
                        folder: registry.byId('filesystemMenu'),
                        sources: registry.byId('filesystemMenu'),
                        resources: registry.byId('filesystemMenu'),
                        modules: registry.byId('modulesMenu'),
                        pomProject: registry.byId('projectMenu'),
                        warProject: registry.byId('projectMenu'),
                        jarProject: registry.byId('projectMenu'),
                        projectFiles: registry.byId('projectFilesMenu')
                    };

                    widget.onOpen = function(item, node) {

                        function bindProperMenu(node, item) {

                            for (var menu in menus) {
                                menus[menu].unBindDomNode(node);
                            }

                            if (item.style) {

                                var menuType = menus[item.style];

                                if (menuType) {
                                    menuType.bindDomNode(node);
                                }
                            }
                        }

                        var children = node.containerNode.childNodes;
                        var n = children.length;
                        var thisWidget;

                        while (n--) {

                            thisWidget = dijit.getEnclosingWidget(children[n]);
                            bindProperMenu(thisWidget.domNode, thisWidget.item);
                        }

                        if (!item.root) {
                            bindProperMenu(node.domNode, item);
                        }
                    };
                },
                deleteItem: function(item) {

                    // summary: removes an item from the tree trough
                    //          deletion from the store.

                    this.projectStore.remove(item.id);
                },
                addItem: function(item) {

                    // summary : adds an item to the tree trough
                    //           adding it in the store.

                    this.projectStore.add(item);
                },
                setSavedChanges: function(item) {

                    // summary : mark file as modified and

                    var tree = dijit.byId('projectTree');

                    var node = tree.getNode(item);

                    console.info(node);


                    node.labelNode.innerHTML = node.label + ' [-/M]';

                    node.labelNode.style.fontWeight = '';
                    node.labelNode.style.color = 'blue';

                    node.labelNode.style.fontStyle = '';

                },
                setUnsavedChanges: function(item) {

                    var tree = dijit.byId('projectTree');

                    var node = tree.getNode(item);

                    node.labelNode.style.fontWeight = 'bold';
                    node.labelNode.style.fontStyle = 'italic';
                },
                setSelected: function(item, opened) {

                    // set the selected project
                    projectManager.setSelected(item);

                    // set selected file
                    fileManager.setSelected(item);
                },
                refresh: function(tree) {

                    // show loading message

                    var selectedTree = dijit.byId(tree);

                    if (tree === 'projectTree') {

                        document.getElementById('projectTreeLoading').style.display = 'block';


                        registry.remove(selectedTree.id);

                        var projectRestStore = new JsonRest({
                            target: settingsManager.getApiUrl() + '/filesystem/opened'
                        });

                        var treeModel = new TreeStoreModel({
                            store: new ObjectStore({
                                objectStore: projectRestStore
                            }),
                            mayHaveChildren: this.mayHaveChildren
                        });

                        var projectTree = new Tree({
                            model: treeModel,
                            persist: false,
                            showRoot: false,
                            openOnDblClick: true,
                            // tree icon function
                            getIconClass: fileManager.getIcon,
                            getLabelClass: fileManager.getLabelClass,
                            getLabel: fileManager.getLabel,
                            // tree double click handler
                            onDblClick: this.openItem,
                            onClick: this.setSelected,
                            getItem: function(item) {
                                return this._itemNodesMap[item.id][0];
                            }

                        }, 'projectTree');

                        projectTree.onLoadDeferred.then(function() {

                            projectManager.init();

                            document.getElementById('projectTreeLoading').style.display = 'none';
                        });

                        this.bindContextMenus(projectTree);

                    } else {

                        if (selectedTree) {

                            selectedTree.dndController.selectNone();
                            selectedTree._itemNodesMap = {};
                            selectedTree.model.root = null;
                            selectedTree.rootNode.destroyRecursive();
                            selectedTree._load();
                        }
                    }
                },
                select: function(item) {

                    // summary : set the item selected in the project tree

                    var paths = Array();

                    // get the selected node
                    var node = dijit.byId('projectTree').getNode(item);

                    // push the item to be selected
                    paths.push(node.item.id);

                    // get the depth
                    var indent = node.indent;

                    // traverse the parent nodes upwards
                    while (indent--) {

                        node = node.getParent();

                        // push each parent
                        paths.push(node.item.id);
                    }

                    // add the root
                    paths.push('root');

                    // reverse the paths so it reads root -> leaf order
                    paths.reverse();

                    // set the path in the tree
                    tree.set('paths', [paths]);
                },
                getNode: function(tree, id) {

                    // summary : get a tree node from the tree by id

                    var targetTree = dijit.byId(tree);

                    var node = targetTree._itemNodesMap[id];

                    return node;
                },
                markMain: function(item) {

                    // summary : get the given item from the tree and mark it as
                    //           main project.

                    var node = dijit.byId(item);

                    if (node) {
                        node[0].labelNode.className = 'mainProject';
                    }
                },
                unmarkMain: function(tree, item) {

                    // summary : Get the given item from the tree and mark it as
                    //           a 'normal' project (as in not the main project)

                    var selectedTree = dijit.byId(tree);

                    if (selectedTree) {
                        var node = selectedTree._itemNodesMap[item.id];
                    }

                    if (node) {
                        node[0].labelNode.className = 'dijitTreeLabel';
                    }
                },
                openItemReadonly: function(item, opened) {

                    if (item.type === ITEM_TYPE.FILE) {
                        fileManager.get(item, true);
                    }
                },
                openItem: function(item, opened) {

                    if (item.type === ITEM_TYPE.FILE) {
                        fileManager.get(item, false);
                    }

                    if (item.type == ITEM_TYPE.CLOSED_PROJECT) {

                        // get a handle on the project tree
                        var tree = dijit.byId('projectTree');

                        // check if the project is already opened
                        // switch id & path for closed projects
                        item.id = item.path;
                        var p = tree.getNode(item);

                        // project is not opened yet
                        if (p == null) {

                            // open it by path
                            var project = FilesystemService.getProject(item.path);

                            var root;

                            for (var i = 0; i < project.length; i++) {

                                // keep the project root to be added last
                                if (project[i].parent == 'root') {

                                    root = project[i];

                                } else {

                                    tree.model.store.add(project[i]);
                                }
                            }

                            tree.model.store.add(root);

                        } else {

                            // set it selected in the tree
                            tree.set('paths', [item.path]);
                        }
                    }

                },
                getTarget: function(target) {

                    return dijit.byNode(target.getParent().currentTarget).item;
                }
            }

        });
