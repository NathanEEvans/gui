/*
 * Stormcloud IDE - stormcloud/manager/EventManager
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
    'dojo/on',
    'dijit/registry'],
    function(
        on,
        registry){

        //
        // module       : stormcloud/manager/EventManager
        // 
        // summary      : 
        //

        var EVENT = {
            // “click” - the user clicked a node
            CLICK: 'click',
            // dblclick - double clicked a node
            DOUBLE_CLICK : 'dblclick',
            // “focus” - a node received focus
            FOCUS: 'focus',
            //“blur” - a node was ‘blurred’, or otherwise lost focus
            BLUR: 'blur',
            //“change” - an input value was changed
            CHANGE: 'change',
            //“keypress” - fired when the user presses a key that displays
            KEYPRESS: 'keypress',
            //“keydown” - fired for non-printable keys
            KEYDOWN: 'keydown',
            //“keyup” - fired when the user releases a key
            KEYUP: 'keyup',
            //“mouseover” - a node was hovered (warning: may fire more than you’d like because of bubbling)
            MOUSEOVER: 'mouseover',
            //“mouseout” - a node was un-hovered
            MOUSEOUT: 'mouseout',
            //submit - a form has been submitted
            SUBMIT: 'submit'

        /** 
         * @todo find usable implementation for the dojo mouse events
         * dojo/mouse#enter - a normalized version of onmouseover that wont fire more than you’d like (only on first enter)    
         * dojo/mouse#leave - a normalized version of onmouseout that wont fire more than you’d like (only once when leaving)
         */

        }
        
        
        TARGET = {
            
            TOOLBAR_SEARCH_REDEFINE : 'toolbarSearch_redefine',
            TOOLBAR_SEARCH_CLEAR : 'toolbarSearch_clear',
            TOOLBAR_MAVEN_RUN : 'toolBarMaven_run',
            TOOLBAR_MAVEN_RERUN : 'toolBarMaven_rerun'
        }
        
        

        return {


            registerClick : function(node, listener){
                
                on(registry.byId(node), EVENT.CLICK, listener);
                
            }

        };
    });

