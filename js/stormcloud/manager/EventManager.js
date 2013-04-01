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
    'dijit/registry'],
    function(
        on,
        registry){

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
        
        return {

            register : function(node, type, listener){
                
                on(registry.byId(node), type, listener);
            },

            registerClick : function(node, listener){
                
                on(registry.byId(node), EVENT.CLICK, listener);
            },
            
            registerDoubleClick : function(node, listener){
              
                on(registry.byId(node), EVENT.DOUBLE_CLICK, listener);
            },
            
            registerFocus : function(node, listener){
              
                on(registry.byId(node), EVENT.FOCUS, listener);
            },
            
            registerBlur : function(node, listener){
              
                on(registry.byId(node), EVENT.BLUR, listener);
            },

            registerChange : function(node, listener){
              
                on(registry.byId(node), EVENT.CHANGE, listener);
            },
            
            registerKeyPress : function(node, listener){
              
                on(registry.byId(node), EVENT.KEYPRESS, listener);
            },
            
            registerKeyDown : function(node, listener){
              
                on(registry.byId(node), EVENT.KEYDOWN, listener);
            },

            registerKeyUp : function(node, listener){
              
                on(registry.byId(node), EVENT.KEYUP, listener);
            },

            registerMouseOver : function(node, listener){
                
                on(registry.byId(node), EVENT.MOUSEOVER, listener);
            },

            registerMouseOut : function(node, listener){
              
                on(registry.byId(node), EVENT.MOUSEOUT, listener);
            },
            
            registerSubmit : function(node, listener){
              
                on(registry.byId(node), EVENT.SUBMIT, listener);
            },

            bind : function(){
                
                //
                // Stormcloud Menu
                //
                this.registerClick(MENU.STORMCLOUD.ABOUT, function() {

                    dialogManager.show(DIALOG.ABOUT);
                });

                this.registerClick(MENU.STORMCLOUD.PREFERENCES, function() {

                    dialogManager.show(DIALOG.PREFERENCES);
                });

                this.registerClick(MENU.STORMCLOUD.MY_ACCOUNT, function() {

                    dialogManager.show(DIALOG.MY_ACCOUNT);
                });
                
                
                
                //
                // File Menu
                //
                this.registerClick(MENU.FILE.NEW_FILE, function() {

                    dialogManager.show(DIALOG.NEW_FILE);
                });

                this.registerClick(MENU.FILE.NEW_PROJECT, function() {

                    dialogManager.show(DIALOG.NEW_PROJECT);
                });

                this.registerClick(MENU.FILE.CLONE_REMOTE, function() {

                    dialogManager.show(DIALOG.CLONE_REMOTE);
                });

                this.registerClick(MENU.FILE.OPEN_PROJECT, function() {

                    dialogManager.show(DIALOG.OPEN_PROJECT);

                    treeManager.refresh(TREE.CLOSED_PROJECTS);
                });

                //
                // Edit Menu
                // 
                this.registerClick(MENU.EDIT.FIND, function() {

                    dialogManager.show(DIALOG.FIND);
                });
                
                //
                // View Menu
                //
                this.registerClick(MENU.VIEW.SYNC_EDITOR, function() {


                    });


                //
                // Tools Menu
                //
                this.registerClick(MENU.TOOLS.TEMPLATES, function() {

                    dialogManager.show(DIALOG.TEMPLATES);
                });


                //
                // User Menu
                //
                this.registerClick('userMenu_logout', function() {


                    cookieManager.destroy('stormcloud-key');
                    cookieManager.destroy('stormcloud-user');
                    
                    document.location.reload(true);
                });


                //
                // Toolbar Menu (Icon menubar)
                //
                this.registerClick('toolBar_new_file', function() {

                    dialogManager.show(DIALOG.NEW_FILE);
                });

                this.registerClick('toolBar_new_project', function() {

                    dialogManager.show(DIALOG.NEW_PROJECT);
                });

                this.registerClick('toolBar_open_project', function() {

                    dialogManager.show(DIALOG.OPEN_PROJECT);

                    treeManager.refresh('closedProjectTree');
                });

                this.registerClick('toolBar_compile', function() {

                    mavenManager.compile();
                });

                this.registerClick('toolBar_clean', function() {

                    mavenManager.clean();
                });

                this.registerClick('toolBar_install', function() {

                    mavenManager.install();
                });

                this.registerClick('toolBar_trash', function() {

                    dialogManager.show(DIALOG.OPEN_TRASH);
                    
                    treeManager.refresh('trashTree');
                });
                
                

                //
                // Project Context Menu
                //
                this.registerClick(CONTEXT_MENU.PROJECT.COMPILE, function() {

                    mavenManager.compile();
                });

                this.registerClick(CONTEXT_MENU.PROJECT.CLEAN, function() {

                    mavenManager.clean();
                });

                this.registerClick(CONTEXT_MENU.PROJECT.INSTALL, function() {

                    mavenManager.install();
                });

                this.registerClick(CONTEXT_MENU.PROJECT.CUSTOM, function() {

                    dialogManager.show(DIALOG.CUSTOM_GOALS);
                });

                this.registerClick(CONTEXT_MENU.PROJECT.DELETE, function() {

                    dialogManager.show(DIALOG.DELETE);
                });

                this.registerClick(CONTEXT_MENU.PROJECT.FIND, function() {

                    dialogManager.show(DIALOG.FIND);
                });
                
                this.registerClick(CONTEXT_MENU.PROJECT.SET_MAIN, function() {

                    projectManager.setMainProject();
                });
                
                this.registerClick(CONTEXT_MENU.PROJECT.CLOSE, function() {

                    projectManager.close(projectManager.selected);
                });
                
                this.registerClick('projectMenu_show_changes', function() {

                    GitService.showChanges(dijit.byId('projectTree').attr('selectedItem'));
                });

                this.registerClick('projectMenu_add', function() {

                    GitService.add(dijit.byId('projectTree').attr('selectedItem'));
                });

                this.registerClick('projectMenu_commit', function() {

                    dialogManager.show(DIALOG.GIT_COMMIT);
                });


                this.registerClick('projectMenu_revert_modifications', function() {

                    GitService.revertModifications();
                });


                this.registerClick('projectMenu_revert_commit', function() {

                    GitService.revertCommit();
                });


                this.registerClick('projectMenu_ignore', function() {

                    GitService.ignore();
                });

                this.registerClick('projectMenu_create_branch', function() {

                    GitService.createBranch();
                });


                this.registerClick('projectMenu_switch_to_branch', function() {

                    GitService.switchToBranch();
                });

                this.registerClick('projectMenu_create_tag', function() {

                    GitService.createTag();
                });


                this.registerClick('projectMenu_manage_tags', function() {

                    GitService.manageTags();
                });

                this.registerClick('projectMenu_checkout_revision', function() {

                    GitService.checkoutRevision();
                });


                this.registerClick('projectMenu_checkout_files', function() {

                    GitService.checkoutFiles();
                });

                this.registerClick('projectMenu_merge_revision', function() {

                    GitService.mergeRevision();
                });

                this.registerClick('projectMenu_show_history', function() {

                    GitService.showHistory();
                });


                //
                // Filesystem Context menu
                //
                this.registerClick(CONTEXT_MENU.FILESYSTEM.NEW, function() {

                    dialogManager.show(DIALOG.NEW_FILE);
                });

                this.registerClick(CONTEXT_MENU.FILESYSTEM.OPEN, function() {
 
                    fileManager.get(dijit.byId('projectTree').attr('selectedItem'), false);
                });

                this.registerClick(CONTEXT_MENU.FILESYSTEM.CUT, function() {

                    fileManager.cut();
                });

                this.registerClick(CONTEXT_MENU.FILESYSTEM.COPY, function() {

                    fileManager.copy();
                });

                this.registerClick(CONTEXT_MENU.FILESYSTEM.PASTE, function() {

                    fileManager.paste();       
                });

                this.registerClick(CONTEXT_MENU.FILESYSTEM.DELETE, function() {

                    dialogManager.show(DIALOG.DELETE);
                });

                //
                // Editor Context Menu
                //
                this.registerClick(CONTEXT_MENU.EDITOR.SAVE, function() {
                    
                    // save the editor contents
                    fileManager.save();
                });
                
                //
                // Tab Toolbars
                //
                this.registerClick(TABS.SEARCH.REDEFINE, function() {
                    
                    dialogManager.show(DIALOG.FIND);
                });
                
                this.registerClick(TABS.SEARCH.CLEAR, function() {
                    
                    searchManager.clear();
                });
    
                this.registerClick(TABS.MAVEN.RUN, function() {
                    
                    dialogManager.show(DIALOG.CUSTOM_GOALS);
                });
                
                this.registerClick(TABS.MAVEN.RERUN, function() {
                    
                    mavenManager.runLastCommand();
                });

            }

        };
    });

