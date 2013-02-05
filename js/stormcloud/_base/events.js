/*
 * Stormcloud IDE - stormcloud/_base/events
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
    'stormcloud/_events/menu/bar/stormcloud',
    'stormcloud/_events/menu/bar/file',
    'stormcloud/_events/menu/bar/edit',
    'stormcloud/_events/menu/bar/view',
    'stormcloud/_events/menu/bar/navigate',
    'stormcloud/_events/menu/bar/source',
    'stormcloud/_events/menu/bar/refactor',
    'stormcloud/_events/menu/bar/run',
    'stormcloud/_events/menu/bar/debug',
    'stormcloud/_events/menu/bar/window',
    'stormcloud/_events/menu/bar/help',
    'stormcloud/_events/menu/context/filesystem',
    'stormcloud/_events/menu/context/tomcat',
    'stormcloud/_events/menu/context/project',
    'stormcloud/_events/menu/tool/bar'],
    function(
        stormcloud,
        file,
        edit,
        view,
        navigate,
        source,
        refactor,
        run,
        debug,
        window,
        help,
        filesystem,
        tomcat,
        project,
        bar) {

        //
        // module      : stormcloud/_base/events
        // 
        // summary     : This file invokes the bind on the menu event files
        //               and contains some event globals.
        //               

        // Global events
        EVENT = {
            // “click” - the user clicked a node
            CLICK: 'click',
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

        return{
            
            // Bind the events to the widgets
            bind: function() {

                // Main menubar (From left to right)
                stormcloud.bind();
                file.bind();
                edit.bind();
                view.bind();
                navigate.bind();
                source.bind();
                refactor.bind();
                run.bind();
                debug.bind();
                window.bind();
                help.bind();

                // Context menus
                filesystem.bind();
                tomcat.bind();
                project.bind();
                
                // The Toolbar (Icon menus)                
                bar.bind();

            }
        };

    });
