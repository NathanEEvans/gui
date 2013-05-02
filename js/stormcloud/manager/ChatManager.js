/*
 * Stormcloud IDE - stormcloud/manager/ChatManager
 *
 * Copyright (C) 2012 - 2013 Stormcloud IDE
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 *
 */
define([
    'dijit/TooltipDialog',
    'dijit/popup',
    'dojo/dom',
    'dojo/on'],
        function(
                TooltipDialog,
                popup,
                dom,
                on) {


            //
            // module      : stormcloud/manager/ChatManager
            //
            // summary     :
            //

            FIREBASE = {
                USERS: 'https://stormcloud.firebaseio.com/users/',
                USER: 'https://stormcloud.firebaseio.com/users/' + settingsManager.user.userName,
                FRIEND_REQUEST: 'https://stormcloud.firebaseio.com/users/' + settingsManager.user.userName + '/friend-requests',
                CONNECTED: 'https://stormcloud.firebaseio.com/.info/connected'
            };
            return{
                userListRef: null,
                userRef: null,
                connectedRef: null,
                initializing: true,
                init: function() {

                    // add reference to the user list
                    this.userListRef = new Firebase(FIREBASE.USERS);
                    // add reference to the user entry
                    this.userRef = new Firebase(FIREBASE.USER);
                    // setup presence tracking
                    this.connectedRef = new Firebase(FIREBASE.CONNECTED);
                    this.connectedRef.on('value', function(snap) {

                        if (snap.val() === true) {

                            // We're connected (or reconnected)!
                            // Set up our presence state and tell
                            // the server to remove it when we leave.
                            chatManager.userRef.onDisconnect().remove();
                            chatManager.addUser();
                        }

                    });
                    // get the initial user list.
                    // Read once! After that keep updates.
                    this.userListRef.once('value', this.receiveUserList);
                    // add handler for users entering
                    this.userListRef.on('child_added', this.userAdded);
                    // add handler for user changes
                    this.userListRef.on('child_changed', this.userChanged);
                    // add handler for users leaving
                    this.userListRef.on('child_removed', this.userRemoved);
                },
                addUser: function() {

                    var user = {
                        userName: settingsManager.user.userName,
                        userId: settingsManager.user.id,
                        location: settingsManager.getInfo(INFO.CITY) + ', ' + settingsManager.getInfo(INFO.COUNTRY),
                        gravatar: settingsManager.getInfo(INFO.GRAVATAR),
                        status: settingsManager.user.status

                    };
                    this.userRef.set(user);
                },
                updateUser: function(user) {

                    this.userRef.update(user);
                },
                receiveUserList: function(snapshot) {

                    // get the users
                    var users = snapshot.val();
                    // loop and add
                    for (var user in users) {

                        // skip myself
                        if (users[user].userName
                                !== settingsManager.user.userName) {

                            // get my friends list
                            var friends = settingsManager.user.friends;
                            var isFriend = false;
                            // check if the user is in my friends list
                            for (var i = 0; i < friends.length; i++) {

                                if (friends[i].userName === users[user].userName) {

                                    chatManager.displayFriend(users[user]);
                                    isFriend = true;
                                    break;
                                }
                            }

                            // not a friend add to public list
                            if (isFriend === false) {

                                chatManager.displayUser(users[user]);
                            }
                        }
                    }

                    // mark done
                    this.initializing = false;
                },
                userAdded: function(snapshot) {

                    // summary : a user was added to the userlist
                    //           this is a callback invioked by firebase
                    //           when a user was added to the user list.

                    // only process when not initializing
                    if (this.initializing === false) {

                        var user = snapshot.val();
                        chatManager.displayUser(user);
                    }
                },
                userChanged: function(snapshot) {

                    var user = snapshot.val();
                    console.info('user updated:');
                    console.info(snapshot.val());
                },
                userRemoved: function(snapshot) {

                    var user = snapshot.val();
                    var div = document.getElementById(user.userName);
                    div.parentNode.removeChild(div);
                },
                displayUser: function(user) {

                    // create new user entry div
                    var userEntry = document.createElement('div');
                    // username will be the id for future reference
                    userEntry.id = user.userName;
                    userEntry.className = 'userEntry';
                    // create user gravatar div
                    var gravatar = document.createElement('img');
                    gravatar.src = user.gravatar;
                    // create the user info div
                    var userInfo = document.createElement('div');
                    userInfo.innerHTML = '<div class="chatUserName">' + user.userName + '</div><div class="chatLocation">' + user.location + '</div>';
                    // create user status div
                    var userStatus = document.createElement('div');
                    userStatus.className = user.status + 'IconSmall';
                    userEntry.appendChild(userStatus);
                    userEntry.appendChild(gravatar);
                    userEntry.appendChild(userInfo);
                    document.getElementById('publicUserList').appendChild(userEntry);

                    var myTooltipDialog = new TooltipDialog({
                        id: 'myTooltipDialog',
                        content: '<a href="#">Send ' + user.userName + ' a Friend request.</a>',
                        onMouseLeave: function() {
                            popup.close(myTooltipDialog);
                        }
                    });


                    on(dojo.byId(user.userName), 'mouseover', function() {
                        popup.open({
                            popup: myTooltipDialog,
                            around: dom.byId(user.userName)
                        });
                    });
                },
                displayFriend: function(user) {

                    // create new user entry div
                    var userEntry = document.createElement('div');
                    // username will be the id for future reference
                    userEntry.id = user.userName;
                    userEntry.className = 'userEntry';
                    // create user gravatar div
                    var gravatar = document.createElement('img');
                    gravatar.src = user.gravatar;
                    // create the user info div
                    var userInfo = document.createElement('div');
                    userInfo.innerHTML = '<div class="chatUserName">' + user.userName + '</div><div class="chatLocation">' + user.location + '</div>';
                    // create user status div
                    var userStatus = document.createElement('div');
                    userStatus.className = user.status + 'IconSmall';
                    userEntry.appendChild(userStatus);
                    userEntry.appendChild(gravatar);
                    userEntry.appendChild(userInfo);
                    document.getElementById('friendsUserList').appendChild(userEntry);
                }
            };
        });