/*
 * Stormcloud IDE - stormcloud/dialogs/ChangePassword
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
define(
    ['dojox/validate/web'], 
    function(
        validator){
        
        //
        // module      : stormcloud/dialogs/ChangePassword
        // 
        // summary     : 
        //               

        return{

            // initialize th dialog
            init : function(){
                
                
            },
            
            
            validatePassword : function(value, constraints){
                
                var isValid = false;
                
                if(constraints && constraints.other)  {
                
                    var otherInput =  dijit.byId(constraints.other);
                
                    if(otherInput) {
                        var otherValue = otherInput.value;
                        console.log("%s == %s ?", value, otherValue);
                        isValid = (value == otherValue);
                    }
                }
                return isValid;
            },
            
            
            // user cancelled
            cancel: function(){
              
                // no go, hide the dialog
                dialogManager.hide(DIALOG.CHANGE_PASSWORD);
            },
            
            // user clicked ok
            changePassword : function(){
                
                
                var currentPassword = dijit.byId('currentPassword').get('value');
                var newPassword = dijit.byId('newPassword').get('value');
                
                settingsManager.changePassword(currentPassword, newPassword);
            }
        }
    });