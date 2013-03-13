/*
 * Stormcloud IDE - stormcloud/service/GitHubManager
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
    'dojo/json',
    'dojox/encoding/base64',
    'stormcloud/rest/xhr',
    'stormcloud/rest/GitHubRequest'], 
    function(
        json,
        base64,
        xhr,
        GitHubRequest){

        //
        // module   : stormcloud/service/GitHubManager
        //		
        // summary  :
        //		

        var GITHUB = {

            API_URL : settingsManager.getGitHubApiUrl(),
            USER : settingsManager.getGitHubApiUrl() + '/user',
            REPOSITORIES : settingsManager.getGitHubApiUrl() +'/user/repos',
            ISSUES : settingsManager.getGitHubApiUrl() + '/issues'
        }

        return {
            
            user : null,
            organizations : null,
            repositories : null,
            issues : null,
            userIssues : null,
            
            
            init : function(){
              
                // summary : initial fetching of GitHub data
              
                if(settingsManager.getGitHubUser() 
                    && settingsManager.getGitHubPassword()){
                  
                    // if we have credentials get the user
                  
                    this.getUser();
                }
              
                if(this.user){
                    
                    // if the user was fetched, get the remaining initial data
                    
                    this.getOrganizations();
                    this.getIssues();
                    this.getRepositories();
                }
            },
            
            
            verify : function(credentials){
            
                // summary : verify the user credentials
                //           store them on success
            
                var args = {
                    
                    url: GITHUB.USER,
                    sync : true
                }
            
                var str = credentials.user + ':' + credentials.pass;
            
                var bytes = [];

                for (var i = 0; i < str.length; ++i){
                    bytes.push(str.charCodeAt(i));
                }
        
                var enc = base64.encode(bytes);
                
                args.headers = {
                    Authorization: "Basic " + enc
                };
        
                var deferred = xhr.get(args);
                
                deferred.then(
                    function(data){
            
                        alert('GitHub Account logon succeeded!');
                    },

                    function(error){
            
                        alert('GitHub Account logon failed!');
                    });
            },
            
            
            getUser : function(){
           
                
                var args = {
                    
                    url: GITHUB.USER,
                    sync : true
                }
                
                var deferred = GitHubRequest.get(args);
                
                deferred.then(
                    function(data){
            
                        gitHubManager.user = json.parse(data);    
                    },

                    function(error){
            
                        statusManager.error(error);
                    });
            },
            
            getOrganizations : function(){
                
                var args = {
                    
                    url: this.user.organizations_url,
                    sync : true
                }
                
                var deferred = GitHubRequest.get(args);
                
                deferred.then(
                    function(data){
            
                        gitHubManager.organizations = json.parse(data);
                    },

                    function(error){
            
                        statusManager.error(error);
                    });
            },
            
            
            getRepositories : function(){
              
                var args = {
                    
                    url: GITHUB.REPOSITORIES,
                    sync : true
                }
                
                var deferred = GitHubRequest.get(args);
                
                deferred.then(
                    function(data){
            
                        gitHubManager.repositories = json.parse(data);
                    },

                    function(error){
            
                        statusManager.error(error);
                    });
              
            },
            
            
            deleteRepository : function(url){
              
                var args = {
                    
                    url: url,
                    sync : true
                }
                
                var deferred = GitHubRequest.del(args);
                
                deferred.then(
                    function(data){
            
                        alert(data);
                    },

                    function(error){
            
                        statusManager.error(error);
                    });
          
              
            },
            
            
            getIssues : function(){
                
                var args = {
                    
                    url: GITHUB.ISSUES,
                    sync : true
                }
                
                var deferred = GitHubRequest.get(args);
                
                deferred.then(
                    function(data){
            
                        gitHubManager.issues = json.parse(data);
                    },

                    function(error){
            
                        statusManager.error(error);
                    });
            },
            
            
            getUserIssues : function(){
                
            // /user/issues
                
                
            },
            
            
            getOrganizationIssues : function(){
                
            // /orgs/:org/issues
                
            }
            
            
            
        }
        
    });

