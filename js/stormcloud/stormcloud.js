/*
 * Stormcloud IDE - stormcloud/stormcloud
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
require([
    'dojo/ready'],
    function(
        ready) {

        //
        // module      : stormcloud/stormcloud
        // 
        // summary     : This module defines all JS that needs to be intialized,
        //               events that need to be bound, gui related things etc...
        //               

        ready(function() {

            // When Dojo is ready we bootstrap everything we initially need.
            require([
                'stormcloud/manager/AnnotationManager',
                'stormcloud/manager/DialogManager',
                'stormcloud/manager/DomManager',
                'stormcloud/manager/EditorManager',
                'stormcloud/manager/EventManager',
                'stormcloud/manager/FileManager',
                'stormcloud/manager/GitManager',
                'stormcloud/manager/LogManager',
                'stormcloud/manager/MavenManager',
                'stormcloud/manager/ProjectManager',
                'stormcloud/manager/SearchManager',
                'stormcloud/manager/StatusManager',
                'stormcloud/manager/TooltipManager',
                'stormcloud/manager/TreeManager'], 
                function(
                    AnnotationManager,
                    DialogManager,
                    DomManager,
                    EditorManager,
                    EventManager,
                    FileManager,
                    GitManager,
                    LogManager,
                    MavenManager,
                    ProjectManager,
                    SearchManager,
                    StatusManager,
                    TooltipManager,
                    TreeManager) {

                    // declare all managers globally
                    
                    annotationManager = AnnotationManager;
                    dialogManager = DialogManager;
                    domManager = DomManager;
                    editorManager = EditorManager;
                    eventManager = EventManager;
                    fileManager = FileManager;
                    gitManager = GitManager;
                    logManager = LogManager;
                    mavenManager = MavenManager;
                    projectManager = ProjectManager;
                    searchManager = SearchManager;
                    statusManager = StatusManager;
                    tooltipManager = TooltipManager;
                    treeManager = TreeManager;

                    // do the things needed to end up in the 'started state''

                    // bind all events
                    eventManager.bind();
                    
                    // bind the tooltips
                    tooltipManager.bind();
                
                    // create the trees
                    treeManager.initialize();
            
                    // check for trash
                    fileManager.checkTrash();

                    // When all is done, hide the loader
                    // hide the loader
                    // @todo tuck this away in a module
                    document.getElementById('loader').style.visibility = 'hidden';
                });
        });
    });