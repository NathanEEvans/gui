define([
    'dijit/registry',
    'dojo/store/JsonRest',
    'dojo/data/ObjectStore',
    'dijit/tree/TreeStoreModel',
    'dijit/Tree',
    'stormcloud/_base/context',
    'stormcloud/services/filesystem'], 
    function(
        registry,
        JsonRest,
        ObjectStore,
        TreeStoreModel,
        Tree,
        context,
        filesystem){
            
            
        return{
            
            init : function(){
            
                var closedProjectRestStore = new JsonRest({
                
                    target : 'http://localhost/stormcloud/api/filesystem/closed',
                    headers: {
                        Authorization: 'Basic bWFydGlqbjox'
                    }
                });
                    
                
                var closedTreeModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : closedProjectRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                });
       
       
                new Tree({
                    
                    model:closedTreeModel, 
                    showRoot:false, 
                    // tree icon function
                    getIconClass : this.iconClass,
                    // tree double click handler
                    onDblClick : this.openItem
    
                }, 'closedProjectTree');
            
            
            },
            
            done : function() {
            
                var item = dijit.byId('closedProjectTree').attr('selectedItem');

                require(['stormcloud/gui/dialog','stormcloud/services/filesystem'], function(dialog, filesystem){
                
                    filesystem.open(item);
                    dialog.hide(DIALOG.OPEN_PROJECT);
            
                });
            },
            
            mayHaveChildren : function(item){
                return false;
            },
            
            iconClass : function(item, opened){
                return 'projectIcon';
            }
        }
            
    });

