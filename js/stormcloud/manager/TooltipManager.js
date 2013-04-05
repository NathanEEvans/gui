/*
 * Stormcloud IDE - stormcloud/manager/TooltipManager
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
define([], 
    function(){


        //
        // module       : stormcloud/manager/TooltipManager
        //		
        // summary      : 
        //	


        var CONSTANTS = {
        
            SHOW_DELAY : 500
        
        }

        return{
    
    
            attach : function(id, label){
              
                require(['dijit/Tooltip'], function(Tooltip){

                
                    new Tooltip({
                        connectId: id,
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: label
                    });
                });
              
              
            },
    
            bind : function(){
            
                require(['dijit/Tooltip'], function(Tooltip){

                
                    new Tooltip({
                        connectId: ['toolBar_new_file'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Add a new File'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_new_project'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Add a new Project'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_open_project'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Open an Existing Project'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_save_all'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Save All'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_cut'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Cut'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_copy'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Copy'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_paste'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Paste'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_undo'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Undo'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_redo'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Redo'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_project_configuration'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Set Project Configuration'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_compile'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Compile'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_clean'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Clean'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_install'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Install'
                    });
                
                
                    new Tooltip({
                        connectId: ['toolBar_trash'],
                        showDelay : CONSTANTS.SHOW_DELAY,
                        label: 'Open Trash'
                    });
                
                
                });
      
            }

        };

    }());