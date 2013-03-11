/*
 * Stormcloud IDE - stormcloud/dialogs/GitHubAccount
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
    'dojo/date/locale'], 
    function(
        locale){
        
        //
        // module      : stormcloud/dialogs/GitHubAccount
        // 
        // summary     : 
        //               

        return{
    
            init : function(){
                
                
                var user = gitHubManager.user;
                var orgs = gitHubManager.organizations;
                var repos = gitHubManager.repositories;
                var issues = gitHubManager.issues;
                
                
                // if we have a user display the data
                if(user){
                
                    dojo.byId('gitHubUserName').innerHTML = user.login;
                    dojo.byId('gitHubAvatar').src = user.avatar_url;
                    dojo.byId('gitHubUserFullName').innerHTML = user.name;
                    dojo.byId('gitHubOrganisation').innerHTML = user.company;
                    dojo.byId('gitHubLocation').innerHTML = user.location;
                    dojo.byId('gitHubEmail').innerHTML = '<a href="mailto:' + user.email + '">' + user.email + '</a>';
                    dojo.byId('gitHubBlog').innerHTML = '<a href="' + user.blog + '" target="_blank">' + user.blog + '</a>';
                    
                    
                    // @todo data formatting with locale
                    dojo.byId('gitHubJoined').innerHTML = 'Joined on ' + user.created_at;
                    
                    dojo.byId('gitHubFollowers').innerHTML = user.followers;
                    dojo.byId('gitHubStarred').innerHTML = user.public_repos;
                    dojo.byId('gitHubFollowing').innerHTML = user.following;
                    
                    
                    
                    for(var i=0; i < orgs.length; i++){
                    
                        var img = document.createElement('img');
                        
                        img.src = orgs[i].avatar_url;
                    
                        dojo.byId('gitHubOrganisations').appendChild(img);    
                    }
                    
                    var privateRepos=0;
                    var publicRepos=0;
                    var repoList = dojo.byId('gitHubRepositories');
                    
                    // loop the repo's to gather stats
                    for(i=0; i < repos.length; i++){
                        
                        
                        // keep the count for the stats page
                        if(repos[i]['private'] == true){
                            privateRepos++;
                        }else{
                            publicRepos++;
                        }
                        
                        
                        // create an entry on the repo page
                        var repo = document.createElement('div');
                        repo.className = 'repoList';
                        
                        var htmlString =
                        '<div class="repoName">' + repos[i].name + ' <span>(' + (repos[i].fork ? 'Fork' : 'Repository') + ') - <a href="' + repos[i].html_url + '" target="_blank">' + repos[i].full_name + '</a></span></div>' +
                        '<div class="repoDescription">' + repos[i].description + '</div>' +
                        '<div class="repoLastUpdate">Last updated on ' + repos[i].updated_at + '</div>' +
                        
                        '<div class="repoClone"><button data-dojo-type="dijit/form/Button" type="button"' + (repos[i].language=='Java' ? '' : ' disabled="true"') + ' >' +
                        '<script type="dojo/connect" data-dojo-event="onClick">' +
                        'gitManager.clone(\'' + repos[i].ssh_url + '\');dialogManager.hide(DIALOG.GITHUB_ACCOUNT);' +
                        '</script>Clone ' + repos[i].name + '</button>';
                    
                        
                        repo.innerHTML = htmlString;
                        
                        
                        repoList.appendChild(repo);
                        
                    }
                    
                    var privateRepositories = dojo.byId('gitHubPrivateRepositories');
                    privateRepositories.innerHTML = privateRepos;
                    
                    var publicRepositories = dojo.byId('gitHubPublicRepositories'); 
                    publicRepositories.innerHTML = publicRepos;
                    
                    
                    dojo.byId('gitHubIssues').innerHTML = issues.length;
                
                    
                    
                    
                    
                    
                
                
                
                }else{
                    
                    // show the message that user account info is missing
                    dojo.byId('gitHubAccountMessage').innerHTML = 'No GitHub Account Information has been defined.\n' +
                'Go to Preferences -> GitHub and provide you GitHub Account Details.';
                    
                    
                    
                    
                }
                
                
    
            }
    
    
    
    
    
    
        }

    });