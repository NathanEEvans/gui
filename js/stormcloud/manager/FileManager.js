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
    'dijit/MenuItem',
    'dojo/json',
    'stormcloud/service/FilesystemService'], 
    function(
        registry,
        MenuItem,
        json,
        filesystemService){
            
        //
        // module   : stormcloud/manager/FileManager
        //		
        // summary  :
        //		

        return {
            
            selected : null,
            copySource : null,
            moveSource : null,
            copyDestination : null,
            moveDestination : null,
            
            // array of last (recent) opened files
            // will contain max 10 last opened files
            recentlyOpened : new Array(),
            
            
            // array of dirty files
            dirtyFiles : new Array(),
            
            
            init : function(){
              
                // summary : Get the recentFiles cookie and 
                //           add the contained files in the menu
                //           if it exists
              
                var recentFilesString = cookieManager.get('recentFiles');
              
                if(recentFilesString){
              
                    var recentFiles = json.parse(recentFilesString);
                }
                
                if(recentFiles){
                  
                    this.recentlyOpened = recentFiles;
                  
                    this._updateOpenedFiles();
                  
                }
              
                // check for trash
                this.checkTrash();
              
            },
            
            setSelected : function(item){
              
                if(item.type != 'project'){
                    this.selected = item;
                }
            },
            
            getTemplate : function(item){
              
                // open the template file
                filesystemService.get(item, false);
            },
            
            get : function(item, readOnly){
              
                // summary : Get a file from the filesystem
                //           and open it in the editor
                //           This file is also added to the recent 
                //           file list on the file menu
              
                // check if the project is opened
                var project = projectManager.getProjectNodeFromFile(item);
                
                if(project.type == 'closedProject'){
                    
                    // the project is closed
                    var projectName = projectManager.getProjectNameFromFile(item);
                    
                    // ask to open the project
                    var open = confirm("This file belongs to the " + projectName + " Project.\nDo you want to open it?");
                    
                    if (open == true){
                        
                        projectManager.open(project);
                        
                    }else{
                        return;
                    }
                    
                }
              
                // open the file
                filesystemService.get(item, readOnly);
                
                // add the file to the recent files list
                this.addRecentlyOpenedFile(item);
            },
            
            del : function(item){
                
                filesystemService.del(item);
            },
            
            save : function(){
              
                // summary : save the editor contents of the 
                //           currently selected item
              
                // get editor contents
                var contents = editorManager.getEditorContents(this.selected);
              
                // save it
                filesystemService.save(this.selected, contents);
                
                // lookup the file in the changedFileList and remove it
                for(var i=0; i < this.dirtyFiles.length; i++){
                    
                    if(this.dirtyFiles[i] == this.selected){
                        this.dirtyFiles.splice(i,1);
                    }
                }
                
                // @todo check preference to compile or not
                mavenManager.compile();
            },
            
            saveAll : function(){
            
                // summary : save all files from the dirty list and remove them
                //
                
                var i = this.dirtyFiles.length;
                var saved = i;
                
                while (i--) {
                    
                    var contents = editorManager.getEditorContents(this.dirtyFiles[i]);
              
                    filesystemService.save(this.dirtyFiles[i], contents);
                
                    this.dirtyFiles.splice(i,1);    
                }
                
                if(saved>0){
                    // @todo check preference to compile or not
                    mavenManager.compile();
                }
            },
            
            create : function(item){
                
                filesystemService.create(item);
            },
            
            checkTrash : function(){
              
                filesystemService.checkTrash();
            },
            
            
            emptyTrash : function(){
              
                filesystemService.emptyTrash();
              
            },
            
            find : function(args){
                
                filesystemService.find(args);
                
            },
            
            copy : function(){
                this.copySource = dijit.byId('projectTree').attr('selectedItem');
                dijit.byId('filesystemMenu_paste').attr('disabled',false);
            },
            
            cut : function(){
                this.moveSource = dijit.byId('projectTree').attr('selectedItem');
                dijit.byId('filesystemMenu_paste').attr('disabled',false);
            },
            
            paste : function(){
    
                if(this.copySource == null){
    
                    this.moveDestination = dijit.byId('projectTree').attr('selectedItem');
        
                    if(this.moveSource.id == this.moveDestination.id){
            
                        alert('Source and Destination cannot be the same');
            
                    }else{
            
                        filesystemService.rename(this.moveSource.id, this.moveDestination.id);
                    }
        
                }else{
    
                    this.copyDestination = dijit.byId('projectTree').attr('selectedItem');

                    if(this.copySource.id == this.copyDestination.id){
            
                        alert('Source and Destination cannot be the same');
            
                    }else{
            
                        filesystemService.copy(this.copySource.id, this.copyDestination.id);
                    }
                }
    
                this.copySource = null;
                this.copyDestination = null;
                this.moveSource = null;
                this.moveDestination = null;

                dijit.byId('filesystemMenu_paste').attr('disabled',true);
            
            },
            
            addRecentlyOpenedFile : function(item){
            
                // summary :
            
                
                // check if it's already in the array
                var i = this.recentlyOpened.length;
                while (i--) {
                    if (this.recentlyOpened[i] == item) {
                        // it's already in there, return ziltsj
                        return;
                    }
                }
                
                // add file to the array, at the top as it was selected last
                // and should show up in the menu that way
                this.recentlyOpened.unshift(item);
                
                // pop the last item in the array to only contain the last 10 items
                // when more than 10 are in there
                if(this.recentlyOpened.length > 10){
                    this.recentlyOpened.pop();
                }
                
                
                // add the updated list to the cookie
                cookieManager.set('recentFiles', json.stringify(this.recentlyOpened));
                
                // update the menu
                this._updateOpenedFiles();
            },
            
            
            addChangedFile : function(item){
              
              
                var i = this.dirtyFiles.length;
              
                while (i--) {
                    if (this.dirtyFiles[i] == item) {
                        // it's already in there, do nothing
                        return;
                    }
                }
              
                this.dirtyFiles.push(item);
              
            },
            
            // update the 'file -> open recent file'
            _updateOpenedFiles : function(){
                
                // get handle on the menu
                var menu = dijit.byId('fileMenu_open_recent_file');
                
                // remove all existing items
                menu.destroyDescendants(false);
                
                var file;
                
                // create the refreshed list
                for (var i = 0; i < this.recentlyOpened.length; i++) {
                    
                    // if there is actually an item in the slot
                    if(this.recentlyOpened[i] != undefined){
                        
                        file = this.recentlyOpened[i];
                    
                        var menuItem = new MenuItem({
                            
                            label : file.label,
                            file : file,
                            iconClass : '',
                            onClick : function(event){
                         
                                var item = registry.getEnclosingWidget(event.target);
                    
                                fileManager.get(item.get('file'), false);
                            } 
                        })
                    
                        // add a menuitem for it
                        menu.addChild(menuItem);
                        
                    }
                }
            },
            
            getIcon : function(item, opened){
              
                // return unknown when nothing applies            
                var icon = "unknownIcon";            
                
                if(item.type == 'project' ){	
        
                    return "projectIcon";
    		
                }else if(item.type == 'projectSettings'){
			
                    icon = "projectSettingsIcon";	
			
                    if(item.status == 'untracked'){
                        icon = "projectSettingsUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "projectSettingsModifiedIcon";
                    }	
			
                    return icon;
			
                }else if(item.type == 'mavenSettings'){
			
                    icon = "mavenSettingsIcon";	
			
                    if(item.status == 'untracked'){
                        icon = "mavenSettingsUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "mavenSettingsModifiedIcon";
                    }	
			
                    return icon;
                        
                        
                }else if(item.type == 'flowDesign'){
		
                    icon = "flowDesignIcon";	
			
                    if(item.status == 'untracked'){
                        icon = "flowDesignUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "flowDesignModifiedIcon";
                    }
			
                    return icon;
			
                }else if(item.type == 'sources'){
		
                    icon = "sourceFolderIcon";	
			
                    if(item.status == 'untracked'){
                        icon = "sourceFolderUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "sourceFolderModifiedIcon";
                    }
		
                    if(item.status == 'missing'){
                        icon = "sourceFolderMissingIcon";
                    }
		
                    return icon;
        
                }else if(item.type == 'webapp'){
		
                    icon = "webappFolderIcon";	
			
                    if(item.status == 'untracked'){
                        icon = "webappFolderUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "webappFolderModifiedIcon";
                    }
		
                    if(item.status == 'missing'){
                        icon = "webappFolderMissingIcon";
                    }
		
                    return icon;
    		
                }else if(item.type == 'javaFile'){
			
                    icon = "javaFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "javaFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "javaFileModifiedIcon";
                    }
		
                    return icon;

                }else if(item.type == 'jspFile'){
			
                    icon = "jspFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "jspFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "jspFileModifiedIcon";
                    }
		
                    return icon;

                }else if(item.type == 'xmlFile'){
			
                    icon = "xmlFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "xmlFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "xmlFileModifiedIcon";
                    }
		
                    return icon;
		
                }else if(item.type == 'xhtmlFile'){
			
                    icon = "xhtmlFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "xhtmlFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "xhtmlFileModifiedIcon";
                    }
		
                    return icon;
		
                }else if(item.type == 'htmlFile'){
			
                    icon = "htmlFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "htmlFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "htmlFileModifiedIcon";
                    }
		
                    return icon;
		
                
                }else if(item.type == 'wsdlFile'){
			
                    icon = "wsdlFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "wsdlFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "wsdlFileModifiedIcon";
                    }
		
                    return icon;
		
                }else if(item.type == 'xsdFile'){
			
                    icon = "xsdFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "xsdFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "xsdFileModifiedIcon";
                    }
		
                    return icon;
		
                }else if(item.type == 'textFile'){
			
                    icon = "textFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "textFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "textFileModifiedIcon";
                    }
		
                    return icon;
                
                }else if(item.type == 'cssFile'){
			
                    icon = "cssFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "cssFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "cssFileModifiedIcon";
                    }
		
                    return icon;
                
                }else if(item.type == 'jsFile'){
			
                    icon = "jsFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "jsFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "jsFileModifiedIcon";
                    }
		
                    return icon;
                
                }else if(item.type == 'imageFile'){
			
                    icon = "imageFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "imageFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "imageFileModifiedIcon";
                    }
		
                    return icon;
                
                }else if(item.type == 'tldFile'){
			
                    icon = "tldFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "tldFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "tldFileModifiedIcon";
                    }
		
                    return icon;
		
                }else if(item.type == 'sqlFile'){
			
                    icon = "sqlFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "sqlFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "sqlFileModifiedIcon";
                    }
		
                    return icon;
		
                }else if(item.type == 'resources'){
		
                    icon = "resourceFolderIcon";
		
                    if(item.status == 'untracked'){
                        icon = "resourceFolderUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){	    
                        icon = "resourceFolderModifiedIcon";
                    }
		
                    if(item.status == 'missing'){
                        icon = "resourceFolderMissingIcon";
                    }
			
                    return icon;
                    
                }else if(item.type == 'propertiesFile'){
		
                    icon = "propertiesFileIcon";
		
                    if(item.status == 'untracked'){
                        icon = "propertiesFileUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){	    
                        icon = "propertiesFileModifiedIcon";
                    }
		
                    if(item.status == 'missing'){
                        icon = "propertiesFileMissingIcon";
                    }
			
                    return icon;
                    
                }else if(item.type == 'tomcat'){
		
                    icon = "tomcatIcon";
			
                    return icon;
                    
                }else if(item.type == 'tomcatWebApps'){
		
                    icon = "tomcatWebAppsIcon";
			
                    return icon;
                    
                }else if(item.type == 'tomcatApp'){
		
                    icon = "tomcatAppIcon";
			
                    return icon;
                
                }else if(item.type == 'jarFile'){
		
                    icon = "jarFileIcon";
			
                    return icon;
                
                }else if(item.type == 'sha1File'){
		
                    icon = "sha1FileIcon";
			
                    return icon;
                
                }else if(item.type == 'mysql'){
		
                    icon = "mysqlIcon";
			
                    return icon;
                
                }else if(item.type == 'javadb'){
		
                    icon = "javadbIcon";
			
                    return icon;
                
                }
                else if(item.type == 'oracle'){
		
                    icon = "oracleIcon";
			
                    return icon;
                
                }else if(item.type == 'rdbms'){
		
                    icon = "databasesIcon";
			
                    return icon;
                    
                }else if(item.type == 'webServices'){
		
                    icon = "webServicesIcon";
			
                    return icon;
                    
                }else if(item.type == 'servers'){
		
                    icon = "serverIcon";
			
                    return icon;
                    
                }else if(item.type == 'mavenRepositories'){
		
                    icon = "mavenRepositoriesIcon";
			
                    return icon;
                
                }else if(item.type == 'continuousIntegration'){
		
                    icon = "continuousIntegrationIcon";
			
                    return icon;
                
                }else if(item.type == 'issueTrackers'){
		
                    icon = "issueTrackersIcon";
			
                    return icon;
                
                }else if(item.type == 'folder'){
		
                    icon = "folderIcon";
                
                    if(item.status == 'untracked'){
                        icon = "folderUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "folderModifiedIcon";
                    }
		
                    if(item.status == 'missing'){
                        icon = "folderMissingIcon";
                    }	
                }
                
                return icon;
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
			
                }else if(item.type == 'folder'){
		        
                    return "/images/tree/folder.png";
                    
                }else{
                    
                    return "/images/tree/unknown.png";
                }  
              
            }   
        };
    });


