var Login = (function() {
    
    return{
    
        send: function(user, pass){
        
            dojo.require('dojox.encoding.base64');
        
            var str = user + ':' + pass;
            
            var bytes = [];

            for (var i = 0; i < str.length; ++i){
                bytes.push(str.charCodeAt(i));
            }
        
            var enc = dojox.encoding.base64.encode(bytes);
        
            var xhrArgs = {
                url: 'http://localhost/stormcloud/api/login',
                headers: {
                    Authorization: "Basic " + enc
                },
                load: function(data, ioargs){
                    
                    switch(ioargs.xhr.status ){
                        case 200:
                            document.location = 'http://localhost';
                            break;
                    }
                },
                error: function(error, ioargs){
                    
                    var message = "We do not recognize you as a registered user.";
                    var statusBar = document.getElementById('statusMessage');
                    statusBar.style.color = 'red';
                    statusBar.innerHTML = message;
                }
            };
            
            dojo.xhrPost(xhrArgs);
        },
        
        verify : function(){
            
        }


    };

    
})();