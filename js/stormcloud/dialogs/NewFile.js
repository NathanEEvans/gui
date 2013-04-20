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
    'dojo/store/Memory',
    'dijit/form/ValidationTextBox'],
    function(
        JsonRest,
        ObjectStore,
        TreeStoreModel,
        Tree,
        Dialog,
        ComboBox,
        Memory,
        ValidationTextBox){

        //
        // module      : stormcloud/dialogs/NewFile
        //
        // summary     :
        //

        var extension;
        var selected;
        var template;
        var selectedParentId;
        var selectedProject;

        return{

            init : function(){

                // get the selected position which will be the parent for
                // new item creation (when no other folder is selected)
                selectedParentId = dijit.byId('projectTree').attr('selectedItem').id;

                // get the opened projects for the combo select
                var openedProjects = this.getOpenedProjects();

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


                // create combo with available projects
                var availableProjectStore = new Memory({

                    data : openedProjects
                });

                var projectCombo = new ComboBox({

                    store: availableProjectStore,
                    searchAttr: 'label',
                    onChange : this.comboOnChange,
                    required : true

                }, 'projectSelector');

                projectCombo.watch('item', function(what, oldVal, newVal) {

                    selectedProject = newVal;
                });


                new ValidationTextBox({

                    id: 'fileName',
                    required : true,
                    onChange : this.fileNameOnChange

                }, 'fileName');

            },

            // @todo make this tree mixin functionality
            getOpenedProjects : function(){

                var openedProjects = new Array();

                var tree = dijit.byId('projectTree');

                var projects = tree.rootNode.getChildren();

                for(var project in projects){

                    openedProjects.push({

                        id : projects[project].item.id,
                        label : projects[project].item.label,
                        style : projects[project].item.style
                    });
                }

                return openedProjects;
            },

            fileNameOnChange : function(newValue){

                if(selected.type == ITEM_TYPE.FOLDER){

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
                selected = item;
            },


            // @todo make folderpicker based on tree in client
            browse : function(){

                var folderPicker = new Dialog({

                    id : 'folderPicker',
                    title: 'Pick a folder',
                    content: '<div id="folderPickerTree"></div>',
                    style: "width: 300px"

                });

                var folderPickerRestStore = new JsonRest({

                    target : settingsManager.getApiUrl() + '/filesystem/folderpicker?filePath=' + selectedProject.id

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
                if(selected.type == ITEM_TYPE.FOLDER){

                    dojo.byId('createdFile').value = item.id + '/' + dojo.byId('fileName').value;

                }else{

                    dojo.byId('createdFile').value = item.id + '/' + dojo.byId('fileName').value + extension;
                }

                // destory the folder picker and components
                dijit.byId('folderPicker').destroyRecursive();
            },

            done : function() {

                console.info(selectedParentId);

                // create the file item
                var item = {

                    id : dojo.byId('createdFile').value,
                    label : selected.type == ITEM_TYPE.FILE ? dojo.byId('fileName').value + extension : dojo.byId('fileName').value,
                    type : selected.type,
                    style : selected.style,
                    template : template,
                    parent : selectedParentId,
                    children : []
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
