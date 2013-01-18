/*
 * Stormcloud IDE - stormcloud/gui/statusbar
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
define([], 
    function(){

        // module       : stormcloud/gui/statusbar  
        //		
        // summary      : 
        //		
        // description  :
        //		
        //		
    
        return {
            
            infoStatus : function(message){
    
                var statusBar = document.getElementById('statusBarMessage');
                statusBar.style.color = 'black';
                statusBar.innerHTML = message;
            },
            
            errorStatus : function(message){
    
                var statusBar = document.getElementById('statusBarMessage');
                statusBar.style.color = 'red';
                statusBar.innerHTML = message;
            },
            
            warnStatus : function(message){
    
                var statusBar = document.getElementById('statusBarMessage');
                statusBar.style.color = 'yellow';
                statusBar.innerHTML = message;
            },
            
            clearStatus : function(){
                var statusBar = document.getElementById('statusBarMessage');
                statusBar.innerHTML = '';
            },
            
            showProgress : function(){
    
                var progressBar = document.getElementById('progressBar');
                progressBar.style.visibility = 'visible';
    
            },
            
            hideProgress : function(){
    
                var progressBar = document.getElementById('progressBar');
                progressBar.style.visibility = 'hidden';
            }
        }
    });

