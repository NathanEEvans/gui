

    
require(['dojo/on', 'dijit/registry'], function(on, registry){
             
    on(registry.byId('defectsAndEnhancemnetsCancel'), 'click', function(e){
    
        alert('click');
    
        Dialog.hide('defectsAndEnhancementsDialog');

    });
    
    on(registry.byId('defectsAndEnhancemnetsOK'), 'click', function(e){
    
        Dialog.hide('defectsAndEnhancementsDialog');

    });
    
});