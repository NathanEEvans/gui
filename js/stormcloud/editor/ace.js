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
define([], 
    function(
        ){
   
        // module      : stormcloud/editor/ace
        // 
        // summary     :
        //		
        //		
   
        return{
       
            loadAce : function(item, contents, readonly){
           
                var editor = ace.edit(item.id);
                editor.setTheme("ace/theme/eclipse");
            
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
            
                editor.getSession().setValue(contents);
                                
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
            
                editor.setReadOnly(readonly); 
                                
                editor.getSession().on('change',function(){

                    dijit.byId(item.id).set('title', '<b>'+item.label+'</b>');
                                    
                });
            }
        }
    });
