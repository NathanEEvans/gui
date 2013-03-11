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

                this.registerClick(MENU.FILE.IMPORT_PROJECT, function() {

                    dialogManager.show(DIALOG.IMPORT_PROJECT);
                });

                this.registerClick(MENU.FILE.EXPORT_PROJECT, function() {

                    dialogManager.show(DIALOG.EXPORT_PROJECT);
                });

                this.registerClick(MENU.FILE.SAVE_ALL, function() {

                    alert('Not yet Implemented');
                });
                
                
                //
                // Edit Menu
                // 
                this.registerClick(MENU.EDIT.FIND, function() {

                    dialogManager.show(DIALOG.FIND);
                });

                this.registerClick(MENU.EDIT.REPLACE, function() {

                    alert('Not yet Implemented');
                });
                
                
                //
                // View Menu
                //
                this.registerClick(MENU.VIEW.SYNC_EDITOR, function() {


                    });

                
                //
                // Navigate Menu
                //
                this.registerClick('navigateMenu_goto_file', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_goto_type', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_goto_symbol', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_goto_spring_bean', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_goto_test', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_goto_previous_document', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_goto_source', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_goto_declaration', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_goto_super_implementation', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_members', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_file_members', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_hierarchy', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_file_hierarchy', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_last_edit_location', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_back', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_forward', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_goto_line', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_toggle_bookmarks', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_bookmark_history_popup_next', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_bookmark_history_popup_previous', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_next_error', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_previous_error', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_select_in_projects', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_select_in_files', function() {

                    alert('Not Implemented');
                });

                this.registerClick('navigateMenu_select_in_favorites', function() {

                    alert('Not Implemented');
                });

                
                //
                // Source Menu
                //
                this.registerClick('sourceMenu_format', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_remove_trailing_spaces', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_shift_left', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_shift_right', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_move_up', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_move_down', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_move_code_element_up', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_move_code_element_down', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_duplicate_up', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_duplicate_down', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_toggle_comment', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_complete_code', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_insert_code', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_remove_surrounding_code', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_fix_code', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_fix_imports', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_fix_uses', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_show_method_parameters', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_show_documentation', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_insert_next_matching_word', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_insert_previous_matching_word', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_inspect', function() {

                    alert('Not Implemented');
                });

                this.registerClick('sourceMenu_scan_for_external_changes', function() {

                    alert('Not Implemented');
                });

                
                //
                // Refactor Menu
                //
                this.registerClick('refactorMenu_rename', function() {

                    alert('Not Implemented');
                });

                this.registerClick('refactorMenu_move', function() {

                    alert('Not Implemented');
                });

                this.registerClick('refactorMenu_copy', function() {

                    alert('Not Implemented');
                });

                this.registerClick('refactorMenu_safely_delete', function() {

                    alert('Not Implemented');
                });

                this.registerClick('refactorMenu_extract_inline_style', function() {

                    alert('Not Implemented');
                });

                this.registerClick('refactorMenu_inspect_and_transform', function() {

                    alert('Not Implemented');
                });
                
                
                
                //
                // Run Menu
                //
                this.registerClick('runMenu_run_project', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_test_project', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_build_project', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_clean_and_build_project', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_default', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_customize', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_none', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_select', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_generate_javadoc', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_run_file', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_test_file', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_compile_file', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_check_xml', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_validate_xml', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_repeat_buil_run', function() {

                    alert('Not Implemented');
                });

                this.registerClick('runMenu_stop_build_run', function() {

                    alert('Not Implemented');
                });

                
                
                //
                // Debug Menu
                //
                this.registerClick('debugMenu_debug_project', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_debug_file', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_debug_test_file', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_attach_debugger', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_finish_debugger_session', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_pause', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_continue', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_step_over', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_step_over_expression', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_step_into', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_step_into_next_method', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_step_out', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_run_to_cursor', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_apply_code_changes', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_take_gui_snapshot', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_set_current_thread', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_make_callee_current', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_make_caller_current', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_pop_topmost_call', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_toggle_line_breakpoint', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_new_breakpoint', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_new_watch', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_evaluate_expression', function() {

                    alert('Not Implemented');
                });

                this.registerClick('debugMenu_check_for_deadlocks', function() {

                    alert('Not Implemented');
                });



                //
                // Tools Menu
                //
                this.registerClick(MENU.TOOLS.TEMPLATES, function() {

                    dialogManager.show(DIALOG.TEMPLATES);
                });

                this.registerClick(MENU.TOOLS.GITHUB, function() {

                    dialogManager.show(DIALOG.GITHUB_ACCOUNT);
                });




                //
                // Help Menu
                //
                this.registerClick('helpMenu_search', function() {

                    alert('Not Implemented');
                });

                this.registerClick('helpMenu_help_contents', function() {

                    alert('Not Implemented');
                });

                this.registerClick('helpMenu_online_docs_and_support', function() {

                    alert('Not Implemented');
                });

                this.registerClick('helpMenu_report_issue', function() {

                    dialogManager.show(DIALOG.DEFECTS_AND_ENHANCEMENTS);
                });

                this.registerClick('helpMenu_start_page', function() {

                    alert('Not Implemented');
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

                this.registerClick('toolBar_save_all', function() {
                    //Filesystem.saveAll();
                    alert('Not Implemented');
                });

                this.registerClick('toolBar_cut', function() {

                    alert('Not Implemented');
                });

                this.registerClick('toolBar_copy', function() {

                    alert('Not Implemented');
                });

                this.registerClick('toolBar_paste', function() {

                    alert('Not Implemented');
                });

                this.registerClick('toolBar_undo', function() {

                    alert('Not Implemented');
                });

                this.registerClick('toolBar_project_configuration', function() {

                    alert('Not Implemented');
                });

                this.registerClick('toolBar_compile', function() {

                    alert('Not Implemented');
                });

                this.registerClick('toolBar_clean', function() {

                    alert('Not Implemented');
                });

                this.registerClick('toolBar_install', function() {

                    alert('Not Implemented');
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

                this.registerClick(CONTEXT_MENU.FILESYSTEM.DOWNLOAD, function() {

                    alert('Not Implemented');
                });

                this.registerClick(CONTEXT_MENU.FILESYSTEM.DELETE, function() {

                    dialogManager.show(DIALOG.DELETE);
                });

                this.registerClick(CONTEXT_MENU.FILESYSTEM.RENAME, function() {

                    alert('Not Implemented');
                });

                this.registerClick(CONTEXT_MENU.FILESYSTEM.MOVE, function() {

                    alert('Not Implemented');
                });

                this.registerClick(CONTEXT_MENU.FILESYSTEM.SAFE_DELETE, function() {

                    alert('Not Implemented');
                });


                //
                // Tomcat Context Menu
                //
                this.registerClick('tomcatAppMenu_view', function() {

                    TomcatService.view(dijit.byId('servicesTree').attr('selectedItem'));
                });
                
                this.registerClick('tomcatAppMenu_stop', function() {

                    TomcatService.stopApplication(dijit.byId('servicesTree').attr('selectedItem'));
                });
                
                this.registerClick('tomcatAppMenu_start', function() {

                    TomcatService.startApplication(dijit.byId('servicesTree').attr('selectedItem'));
                });
                
                this.registerClick('tomcatAppMenu_reload', function() {

                    TomcatService.reload(dijit.byId('servicesTree').attr('selectedItem'));
                });
                
                this.registerClick('tomcatAppMenu_undeploy', function() {

                    TomcatService.undeploy(dijit.byId('servicesTree').attr('selectedItem'));
                });


                //
                // Editor Context Menu
                //
                this.registerClick(CONTEXT_MENU.EDITOR.SAVE, function() {
                    
                    // save the editor contents
                    fileManager.save();
                });
                    
                this.registerClick(CONTEXT_MENU.EDITOR.INSERT, function() {
                    
                    });
                
                this.registerClick(CONTEXT_MENU.EDITOR.FIX_IMPORTS, function() {
                    
                    });
                
                this.registerClick(CONTEXT_MENU.EDITOR.BREAKPOINT, function() {
                    
                    });
                
                this.registerClick(CONTEXT_MENU.EDITOR.CUT, function() {
                    
                    });
                
                this.registerClick(CONTEXT_MENU.EDITOR.COPY, function() {
                    
                    });
                
                this.registerClick(CONTEXT_MENU.EDITOR.PASTE, function() {
                    
                    });
                
                this.registerClick(CONTEXT_MENU.EDITOR.SELECT, function() {
                    
                    
                    
                    
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

