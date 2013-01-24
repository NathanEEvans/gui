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
            
                var fileRestStore = new JsonRest({
                
                    target : 'http://localhost/stormcloud/api/filesystem/types',
                    headers: {
                        Authorization: 'Basic bWFydGlqbjox'
                    }
                });
                    
                
                var fileTreeModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : fileRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                });
       
       
                new Tree({
                    
                    model:fileTreeModel, 
                    showRoot:false, 
                    // tree icon function
                    getIconClass : this.iconClass,
                    // tree double click handler
                    onDblClick : this.openItem,
                    // tree click
                    onClick : this.onClick
    
                }, 'fileTree');
            
            
            },
            
            onClick : function(item){
              
                dojo.byId('fileDescription').innerHTML = item.description;
            },
            
            done : function() {
            
                alert('save file');
            },
            
            mayHaveChildren : function(item){
                return false;
            },
            
            iconClass : function(item, opened){
                return 'projectIcon';
            }
        }
            
    });
