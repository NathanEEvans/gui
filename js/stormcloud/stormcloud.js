/*
 * Stormcloud IDE - stormcloud/stormcloud
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
require([
    'dojo/ready'],
    function(
        ready) {

        //
        // module      : stormcloud/stormcloud
        // 
        // summary     : The initial bootstrap of the stormcloud IDE JS
        // 
        // description : This module defines all JS that needs to be intialized,
        //               events that need to be bound, gui related things etc...
        //               

        ready(function() {

            // @todo do the check if the user is logged in
            //       when authenticated proceed with loading the code
            //       otherwise document.location = login.html

            // When Dojo is ready we bootstrap everything we initially need.
            require([
                'stormcloud/_base/context',
                'stormcloud/_base/events',
                'stormcloud/_base/gui'
                ], function(
                    context,
                    events,
                    gui) {

                    // nothing todo with the context just log where we got it
                    console.info("Context loaded api url : " + context.getApiUrl());

                    // bind all events
                    events.bind();

                    // bootstrap all gui activity
                    gui.bootstrap();

                    // When all is done, hide the loader
                    // hide the loader
                    // @todo tuck this away in a module
                    document.getElementById('loader').style.visibility = 'hidden';
                });
        });
    });