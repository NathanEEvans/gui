/*
 * Stormcloud IDE - stormcloud/gui/annotations
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
    'dojox/html/entities'], 
    function(
        on,
        registry,
        entities){
   
   
        //
        // module      : stormcloud/gui/annotations
        // 
        // summary     : 
        //               
        var errors = new Array();
        
        return{
    
    
            process : function(lines){
               
                // set the new annotations
                this._setAnnotations(lines);
                
                // process the editors
                this._editors();
                
                // process the problem tab
                this._problemTab();
                
                // process the editor tabs
                this._tabs();
              
            },
            
            // Takes care of clearing all annotations
            // including errors on the problem tab
            clear : function(){
                
                // Clear the opened editors
                // loop trough the errors to clear them
                for (var i = 0; i < errors.length; i++) {
              
                    // get a handle on the editor
                    var editor = registry.byId('ace_editor_' + errors[i].fileId);
                
                    if(editor != undefined){
                        // when found, clear the annotations
                        editor.clearAnnotations();
                    }
                }
                
                // clear the tab icons
                for (i = 0; i < errors.length; i++) {
              
                    // check to see if it's opened'
                    var tab = dijit.byId(errors[i].fileId);
                    
                    if(tab != undefined){
                        tab.set('iconClass','');    
                    }
                }
                
                // Clear the problem Tab
                var problemWindow = dojo.byId('problemWindow');
                problemWindow.innerHTML = '';

                // Reset the problem tab title
                dijit.byId('problemTab').set('title', 'Problems');
              
                // clear the previous error annotations array
                errors = new Array();
            },
            
            // method for other components to retrieve the 
            // current annotations
            getErrors : function(){
                return errors;
            },
            
            
            // Takes care of annotating problems in 
            // opened editors
            _editors : function(){
                
                
                // loop trough the erros
                for (var i = 0; i < errors.length; i++) {
              
                    // get a handle on the editor
                    var editor = registry.byId('ace_editor_' + errors[i].fileId);
                
                    if(editor != undefined){
                        
                        // when found, set the annotations
                        editor.getSession().setAnnotations(errors[i].annotations);
   
                    }
                }  
            },
            
            // Takes care of reporting the problems in
            // the problems tab
            _problemTab : function(){
              
                
                var problemWindow = dojo.byId('problemWindow');
              
                var problemCount=0;
              
                // loop trough the erros
                for (var i = 0; i < errors.length; i++) {
                    
                    // Add a link for each annotation
                    for(var i2 = 0; i2 < errors[i].annotations.length; i2++){
              
                        // the annoying count out of sync thing
                        var row = errors[i].annotations[i2].row + 1;

                        // create problem link entry
                        var problem = 
                        '<div class="problemIcon"></div>' +
                        '<div class="problemFileName">' + errors[i].fileId + '</div>' +
                        '<div class="problemRange">['+ row + ',' + errors[i].annotations[i2].column + ']</div>' + 
                        '<div class="problemMessage">' + entities.encode(errors[i].annotations[i2].text) + '</div>';
                        
                        var div = document.createElement('div');
                        
                        // add an onClick event handler
                        on(div, EVENT.CLICK, function(e) {

                            var fileId;
                        
                            // get the fileid from the clicked target
                            var problem = e.currentTarget;
                            for (var i = 0; i < problem.childNodes.length; i++) {
                                if (problem.childNodes[i].className == 'problemFileName') {
                                    fileId = problem.childNodes[i].innerHTML;
                                    break;
                                }        
                            }
                            
                            // Get the fileName from the fileId
                            // for the item label
                            var fileName = fileId.substring(fileId.lastIndexOf('/') + 1, fileId.length);
                        
                            // create an item entry for click processing
                            // to open a file
                            var item = {
                            
                                id : fileId,
                                type : 'javaFile',
                                label : fileName
                            }
              
                            require(['stormcloud/services/filesystem'], function(filesystem){ 
                        
                                filesystem.get(item);
                            });
                            
                        });
                        
                        div.className = 'problemEntry';
                        div.innerHTML = problem;
                    
                        // add it in the problem window
                        problemWindow.appendChild(div);
                        problemCount++;
                    }
                    
                }
                
                // switch to the problem tab
                var tabs = dijit.byId('logTabs');
                // get the problem tab
                var tab = dijit.byId('problemTab');
                
                // update the tab title with the amount of errors we found
                tab.set('title', 'Problems (' + problemCount + ')');
                // when we found it, set selected in the tab conatiner
                if(tab != null){
                    tabs.selectChild(tab);
                }
              
            },
            
            
            // annotate the opened editor tabs
            _tabs: function(){
              
                // loop trough the erros
                for (var i = 0; i < errors.length; i++) {
              
                    // check to see if it's opened'
                    var tab = dijit.byId(errors[i].fileId);
                    
                    if(tab != undefined){
                        tab.set('iconClass','problemIcon');    
                    }
                }
            },
            
            _tree : function(){
              
              
            },
    
    
            
    
            _setAnnotations : function(lines, type){
            
                for (var i = 0; i < lines.length; i++) {
              
                    // long riddle of chopping till we get what we want
                    var s = lines[i].replace('[ERROR] ','');
                    var fileId = s.substring(0,s.indexOf(':'));
                    s = s.replace(fileId,'').replace(':[','');
                    var lineAndColumn = s.substring(0, s.indexOf(']')).split(',');
                    var message = s.substring(s.indexOf(']') + 2, s.length);
                    var lineNumber = lineAndColumn[0];
                    var columnNumber = lineAndColumn[1];
                    
                    var exists = false;
                    
                    // the -1 on the lineNumber is a bit strange but
                    // it consequently ends up 1 row lower.
                    // probably 0 based line count in the editor
                    var annotation = {                      
                        text : message,
                        row : lineNumber-1,
                        column : columnNumber,
                        type : 'error'
                    }
                    
                    // check if this file is already in the array
                    for (var i2 = 0; i2 < errors.length; i2++) {
                       
                        if(errors[i2].fileId == fileId){
                    
                            // when found push the annotations
                            errors[i2].annotations.push(annotation);
                            exists = true;
                        }
                    }
                    
                    if(!exists){
                    
                        // if it was not found push the file
                        var file = {
                        
                            fileId : fileId,
                            annotations : [{                      
                                text : message,
                                row : lineNumber-1,
                                column : columnNumber,
                                type : 'error'
                            }]    
                        }
                        
                        errors.push(file);
                    }
                }
            }
    
        };


    });