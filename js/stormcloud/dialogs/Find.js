/*
 * Stormcloud IDE - stormcloud/dialogs/Find
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
    'stormcloud/manager/DialogManager',
    'stormcloud/manager/ProjectManager',
    'stormcloud/gui/search'], 
    function(
        DialogManager,
        ProjectManager,
        search){
        
        //
        // module      : stormcloud/dialogs/Find
        // 
        // summary     : 
        //               

        return{
    
            init : function(){
                
            },
            
            hide : function(){
                
                DialogManager.hide(DIALOG.FIND);
            },
            
            find : function(){
              
                var args = {
                    
                    containingText : document.getElementById('containingText').value,
                    fileNamePatterns : document.getElementById('filenamePatterns').value,
                    matchCase : document.getElementById('matchCase').checked == true ? true : false,
                    wholeWords : document.getElementById('wholeWords').checked == true ? true : false,
                    regex : document.getElementById('regularExpression').checked == true ? true : false,
                    scope : document.getElementById('openProjects').checked ? '' : ProjectManager.selected
                }
       
                // send the find request
                search.find(args);
       
                // hide the dialog
                DialogManager.hide(DIALOG.FIND);  
            }
        }

    });