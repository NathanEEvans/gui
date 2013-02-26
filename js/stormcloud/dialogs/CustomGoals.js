/*
 * Stormcloud IDE - stormcloud/dialogs/CustomGoals
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
    'stormcloud/manager/MavenManager'], 
    function(
        DialogManager,
        MavenManager){
        
        //
        // module      : stormcloud/dialogs/CustomGoals
        // 
        // summary     : 
        //               

        return{
    
            init : function(){
                
                
            },
            
            
            run : function(){
              
                var goals = dojo.byId('goals').value;
                var properties = dojo.byId('properties').value;
                    
                var offline = dojo.byId('offline').checked == true ? ' -o ' : '';
                var skipTests = dojo.byId('skipTests').checked == true ? ' -Dmaven.test.skip ' : '';
                var update = dojo.byId('update').checked == true ? ' deploy ' : '';
                var debug = dojo.byId('debug').checked == true ? ' -X ' : '';
                var saveAs = dojo.byId('saveAs').value;
              
                var command = debug + goals + update + offline + skipTests + ' ' + properties; 
                
                if(saveAs != ''){
                
                // save the command
              
                }
              
                MavenManager.run(command);
                
                DialogManager.hide(DIALOG.CUSTOM_GOALS);
            },
            
            
            close : function(){
              
                DialogManager.hide(DIALOG.CUSTOM_GOALS);
            }
        }

    });