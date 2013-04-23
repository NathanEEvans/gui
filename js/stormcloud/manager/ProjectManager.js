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
    'dojo/json',
    'dijit/MenuItem',
    'stormcloud/service/FilesystemService'],
        function(
                json,
                MenuItem,
                filesystemService) {

            //
            // module   : stormcloud/manager/ProjectManager
            //
            // summary  : Manager for Project handling
            //

            return {
                // the currently selected project
                selected: null,
                recentlyOpened: new Array(),
                mainProject: null,
                init: function() {

                    // summary : Get the recentFiles cookie and
                    //           add the contained files in the menu
                    //           if it exists

                    var recentProjects = cookieManager.get('recentProjects');

                    if (recentProjects) {

                        var projects = json.parse(recentProjects);
                    }

                    if (projects) {

                        this.recentlyOpened = projects;

                        this._updateRecentlyOpenedMenu();
                    }


                    // summary : Get the initial selected project from cookie
                    //           and set it as selected

                    // check if there is a project marked as main project
                    var id = cookieManager.get('mainProject');

                    if (id) {

                        // get the node from the tree
                        var node = treeManager.getNode('projectTree', id);

                        if (node) {

                            // if found set it as selected project
                            this.selected = node[0].item;

                            // and mark it as main project in the tree
                            treeManager.markMain('projectTree', node[0].item);

                            // and set it as main project
                            this.mainProject = this.selected;
                        }

                    } else {

                        // no known main project, take the first in the tree, if any,
                        // as the selected project

                    }



                },
                setMainProject: function() {

                    // summary : Mark the currently selected project as mainProject

                    // check if there is a current main project
                    if (this.mainProject) {
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
                openModule: function(item) {

                    // summary : open a nested module

                    // request open on filesystem
                    filesystemService.openModule(item);

                    // add to recently opened menu
                    this.addRecentlyOpened(item);
                },
                open: function(item) {

                    // summary : open a project

                    // request open on filesystem
                    filesystemService.open(item);

                    // add to recently opened menu
                    this.addRecentlyOpened(item);
                },
                close: function() {

                    // summary : close a project

                    filesystemService.close(this.selected);
                },
                getProjectNode: function(item) {

                    // summary : get the project node an item belongs to

                    if (item.type === ITEM_TYPE.OPENED_PROJECT
                            || item.type === ITEM_TYPE.CLOSED_PROJECT) {

                        // if it's a project type we were given, just return it
                        return item;

                    } else {

                        // get handle on the tree
                        var tree = dijit.byId('projectTree');

                        // get the selected node
                        var node = tree.getNode(item);

                        // get the depth
                        var indent = node.indent;

                        // traverse the parent nodes upwards
                        while (indent--) {
                            node = node.getParent();
                        }

                        // return the item from the project node
                        return node;
                    }
                },
                getProject: function(item) {

                    // summary : get the project item an item belongs to

                    var node = this.getProjectNode(item);

                    return node.item;
                },
                getProjectId: function(item) {

                    // summary : convenience method to retrieve the project id
                    //           based on an item

                    var project = this.getProject(item);

                    return project.id;
                },
                getProjectName: function(item) {

                    // summary : convenience method to retrieve the project name
                    //           based on an item

                    var project = this.getProject(item);

                    return project.label;
                },
                setSelected: function(item) {

                    // summary : set the selected project based on an item

                    this.selected = this.getProject(item);
                },
                addRecentlyOpened: function(item) {

                    // summary : add an item to the recently opened
                    //           projects menu

                    // check if it's already in the array
                    var i = this.recentlyOpened.length;

                    while (i--) {

                        if (this.recentlyOpened[i] === item) {
                            // it's already in there, do nothing
                            return;
                        }
                    }

                    // add project to the array, at the top as it was
                    // selected last and should show up in the menu that way
                    this.recentlyOpened.unshift(item);

                    // pop the last item in the array to only contain the last
                    // 10 items when more than 10 are in there
                    if (this.recentlyOpened.length > 10) {

                        this.recentlyOpened.pop();
                    }

                    // add the updated list to the cookie
                    cookieManager.set(
                            'recentProjects',
                            json.stringify(this.recentlyOpened));

                    // update the menu
                    this._updateRecentlyOpenedMenu();
                },
                _updateRecentlyOpenedMenu: function() {

                    // get handle on the menu
                    var menu = dijit.byId('fileMenu_open_recent_project');

                    // remove all existing items
                    menu.destroyDescendants(false);

                    var project;

                    // create the refreshed list
                    for (var i = 0; i < this.recentlyOpened.length; i++) {

                        // if there is actually an item in the slot
                        if (this.recentlyOpened[i] !== undefined) {

                            project = this.recentlyOpened[i];

                            var menuItem = new MenuItem({
                                label: project.label,
                                id: project.id,
                                item: project,
                                iconClass: '',
                                onClick: function(event) {

                                    treeManager.openItem(this.item, null);
                                }
                            });

                            // add a menuitem for it
                            menu.addChild(menuItem);

                        }
                    }
                }
            };

        });
