/*
 * Stormcloud IDE - stormcloud/editor/ace
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
    'stormcloud/gui/annotations',
    'stormcloud/gui/search'], 
    function(
        registry,
        annotations,
        search){
   
        // module      : stormcloud/editor/ace
        // 
        // summary     :
        //		
        //		
   
        return{
       
            loadAce : function(item, contents, readonly){
           
                var editor = ace.edit(item.id);
                
                // set the general highlighting theme
                editor.setTheme("ace/theme/eclipse");
            
                // set the file contents
                // this has to stay here before event binding
                // otherwise events will already be triggered
                // like the onchange event.
                editor.getSession().setValue(contents);

                // set the read/write mode
                editor.setReadOnly(readonly); 

                // Set the correct language mode
                this._setMode(editor, item);
                
                // Add the editor keyboard bindings (shortcut-keys)
                this._setKeyBindings(editor, item);

                // set the editor events
                this._setEvents(editor, item);
            
                // set annotations (if any)
                this._setAnnotations(editor, item);
                
                // set any lines tht need highlighting
                this._setMarkers(editor, item);
                
                // jump to any possibly requested line
                this._gotoLine(editor, item);
                
                // register the editor in the registry for
                // future reference
                editor.id = 'ace_editor_' + item.id;
                var rEditor = registry.byId('ace_editor_' + item.id);

                if(rEditor == undefined){
                    registry.add(editor);
                }                
            },
        
            
            // determine the editor language mode
            _setMode: function(editor, item ){
            
            
                if(item.type == 'javaFile'){
                    editor.getSession().setMode("ace/mode/java");            
                }
            
                if(item.type == 'jspFile'){
                    editor.getSession().setMode("ace/mode/jsp");    
                }
            
                if(item.type == 'jsFile'){
                    editor.getSession().setMode("ace/mode/javascript");    
                }
            
                if(item.type == 'xmlFile' 
                    || item.type == 'projectSettings'
                    || item.type == 'flowDesign'
                    || item.type == 'mavenSettings'
                    || item.type == 'wsdlFile'
                    || item.type == 'xsdFile'
                    || item.type == 'xhtmlFile'
                    || item.type == 'tldFile'
                    || item.type == 'xslFile'
                    ){
                    editor.getSession().setMode("ace/mode/xml");    
                }
                
                if(item.type == 'htmlFile'){
                    editor.getSession().setMode("ace/mode/html");    
                }
            
                if(item.type == 'sqlFile'){
                    editor.getSession().setMode("ace/mode/sql");    
                }
            
                if(item.type == 'textFile'){
                    editor.getSession().setMode("ace/mode/text");    
                }
            
                if(item.type == 'cssFile'){
                    editor.getSession().setMode("ace/mode/css");    
                }
            },
            
            _setKeyBindings : function(editor, item){
                
                // save the file contents
                editor.commands.addCommand({
                    name: 'saveCommand',
                    bindKey: {
                        win: 'Ctrl-S',  
                        mac: 'Command-S'
                    },
                    exec: function(editor) {
                         
                        require(['stormcloud/services/filesystem'], function(filesystem){ 
                         
                            filesystem.save(item, editor.getValue());
                                    
                        });                 
                    }
                });
            
                editor.commands.addCommand({
                    name: 'autoCompleteCommand',
                    bindKey: {
                        win: 'Ctrl-Space',  
                        mac: 'Ctrl-Space'
                    },
                    exec: function(editor) {
                                 
                        var pos = editor.getCursorPositionScreen();            
                                        
                        for(prop in pos){
                            alert(prop + ' ' + pos[prop]);
                        }
                    }
                });
            },
            
            
            _setEvents : function(editor, item){
                
                // Change tab to bold when file edited
                editor.getSession().on('change',function(){

                    dijit.byId(item.id).set('title', '<b>'+item.label+'</b>');
                                    
                });
                
                
                // select the file in the tree when focus received
                editor.on('focus',function(){

                    require(['stormcloud/gui/tree'], function(tree){ 

                        tree.select('projectTree', item);
                    });
                });
                
            },
            
            
            _setAnnotations: function(editor, item){
                
                // get error annotations
                var errors = annotations.getErrors();
                
                // loop trough the erros
                for (var i = 0; i < errors.length; i++) {
              
                    // check if this annotation is for this file
                    if(errors[i].fileId == item.id){
                       
                        // when matched, set the annotations in the editor
                        editor.getSession().setAnnotations(errors[i].annotations);
                        
                        // while at it change the tab icon as well
                        var tab = dijit.byId(errors[i].fileId);
                        if(tab != undefined){
                            tab.set('iconClass','problemIcon');    
                        }    
                    }
                }  
            },
            
            
            _setMarkers : function (editor, item){
                
                // get the files from the search
                var files = search.getFiles();
                
                // define ace Range type
                var Range = ace.require('ace/range').Range
                
                // loop trough the files and see if
                // our file is in there
                for(var i = 0; i < files.length; i++){
                    
                    // when file found process
                    // the markers
                    if(files[i].id == item.id){
                        
                        var range;
                        
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
            
            
            
            _gotoLine : function(editor, item){
                
                
            //                if(item.gotoLine){
            //                    
            //                    var row = parseInt(item.gotoLine)-1;
            //                    
            //                    editor.gotoLine(row);
            //                    
            //                    // one line above
            //                    editor.scrollToRow(row-2);
            //                    
            //                    
            //                }
            //                
                
                
            }

        }
    });
