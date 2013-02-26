/*
 * Stormcloud IDE - stormcloud/dialogs/Delete
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
    'stormcloud/services/filesystem'], 
    function(
        DialogManager,
        filesystem){
        
        //
        // module      : stormcloud/dialogs/Delete
        // 
        // summary     : 
        //               

        var selected;
        
        return{
    
            // initialize th dialog
            init : function(){
                
                // get the filename and set it in the dialog
                selected = dijit.byId('projectTree').attr('selectedItem');
                
            },
            
            // user cancelled
            cancel: function(){
              
                // no go, hide the dialog
                DialogManager.hide(DIALOG.DELETE);

            },
            
            
            // user clicked ok
            ok : function(){
                
                // delete the selected item
                filesystem.del(selected);
                
                // hide the dialog
                DialogManager.hide(DIALOG.DELETE);
            }
        }
    });