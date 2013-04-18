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
        filesystemService){

        //
        // module   : stormcloud/manager/ProjectManager
        //
        // summary  : Manager for Project handling
        //


        return {

            // the currently selected project
            selected : null,
            mainProject : null,

            init : function(){

                // summary : Get the initial selected project from cookie
                //           and set it as selected

                // check if there is a project marked as main project
                var id = cookieManager.get('mainProject');

                if(id){

                    // get the node from the tree
                    var node = treeManager.getNode('projectTree', id);

                    if(node){

                        // if found set it as selected project
                        this.selected = node[0].item;

                        // and mark it as main project in the tree
                        treeManager.markMain('projectTree', node[0].item);

                        // and set it as main project
                        this.mainProject = this.selected;
                    }

                }else{

                // no known main project, take the first in the tree, if any,
                // as the selected project

                }



            },

            setMainProject : function(){

                // summary : Mark the currently selected project as mainProject

                // check if there is a current main project
                if(this.mainProject){
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

            open : function(item){

                // summary : Open a project

                filesystemService.open(item);

            },

            close : function(){

                // summary : Close a project

                filesystemService.close(this.selected);
            },


            getProjectNodeFromFile : function(item){

                // summary : figure out the project node the given file belongs to

                if(item.type == ITEM_TYPE.OPENED_PROJECT || item.type == ITEM_TYPE.CLOSED_PROJECT){

                    // if it's a project type we were given, just return it
                    return item;

                }else{

                    // otherwise get the project from the file path
                    var path = item.id;

                    // chop off the project folder
                    var s = path.replace(settingsManager.getProjectFolder() + '/','');
                    var project = settingsManager.getProjectFolder() + '/' + s.substring(0,s.indexOf('/'));

                    // first check if it's opened in the project tree
                    var selectedTree = dijit.byId('projectTree');
                    var node = selectedTree._itemNodesMap[project];

                    if(node){

                        // if found return
                        return node[0].item;

                    }else{

                        // create a closed project item
                        var item = {

                            id : project,
                            type : ITEM_TYPE.CLOSED_PROJECT

                        }

                        return item;
                    }
                }
            },


            getProjectIdFromFile : function(item){

                if(item.type == ITEM_TYPE.OPENED_PROJECT || item.type == ITEM_TYPE.CLOSED_PROJECT){

                    // if it's a project type we were given, just return it
                    return item.id;

                }else{

                    // otherwise get the project from the file path

                    var path = item.id;

                    // chop off the project folder
                    var s = path.replace(settingsManager.getProjectFolder() + '/','');

                    var projectId = settingsManager.getProjectFolder() + '/' + s.substring(0,s.indexOf('/'));

                    return projectId;
                }

            },


            getProjectNameFromFile : function(item){


                if(item.type == ITEM_TYPE.OPENED_PROJECT || item.type == ITEM_TYPE.CLOSED_PROJECT){

                    // if it's a project type we were given, just return it
                    return item.label;

                }else{

                    // otherwise get the project from the file path

                    var path = item.id;

                    // chop off the project folder
                    var s = path.replace(settingsManager.getProjectFolder() + '/','');

                    var projectName = s.substring(0,s.indexOf('/'));

                    return projectName;
                }

            },

            setSelected : function(item){

                // summary : set the currently selected project based on a
                //           selected item in the project tree

                this.selected = this.getProjectNodeFromFile(item);
            }
        };

    });
