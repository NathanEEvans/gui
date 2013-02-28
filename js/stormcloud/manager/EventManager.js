/*
 * Stormcloud IDE - stormcloud/manager/EventManager
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
    'stormcloud/manager/TreeManager',
    'stormcloud/manager/DialogManager',
    'stormcloud/manager/MavenManager',
    'stormcloud/manager/FileManager'],
    function(
        on,
        registry,
        TreeManager,
        DialogManager,
        MavenManager,
        FileManager){

        //
        // module       : stormcloud/manager/EventManager
        // 
        // summary      : 
        //

        EVENT = {
            // “click” - the user clicked a node
            CLICK: 'click',
            // dblclick - double clicked a node
            DOUBLE_CLICK : 'dblclick',
            // “focus” - a node received focus
            FOCUS: 'focus',
            //“blur” - a node was ‘blurred’, or otherwise lost focus
            BLUR: 'blur',
            //“change” - an input value was changed
            CHANGE: 'change',
            //“keypress” - fired when the user presses a key that displays
            KEYPRESS: 'keypress',
            //“keydown” - fired for non-printable keys
            KEYDOWN: 'keydown',
            //“keyup” - fired when the user releases a key
            KEYUP: 'keyup',
            //“mouseover” - a node was hovered (warning: may fire more than you’d like because of bubbling)
            MOUSEOVER: 'mouseover',
            //“mouseout” - a node was un-hovered
            MOUSEOUT: 'mouseout',
            //submit - a form has been submitted
            SUBMIT: 'submit'

        /** 
         * @todo find usable implementation for the dojo mouse events
         * dojo/mouse#enter - a normalized version of onmouseover that wont fire more than you’d like (only on first enter)    
         * dojo/mouse#leave - a normalized version of onmouseout that wont fire more than you’d like (only once when leaving)
         */

        }
        
        
        
        MENU = {
            
            STORMCLOUD : {
                
                ABOUT : 'stormcloudMenu_about',
                PREFERENCES : 'stormcloudMenu_preferences',
                MY_ACCOUNT : 'stormcloudMenu_my_account'
            },
            
            FILE : {
                
                NEW_FILE : 'fileMenu_new_file',
                NEW_PROJECT : 'fileMenu_new_project',
                CLONE_REMOTE : 'fileMenu_clone_remote',
                OPEN_PROJECT : 'fileMenu_open_project',
                IMPORT_PROJECT : 'fileMenu_import_project',
                EXPORT_PROJECT : 'fileMenu_export_project',
                SAVE_ALL : 'fileMenu_save_all'
            },
            
            EDIT : {
                
                FIND : 'editMenu_find_in_projects',
                REPLACE : 'editMenu_replace_in_projects'
            },
            
            
            TOOLS : {
                
                TEMPLATES : 'toolsMenu_templates'
            }
        }
        
        
        CONTEXT_MENU = {
            
            PROJECT : {
                
                COMPILE : 'projectMenu_compile_project',
                CLEAN : 'projectMenu_clean_project',
                INSTALL : 'projectMenu_install_project',
                CUSTOM : 'projectMenu_custom_goals'
                
            },
            
            FILESYSTEM : {
                
                NEW : 'filesystemMenu_new',
                OPEN : 'filesystemMenu_open'
                
            }
            
            
        }
        
        
        TABS = {
            
            SEARCH : {
                
                REDEFINE : 'toolbarSearch_redefine',
                CLEAR : 'toolbarSearch_clear'
            },
            
            MAVEN : {
                
                RERUN : 'toolBarMaven_rerun',
                RUN : 'toolBarMaven_run'
            }
            
            
            
        }
        
        
        
        TREE = {
            
            CLOSED_PROJECTS : 'closedProjectTree'
        }
        

        return {


            registerClick : function(node, listener){
                
                on(registry.byId(node), EVENT.CLICK, listener);
                
            },
            
            
            
            bindEvents : function(){
                
                
                
                //
                // Stormcloud Menu
                //
                this.registerClick(MENU.STORMCLOUD.ABOUT, function() {

                    DialogManager.show(DIALOG.ABOUT);
                });

                this.registerClick(MENU.STORMCLOUD.PREFERENCES, function() {

                    DialogManager.show(DIALOG.PREFERENCES);
                });

                this.registerClick(MENU.STORMCLOUD.MY_ACCOUNT, function() {

                    DialogManager.show(DIALOG.MY_ACCOUNT);
                });
                
                
                
                //
                // File Menu
                //
                this.registerClick(MENU.FILE.NEW_FILE, function() {

                    DialogManager.show(DIALOG.NEW_FILE);
                });

                this.registerClick(MENU.FILE.NEW_PROJECT, function() {

                    DialogManager.show(DIALOG.NEW_PROJECT);
                });

                this.registerClick(MENU.FILE.CLONE_REMOTE, function() {

                    DialogManager.show(DIALOG.CLONE_REMOTE);
                });

                this.registerClick(MENU.FILE.OPEN_PROJECT, function() {

                    DialogManager.show(DIALOG.OPEN_PROJECT);

                    TreeManager.refresh(TREE.CLOSED_PROJECTS);
                });

                this.registerClick(MENU.FILE.IMPORT_PROJECT, function() {

                    DialogManager.show(DIALOG.IMPORT_PROJECT);
                });

                this.registerClick(MENU.FILE.EXPORT_PROJECT, function() {

                    DialogManager.show(DIALOG.EXPORT_PROJECT);
                });

                this.registerClick(MENU.FILE.SAVE_ALL, function() {

                    alert('Not yet Implemented');
                });
                
                
                //
                // Edit Menu
                // 
                this.registerClick(MENU.EDIT.FIND, function() {

                    DialogManager.show(DIALOG.FIND);
                });

                this.registerClick(MENU.EDIT.REPLACE, function() {

                    alert('Not yet Implemented');
                });


                //
                // Tools Menu
                //
                this.registerClick(MENU.TOOLS.TEMPLATES, function() {

                    DialogManager.show(DIALOG.TEMPLATES);
                });


                //
                // Project Context Menu
                //
                this.registerClick(CONTEXT_MENU.PROJECT.COMPILE, function() {

                    MavenManager.compile();
                });

                this.registerClick(CONTEXT_MENU.PROJECT.CLEAN, function() {

                    MavenManager.clean();
                });

                this.registerClick(CONTEXT_MENU.PROJECT.INSTALL, function() {

                    MavenManager.install();
                });

                this.registerClick(CONTEXT_MENU.PROJECT.CUSTOM, function() {

                    DialogManager.show(DIALOG.CUSTOM_GOALS);
                });



                //
                // Filesystem Context menu
                //
                this.registerClick(CONTEXT_MENU.FILESYSTEM.NEW, function() {

                    DialogManager.show(DIALOG.NEW_FILE);
                });

                this.registerClick(CONTEXT_MENU.FILESYSTEM.OPEN, function() {
 
                    FileManager.get(dijit.byId('projectTree').attr('selectedItem'), false);
                });

                this.registerClick('filesystemMenu_cut', function() {

                    FileManager.setMoveSource();
                });

                this.registerClick('filesystemMenu_copy', function() {

                    FileManager.setCopySource();
                });

                this.registerClick('filesystemMenu_paste', function() {

                    FileManager.setDestination();       
                });

                this.registerClick('filesystemMenu_download', function() {

                    alert('Not Implemented');
                });

                this.registerClick('filesystemMenu_delete', function() {

                
                    DialogManager.show(DIALOG.DELETE);

                });

                this.registerClick('filesystemMenu_rename', function() {

                    alert('Not Implemented');

                });

                this.registerClick('filesystemMenu_move', function() {

                    alert('Not Implemented');

                });

                this.registerClick('filesystemMenu_safe_delete', function() {

                    alert('Not Implemented');

                });



                //
                // Tab Toolbars
                //
                this.registerClick(TABS.SEARCH.REDEFINE, function() {
                    
                    DialogManager.show(DIALOG.FIND);
                });
                
                this.registerClick(TABS.SEARCH.CLEAR, function() {
                    
                    SearchManager.clear();
                });
    
                this.registerClick(TABS.MAVEN.RUN, function() {
                    
                    DialogManager.show(DIALOG.CUSTOM_GOALS);
                });
                
                this.registerClick(TABS.MAVEN.RERUN, function() {
                    
                    MavenManager.runLastCommand();
                });

            }

        };
    });

