/*
 * Stormcloud IDE - stormcloud/service/FilesystemService
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
    'dijit/registry',
    'stormcloud/rest/xhr'],
        function(
                json,
                registry,
                xhr) {

            //
            // module   : stormcloud/service/FilesystemService
            //
            // summary  :
            //

            // Filesystem constants.
            var FILESYSTEM = {
                // get projects url
                PROJECTS: settingsManager.getApiUrl() + '/filesystem/projects',
                // get project
                PROJECT: settingsManager.getApiUrl() + '/filesystem/project',
                // get opened projects url
                OPENED: settingsManager.getApiUrl() + '/filesystem/opened',
                // Open project service url.
                OPEN: settingsManager.getApiUrl() + '/filesystem/open',
                // Close project service url.
                CLOSE: settingsManager.getApiUrl() + '/filesystem/close',
                // Move/Rename service url
                MOVE: settingsManager.getApiUrl() + '/filesystem/move',
                // Copy service url
                COPY: settingsManager.getApiUrl() + '/filesystem/copy',
                // Save resource service url
                SAVE: settingsManager.getApiUrl() + '/filesystem/save',
                // Create
                CREATE: settingsManager.getApiUrl() + '/filesystem/create',
                // Delete resource service url
                DELETE: settingsManager.getApiUrl() + '/filesystem/delete',
                // Find
                FIND: settingsManager.getApiUrl() + '/filesystem/find',
                // Get resource service url
                GET: settingsManager.getApiUrl() + '/filesystem/get',
                //
                GET_BINARY: settingsManager.getApiUrl() + '/filesystem/getBinary',
                // Check if there is things in the trash bin
                HAS_TRASH: settingsManager.getApiUrl() + '/filesystem/hasTrash',
                // empty the trash folder
                EMPTY_TRASH: settingsManager.getApiUrl() + '/filesystem/emptyTrash'

            };

            return{
                // Rename a filesystem resource.
                rename: function(source, destination) {

                    var xhrArgs = {
                        url: FILESYSTEM.MOVE,
                        content: {
                            srcFilePath: source,
                            destFilePath: destination
                        }
                    };

                    var deferred = xhr.post(xhrArgs);

                    deferred.then(
                            function(data) {

                                if (data === '0') {

                                    treeManager.refresh('projectTree');

                                } else {

                                    statusManager.error(
                                            'Failed to open your project.' +
                                            ' Please review the <a href=\"javascript:alert'
                                            + '(\'Open logfile window\');">log</a>');
                                }
                            },
                            function(error) {

                                statusManager.error(error);
                            });
                },
                // Copy a filesystem resource.
                copy: function(source, destination) {


                    /**
                     * @todo create single argument methods
                     *
                     * param.source
                     * param['source']
                     *
                     */

                    var xhrArgs = {
                        url: FILESYSTEM.COPY,
                        content: {
                            srcFilePath: source,
                            destFilePath: destination
                        }
                    };

                    var deferred = xhr.post(xhrArgs);

                    deferred.then(
                            function(data) {

                                if (data === '0') {

                                    treeManager.refresh('projectTree');

                                } else {

                                    statusManager.error(
                                            'Failed to copy item.' +
                                            ' Please review the <a href=\"javascript:alert'
                                            + '(\'Open logfile window\');">log</a>');
                                }
                            },
                            function(error) {

                                statusManager.error(error);
                            });
                },
                getProjects: function() {

                    // summary : get all projects

                    var parsedData;

                    xhr.get({
                        url: FILESYSTEM.PROJECTS,
                        sync: true,
                        load: function(data) {

                            parsedData = json.parse(data);

                        }
                    });

                    return parsedData;

                },
                getProject: function(id) {

                    // summary : get a project

                    var parsedData;

                    xhr.post({
                        url: FILESYSTEM.PROJECT,
                        sync: true,
                        content: {
                            filePath: id
                        },
                        load: function(data) {

                            parsedData = json.parse(data);

                        },
                        error: this.handleError
                    });

                    return parsedData;
                },
                handleError: function(error, ioArgs) {

                    console.info(error);
                    console.info(ioArgs);

                    statusManager.error(ioArgs.xhr.responseText);
                },
                // Open a Project.
                open: function(item) {

                    var xhrArgs = {
                        url: FILESYSTEM.OPEN,
                        sync: true,
                        content: {
                            filePath: item.id
                        }
                    };

                    var deferred = xhr.post(xhrArgs);

                    deferred.then(
                            function(data) {

                                if (data === '0') {

                                    treeManager.refresh('projectTree');
                                    //treeManager.refresh('filesystemTree');

                                    // we are moving from closed to projects
                                    // so we need to change the path to reflect this
                                    // before calling the compile
                                    item.id = item.id.replace(
                                            settingsManager.getSetting(SETTING.CLOSED_PROJECTS_FOLDER),
                                            settingsManager.getProjectFolder());

                                    projectManager.setSelected(item);

                                    if (settingsManager.getPreference(PREFERENCE.MAVEN_COMPILE_ON_PROJECT_OPEN) === 'true') {
                                        mavenManager.compile();
                                    }

                                } else {

                                    statusManager.error(
                                            'Failed to open your project.' +
                                            ' Please review the <a href=\"javascript:alert'
                                            + '(\'Open logfile window\');">log</a>');
                                }
                            },
                            function(error) {

                                statusManager.error(error);
                            });
                },
                // Close a Project.
                close: function(item) {

                    var xhrArgs = {
                        url: FILESYSTEM.CLOSE,
                        content: {
                            filePath: item.id
                        }
                    };

                    var deferred = xhr.post(xhrArgs);

                    deferred.then(
                            function(data) {

                                if (data === '0') {

                                    treeManager.refresh('projectTree');

                                } else {

                                    statusManager.error(
                                            'Failed to close your project.'
                                            + ' Please review the <a href=\"javascript:alert'
                                            + '(\'Open logfile window\');">log</a>');
                                }
                            },
                            function(error) {

                                statusManager.error(error);
                            });
                },
                // Get file contents and load it in the appropriate editor.
                get: function(item, readonly) {

                    var contentPane;

                    // get handle on tab container
                    var tabs = dijit.byId('tabContainer');

                    // check if file is already loaded
                    var tab = dijit.byId(item.id);

                    // when we found it, set selected in the tab conatiner
                    if (tab) {

                        tabs.selectChild(tab);

                    } else {

                        var isBinary = false;

                        if (item.style === 'png'
                                || item.style === 'gif'
                                || item.style === 'jpg'
                                || item.style === 'bmp'
                                || item.style === 'tiff') {

                            isBinary = true;
                            var imageBin = this.getBinaryFile(item.id);

                        } else {

                            // get the file contents
                            var fileContents = this.getFile(item.id);
                        }

                        var tabTitle;

                        if (readonly) {
                            tabTitle = item.label + ' [readonly]';
                        } else {
                            tabTitle = item.label;
                        }

                        // create new tab
                        require(['dojo/ready', 'dojox/layout/ContentPane'],
                                function(ready, ContentPane) {
                                    ready(function() {

                                        contentPane = new ContentPane({
                                            title: tabTitle,
                                            closable: true,
                                            id: item.id,
                                            className: 'editor',
                                            onClose: function() {

                                                require(['dijit/registry'], function(registry) {

                                                    registry.remove('editor_' + item.id);
                                                });

                                                return true;
                                            }
                                        });

                                        tabs.addChild(contentPane);
                                        tabs.selectChild(contentPane);

                                        if (isBinary) {
                                            contentPane.set('content', '<img src="data:image/png;base64,' + imageBin + '">');
                                        } else {

                                            contentPane.set('content', '<textarea class="editorArea" id="editor_' + item.id + '"></textarea>');

                                            contentPane.connect(contentPane, 'onLoad', editorManager.load(item, fileContents, readonly));

                                        }
                                    });
                                });

                        // bind the editor context menu
                        var menu = registry.byId('editorMenu');
                        menu.bindDomNode(contentPane.domNode);

                    }
                },
                del: function(item) {

                    // summary : Delete an item from the filesystem.

                    var xhrArgs = {
                        url: FILESYSTEM.DELETE,
                        content: {
                            filePath: item.id
                        }
                    };

                    var deferred = xhr.post(xhrArgs);

                    deferred.then(
                            function(data) {

                                if (data === '0') {

                                    // mark trash as 'full'
                                    dijit.byId('toolBar_trash').set('iconClass', 'trashFullIcon');

                                    // remove item from tree
                                    treeManager.deleteItem(item);

                                } else {

                                    statusManager.error(
                                            'Failed to delete '
                                            + item.type +
                                            ' Please review the <a href=\"javascript:alert'
                                            + '(\'Open logfile window\');">log</a>');
                                }

                            },
                            function(error) {

                                statusManager.error(error);
                            });
                },
                create: function(item) {

                    // summary : send request to create a new file to the server

                    var data = {
                        filePath: item.id,
                        template: item.template

                    };

                    var xhrArgs = {
                        url: FILESYSTEM.CREATE,
                        postData: dojo.toJson(data)
                    };

                    var deferred = xhr.post(xhrArgs, 'JSON');

                    deferred.then(
                            function(data) {

                                if (data === '0') {

                                    // add it to the tree
                                    treeManager.addItem(item);

                                    // open it in the editor
                                    if (item.type === ITEM_TYPE.FILE) {

                                        fileManager.get(item, false);
                                    }
                                }
                            },
                            function(error) {

                                statusManager.error(error);
                            });
                },
                // Save a file to the filesystem.
                save: function(item, contents) {

                    var data = {
                        filePath: item.id,
                        contents: contents
                    };

                    var xhrArgs = {
                        url: FILESYSTEM.SAVE,
                        postData: dojo.toJson(data)
                    };

                    var deferred = xhr.post(xhrArgs, 'JSON');

                    deferred.then(
                            function(data) {

                                dijit.byId(item.id).set('title', item.label);
                                treeManager.setSavedChanges(item);
                                statusManager.info('Saved file ' + item.id);
                            },
                            function(error) {

                                statusManager.error(error);
                            });
                },
                find: function(args) {

                    var xhrArgs = {
                        url: FILESYSTEM.FIND,
                        postData: dojo.toJson(args)
                    };

                    var deferred = xhr.post(xhrArgs, 'JSON');

                    deferred.then(
                            function(data) {

                                searchManager.process(data);
                            },
                            function(error) {

                                statusManager.error(error);
                            });

                },
                getFile: function(filePath) {

                    var fileContents;

                    xhr.post({
                        url: FILESYSTEM.GET,
                        sync: true,
                        content: {
                            filePath: filePath
                        },
                        load: function(data) {

                            fileContents = data;
                        }
                    });

                    return fileContents;
                },
                getBinaryFile: function(filePath) {

                    var fileContents;

                    xhr.post({
                        url: FILESYSTEM.GET_BINARY,
                        sync: true,
                        content: {
                            filePath: filePath
                        },
                        load: function(data) {

                            fileContents = data;
                        }
                    });

                    return fileContents;
                },
                checkTrash: function() {

                    xhr.get({
                        url: FILESYSTEM.HAS_TRASH,
                        load: function(data) {

                            if (data === '0') {

                                dijit.byId('toolBar_trash').set('iconClass', 'trashEmptyIcon');

                            } else {

                                dijit.byId('toolBar_trash').set('iconClass', 'trashFullIcon');
                            }
                        }
                    });
                },
                emptyTrash: function() {

                    xhr.post({
                        url: FILESYSTEM.EMPTY_TRASH,
                        load: function(data) {

                            if (data === '0') {

                                // check the trash and update icon
                                fileManager.checkTrash();

                            } else {

                                // set error
                                statusManager.error(error);
                            }
                        }
                    });
                }

            };


        });


