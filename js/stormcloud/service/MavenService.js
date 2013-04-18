/**
 *
 */
define([
    'stormcloud/service/LogService',
    'stormcloud/rest/xhr'],
    function(
        LogService,
        xhr){

        //
        // module   : stormcloud/service/MavenService
        //
        // summary  :
        //

        var URL = {

            MAVEN_EXECUTE : settingsManager.getApiUrl() + '/maven/execute',
            MAVEN_CREATE : settingsManager.getApiUrl() + '/maven/create'
        };

        return{

            execute: function(command, item){

                // summary : execute a maven command

                statusManager.info('Running Maven command [' + command + '] on [' + item.id + ']');

                var xhrArgs = {
                    url: URL.MAVEN_EXECUTE,
                    content : {
                        commands : command,
                        filePath : item.id
                    }
                }

                var deferred = xhr.post(xhrArgs);

                LogService.startMaven();

                deferred.then(
                    function(data){

                        LogService.stopMaven(data);
                    },
                    function(error){

                        statusManager.error(error);
                    });
            },

            create: function(args){


                statusManager.startProcess('Creating Project ' + args.projectName + ' [groupId ' + args.groupId + ', artifactId ' + args.artifactId + ', version ' + args.version + ']');

                var xhrArgs = {
                    url: URL.MAVEN_CREATE,
                    handleAs: 'json',
                    postData: dojo.toJson(args)
                }

                var deferred = xhr.post(xhrArgs,'JSON');

                LogService.startMaven();

                deferred.then(
                    function(data){

                        LogService.stopMaven(data);

                        if(data == '0'){

                            statusManager.stopProcess('Project Created Successfully.');

                            treeManager.refresh('projectTree');

                        }else{

                            statusManager.error('Failed to create your project. Please review the <a href=\"javascript:alert(\'Open logfile window\');">log</a>');
                        }

                        // reset the form
                        //var btn = dijit.byId('newProjectOkButton');
                        //btn.setAttribute('disabled', true);

                        //btn = dijit.byId('newProjectCancelButton');
                        //btn.setAttribute('label', 'Cancel');

                        dojo.forEach(dijit.byId('newProjectForm').getDescendants(), function(widget) {
                            widget.attr('value', null);
                        });
                    },

                    function(error){

                        statusManager.error(error);
                    });




            }

        };

    });