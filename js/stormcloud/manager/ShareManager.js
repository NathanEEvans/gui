


// create a random firepad string
// @todo make this a better unique id
//var id = this.randomString(10);
//        // append to the fireBaseRef
//        fireBaseRef.child(id);
//        console.info(id);
//        var firepad = Firepad.fromCodeMirror(
//        fireBaseRef,
//        editor,
//{
//userId: settingsManager.user.userName
//});
//        firepad.on('ready', function() {
//if (firepad.isHistoryEmpty()) {
//firepad.setText(contents);
//}
//});
//        randomString: function(length) {
//var text = "";
//        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//        for (var i = 0; i < length; i++)
//        text += possible.charAt(Math.floor(Math.random() * possible.length));
//        return text;
//},

var id = window.location.hash.replace(/#/g, '') || randomString(10);
var url = window.location.toString().replace(/#.*/, '') + '#' + id;

var fireBaseRef = new Firebase('https://stormcloud.firebaseio.com/').child(id);

function randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
