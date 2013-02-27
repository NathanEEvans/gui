/*
 * Stormcloud IDE - stormcloud/manager/FileManager
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
            
        //
        // module   : stormcloud/manager/FileManager
        //		
        // summary  :
        //		

        FILE_TYPE = {
            
            JAVA : {
                icon : 'javaFileIcon',
                extension : 'java'
            }
            
            
        }
        
        
        FILE_STATE = {
            
            UNTRACKED : 'Untracked',
            MODIFIED  : 'Modified'
            
        }
        


        return {
            
            // array of last opened files
            opened : new Array(),
            
            
            open : function(){
                
                
            },
            
            
            close : function(){
              
              
              
            },
            
            
            getIcon : function(item){
              
              
              
            },
            
            
            getImage : function(item){
              
                if(item.type == 'javaFile'){
			
                    return "/images/tree/java-file.png";
		
                }else if(item.type == 'jspFile'){
			
                    return  "/images/tree/jsp-file.png";
		
                }else if(item.type == 'xmlFile' 
                    || item.type == 'xhtmlFile' ){
			
                    return "/images/tree/xml-file.png";
		
                }else if(item.type == 'htmlFile'){
			
                    return "/images/tree/html-file.png";
		
                }else if(item.type == 'wsdlFile'){
			
                    return "/images/tree/wsdl-file.png";
		
                }else if(item.type == 'xsdFile'){
			
                    return "/images/tree/xsd-file.png";
		
                }else if(item.type == 'textFile'){
			
                    return "/images/tree/text-file.png";
		
                }else if(item.type == 'cssFile'){
			
                    return "/images/tree/css-file.png";
		
                }else if(item.type == 'jsFile'){
			
                    return "/images/tree/javascript-file.png";
		
                }else if(item.type == 'imageFile'){
			
                    return "/images/tree/image-file.png";
		
                }else if(item.type == 'tldFile'){
			
                    return "/images/tree/tld-file.png";
		
                }else if(item.type == 'sqlFile'){
			
                    return "/images/tree/sql-file.png";
		    
                }else if(item.type == 'propertiesFile'){
		
                    return "/images/tree/properties-file.png";
		
                }else if(item.type == 'jarFile'){
		
                    return "/images/tree/jar-file.png";
			
                }else{
                    
                    return "folderIcon";
                }  
              
            },
            
            
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
                         
                                require(['stormcloud/service/FilesystemService'], function(FilesystemService){
             
                                    var item = registry.getEnclosingWidget(event.target);
                    
                                    FilesystemService.get(item.get('file'), false);
                    
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


