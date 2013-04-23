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
    'stormcloud/service/FilesystemService'],
        function(
                filesystemService) {

            //
            // module   : stormcloud/manager/ProjectManager
            //
            // summary  : Manager for Project handling
            //


            return {
                // the currently selected project
                selected: null,
                mainProject: null,
                init: function() {

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

                    filesystemService.openModule(item);
                },
                open: function(item) {

                    // summary : open a project

                    filesystemService.open(item);
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
                }
            };

        });
