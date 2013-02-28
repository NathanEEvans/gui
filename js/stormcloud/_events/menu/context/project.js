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
    'stormcloud/manager/ProjectManager',
    'stormcloud/service/GitService',
    'stormcloud/manager/FileManager'],
    function(
        EventManager,
        DialogManager,
        MavenManager,
        ProjectManager,
        GitService,
        FileManager) {

        //
        // module      : stormcloud/_events/menu/context/project
        // 
        // summary     : Project ContextMenu click events
        // 
        //               

        return{

            // Bind the events to the widgets
            bind: function() {


                EventManager.registerClick('projectMenu_show_changes', function() {

                    GitService.showChanges(dijit.byId('projectTree').attr('selectedItem'));
                });

                EventManager.registerClick('projectMenu_add', function() {

                    GitService.add(dijit.byId('projectTree').attr('selectedItem'));
                });

                EventManager.registerClick('projectMenu_commit', function() {

                    DialogManager.show(DIALOG.GIT_COMMIT);
                });


                EventManager.registerClick('projectMenu_revert_modifications', function() {

                    GitService.revertModifications();
                });


                EventManager.registerClick('projectMenu_revert_commit', function() {

                    GitService.revertCommit();
                });


                EventManager.registerClick('projectMenu_ignore', function() {

                    GitService.ignore();
                });

                EventManager.registerClick('projectMenu_create_branch', function() {

                    GitService.createBranch();
                });


                EventManager.registerClick('projectMenu_switch_to_branch', function() {

                    GitService.switchToBranch();
                });

                EventManager.registerClick('projectMenu_create_tag', function() {

                    GitService.createTag();
                });


                EventManager.registerClick('projectMenu_manage_tags', function() {

                    GitService.manageTags();
                });

                EventManager.registerClick('projectMenu_checkout_revision', function() {

                    GitService.checkoutRevision();
                });


                EventManager.registerClick('projectMenu_checkout_files', function() {

                    GitService.checkoutFiles();
                });

                EventManager.registerClick('projectMenu_merge_revision', function() {

                    GitService.mergeRevision();
                });


                EventManager.registerClick('projectMenu_show_history', function() {

                    GitService.showHistory();
                });

            }
        };

    });