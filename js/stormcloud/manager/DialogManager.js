/*
 * Stormcloud IDE - stormcloud/manager/DialogManager
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
        // module       : stormcloud/manager/DialogManager
        // 
        // summary      : 
        //
  
        return{
        
            // Find a dialog in the registry and show it
            show : function(dialog){
        
                registry.byId(dialog).show();
            },
        
            // Find a dialog in the registry and hide it
            hide : function(dialog){
            
                registry.byId(dialog).hide();
            },
            
            destroy : function(dialog){
                
            },
            
            init : function(dialog){
                
                
            }
        };
    });