define([
    'dojo/store/JsonRest',
    'dojo/data/ObjectStore',
    'dijit/tree/TreeStoreModel',
    'dijit/Tree',
    'stormcloud/_base/context'], 
    function(
        JsonRest,
        ObjectStore,
        TreeStoreModel,
        Tree,
        context){
        

        return{
    
            init : function(){
                
               
                var archetypeRestStore = new JsonRest({
                
                    target : context.getApiUrl() + '/maven/archetypes'
                });
                
                var archetypeTreeModel = new TreeStoreModel({
          
                    store : new ObjectStore({
                    
                        objectStore : archetypeRestStore
                    }),
                    
                    mayHaveChildren : this.mayHaveChildren
                });
       
                new Tree({
                    
                    model:archetypeTreeModel, 
                    showRoot:false, 
                    // tree icon function
                    getIconClass : this.iconClass,
                    // tree double click handler
                    onDblClick : this.openItem,
                    // tree click
                    onClick : this.onClick
    
                }, 'archetypeTree');
                
                
            },
            
            onClick : function(item){
              
                dojo.byId('archetypeGroupId').innerHTML = item.groupId;
                dojo.byId('archetypeArtifactId').innerHTML = item.artifactId;
                dojo.byId('archetypeVersion').innerHTML = item.version;
                dojo.byId('archetypeDescription').innerHTML = item.description;

                dojo.byId('archetypeGroupId2').innerHTML = item.groupId;
                dojo.byId('archetypeArtifactId2').innerHTML = item.artifactId;
                dojo.byId('archetypeVersion2').innerHTML = item.version;
                dojo.byId('archetypeDescription2').innerHTML = item.description;
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