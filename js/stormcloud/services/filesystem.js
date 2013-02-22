/*
 * Stormcloud IDE - stormcloud/services/filesystem
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
    'stormcloud/_base/context',
    'stormcloud/gui/statusbar',
    'stormcloud/editor/ace',
    'stormcloud/rest/xhr',
    'stormcloud/gui/state/files'], 
    function(
        context,
        statusbar,
        editor,
        xhr,
        filestate){

        //
        // module   : stormcloud/services/filesystem
        //		
        // summary  :
        //		

        // Filesystem constants.
        var FILESYSTEM = {  
        
            // Open project service url.
            OPEN : context.getApiUrl() + '/filesystem/open',
            // Close project service url.
            CLOSE : context.getApiUrl() + '/filesystem/close',
            // Move/Rename service url
            MOVE : context.getApiUrl() + '/filesystem/move',
            // Copy service url
            COPY : context.getApiUrl() + '/filesystem/copy',
            // Save resource service url
            SAVE : context.getApiUrl() + '/filesystem/save',
            // Create
            CREATE : context.getApiUrl() + '/filesystem/create',
            // Delete resource service url
            DELETE : context.getApiUrl() + '/filesystem/delete',
            // Find
            FIND : context.getApiUrl() + '/filesystem/find',
            // Get resource service url
            GET : context.getApiUrl() + '/filesystem/get',
            //
            GET_BINARY : context.getApiUrl() + '/filesystem/getBinary',
            // Check if there is things in the trash bin
            HAS_TRASH : context.getApiUrl() + '/filesystem/hasTrash'
        
        };
    
        return{

            // Rename a filesystem resource.
            rename: function(source, destination){

                var xhrArgs = {
                    url: FILESYSTEM.MOVE,
                    content: {
                        srcFilePath: source,
                        destFilePath: destination
                    }
                };
            
                var deferred = xhr.post(xhrArgs);
    
                deferred.then(
                    function(data){
            
                        if(data == '0'){
                
                            require(['stormcloud/gui/tree'],function(tree){
                
                                tree.refresh('projectTree');
                            });
                            
                        }else{
            
                            statusbar.errorStatus(
                                'Failed to open your project.'+
                                ' Please review the <a href=\"javascript:alert'
                                +'(\'Open logfile window\');">log</a>');
                        }
                    },

                    function(error){
            
                        statusbar.errorStatus(error);
                    });
            },
        
            // Copy a filesystem resource.
            copy: function(source, destination){
            
            
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
                    function(data){
            
                        if(data == '0'){
                
                            require(['stormcloud/gui/tree'],function(tree){
                
                                tree.refresh('projectTree');
                            });
                            
                        }else{
            
                            statusbar.errorStatus(
                                'Failed to copy item.'+
                                ' Please review the <a href=\"javascript:alert'
                                +'(\'Open logfile window\');">log</a>');
                        }
                    },

                    function(error){
            
                        statusbar.errorStatus(error);
                    });
            },
        
            // Open a Project.
            open: function(item){
          
                var xhrArgs = {
                    url: FILESYSTEM.OPEN,
                    content: {
                        filePath: item.id
                    }    
                };
    
                var deferred = xhr.post(xhrArgs);
    
                deferred.then(
                    function(data){
            
                        if(data == '0'){
                
                            require(['stormcloud/gui/tree'],function(tree){
                
                                tree.refresh('projectTree');
                                tree.refresh('filesystemTree');
                            });
                    
                        }else{
            
                            statusbar.errorStatus(
                                'Failed to open your project.'+
                                ' Please review the <a href=\"javascript:alert'
                                +'(\'Open logfile window\');">log</a>');
                        }
                    },

                    function(error){
            
                        statusbar.errorStatus(error);
                    });
            },
        
            // Close a Project.
            close: function(item){
          
                var xhrArgs = {
                    url: FILESYSTEM.CLOSE,
                    content: {
                        filePath: item.id
                    }
                };
    
                var deferred = xhr.post(xhrArgs);
    
                deferred.then(
                    function(data){
            
                        if(data == '0'){
                
                            require(['stormcloud/gui/tree'],function(tree){
                
                                tree.refresh('projectTree');
                            });
                
                        }else{
                
                            statusbar.errorStatus(
                                'Failed to close your project.'
                                +' Please review the <a href=\"javascript:alert'
                                +'(\'Open logfile window\');">log</a>');
                        }
                    },

                    function(error){
            
                        statusbar.errorStatus(error);
                    });
            },
        
        
            // Get file contents and load it in the appropriate editor.
            get: function(item, readonly){
          
                // if it's an empty folder that was double clicked
                // we do nothing
                if(item.type=='folder'){
                    return;
                }
          
                var contentPane;
            
                // get handle on tab container
                var tabs = dijit.byId('tabContainer');
    
                // check if file is already loaded
                var tab = dijit.byId(item.id);

                // when we found it, set selected in the tab conatiner
                if(tab != null){
                
                    tabs.selectChild(tab);
    
                }else{
                    
                    // add it to the recently opened files list
                    filestate.addOpenedFile(item);
                    
                    var isBinary = false;
                    
                    if(item.type == 'imageFile'){
                    
                        isBinary = true;
                        var imageBin = this.getBinaryFile(item.id);
                        
                    }else{
                    
                        // get the file contents
                        var fileContents = this.getFile(item.id);
                    }
                    
                    var tabTitle;
                        
                    if(readonly){
                        tabTitle = item.label + ' [readonly]';
                    }else{
                        tabTitle = item.label;
                    }
                    
                    // create new tab
                    require(["dojo/ready", "dojox/layout/ContentPane"], 
                        function(ready, ContentPane){
                            ready(function(){
                                
                                contentPane = new ContentPane({
                                    title    : tabTitle,
                                    closable : true,
                                    id : item.id,
                                    className : 'editor',
                                    onClose: function(){
                                        
                                        require(['dijit/registry'], function(registry){ 
                        
                                            registry.remove('ace_editor_' + item.id);
                                        });
                                        
                                        return true;
                                    }
                                });
                                
                                tabs.addChild(contentPane); 
                                tabs.selectChild(contentPane);
                
                                if(isBinary){
                                    contentPane.set('content','<img src="data:image/png;base64,' + imageBin + '">');
                                }else{
                                    contentPane.connect(contentPane,'onLoad',editor.loadAce(item, fileContents, readonly));    
                                }
                            });
                        });
                }	   
            },
        
        
            // Delete a file or folder from the filesystem.
            del: function(item){
    
                var xhrArgs = {
                    url: FILESYSTEM.DELETE,
                    content: {
                        filePath: item.id
                    }    
                }
    
                var deferred = xhr.post(xhrArgs);
    
                deferred.then(
                    function(data){
            
                        if(data == '0'){
          
                            require(['stormcloud/gui/tree'],function(tree){
                
                                tree.refresh('projectTree');
                            });
                            
                        }else{
            
                            statusbar.errorStatus(
                                'Failed to delete ' 
                                + item.type +
                                ' Please review the <a href=\"javascript:alert'
                                +'(\'Open logfile window\');">log</a>');
                        }
            
                    },

                    function(error){
            
                        statusbar.errorStatus(error);
                    });  
            },
    
    
            saveAll: function(){
          
                alert('SaveAll Not Supported Yet.');
          
            },
    
    
            // create a new file
            create: function(item){
              
                var data = {
        
                    filePath : item.id,
                    template : item.template
                    
                };
    
                var xhrArgs = {
                    url: FILESYSTEM.CREATE,
                    postData: dojo.toJson(data)
                };
            
                var deferred = xhr.post(xhrArgs,'JSON');
    
                deferred.then(
                    function(data){
            
                        // when succeeded, (and it's not a folder) 
                        // open it in the editor
                        if(item.type != 'folder'){
                            require(['stormcloud/services/filesystem'], function(fs){
                
                                fs.get(item, false);
                            });
                        }
                        
                        // And refresh the project tree so it shows up in there
                        require(['stormcloud/gui/tree'],function(tree){
                
                            tree.refresh('projectTree');
                        });
                    },

                    function(error){
            
                        statusbar.errorStatus(error);
                    });
            },
    
    
            // Save a file to the filesystem.
            save: function(item, contents){
    
                var data = {
        
                    filePath : item.id,
                    contents : contents
                };
    
                var xhrArgs = {
                    url: FILESYSTEM.SAVE,
                    postData: dojo.toJson(data)
                };
            
                var deferred = xhr.post(xhrArgs,'JSON');
    
                deferred.then(
                    function(data){
            
                        dijit.byId(item.id).set('title', item.label);
            
                    },

                    function(error){
            
                        statusbar.errorStatus(error);
                    });
            },
        
            find: function(args){
            
                var xhrArgs = {
                    url: FILESYSTEM.FIND,
                    postData: dojo.toJson(args)
                };
            
                var deferred = xhr.post(xhrArgs,'JSON');
    
                deferred.then(
                    function(data){
            
                        require(['stormcloud/gui/search'], function(search){
                
                            search.process(data);
                        });
                        
                    },

                    function(error){
            
            
                        console.info(error);
            
            
                        statusbar.errorStatus(error);
                    });
            
            },
        
            getFile: function(filePath){
    
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
            
            getBinaryFile: function(filePath){
    
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
        
        
        
            checkTrash: function(){
            
                xhr.get({
                    url: FILESYSTEM.HAS_TRASH,
                    sync: true,
                    load: function(data){
                    
                        if(data == '0'){
                        
                            //dijit.byId('toolBarTrash').set('iconClass','trashEmptyIcon');
                        
                        }else{
                        
                            //dijit.byId('toolBarTrash').set('iconClass','trashFullIcon');
                        }
                    }
                });
            }
        
        };
    
    
    });


