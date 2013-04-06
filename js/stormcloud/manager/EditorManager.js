/*
 * Stormcloud IDE - stormcloud/manager/EditorManager
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
   
        // module      : stormcloud/manager/EditorManager
        // 
        // summary     :
        //		
        //		
   
        return{
       
            load : function(item, contents, readonly){
           
                var editor = ace.edit(item.id);
                
                // set the user editor preferences
                this.setEditorPreferences(editor);
                
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
                var registeredEditor = registry.byId('ace_editor_' + item.id);

                if(registeredEditor == undefined){
                    registry.add(editor);
                }                
            },
        
            
            setEditorPreferences : function(editor){
              
              
                editor.setHighlightActiveLine(settingsManager.getPreference(PREFERENCE.EDITOR_HIGHLIGHT_ACTIVE_LINE) == 'true' ? true : false);         
                editor.setHighlightSelectedWord(settingsManager.getPreference(PREFERENCE.EDITOR_HIGHLIGHT_SELECTED_WORD) == 'true' ? true : false);
                editor.setShowInvisibles(settingsManager.getPreference(PREFERENCE.EDITOR_SHOW_INVISIBLES) == 'true' ? true : false);
                editor.setDisplayIndentGuides(settingsManager.getPreference(PREFERENCE.EDITOR_SHOW_INDENT_GUIDES) == 'true' ? true : false);
                editor.renderer.setShowGutter(settingsManager.getPreference(PREFERENCE.EDITOR_SHOW_GUTTER) == 'true' ? true : false);
                editor.renderer.setShowPrintMargin(settingsManager.getPreference(PREFERENCE.EDITOR_SHOW_PRINT_MARGIN) == 'true' ? true : false);
                editor.getSession().setUseSoftTabs(settingsManager.getPreference(PREFERENCE.EDITOR_USE_SOFT_TAB) == 'true' ? true : false);
                editor.renderer.setFadeFoldWidgets(settingsManager.getPreference(PREFERENCE.EDITOR_FADE_FOLD_WIDGETS) == 'true' ? true : false);
              
                editor.setTheme(settingsManager.getPreference(PREFERENCE.EDITOR_THEME));
                //editor.setFontSize(settingsManager.getPreference(PREFERENCE.EDITOR_FONT_SIZE));
                editor.session.setFoldStyle(settingsManager.getPreference(PREFERENCE.EDITOR_CODE_FOLDING));
                //editor.setKeyboardHandler(settingsManager.getPreference(PREFERENCE.EDITOR_KEY_BINDINGS));
        
                switch (settingsManager.getPreference(PREFERENCE.EDITOR_SOFT_WRAP)) {

                    case 'off':
                        editor.session.setUseWrapMode(false);
                        editor.renderer.setPrintMarginColumn(80);
                        break;

                    case 'free':
                        editor.session.setUseWrapMode(true);
                        editor.session.setWrapLimitRange(null, null);
                        editor.renderer.setPrintMarginColumn(80);
                        break;

                    default:
                        editor.session.setUseWrapMode(true);
                        var col = parseInt(settingsManager.getPreference(PREFERENCE.EDITOR_SOFT_WRAP), 10);
                        editor.session.setWrapLimitRange(col, col);
                        editor.renderer.setPrintMarginColumn(col);

                }
            },
            
            setHightlightActiveLine : function(value){
              
                var tc = dijit.byId('tabContainer');
                var tabs = tc.getChildren();

                for(var i = 0; i < tabs.length; i++){
                    
                    var editor = registry.byId('ace_editor_' + tabs[i].id);
                    
                    editor.setHighlightActiveLine(value);
                }
              
            },
            
            setTheme : function(value){
              
                var tc = dijit.byId('tabContainer');
                var tabs = tc.getChildren();

                for(var i = 0; i < tabs.length; i++){
                    
                    var editor = registry.byId('ace_editor_' + tabs[i].id);
                    
                    editor.setTheme(value);
                }
            },
            
            setFoldStyle : function(value){
              
                var tc = dijit.byId('tabContainer');
                var tabs = tc.getChildren();

                for(var i = 0; i < tabs.length; i++){
                    
                    var editor = registry.byId('ace_editor_' + tabs[i].id);
                    
                    editor.session.setFoldStyle(value);
                }
            },
            
            setSoftWrap : function(value){
              
                var tc = dijit.byId('tabContainer');
                var tabs = tc.getChildren();

                for(var i = 0; i < tabs.length; i++){
                    
                    var editor = registry.byId('ace_editor_' + tabs[i].id);
                    
                    switch (value) {

                        case 'off':
                            editor.session.setUseWrapMode(false);
                            editor.renderer.setPrintMarginColumn(80);
                            break;

                        case 'free':
                            editor.session.setUseWrapMode(true);
                            editor.session.setWrapLimitRange(null, null);
                            editor.renderer.setPrintMarginColumn(80);
                            break;

                        default:
                            editor.session.setUseWrapMode(true);
                            var col = parseInt(value, 10);
                            editor.session.setWrapLimitRange(col, col);
                            editor.renderer.setPrintMarginColumn(col);
                    }
                }
            },
            
            setHighlightActiveLine : function(value){
              
                var tc = dijit.byId('tabContainer');
                var tabs = tc.getChildren();

                for(var i = 0; i < tabs.length; i++){
                    
                    var editor = registry.byId('ace_editor_' + tabs[i].id);
                    
                    editor.setHighlightActiveLine(value);
                }
            },
            
            setHighlightSelectedWord : function(value){
              
                var tc = dijit.byId('tabContainer');
                var tabs = tc.getChildren();

                for(var i = 0; i < tabs.length; i++){
                    
                    var editor = registry.byId('ace_editor_' + tabs[i].id);
                    
                    editor.setHighlightSelectedWord(value);
                }
            },
            
            setShowInvisibles : function(value){
              
                var tc = dijit.byId('tabContainer');
                var tabs = tc.getChildren();

                for(var i = 0; i < tabs.length; i++){
                    
                    var editor = registry.byId('ace_editor_' + tabs[i].id);
                    
                    editor.setShowInvisibles(value);
                }
            },
            
            
            setDisplayIndentGuides : function(value){
              
                var tc = dijit.byId('tabContainer');
                var tabs = tc.getChildren();

                for(var i = 0; i < tabs.length; i++){
                    
                    var editor = registry.byId('ace_editor_' + tabs[i].id);
                    
                    editor.setDisplayIndentGuides(value);
                }
            },
            
            
            setShowGutter : function(value){
              
                var tc = dijit.byId('tabContainer');
                var tabs = tc.getChildren();

                for(var i = 0; i < tabs.length; i++){
                    
                    var editor = registry.byId('ace_editor_' + tabs[i].id);
                    
                    editor.renderer.setShowGutter(value);
                }
            },
            
            
            setShowPrintMargin : function(value){
              
                var tc = dijit.byId('tabContainer');
                var tabs = tc.getChildren();

                for(var i = 0; i < tabs.length; i++){
                    
                    var editor = registry.byId('ace_editor_' + tabs[i].id);
                    
                    editor.renderer.setShowPrintMargin(value);
                }
            },
            
            setUseSoftTabs : function(value){
              
                var tc = dijit.byId('tabContainer');
                var tabs = tc.getChildren();

                for(var i = 0; i < tabs.length; i++){
                    
                    var editor = registry.byId('ace_editor_' + tabs[i].id);
                    
                    editor.session.setUseSoftTabs(value);
                }
            },
            
            
            setFadeFoldWidgets : function(value){
              
                var tc = dijit.byId('tabContainer');
                var tabs = tc.getChildren();

                for(var i = 0; i < tabs.length; i++){
                    
                    var editor = registry.byId('ace_editor_' + tabs[i].id);
                    
                    editor.renderer.setFadeFoldWidgets(value);
                }
            },
                
            
            getEditorContents : function(item){
              
                // summary : get the contents of an editor based on the item
              
                var editor = registry.byId('ace_editor_' + item.id);
              
                if(editor){
                    return editor.getValue();
                }
              
                return undefined;
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
                         
                        fileManager.save();
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

                    // if the preference is true we select the file in the tree
                    if(settingsManager.getPreference(PREFERENCE.SYNC_EDITOR_VIEWS) == 'true'
                        || settingsManager.getPreference(PREFERENCE.SYNC_EDITOR_VIEWS) == true){
                
                        treeManager.select('projectTree', item);
                    }
                    
                    // select the project this file belongs to
                    projectManager.setSelected(item);
                    
                    // set the file that was selected
                    fileManager.setSelected(item);
                        
                });
            },
            
            
            _setAnnotations: function(editor, item){
                
                // get error annotations
                var errors = annotationManager.getErrors();
                
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
                var files = searchManager.getFiles();
                
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
                
                if(item.gotoLine){
                                
                    var row = parseInt(item.gotoLine)-1;
                                
                    editor.gotoLine(row);
                                
                    // one line above
                    editor.scrollToRow(row-2);                
                }
            },
            
            toggleBreakpoint : function(){
                
            // summary : set or remove breakpoint in editor on the
            //           currently selected line
                
                
                
                
            }
        }
    });
