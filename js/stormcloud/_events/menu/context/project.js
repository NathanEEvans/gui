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
    'dojo/on',
    'dijit/registry',
    'stormcloud/gui/dialog',
    'stormcloud/services/maven',
    'stormcloud/services/tomcat',
    'stormcloud/services/git',
    'stormcloud/services/filesystem'],
    function(
        on,
        registry,
        dialog,
        maven,
        tomcat,
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



            }
        };

    });