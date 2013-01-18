

require(['dojo/on','dijit/registry'], function(on, registry){

    on(registry.byId('aboutDialog'), 'onLoad', function(e) {
   
        alert('loaded!');
   
        require(['dijit/registry'], function(registry){
   
            var widget = registry.byId("AboutDialog_Close");
            
            alert(widget);
        });   
    });
});    