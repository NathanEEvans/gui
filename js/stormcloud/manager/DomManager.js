/*
 * Stormcloud IDE - stormcloud/manager/DomManager
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
    'dijit/registry'], 
    function(
        registry){

        //
        // module       : stormcloud/manager/DomManager
        // 
        // summary      : 
        //
  
        DIALOG = {
        
            ABOUT :  'aboutDialog', 
            PREFERENCES : 'preferencesDialog',         
            MY_ACCOUNT : 'myAccountDialog',
            CUSTOM_GOALS : 'customGoalsDialog',
            NEW_PROJECT : 'newProjectDialog',
            NEW_FILE : 'newFileDialog',     
            CLONE_REMOTE : 'cloneRemoteDialog',
            OPEN_PROJECT : 'openProjectDialog',
            NEW_GROUP : 'newGroupDialog',
            PROJECT_PROPERTIES : 'projectPropertiesDialog',
            IMPORT_PROJECT : 'importProjectDialog',
            EXPORT_PROJECT : 'exportProjectDialog',
            GIT_HISTORY : 'showGitHistoryDialog',
            GIT_COMMIT : 'commitDialog',
            DELETE : 'deleteDialog',
            FIND : 'findDialog',
            DEFECTS_AND_ENHANCEMENTS : 'defectsAndEnhancementsDialog',
            TEMPLATES : 'templatesDialog'
        };
    
    
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
            
            VIEW : {
              
                SYNC_EDITOR : 'viewMenu_sync_editor_views'
                
            },
            
            TOOLS : {
                
                TEMPLATES : 'toolsMenu_templates'
            }
        };
        
        CONTEXT_MENU = {
            
            PROJECT : {
                
                COMPILE : 'projectMenu_compile_project',
                CLEAN : 'projectMenu_clean_project',
                INSTALL : 'projectMenu_install_project',
                CUSTOM : 'projectMenu_custom_goals',
                DELETE : 'projectMenu_delete_project',
                FIND : 'projectMenu_find',
                SET_MAIN : 'projectMenu_setMain',
                CLOSE : 'projectMenu_close_project'
                
            },
            
            FILESYSTEM : {
                
                NEW : 'filesystemMenu_new',
                OPEN : 'filesystemMenu_open',
                CUT : 'filesystemMenu_cut',
                COPY : 'filesystemMenu_copy',
                PASTE : 'filesystemMenu_paste',
                DOWNLOAD : 'filesystemMenu_download',
                DELETE : 'filesystemMenu_delete',
                RENAME : 'filesystemMenu_rename',
                MOVE : 'filesystemMenu_move',
                SAFE_DELETE : 'filesystemMenu_safe_delete' 
            }
            
            
        };
        
        TABS = {
            
            SEARCH : {
                
                REDEFINE : 'toolbarSearch_redefine',
                CLEAR : 'toolbarSearch_clear'
            },
            
            MAVEN : {
                
                RERUN : 'toolBarMaven_rerun',
                RUN : 'toolBarMaven_run'
            }  
        };
        
        
        
        TREE = {
            
            CLOSED_PROJECTS : 'closedProjectTree'
        };
        
        
        
    
        return{
        
        
            init : function(){
              
                // summary : Takes care of all initial gui state(s)
              
              
                var checked = settingsManager.getPreference(PREFERENCE.SYNC_EDITOR_VIEWS);
                
                console.info('we want ' + checked);
                
                var menu = dijit.byId(MENU.VIEW.SYNC_EDITOR);
                
                console.info('its now : ' + menu.get('checked'));
                
                menu.set('checked', checked);
                
                console.info('and now its ' + menu.get('checked'));
                
              
              
            }      
        };
    });