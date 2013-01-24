/*
 * Stormcloud IDE - stormcloud/_base/events
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
    'stormcloud/gui/dialog',
    'stormcloud/gui/tree',
    'stormcloud/services/maven',
    'stormcloud/services/tomcat',
    'stormcloud/services/git',
    'stormcloud/services/filesystem'],
    function(
        on,
        registry,
        dialog,
        tree,
        maven,
        tomcat,
        git,
        filesystem) {

        //
        // module      : stormcloud/_base/events
        // 
        // summary     : 
        // 
        // description : This module defines all JS that needs to be intialized,
        //               events that need to be bound, dialogs created etc...
        //               

        var EVENT = {
            // “click” - the user clicked a node
            CLICK: 'click',
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

        return{
            // Bind the events to the widgets
            bind: function() {

                on(registry.byId('tomcatAppMenu_undeploy'), EVENT.CLICK, function(e) {

                    tomcat.undeploy(dijit.byId('servicesTree').attr('selectedItem'));
                });


                on(registry.byId('projectMenu_compile_project'), EVENT.CLICK, function(e) {

                    maven.compile(dijit.byId('projectTree').attr('selectedItem'));
                });

                on(registry.byId('projectMenu_clean_project'), EVENT.CLICK, function(e) {

                    maven.clean(dijit.byId('projectTree').attr('selectedItem'));
                });

                on(registry.byId('projectMenu_install_project'), EVENT.CLICK, function(e) {

                    maven.install(dijit.byId('projectTree').attr('selectedItem'));
                });

                on(registry.byId('projectMenu_deploy_project'), EVENT.CLICK, function(e) {

                    // run application
                    tomcat.deploy(dijit.byId('projectTree').attr('selectedItem'));

                });

                on(registry.byId('projectMenu_show_changes'), EVENT.CLICK, function(e) {

                    git.showChanges(dijit.byId('projectTree').attr('selectedItem'));
                });

                on(registry.byId('projectMenu_add'), EVENT.CLICK, function(e) {

                    git.add(dijit.byId('projectTree').attr('selectedItem'));
                });

                on(registry.byId('projectMenu_commit'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.GIT_COMMIT);
                });


                on(registry.byId('projectMenu_revert_modifications'), EVENT.CLICK, function(e) {

                    git.revertModifications();
                });


                on(registry.byId('projectMenu_revert_commit'), EVENT.CLICK, function(e) {

                    git.revertCommit();
                });


                on(registry.byId('projectMenu_ignore'), EVENT.CLICK, function(e) {

                    git.ignore();
                });

                on(registry.byId('projectMenu_create_branch'), EVENT.CLICK, function(e) {

                    git.createBranch();
                });


                on(registry.byId('projectMenu_switch_to_branch'), EVENT.CLICK, function(e) {

                    git.switchToBranch();
                });

                on(registry.byId('projectMenu_create_tag'), EVENT.CLICK, function(e) {

                    git.createTag();
                });


                on(registry.byId('projectMenu_manage_tags'), EVENT.CLICK, function(e) {

                    git.manageTags();
                });

                on(registry.byId('projectMenu_checkout_revision'), EVENT.CLICK, function(e) {

                    git.checkoutRevision();
                });


                on(registry.byId('projectMenu_checkout_files'), EVENT.CLICK, function(e) {

                    git.checkoutFiles();
                });

                on(registry.byId('projectMenu_merge_revision'), EVENT.CLICK, function(e) {

                    git.mergeRevision();
                });


                on(registry.byId('projectMenu_show_history'), EVENT.CLICK, function(e) {

                    git.showHistory();
                });

                on(registry.byId('projectMenu_delete_project'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.DELETE);
                });


                on(registry.byId('projectMenu_find'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.FIND);
                });

                on(registry.byId('projectMenu_close_project'), EVENT.CLICK, function(e) {

                    filesystem.close(dijit.byId('projectTree').attr('selectedItem'));
                });


                on(registry.byId('projectSettingsMenu_open'), EVENT.CLICK, function(e) {

                    alert('Not implemented');
                });


                on(registry.byId('flowDesignMenu_open'), EVENT.CLICK, function(e) {

                    alert('Not implemented');
                });

                on(registry.byId('sourcesMenu_new_file'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.NEW_FILE);
                });


                on(registry.byId('sourcesMenu_open'), EVENT.CLICK, function(e) {

                    filesystem.open();
                });

                on(registry.byId('sourcesMenu_cut'), EVENT.CLICK, function(e) {

                    tree.setMoveSource();
                });

                on(registry.byId('sourcesMenu_copy'), EVENT.CLICK, function(e) {

                    tree.setCopySource();
                });

                on(registry.byId('sourcesMenu_paste'), EVENT.CLICK, function(e) {

                    tree.setDestination();
                });

                on(registry.byId('sourcesMenu_download'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourcesMenu_delete'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.DELETE);
                });

                on(registry.byId('sourcesMenu_rename'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });


                on(registry.byId('sourcesMenu_move'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourcesMenu_safe_delete'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });


                //resourcesMenu_new_file
                //resourcesMenu_open
                //resourcesMenu_cut
                //resourcesMenu_copy
                //resourcesMenu_paste
                //resourcesMenu_download
                //resourcesMenu_delete



                on(registry.byId('stormcloudMenu_about'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.ABOUT);

                });

                on(registry.byId('stormcloudMenu_preferences'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.PREFERENCES);
                });

                on(registry.byId('stormcloudMenu_my_account'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.MY_ACCOUNT);
                });

                on(registry.byId('stormcloudMenu_services'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.SERVICES);
                });

                on(registry.byId('fileMenu_new_file'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.NEW_FILE);
                });

                on(registry.byId('fileMenu_new_project'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.NEW_PROJECT);
                });

                on(registry.byId('fileMenu_clone_remote'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.CLONE_REMOTE);
                });

                on(registry.byId('fileMenu_open_project'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.OPEN_PROJECT);

                    tree.refresh('closedProjectTree');
                });

                on(registry.byId('fileMenu_open_recent_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });


                on(registry.byId('fileMenu_close_project'), EVENT.CLICK, function(e) {

                    filesystem.close(selectedTreeItem);
                });

                on(registry.byId('fileMenu_open_recent_project'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_select_group'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_new_group'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_project_properties'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_import_project_zip'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_import_project_folder'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_export_to_zip'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_save'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_save_as'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_save_all'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_page_setup'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_print'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('fileMenu_print_to_html'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_undo'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_redo'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_cut'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_copy'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_paste'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_paste_formatted'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_delete'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_select_all'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_select_identifier'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_find_selection'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_find_next'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_find_previous'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_find'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_replace'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_find_usages'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_find_in_projects'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('editMenu_replace_in_projects'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_source'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_history'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_collapse_fold'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_expand_fold'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_collapse_all'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_expand_all'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_ide_log'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_clipboard'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_undo_redo'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_run'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_debug'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_memory'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_quick_search'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_small_toolbar_icons'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_reset_toolbars'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_customize'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_show_editor_toolbar'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_show_line_numbers'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_show_non_printable_characters'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_show_diff_sidebar'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_show_versioning_labels'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('viewMenu_synchronize_editor_with_views'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });




                on(registry.byId('navigateMenu_goto_type'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_symbol'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_spring_bean'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_test'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_previous_document'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_source'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_declaration'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_super_implementation'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_members'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_file_members'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_hierarchy'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_file_hierarchy'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_last_edit_location'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_back'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_forward'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_goto_line'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_toggle_bookmarks'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_bookmark_history_popup_next'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_bookmark_history_popup_previous'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_next_error'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_previous_error'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_select_in_projects'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_select_in_files'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('navigateMenu_select_in_favorites'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_format'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_remove_trailing_spaces'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_shift_left'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_shift_right'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_move_up'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_move_down'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_move_code_element_up'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_move_code_element_down'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_duplicate_up'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_duplicate_down'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_toggle_comment'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_complete_code'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_insert_code'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_remove_surrounding_code'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_fix_code'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_fix_imports'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_fix_uses'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_show_method_parameters'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_show_documentation'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_insert_next_matching_word'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_insert_previous_matching_word'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_inspect'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('sourceMenu_scan_for_external_changes'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('refactorMenu_rename'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('refactorMenu_move'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('refactorMenu_copy'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('refactorMenu_safely_delete'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('refactorMenu_extract_inline_style'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('refactorMenu_inspect_and_transform'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_run_project'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_test_project'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_build_project'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_clean_and_build_project'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_default'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_customize'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_none'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_select'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_generate_javadoc'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_run_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_test_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_compile_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_check_xml'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_validate_xml'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_repeat_buil_run'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('runMenu_stop_build_run'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_debug_project'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_debug_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_debug_test_file'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_attach_debugger'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_finish_debugger_session'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_pause'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_continue'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_step_over'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_step_over_expression'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_step_into'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_step_into_next_method'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_step_out'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_run_to_cursor'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_apply_code_changes'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_take_gui_snapshot'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_set_current_thread'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_make_callee_current'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_make_caller_current'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_pop_topmost_call'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_toggle_line_breakpoint'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_new_breakpoint'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_new_watch'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_evaluate_expression'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('debugMenu_check_for_deadlocks'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_projects'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_files'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_favorites'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_services'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_action_items'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_palette'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_properties'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('windowMenu_chat'), EVENT.CLICK, function(e) {

                    // dijit.byId('dFloatingPane').show();
                    alert('Not Implemented');
                });

                on(registry.byId('helpMenu_search'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('helpMenu_help_contents'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('helpMenu_online_docs_and_support'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('helpMenu_report_issue'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.DEFECTS_AND_ENHANCEMENTS);
                });

                on(registry.byId('helpMenu_start_page'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_new_file'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.NEW_FILE);
                });

                on(registry.byId('toolBar_new_project'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.NEW_PROJECT);
                });

                on(registry.byId('toolBar_open_project'), EVENT.CLICK, function(e) {

                    dialog.show(DIALOG.OPEN_PROJECT);

                    tree.refresh('closedProjectTree');
                });

                on(registry.byId('toolBar_save_all'), EVENT.CLICK, function(e) {
                    //Filesystem.saveAll();
                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_cut'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_copy'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_paste'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_undo'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_project_configuration'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_compile'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_clean'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_install'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });

                on(registry.byId('toolBar_trash'), EVENT.CLICK, function(e) {

                    alert('Not Implemented');
                });


                






            }
        };

    });
