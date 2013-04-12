/*
 * Stormcloud IDE - stormcloud/manager/StatusManager
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
    'stormcloud/util/date'], 
    function(
        date){

        //
        // module       : stormcloud/manager/StatusManager
        //		
        // summary      : 
        //				
    
        return {
            
            
            startProcess : function(message){
              
                // summary : convenience method which both shows progress
                //           with the specified message and logs the message
                //           to the console.
              
                this.info(message);
                this.showProgress(message);
              
            },
            
            stopProcess : function(message){
              
                // summary : convenience method which both hides the progress
                //           and logs the given message to console
              
                this.info(message);
                this.hideProgress();
              
            },
            
            info : function(message){
    
                var statusBar = document.getElementById('consoleWindow');
                
                var entry = document.createElement('div');
                entry.className = 'consoleInfo';
                entry.innerHTML =  date.getLogTime() + ' INFO ' + message;
                
                statusBar.appendChild(entry);
                
                statusBar.scrollTop = statusBar.scrollHeight;
                    
            },
            
            error : function(message){
    
                var statusBar = document.getElementById('consoleWindow');
                
                var entry = document.createElement('div');
                entry.className = 'consoleError';
                entry.innerHTML = date.getLogTime() + ' ERROR ' + message;
                
                statusBar.appendChild(entry);
      
                statusBar.scrollTop = statusBar.scrollHeight;
      
            },
            
            warn : function(message){
    
                var statusBar = document.getElementById('consoleWindow');
                
                var entry = document.createElement('div');
                entry.className = 'consoleWarning';
                entry.innerHTML = date.getLogTime() + ' WARNING ' + message;
                
                statusBar.appendChild(entry);
                
                statusBar.scrollTop = statusBar.scrollHeight;
            },
            
            clear : function(){
                
                var statusBar = document.getElementById('consoleWindow');
                statusBar.innerHTML = '';
            },
            
            showProgress : function(message){
    
                var statusBar = document.getElementById('statusBarMessage');
                statusBar.innerHTML = message;
                
                var progressBar = document.getElementById('progressBar');
                progressBar.style.visibility = 'visible';
    
            },
            
            hideProgress : function(){
    
                var statusBar = document.getElementById('statusBarMessage');
                statusBar.innerHTML = '';
                
                var progressBar = document.getElementById('progressBar');
                progressBar.style.visibility = 'hidden';
            }
        }
    });

