

function createAccount(userName, password, emailAddress){
    
    var create = new XMLHttpRequest();
    
    var params = 'userName=' + userName + '&password=' + password + '&emailAddress=' + emailAddress;

    console.info('sending');

    create.open('POST', 'https://' + window.location.host + '/stormcloud/api/user/createAccount', true);
    
    create.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    create.setRequestHeader("Content-length", params.length);
    
    create.onreadystatechange = function() {
                    
        if (create.readyState == 4) {
                        
            if (create.status == 200) {
                
                document.location = 'https://' + window.location.host + '/confirm.html'; 
                
            }else{
                            
                message = create.responseText;
                statusBar = document.getElementById('statusMessage');
                statusBar.style.color = 'red';
                statusBar.innerHTML = message;    
            }
        }           
    };
    
    create.send(params);
}