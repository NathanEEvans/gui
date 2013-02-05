/*
 * Stormcloud IDE - stormcloud/services/filesystem
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
    'dijit/registry',
    'dijit/MenuItem'], 
    function(
        registry,
        MenuItem){
            
        // module:
        //		stormcloud/services/filesystem
        // summary:
        //		Defines the application context
        //		


        return {
            
            // array of last opened files
            opened : new Array(),
            
            // add a file to the list
            addOpenedFile : function(item){
                
                
                // check if it's already in the array
                var i = this.opened.length;
                while (i--) {
                    if (this.opened[i] == item) {
                        // it's already in there, return ziltsj
                        return;
                    }
                }
                
                // add file to the array, at the top as it was selected last
                // and should show up in the menu that way
                this.opened.unshift(item);
                
                // pop the last item in the array to only contain the last 10 items
                // when more than 10 are in there
                if(this.opened.length > 10){
                    this.opened.pop();
                }
                
                
                // update the menu
                this.updateOpenedFiles();
            },
            
            // update the 'file -> open recent file'
            updateOpenedFiles : function(){
                
                // get handle on the menu
                var menu = dijit.byId('fileMenu_open_recent_file');
                
                // remove all existing items
                menu.destroyDescendants(false);
                
                var file;
                
                // create the refreshed list
                for (var i = 0; i < this.opened.length; i++) {
                    
                    // if there is actually an item in the slot
                    if(this.opened[i] != undefined){
                        
                        file = this.opened[i];
                    
                        var menuItem = new MenuItem({
                            
                            label : file.label,
                            file : file,
                            iconClass : '',
                            onClick : function(event){
                         
                                require(['stormcloud/services/filesystem'], function(filesystem){
             
                                    var item = registry.getEnclosingWidget(event.target);
                    
                                    filesystem.get(item.get('file'), false);
                    
                                });                        
                            } 
                        })
                    
                        // add a menuitem for it
                        menu.addChild(menuItem);
                        
                    }
                }
            }    
        };
    });


