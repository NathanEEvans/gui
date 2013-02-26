/*
 * Stormcloud IDE - stormcloud/dialogs/Templates
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
    'dojo/store/JsonRest',
    'dojo/data/ObjectStore',
    'dijit/tree/TreeStoreModel',
    'dijit/Tree',
    'stormcloud/_base/context',
    'stormcloud/services/filesystem',
    'stormcloud/manager/DialogManager'], 
    function(
        JsonRest,
        ObjectStore,
        TreeStoreModel,
        Tree,
        context,
        filesystem,
        DialogManager){
            
        //
        // module      : stormcloud/dialogs/Templates
        // 
        // summary     : 
        //               

        var selected;
        
        return{
            
            init : function(){
            
                // populate the templates tree
                var templateRestStore = new JsonRest({
                
                    target : context.getApiUrl() + '/filesystem/templates'
              
                });
                
                var templateTreeModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : templateRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                });
       
                new Tree({
                    
                    model:templateTreeModel, 
                    
                    showRoot:false, 
                    // tree icon function
                    getIconClass : this.iconClass,
                    // tree double click handler
                    onDblClick : this.openItem,
                    // tree click
                    onClick : this.templateTreeOnClick
    
                }, 'templateTree');
            
            },
            
            
            cancel : function(){
              
                DialogManager.hide(DIALOG.TEMPLATES);
              
            },
            
            templateTreeOnClick : function(item){
              
                selected = item;
            },
            
            
            openItem : function(item, opened){
                
                
                filesystem.get(item, false);
                
                DialogManager.hide(DIALOG.TEMPLATES);
            },
            
            done : function() {
                
                filesystem.get(selected, false);
                
                // hide the dialog
                DialogManager.hide(DIALOG.TEMPLATES);
            },
            
            mayHaveChildren : function(item){
               
                if(item.children.length == 0){
                    return false;
                }else{
                    return true;
                }
            },
            
            iconClass : function(item, opened){
                
                // default value when nothing applies            
                var icon = "folderIcon";            
                
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
                
                }else if(item.type == 'oracle'){
		
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
                
                }else{
		
                    if(item.status == 'untracked'){
                        icon = "folderUntrackedIcon";
                    }
		
                    if(item.status == 'modified'){
                        icon = "folderModifiedIcon";
                    }
		
                    if(item.status == 'missing'){
                        icon = "folderMissingIcon";
                    }
		
                    return icon;	
                }
                
                
            }
        }
            
    });
