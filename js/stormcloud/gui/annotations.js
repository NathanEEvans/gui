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
    'dijit/registry'], 
    function(
        registry){
   
   
        //
        // module      : stormcloud/gui/annotations
        // 
        // summary     : 
        //               
        var errors = new Array();
            
        // @todo
        var warnings;
        
        
        
        return{
    
    
            process : function(lines){
               
                // set the new annotations
                this._setErrorAnnotations(lines);
                
                // process the editors
                this._editors();
              
            },
            
            
            clear : function(){
                
                
                // loop trough the errors to clear them
                for (var i = 0; i < errors.length; i++) {
              
                    console.info('Check editor ' + errors[i].fileId);
              
                    // get a handle on the editor
                    var editor = registry.byId('ace_editor_' + errors[i].fileId);
                
                    if(editor != undefined){
                        
                        console.info('Found editor.');
                        
                        // when found, clear the annotations
                        editor.getSession().setAnnotations([]);
                    }
                }
                
                // clear the previous error annotations array
                errors = new Array();
                
            },
            
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
            
            
            _tabs: function(){
              
              
              
              
            },
            
            _tree : function(){
              
              
            },
    
    
            
    
            _setErrorAnnotations : function(lines, type){
            
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