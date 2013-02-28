/*
 * Stormcloud IDE - stormcloud/service/GitService
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
    'stormcloud/rest/xhr'], 
    function(
        xhr){

        //
        // module   : stormcloud/service/GitService
        //		
        // summary  :
        //		

        var GIT = {
            
            ADD : settingsManager.getApiUrl() + '/git/add',
            COMMIT : settingsManager.getApiUrl() + '/git/commit',
            STATUS : settingsManager.getApiUrl() + '/git/status',
            CLONE_REMOTE : settingsManager.getApiUrl() + '/git/clone-remote'
        
        };

        return {
        
            
            clone : function(uri){
              
                statusManager.showProgress();
                statusManager.info('Git Clone Running');
           
                var data = {
        
                    uri : uri
                };
    
                var xhrArgs = {
                    url: GIT.CLONE_REMOTE,
                    postData: dojo.toJson(data)
                };
            
                var deferred = xhr.post(xhrArgs,'JSON');
    
                deferred.then(
                    function(data){
            
                        if(data == '0'){
                
                            statusManager.hideProgress();
                            statusManager.info('Repository Cloned.');
            
                            treeManager.refresh('projectTree');
                            
                        }else{
            
                            statusManager.error(
                                'Failed to Clone.'+
                                ' Please review the <a href=\"javascript:alert'
                                +'(\'Open logfile window\');">log</a>');
                        }
                    },

                    function(error){
            
                        statusManager.error(error);
                    });
                
            },
            
            // Show changes made to the current working tree.
            showChanges: function(item){
    
                alert('show changes ' + item.id);
            },
    
            status: function(item){
          
          
            // get item status
          
          
            },
    
            // Add (stage) changes to the current working tree.
            add: function (item){
    
                var data = {
        
                    repository : item.id,
                    pattern : '.'
        
                };
    
                var xhrArgs = {
                    url: GIT.ADD,
                    postData: dojo.toJson(data)
                };
            
                var deferred = xhr.post(xhrArgs,'JSON');
    
                deferred.then(
                    function(data){
            
                        if(data == '0'){
                
                            treeManager.refresh('projectTree');
                        
                        }else{
            
                            statusManager.error(
                                'Failed to add sources.'+
                                ' Please review the <a href=\"javascript:alert'
                                +'(\'Open logfile window\');">log</a>');
                        }
                    },

                    function(error){
            
                        statusManager.error(error);
                    });
            },
    
            // Commit staged changes.
            commit: function(item, message){
    
                var data = {
        
                    repository : item.id,
                    message : message,
                    files : [],
                    all : false
        
                };
    
                var xhrArgs = {
                    url: GIT.COMMIT,
                    data: dojo.toJson(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                };
            
                var deferred = dojo.xhrPost(xhrArgs);
    
                deferred.then(
                    function(data){
            
                        if(data == '0'){
                
                            treeManager.refresh('projectTree');
                        
                        }else{
            
                            statusManager.error(
                                'Failed to add sources.'+
                                ' Please review the <a href=\"javascript:alert'
                                +'(\'Open logfile window\');">log</a>');
                        }
                    },

                    function(error){
            
                        statusManager.error(error);
                    });
            },
    
            // Revert workingtree modifications.
            revertModifications: function(){
    
                alert('revert modifications');
            },
    

            // Revert a previous commit
            revertCommit: function (){
    
                alert('revert commit');
            },
  
            // Add file or folder to the ignore file.
            ignore: function(){
    
                alert('ignore');
            },
        
            // Create a branch.
            createBranch: function(){
    
                alert('create branch');
            },
    
            // Switch to branch.
            switchToBranch: function(){
    
                alert('switch to branch');
            },
        
            // Create a tag.
            createTag: function(){
    
                alert('create tag');
            },
    
            // Manage existing tags.
            manageTags: function(){
    
                alert('manage tags');
            },
   
            // Checkout a revision.
            checkoutRevision: function(){
    
                alert('checkout revision');
            },
    
            // Checkout files
            checkoutFiles: function(){
    
                alert('checkout files');
            },
    
            // Merge a revision.
            mergeRevision: function(){
    
                alert('merge revision');
            },
        
            showHistory: function(){
            
                alert('show History');
            }
        };

    });