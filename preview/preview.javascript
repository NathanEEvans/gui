/*
 * Stormcloud IDE - stormcloud/Preview
 * 
 */
define([
    'things/to/preview'], 
    function(
        preview){
        
        // module      : stormcloud/Preview
        
        return{

            // when done
            seenItAll : function(){

                preview.done();

            }
        }; 
    });