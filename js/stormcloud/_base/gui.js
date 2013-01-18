/*
 * Stormcloud IDE - stormcloud/_base/gui
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
    'stormcloud/gui/tooltips',
    'stormcloud/gui/tree',
    'stormcloud/chat/manager',
    'stormcloud/services/filesystem'], 
    function(
        tooltips,
        tree,
        manager,
        filesystem){

        //
        // module      : stormcloud/_base/gui
        // 
        // summary     : initialize anything concerning gui
        // 
        // description : 
        //               

        return{
    
            bootstrap : function(){
                
                // bind the tooltips
                tooltips.bind();
                
                // create the trees
                tree.initialize();
            
                // check for trash
                filesystem.checkTrash();
                
            }
    
        }


    });

