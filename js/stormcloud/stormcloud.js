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
    'dojo/ready',
    'dojo/parser',
    'dojo/domReady!',
    'stormcloud/auth'
    ],
    function(
        ready,
        parser,
        domReady,
        auth,
        SettingsManager) {

        //
        // module      : stormcloud/stormcloud
        // 
        // summary     : This module defines all JS that needs to be intialized,
        //               events that need to be bound, gui related things etc...
        //               
        
        parser.parse();
        
        
        ready(function() {

            // Declare all managers.
            require([
                'stormcloud/manager/AnnotationManager',
                'stormcloud/manager/CookieManager',
                'stormcloud/manager/DialogManager',
                'stormcloud/manager/DomManager',
                'stormcloud/manager/EditorManager',
                'stormcloud/manager/EventManager',
                'stormcloud/manager/FileManager',
                'stormcloud/manager/GitHubManager',
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
                    CookieManager,
                    DialogManager,
                    DomManager,
                    EditorManager,
                    EventManager,
                    FileManager,
                    GitHubManager,
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
                    cookieManager = CookieManager;
                    dialogManager = DialogManager;
                    domManager = DomManager;
                    editorManager = EditorManager;
                    eventManager = EventManager;
                    fileManager = FileManager;
                    gitHubManager = GitHubManager;
                    gitManager = GitManager;
                    logManager = LogManager;
                    mavenManager = MavenManager;
                    projectManager = ProjectManager;
                    searchManager = SearchManager;
                    statusManager = StatusManager;
                    tooltipManager = TooltipManager;
                    treeManager = TreeManager;

                    // do the things needed to end up in the 'started state''

                    // create the trees
                    treeManager.initialize();
            
                    // bind all events
                    eventManager.bind();
                    
                    // bind the tooltips
                    tooltipManager.bind();
                    
                    // Initialize the file manager
                    fileManager.init();

                    // init git data
                    // gitHubManager.init();
                    
                    domManager.init();
            
                    document.getElementById('loader').style.visibility = 'hidden';
                    
            
                });
        });
    });