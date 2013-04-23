/*
 * Stormcloud IDE - stormcloud/manager/FileManager
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
    'dijit/MenuItem',
    'dojo/json',
    'stormcloud/service/FilesystemService'],
        function(
                registry,
                MenuItem,
                json,
                filesystemService) {

            //
            // module   : stormcloud/manager/FileManager
            //
            // summary  :
            //

            return {
                selected: null,
                copySource: null,
                moveSource: null,
                copyDestination: null,
                moveDestination: null,
                // array of last (recent) opened files
                // will contain max 10 last opened files
                recentlyOpened: new Array(),
                // array of dirty files
                dirtyFiles: new Array(),
                init: function() {

                    // summary : Get the recentFiles cookie and
                    //           add the contained files in the menu
                    //           if it exists

                    var recentFilesString = cookieManager.get('recentFiles');

                    if (recentFilesString) {

                        var recentFiles = json.parse(recentFilesString);
                    }

                    if (recentFiles) {

                        this.recentlyOpened = recentFiles;

                        this._updateOpenedFiles();

                    }

                    // check for trash
                    this.checkTrash();

                },
                setSelected: function(item) {

                    if (item.type !== ITEM_TYPE.OPENED_PROJECT
                            || item.type !== ITEM_TYPE.CLOSED_PROJECT) {

                        this.selected = item;
                    }
                },
                getTemplate: function(item) {

                    // open the template file
                    filesystemService.get(item, false);
                },
                get: function(item, readOnly) {

                    // summary : Get a file from the filesystem
                    //           and open it in the editor
                    //           This file is also added to the recent
                    //           file list on the file menu

                    // check if the project is opened
                    var project = projectManager.getProject(item);

                    if (project.type === ITEM_TYPE.CLOSED_PROJECT) {

                        // the project is closed
                        var projectName = projectManager.getProject(item).label;

                        // ask to open the project
                        var open = confirm("This file belongs to the " + projectName + " Project.\nDo you want to open it?");

                        if (open === true) {

                            projectManager.open(project);

                        } else {
                            return;
                        }

                    }

                    // open the file
                    filesystemService.get(item, readOnly);

                    // add the file to the recent files list
                    this.addRecentlyOpenedFile(item);
                },
                del: function(item) {

                    filesystemService.del(item);
                },
                save: function() {

                    // summary : save the editor contents of the
                    //           currently selected item

                    // get editor contents
                    var contents = editorManager.getEditorContents(this.selected);

                    // save it
                    filesystemService.save(this.selected, contents);

                    // lookup the file in the changedFileList and remove it
                    for (var i = 0; i < this.dirtyFiles.length; i++) {

                        if (this.dirtyFiles[i] == this.selected) {
                            this.dirtyFiles.splice(i, 1);
                        }
                    }

                    if (settingsManager.getPreference(PREFERENCE.MAVEN_COMPILE_ON_SAVE) == 'true') {
                        mavenManager.compile();
                    }

                },
                saveAll: function() {

                    // summary : save all files from the dirty list and remove them
                    //

                    var i = this.dirtyFiles.length;
                    var saved = i;

                    while (i--) {

                        var contents = editorManager.getEditorContents(this.dirtyFiles[i]);

                        filesystemService.save(this.dirtyFiles[i], contents);

                        this.dirtyFiles.splice(i, 1);
                    }

                    if (saved > 0) {
                        if (settingsManager.getPreference(PREFERENCE.MAVEN_COMPILE_ON_SAVE) == 'true') {
                            mavenManager.compile();
                        }
                    }
                },
                create: function(item) {

                    filesystemService.create(item);
                },
                checkTrash: function() {

                    filesystemService.checkTrash();
                },
                emptyTrash: function() {

                    filesystemService.emptyTrash();

                },
                find: function(args) {

                    filesystemService.find(args);

                },
                copy: function() {
                    this.copySource = dijit.byId('projectTree').attr('selectedItem');
                    dijit.byId('filesystemMenu_paste').attr('disabled', false);
                },
                cut: function() {
                    this.moveSource = dijit.byId('projectTree').attr('selectedItem');
                    dijit.byId('filesystemMenu_paste').attr('disabled', false);
                },
                paste: function() {

                    if (this.copySource == null) {

                        this.moveDestination = dijit.byId('projectTree').attr('selectedItem');

                        if (this.moveSource.id == this.moveDestination.id) {

                            alert('Source and Destination cannot be the same');

                        } else {

                            filesystemService.rename(this.moveSource.id, this.moveDestination.id);
                        }

                    } else {

                        this.copyDestination = dijit.byId('projectTree').attr('selectedItem');

                        if (this.copySource.id == this.copyDestination.id) {

                            alert('Source and Destination cannot be the same');

                        } else {

                            filesystemService.copy(this.copySource.id, this.copyDestination.id);
                        }
                    }

                    this.copySource = null;
                    this.copyDestination = null;
                    this.moveSource = null;
                    this.moveDestination = null;

                    dijit.byId('filesystemMenu_paste').attr('disabled', true);

                },
                addRecentlyOpenedFile: function(item) {

                    // summary :


                    // check if it's already in the array
                    var i = this.recentlyOpened.length;
                    while (i--) {
                        if (this.recentlyOpened[i] == item) {
                            // it's already in there, return ziltsj
                            return;
                        }
                    }

                    // add file to the array, at the top as it was selected last
                    // and should show up in the menu that way
                    this.recentlyOpened.unshift(item);

                    // pop the last item in the array to only contain the last 10 items
                    // when more than 10 are in there
                    if (this.recentlyOpened.length > 10) {
                        this.recentlyOpened.pop();
                    }


                    // add the updated list to the cookie
                    cookieManager.set('recentFiles', json.stringify(this.recentlyOpened));

                    // update the menu
                    this._updateOpenedFiles();
                },
                addChangedFile: function(item) {


                    var i = this.dirtyFiles.length;

                    while (i--) {
                        if (this.dirtyFiles[i] == item) {
                            // it's already in there, do nothing
                            return;
                        }
                    }

                    this.dirtyFiles.push(item);

                },
                // update the 'file -> open recent file'
                _updateOpenedFiles: function() {

                    // get handle on the menu
                    var menu = dijit.byId('fileMenu_open_recent_file');

                    // remove all existing items
                    menu.destroyDescendants(false);

                    var file;

                    // create the refreshed list
                    for (var i = 0; i < this.recentlyOpened.length; i++) {

                        // if there is actually an item in the slot
                        if (this.recentlyOpened[i] != undefined) {

                            file = this.recentlyOpened[i];

                            var menuItem = new MenuItem({
                                label: file.label,
                                file: file,
                                iconClass: '',
                                onClick: function(event) {

                                    var item = registry.getEnclosingWidget(event.target);

                                    fileManager.get(item.get('file'), false);
                                }
                            })

                            // add a menuitem for it
                            menu.addChild(menuItem);

                        }
                    }
                },
                getLabel: function(item) {

                    var label = item.label;

                    if (item.type != ITEM_TYPE.OPENED_PROJECT) {

                        if (item.status == ITEM_STATUS.MODIFIED
                                && item.type != ITEM_TYPE.FOLDER) {

                            label = item.label + ' [-/M]';
                        }

                        if (item.status == ITEM_STATUS.UNTRACKED) {
                            label = item.label + ' [-/A]';
                        }

                        if (item.status == ITEM_STATUS.MISSING
                                && item.type != ITEM_TYPE.FOLDER) {

                            label = item.label + ' [-/D]';
                        }
                    }

                    return label;
                },
                getLabelClass: function(item, opened) {

                    // summary : provides the class for tree label coloring

                    if (item.type != ITEM_TYPE.OPENED_PROJECT) {

                        return item.status + item.style + item.type.toLowerCase();

                    } else {

                        return '';
                    }

                },
                getIcon: function(item, opened) {

                    // set the file type icon and badge
                    return item.style + 'Icon ' + item.status + 'Badge';
                },
                getImage: function(item) {

                    return '/images/files/ ' + item.style + '.png'
                }
            };
        });


