/*
 * Stormcloud IDE - stormcloud/_events/menu/context/project
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
    'stormcloud/manager/EventManager',
    'stormcloud/manager/DialogManager',
    'stormcloud/manager/MavenManager',
    'stormcloud/services/git',
    'stormcloud/services/filesystem'],
    function(
        EventManager,
        DialogManager,
        MavenManager,
        git,
        filesystem) {

        //
        // module      : stormcloud/_events/menu/context/project
        // 
        // summary     : Project ContextMenu click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                EventManager.registerClick('projectMenu_compile_project', function() {

                    MavenManager.compile();
                });

                EventManager.registerClick('projectMenu_clean_project', function() {

                    MavenManager.clean();
                });

                EventManager.registerClick('projectMenu_install_project', function() {

                    MavenManager.install();
                });

                EventManager.registerClick('projectMenu_custom_goals', function() {

                    DialogManager.show(DIALOG.CUSTOM_GOALS);
                });

                EventManager.registerClick('projectMenu_show_changes', function() {

                    git.showChanges(dijit.byId('projectTree').attr('selectedItem'));
                });

                EventManager.registerClick('projectMenu_add', function() {

                    git.add(dijit.byId('projectTree').attr('selectedItem'));
                });

                EventManager.registerClick('projectMenu_commit', function() {

                    DialogManager.show(DIALOG.GIT_COMMIT);
                });


                EventManager.registerClick('projectMenu_revert_modifications', function() {

                    git.revertModifications();
                });


                EventManager.registerClick('projectMenu_revert_commit', function() {

                    git.revertCommit();
                });


                EventManager.registerClick('projectMenu_ignore', function() {

                    git.ignore();
                });

                EventManager.registerClick('projectMenu_create_branch', function() {

                    git.createBranch();
                });


                EventManager.registerClick('projectMenu_switch_to_branch', function() {

                    git.switchToBranch();
                });

                EventManager.registerClick('projectMenu_create_tag', function() {

                    git.createTag();
                });


                EventManager.registerClick('projectMenu_manage_tags', function() {

                    git.manageTags();
                });

                EventManager.registerClick('projectMenu_checkout_revision', function() {

                    git.checkoutRevision();
                });


                EventManager.registerClick('projectMenu_checkout_files', function() {

                    git.checkoutFiles();
                });

                EventManager.registerClick('projectMenu_merge_revision', function() {

                    git.mergeRevision();
                });


                EventManager.registerClick('projectMenu_show_history', function() {

                    git.showHistory();
                });

                EventManager.registerClick('projectMenu_delete_project', function() {

                    DialogManager.show(DIALOG.DELETE);
                });


                EventManager.registerClick('projectMenu_find', function() {

                    DialogManager.show(DIALOG.FIND);
                });

                EventManager.registerClick('projectMenu_close_project', function() {

                    filesystem.close(dijit.byId('projectTree').attr('selectedItem'));
                });



            }
        };

    });