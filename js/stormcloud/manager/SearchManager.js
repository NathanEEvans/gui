/*
 * Stormcloud IDE - stormcloud/manager/SearchManager
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
    'dojo/on',
    'dijit/registry',
    'dojox/html/entities',
    'stormcloud/manager/FileManager'], 
    function(
        on,
        registry,
        entities,
        FileManager){
            
            
        //
        // module      : stormcloud/manager/SearchManager
        // 
        // summary     : 
        //               
            
        var files = new Array();
        
            
        return {
         
            // perform the search
            find: function(args){
                
                // clear any previous search
                this.clear();
                
                // send request to the filesystem service
                // @remark: i have placed the require here because when i
                //          place it in the define of the module it keeps
                //          telling my filesystem.find is not a function
                //          grrrrr...
                require(['stormcloud/service/FilesystemService'], function(FilesystemService){
       
                    FilesystemService.find(args);         
                });
              
            },
             
            process: function(data){
               
                // set the new annotations
                this._setMarkers(data);
            
                // process the editors
                this._editors();
                
                // process the problem tab
                this._searchTab();   
            },
               
            clear : function(){
            
                for (var i = 0; i < files.length; i++) {
              
                    // get a handle on the editor
                    var editor = registry.byId('ace_editor_' + files[i].id);
                
                    if(editor != undefined){
                        
                        // when found get the markers
                        var markers = editor.getSession().getMarkers(false);
                           
                        for(var marker in markers){
                            
                            if(markers[marker].clazz == 'foundLine'){
                            
                                editor.getSession().removeMarker(marker);
                                
                            }
                            
                        }   
                    }
                }
                
                // reset the search window
                var searchWindow = dojo.byId('searchWindow');
                searchWindow.innerHTML = '';
              
                // Reset the search tab title
                dijit.byId('searchTab').set('title', 'Search');
              
                // clear any previous search markers
                files = new Array();
        
            },
            
            getFiles : function(){
                return files;
            },
            
            
            _editors : function(){
                
                // define ace Range type
                var Range = ace.require('ace/range').Range
                
                // loop trough the files and see if
                // our file is in there
                for(var i = 0; i < files.length; i++){
                    
                    // get a handle on the editor
                    var editor = registry.byId('ace_editor_' + files[i].id);
                
                    var range;
                    
                    if(editor != undefined){
                        
                        for(var i2=0; i2<files[i].markers.length; i2++){
                            
                            range = new Range(
                                files[i].markers[i2].startRow-1, 
                                files[i].markers[i2].startColumn, 
                                files[i].markers[i2].endRow, 
                                files[i].markers[i2].endColumn);
                            
                            editor.getSession().addMarker(
                                range, 
                                files[i].markers[i2].clazz, 
                                files[i].markers[i2].type, 
                                files[i].markers[i2].inFront);
                        }   
                    }   
                }  
            },
            
            
            _searchTab : function(){
                
                // get handle on the search window
                var searchWindow = dojo.byId('searchWindow');
                
                // loop trough the marked files
                for(var i = 0; i < files.length; i++){
                
                    // create a new search entry
                    var divSearchEntry = document.createElement('div');
                    divSearchEntry.className = 'searchEntry';
                    
                    // create the file div
                    var divSearchFile = document.createElement('div');
                    divSearchFile.className = 'searchFile';
                    divSearchFile.innerHTML =  files[i].label + ' (' + files[i].markers.length + ')';
                    
                    var image = document.createElement('img');
                    image.src = FileManager.getImage(files[i]);
                    
                    divSearchEntry.appendChild(image);
                    
                    // loop trough the markers in the file
                    for(var i2=0; i2 < files[i].markers.length; i2++){
                    
                        var occurence = document.createElement('div');
                        occurence.className = 'searchLine';
                        occurence.setAttribute('fileId', files[i].id);
                        occurence.innerHTML = entities.encode(files[i].markers[i2].status);
                    
                        // add onclick
                        on(occurence, EVENT.CLICK, function(e) {
                            
                            // get the selected node
                            var node = e.target;
                            // get the file id
                            var fileId = node.getAttribute('fileId');
                            // construct filename
                            var fileName = fileId.substring(fileId.lastIndexOf('/') + 1, fileId.length);
                            // get file type
                            var fileType = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
                        
                            var content = node.innerHTML;
                            var lineNumber = content.substring(0,content.lastIndexOf(']')).replace('[','');
                            
                            var item = {
                            
                                id : fileId,
                                type : fileType + 'File',
                                label : fileName,
                                lineHighlight : lineNumber,
                                gotoLine : lineNumber
                                
                            }
                        
                            require(['stormcloud/service/FilesystemService'], function(FilesystemService){ 
                        
                                FilesystemService.get(item);
                            });
                        });
                    
                    
                        divSearchFile.appendChild(occurence);    
                    }
                    
                    // add the on click event handler
                    on(divSearchFile, EVENT.CLICK, function(e) {
                        
                        var nodes = e.target.getElementsByTagName('div');
                        
                        for(var n=0; n < nodes.length; n++ ){
                            
                            if(nodes[n].style.display == 'block'){
                                
                                nodes[n].style.display = 'none';
                                
                            }else{
                                
                                nodes[n].style.display = 'block';
                            }   
                        }
                    });
                    
                    divSearchEntry.appendChild(divSearchFile);
                    
                    // add it in the search window
                    searchWindow.appendChild(divSearchEntry);
                }
                
                // switch to the search result tab
                var tabs = dijit.byId('logTabs');
                // get the search tab
                var tab = dijit.byId('searchTab');
                
                // update the tab title with the amount of files we found
                tab.set('title', 'Search (' + files.length + ')');
                // when we found it, set selected in the tab conatiner
                if(tab != null){
                    tabs.selectChild(tab);
                }
              
            },
            
            _setMarkers : function(data){ 
               
                // parse the received data
                var search = JSON.parse(data);
               
                // loop trough the files
                for(var i = 0; i < search.result.length; i++){
                    
                    var fileId = search.result[i].id;
                    var fileName = fileId.substring(fileId.lastIndexOf('/') + 1, fileId.length);
                    var fileType = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
                        
                    // create the file
                    var file = {
                        
                        id : fileId,
                        label : fileName, 
                        type : fileType + 'File',
                        markers : new Array()
                    
                    }
                     
                    // first push the marker which is in the parent
                    var occurence = search.result[i].status;
                    var lineNumber = occurence.substring(0,occurence.lastIndexOf(']')).replace('[','');
                    
                    var marker = {
                        
                        startRow : parseInt(lineNumber),  
                        endRow : parseInt(lineNumber),
                        startColumn : 0,
                        endColumn : 0,
                        status : occurence,
                        clazz : 'foundLine',
                        type : 'line',
                        inFront : false
                    }
                    
                    file.markers.push(marker);
                    
                    // and push the child markers
                    for(var i2 = 0; i2 < search.result[i].children.length; i2++ ){
                        
                        occurence = search.result[i].children[i2].status;
                        lineNumber = occurence.substring(0,occurence.lastIndexOf(']')).replace('[','');
                                
                        marker = {
                        
                            startRow : parseInt(lineNumber),  
                            endRow : parseInt(lineNumber),
                            startColumn : 0,
                            endColumn : 0,
                            status : occurence,
                            clazz : 'foundLine',
                            type : 'line',
                            inFront : false
                        }
                     
                        // push the marker on the file
                        file.markers.push(marker);
                    } 
                     
                    // push the file into the files array
                    files.push(file);
                            
                }   
            }  
        }   
    });