cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-call-number.CallNumber",
        "file": "plugins/cordova-plugin-call-number/www/CallNumber.js",
        "pluginId": "cordova-plugin-call-number",
        "clobbers": [
            "call"
        ]
    },
    {
        "id": "cordova-plugin-dialogs.notification",
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "es6-promise-plugin.Promise",
        "file": "plugins/es6-promise-plugin/www/promise.js",
        "pluginId": "es6-promise-plugin",
        "runs": true
    },
    {
        "id": "cordova-plugin-x-socialsharing.SocialSharing",
        "file": "plugins/cordova-plugin-x-socialsharing/www/SocialSharing.js",
        "pluginId": "cordova-plugin-x-socialsharing",
        "clobbers": [
            "window.plugins.socialsharing"
        ]
    },
    {
        "id": "cordova-plugin-x-toast.Toast",
        "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
        "pluginId": "cordova-plugin-x-toast",
        "clobbers": [
            "window.plugins.toast"
        ]
    },
    {
        "id": "cordova-plugin-x-toast.tests",
        "file": "plugins/cordova-plugin-x-toast/test/tests.js",
        "pluginId": "cordova-plugin-x-toast"
    },
    {
        "id": "cordova-plugin-nativestorage.mainHandle",
        "file": "plugins/cordova-plugin-nativestorage/www/mainHandle.js",
        "pluginId": "cordova-plugin-nativestorage",
        "clobbers": [
            "NativeStorage"
        ]
    },
    {
        "id": "cordova-plugin-nativestorage.LocalStorageHandle",
        "file": "plugins/cordova-plugin-nativestorage/www/LocalStorageHandle.js",
        "pluginId": "cordova-plugin-nativestorage"
    },
    {
        "id": "cordova-plugin-nativestorage.NativeStorageError",
        "file": "plugins/cordova-plugin-nativestorage/www/NativeStorageError.js",
        "pluginId": "cordova-plugin-nativestorage"
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-call-number": "1.0.1",
    "cordova-plugin-dialogs": "1.3.3",
    "cordova-plugin-network-information": "1.3.3",
    "cordova-plugin-splashscreen": "4.0.3",
    "cordova-plugin-statusbar": "2.2.3",
    "cordova-plugin-whitelist": "1.3.2",
    "es6-promise-plugin": "4.1.0",
    "cordova-plugin-x-socialsharing": "5.2.1",
    "cordova-plugin-x-toast": "2.6.0",
    "cordova-plugin-nativestorage": "2.2.2"
};
// BOTTOM OF METADATA
});