/*
 * Stormcloud IDE - stormcloud/dialogs/Preferences
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
    'dojo/ready',
    'dojo/store/Memory',
    'dijit/form/CheckBox',
    'dijit/form/ComboBox'], 
    function(
        ready,
        Memory,
        CheckBox,
        ComboBox){
        
        //
        // module      : stormcloud/dialogs/Preferences
        // 
        // summary     : 
        //               

        return{
    
            init : function(){
                
                ready(function() {


                    //
                    // Editor Preferences
                    //
                    new CheckBox({
                        checked: settingsManager.getPreference(PREFERENCE.EDITOR_HIGHLIGHT_ACTIVE_LINE) == 'true' ? true : false,
                        onChange: function() {
                            
                            // update the preview
                            previewEditor.setHighlightActiveLine(this.get('checked'));
                            
                            // save selected value
                            settingsManager.savePreference(this.get('id'), this.get('checked'));
                            
                            // update open editors
                            editorManager.setHightlightActiveLine(this.get('checked'));
                        }
                    }, PREFERENCE.EDITOR_HIGHLIGHT_ACTIVE_LINE);

                    new CheckBox({
                        checked: settingsManager.getPreference(PREFERENCE.EDITOR_HIGHLIGHT_SELECTED_WORD) == 'true' ? true : false,
                        onChange: function() {
                            
                            previewEditor.setHighlightSelectedWord(this.get('checked'));
                            
                            settingsManager.savePreference(this.get('id'), this.get('checked'));
                            
                            editorManager.setHighlightSelectedWord(this.get('checked'));
                        }
                    }, PREFERENCE.EDITOR_HIGHLIGHT_SELECTED_WORD);

                    new CheckBox({
                        checked: settingsManager.getPreference(PREFERENCE.EDITOR_SHOW_INVISIBLES) == 'true' ? true : false,
                        onChange: function() {
                            
                            previewEditor.setShowInvisibles(this.get('checked'));
                            
                            settingsManager.savePreference(this.get('id'), this.get('checked'));
                            
                            editorManager.setShowInvisibles(this.get('checked'));
                        }
                    }, PREFERENCE.EDITOR_SHOW_INVISIBLES);


                    new CheckBox({
                        checked: settingsManager.getPreference(PREFERENCE.EDITOR_SHOW_INDENT_GUIDES) == 'true' ? true : false,
                        onChange: function() {

                            previewEditor.setDisplayIndentGuides(this.get('checked'));
                            
                            settingsManager.savePreference(this.get('id'), this.get('checked'));
                            
                            editorManager.setDisplayIndentGuides(this.get('checked'));
                        }
                    }, PREFERENCE.EDITOR_SHOW_INDENT_GUIDES);


                    new CheckBox({
                        checked: settingsManager.getPreference(PREFERENCE.EDITOR_SHOW_GUTTER) == 'true' ? true : false,
                        onChange: function() {
                            
                            previewEditor.renderer.setShowGutter(this.get('checked'));
                            
                            settingsManager.savePreference(this.get('id'), this.get('checked'));
                            
                            editorManager.setShowGutter(this.get('checked'));
                        }
                    }, PREFERENCE.EDITOR_SHOW_GUTTER);


                    new CheckBox({
                        checked: settingsManager.getPreference(PREFERENCE.EDITOR_SHOW_PRINT_MARGIN) == 'true' ? true : false,
                        onChange: function() {
                            
                            previewEditor.renderer.setShowPrintMargin(this.get('checked'));
                            
                            settingsManager.savePreference(this.get('id'), this.get('checked'));
                            
                            editorManager.setShowPrintMargin(this.get('checked'));
                        }
                    }, PREFERENCE.EDITOR_SHOW_PRINT_MARGIN);

                    new CheckBox({
                        checked: settingsManager.getPreference(PREFERENCE.EDITOR_USE_SOFT_TAB) == 'true' ? true : false,
                        onChange: function() {
                            
                            previewEditor.getSession().setUseSoftTabs(this.get('checked'));
                            
                            settingsManager.savePreference(this.get('id'), this.get('checked'));
                            
                            editorManager.setUseSoftTabs(this.get('checked'));
                        }
                    }, PREFERENCE.EDITOR_USE_SOFT_TAB);

                    new CheckBox({
                        checked: settingsManager.getPreference(PREFERENCE.EDITOR_FADE_FOLD_WIDGETS) == 'true' ? true : false,
                        onChange: function() {
                            
                            previewEditor.renderer.setFadeFoldWidgets(this.get('checked'));
                            
                            settingsManager.savePreference(this.get('id'), this.get('checked'));
                            
                            editorManager.setFadeFoldWidgets(this.get('checked'));
                        }
                    }, PREFERENCE.EDITOR_FADE_FOLD_WIDGETS);


                    //
                    // Maven preferences
                    //
                    new CheckBox({
                        checked: settingsManager.getPreference(PREFERENCE.MAVEN_COMPILE_ON_SAVE) == 'true' ? true : false,
                        onChange: function() {
                            
                            settingsManager.savePreference(this.get('id'), this.get('checked'));
                        }
                    }, PREFERENCE.MAVEN_COMPILE_ON_SAVE);

                    new CheckBox({
                        checked: settingsManager.getPreference(PREFERENCE.MAVEN_COMPILE_ON_PROJECT_OPEN) == 'true' ? true : false,
                        onChange: function() {
                            
                            settingsManager.savePreference(this.get('id'), this.get('checked'));
                        }
                    }, PREFERENCE.MAVEN_COMPILE_ON_PROJECT_OPEN);


        
                });
            },
            
            close : function(){
              
                dialogManager.hide(DIALOG.PREFERENCES);
            }
        }
    });