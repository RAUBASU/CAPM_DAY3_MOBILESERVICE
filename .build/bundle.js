(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/IncidentReporting/i18n/i18n.properties":
/*!******************************************************************!*\
  !*** ./build.definitions/IncidentReporting/i18n/i18n.properties ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Application/AppUpdateFailure.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Application/AppUpdateFailure.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/IncidentReporting/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Application/AppUpdateSuccess.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Application/AppUpdateSuccess.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/IncidentReporting/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/IncidentReporting/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Application/ClientIsMultiUserMode.js":
/*!****************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Application/ClientIsMultiUserMode.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Application/GetClientSupportVersions.js":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Application/GetClientSupportVersions.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Application/GetClientVersion.js":
/*!***********************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Application/GetClientVersion.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Application/OnWillUpdate.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Application/OnWillUpdate.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/IncidentReporting/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Application/ResetAppSettingsAndLogout.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/IncidentReporting/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Logging/LogLevels.js":
/*!************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Logging/LogLevels.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Logging/SetTraceCategories.js":
/*!*********************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Logging/SetTraceCategories.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Logging/SetUserLogLevel.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Logging/SetUserLogLevel.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Logging/ToggleLogging.js":
/*!****************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Logging/ToggleLogging.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Logging/TraceCategories.js":
/*!******************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Logging/TraceCategories.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Logging/UserLogSetting.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Logging/UserLogSetting.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/PA85839U10/Category/Category_DeleteConfirmation.js":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/PA85839U10/Category/Category_DeleteConfirmation.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/IncidentReporting/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/IncidentReporting/Actions/PA85839U10/Category/Category_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/PA85839U10/IncidentHistory/IncidentHistory_DeleteConfirmation.js":
/*!********************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/PA85839U10/IncidentHistory/IncidentHistory_DeleteConfirmation.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/IncidentReporting/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/IncidentReporting/Actions/PA85839U10/IncidentHistory/IncidentHistory_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/PA85839U10/IncidentPhotos/IncidentPhotos_DeleteConfirmation.js":
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/PA85839U10/IncidentPhotos/IncidentPhotos_DeleteConfirmation.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/IncidentReporting/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/PA85839U10/SafetyIncidents/SafetyIncidents_DeleteConfirmation.js":
/*!********************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/PA85839U10/SafetyIncidents/SafetyIncidents_DeleteConfirmation.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
    return clientAPI.executeAction('/IncidentReporting/Actions/DeleteConfirmation.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_DeleteEntity.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Delete entity failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Rules/Service/Initialize.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Rules/Service/Initialize.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Initialize)
/* harmony export */ });
function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _PA85839U10 = context.executeAction('/IncidentReporting/Actions/PA85839U10/Service/InitializeOnline.action');

    //You can add more service initialize actions here

    return Promise.all([_PA85839U10]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/IncidentReporting/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let incidentreporting_actions_application_appupdate_action = __webpack_require__(/*! ./IncidentReporting/Actions/Application/AppUpdate.action */ "./build.definitions/IncidentReporting/Actions/Application/AppUpdate.action")
let incidentreporting_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/IncidentReporting/Actions/Application/AppUpdateFailureMessage.action")
let incidentreporting_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./IncidentReporting/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/IncidentReporting/Actions/Application/AppUpdateProgressBanner.action")
let incidentreporting_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/IncidentReporting/Actions/Application/AppUpdateSuccessMessage.action")
let incidentreporting_actions_application_logout_action = __webpack_require__(/*! ./IncidentReporting/Actions/Application/Logout.action */ "./build.definitions/IncidentReporting/Actions/Application/Logout.action")
let incidentreporting_actions_application_navtoabout_action = __webpack_require__(/*! ./IncidentReporting/Actions/Application/NavToAbout.action */ "./build.definitions/IncidentReporting/Actions/Application/NavToAbout.action")
let incidentreporting_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./IncidentReporting/Actions/Application/NavToActivityLog.action */ "./build.definitions/IncidentReporting/Actions/Application/NavToActivityLog.action")
let incidentreporting_actions_application_navtosupport_action = __webpack_require__(/*! ./IncidentReporting/Actions/Application/NavToSupport.action */ "./build.definitions/IncidentReporting/Actions/Application/NavToSupport.action")
let incidentreporting_actions_application_onwillupdate_action = __webpack_require__(/*! ./IncidentReporting/Actions/Application/OnWillUpdate.action */ "./build.definitions/IncidentReporting/Actions/Application/OnWillUpdate.action")
let incidentreporting_actions_application_reset_action = __webpack_require__(/*! ./IncidentReporting/Actions/Application/Reset.action */ "./build.definitions/IncidentReporting/Actions/Application/Reset.action")
let incidentreporting_actions_application_resetmessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/Application/ResetMessage.action */ "./build.definitions/IncidentReporting/Actions/Application/ResetMessage.action")
let incidentreporting_actions_application_usermenupopover_action = __webpack_require__(/*! ./IncidentReporting/Actions/Application/UserMenuPopover.action */ "./build.definitions/IncidentReporting/Actions/Application/UserMenuPopover.action")
let incidentreporting_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./IncidentReporting/Actions/CloseModalPage_Cancel.action */ "./build.definitions/IncidentReporting/Actions/CloseModalPage_Cancel.action")
let incidentreporting_actions_closemodalpage_complete_action = __webpack_require__(/*! ./IncidentReporting/Actions/CloseModalPage_Complete.action */ "./build.definitions/IncidentReporting/Actions/CloseModalPage_Complete.action")
let incidentreporting_actions_closepage_action = __webpack_require__(/*! ./IncidentReporting/Actions/ClosePage.action */ "./build.definitions/IncidentReporting/Actions/ClosePage.action")
let incidentreporting_actions_createentityfailuremessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/CreateEntityFailureMessage.action */ "./build.definitions/IncidentReporting/Actions/CreateEntityFailureMessage.action")
let incidentreporting_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/IncidentReporting/Actions/CreateEntitySuccessMessage.action")
let incidentreporting_actions_deleteconfirmation_action = __webpack_require__(/*! ./IncidentReporting/Actions/DeleteConfirmation.action */ "./build.definitions/IncidentReporting/Actions/DeleteConfirmation.action")
let incidentreporting_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/IncidentReporting/Actions/DeleteEntityFailureMessage.action")
let incidentreporting_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/IncidentReporting/Actions/DeleteEntitySuccessMessage.action")
let incidentreporting_actions_genericbannermessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/GenericBannerMessage.action */ "./build.definitions/IncidentReporting/Actions/GenericBannerMessage.action")
let incidentreporting_actions_genericmessagebox_action = __webpack_require__(/*! ./IncidentReporting/Actions/GenericMessageBox.action */ "./build.definitions/IncidentReporting/Actions/GenericMessageBox.action")
let incidentreporting_actions_genericnavigation_action = __webpack_require__(/*! ./IncidentReporting/Actions/GenericNavigation.action */ "./build.definitions/IncidentReporting/Actions/GenericNavigation.action")
let incidentreporting_actions_generictoastmessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/GenericToastMessage.action */ "./build.definitions/IncidentReporting/Actions/GenericToastMessage.action")
let incidentreporting_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./IncidentReporting/Actions/Logging/LogUploadFailure.action */ "./build.definitions/IncidentReporting/Actions/Logging/LogUploadFailure.action")
let incidentreporting_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./IncidentReporting/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/IncidentReporting/Actions/Logging/LogUploadSuccessful.action")
let incidentreporting_actions_logging_uploadlog_action = __webpack_require__(/*! ./IncidentReporting/Actions/Logging/UploadLog.action */ "./build.definitions/IncidentReporting/Actions/Logging/UploadLog.action")
let incidentreporting_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./IncidentReporting/Actions/Logging/UploadLogProgress.action */ "./build.definitions/IncidentReporting/Actions/Logging/UploadLogProgress.action")
let incidentreporting_actions_pa85839u10_category_category_createentity_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/Category/Category_CreateEntity.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/Category_CreateEntity.action")
let incidentreporting_actions_pa85839u10_category_category_deleteentity_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/Category/Category_DeleteEntity.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/Category_DeleteEntity.action")
let incidentreporting_actions_pa85839u10_category_category_updateentity_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/Category/Category_UpdateEntity.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/Category_UpdateEntity.action")
let incidentreporting_actions_pa85839u10_category_navtocategory_create_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Create.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Create.action")
let incidentreporting_actions_pa85839u10_category_navtocategory_detail_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Detail.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Detail.action")
let incidentreporting_actions_pa85839u10_category_navtocategory_edit_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Edit.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Edit.action")
let incidentreporting_actions_pa85839u10_category_navtocategory_list_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/Category/NavToCategory_List.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_List.action")
let incidentreporting_actions_pa85839u10_incidenthistory_incidenthistory_deleteentity_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/IncidentHistory/IncidentHistory_DeleteEntity.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentHistory/IncidentHistory_DeleteEntity.action")
let incidentreporting_actions_pa85839u10_incidenthistory_incidenthistory_updateentity_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/IncidentHistory/IncidentHistory_UpdateEntity.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentHistory/IncidentHistory_UpdateEntity.action")
let incidentreporting_actions_pa85839u10_incidenthistory_navtoincidenthistory_detail_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/IncidentHistory/NavToIncidentHistory_Detail.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentHistory/NavToIncidentHistory_Detail.action")
let incidentreporting_actions_pa85839u10_incidenthistory_navtoincidenthistory_edit_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/IncidentHistory/NavToIncidentHistory_Edit.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentHistory/NavToIncidentHistory_Edit.action")
let incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_deleteentity_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_DeleteEntity.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_DeleteEntity.action")
let incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_detailpopover_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_DetailPopover.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_DetailPopover.action")
let incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_opendocument_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_OpenDocument.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_OpenDocument.action")
let incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_updateentity_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_UpdateEntity.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_UpdateEntity.action")
let incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_uploadstream_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_UploadStream.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_UploadStream.action")
let incidentreporting_actions_pa85839u10_incidentphotos_navtoincidentphotos_detail_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/IncidentPhotos/NavToIncidentPhotos_Detail.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/NavToIncidentPhotos_Detail.action")
let incidentreporting_actions_pa85839u10_incidentphotos_navtoincidentphotos_edit_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/IncidentPhotos/NavToIncidentPhotos_Edit.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/NavToIncidentPhotos_Edit.action")
let incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_create_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Create.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Create.action")
let incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_createincidenthistory_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_CreateIncidentHistory.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_CreateIncidentHistory.action")
let incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_createincidentphotos_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_CreateIncidentPhotos.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_CreateIncidentPhotos.action")
let incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_detail_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Detail.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Detail.action")
let incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_edit_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Edit.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Edit.action")
let incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_list_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_List.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_List.action")
let incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_createentity_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateEntity.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateEntity.action")
let incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_createincidenthistory_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateIncidentHistory.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateIncidentHistory.action")
let incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_createincidentphotos_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateIncidentPhotos.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateIncidentPhotos.action")
let incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_deleteentity_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_DeleteEntity.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_DeleteEntity.action")
let incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_detailpopover_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_DetailPopover.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_DetailPopover.action")
let incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_updateentity_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_UpdateEntity.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_UpdateEntity.action")
let incidentreporting_actions_pa85839u10_service_initializeonline_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/Service/InitializeOnline.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/Service/InitializeOnline.action")
let incidentreporting_actions_pa85839u10_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/PA85839U10/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/IncidentReporting/Actions/PA85839U10/Service/InitializeOnlineFailureMessage.action")
let incidentreporting_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/IncidentReporting/Actions/UpdateEntityFailureMessage.action")
let incidentreporting_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/IncidentReporting/Actions/UpdateEntitySuccessMessage.action")
let incidentreporting_actions_uploadstreamfailuremessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/UploadStreamFailureMessage.action */ "./build.definitions/IncidentReporting/Actions/UploadStreamFailureMessage.action")
let incidentreporting_actions_uploadstreamsuccessmessage_action = __webpack_require__(/*! ./IncidentReporting/Actions/UploadStreamSuccessMessage.action */ "./build.definitions/IncidentReporting/Actions/UploadStreamSuccessMessage.action")
let incidentreporting_globals_application_appdefinition_version_global = __webpack_require__(/*! ./IncidentReporting/Globals/Application/AppDefinition_Version.global */ "./build.definitions/IncidentReporting/Globals/Application/AppDefinition_Version.global")
let incidentreporting_globals_application_applicationname_global = __webpack_require__(/*! ./IncidentReporting/Globals/Application/ApplicationName.global */ "./build.definitions/IncidentReporting/Globals/Application/ApplicationName.global")
let incidentreporting_globals_application_supportemail_global = __webpack_require__(/*! ./IncidentReporting/Globals/Application/SupportEmail.global */ "./build.definitions/IncidentReporting/Globals/Application/SupportEmail.global")
let incidentreporting_globals_application_supportphone_global = __webpack_require__(/*! ./IncidentReporting/Globals/Application/SupportPhone.global */ "./build.definitions/IncidentReporting/Globals/Application/SupportPhone.global")
let incidentreporting_i18n_i18n_properties = __webpack_require__(/*! ./IncidentReporting/i18n/i18n.properties */ "./build.definitions/IncidentReporting/i18n/i18n.properties")
let incidentreporting_jsconfig_json = __webpack_require__(/*! ./IncidentReporting/jsconfig.json */ "./build.definitions/IncidentReporting/jsconfig.json")
let incidentreporting_pages_application_about_page = __webpack_require__(/*! ./IncidentReporting/Pages/Application/About.page */ "./build.definitions/IncidentReporting/Pages/Application/About.page")
let incidentreporting_pages_application_support_page = __webpack_require__(/*! ./IncidentReporting/Pages/Application/Support.page */ "./build.definitions/IncidentReporting/Pages/Application/Support.page")
let incidentreporting_pages_application_useractivitylog_page = __webpack_require__(/*! ./IncidentReporting/Pages/Application/UserActivityLog.page */ "./build.definitions/IncidentReporting/Pages/Application/UserActivityLog.page")
let incidentreporting_pages_main_page = __webpack_require__(/*! ./IncidentReporting/Pages/Main.page */ "./build.definitions/IncidentReporting/Pages/Main.page")
let incidentreporting_pages_pa85839u10_category_category_create_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_Category/Category_Create.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_Category/Category_Create.page")
let incidentreporting_pages_pa85839u10_category_category_detail_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_Category/Category_Detail.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_Category/Category_Detail.page")
let incidentreporting_pages_pa85839u10_category_category_edit_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_Category/Category_Edit.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_Category/Category_Edit.page")
let incidentreporting_pages_pa85839u10_category_category_list_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_Category/Category_List.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_Category/Category_List.page")
let incidentreporting_pages_pa85839u10_incidenthistory_incidenthistory_detail_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_IncidentHistory/IncidentHistory_Detail.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_IncidentHistory/IncidentHistory_Detail.page")
let incidentreporting_pages_pa85839u10_incidenthistory_incidenthistory_edit_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_IncidentHistory/IncidentHistory_Edit.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_IncidentHistory/IncidentHistory_Edit.page")
let incidentreporting_pages_pa85839u10_incidentphotos_incidentphotos_detail_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_IncidentPhotos/IncidentPhotos_Detail.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_IncidentPhotos/IncidentPhotos_Detail.page")
let incidentreporting_pages_pa85839u10_incidentphotos_incidentphotos_edit_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_IncidentPhotos/IncidentPhotos_Edit.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_IncidentPhotos/IncidentPhotos_Edit.page")
let incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_create_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Create.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Create.page")
let incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_createincidenthistory_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_CreateIncidentHistory.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_CreateIncidentHistory.page")
let incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_createincidentphotos_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_CreateIncidentPhotos.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_CreateIncidentPhotos.page")
let incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_detail_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Detail.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Detail.page")
let incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_edit_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Edit.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Edit.page")
let incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_list_page = __webpack_require__(/*! ./IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_List.page */ "./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_List.page")
let incidentreporting_rules_application_appupdatefailure_js = __webpack_require__(/*! ./IncidentReporting/Rules/Application/AppUpdateFailure.js */ "./build.definitions/IncidentReporting/Rules/Application/AppUpdateFailure.js")
let incidentreporting_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./IncidentReporting/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/IncidentReporting/Rules/Application/AppUpdateSuccess.js")
let incidentreporting_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./IncidentReporting/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/IncidentReporting/Rules/Application/ClientIsMultiUserMode.js")
let incidentreporting_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./IncidentReporting/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/IncidentReporting/Rules/Application/GetClientSupportVersions.js")
let incidentreporting_rules_application_getclientversion_js = __webpack_require__(/*! ./IncidentReporting/Rules/Application/GetClientVersion.js */ "./build.definitions/IncidentReporting/Rules/Application/GetClientVersion.js")
let incidentreporting_rules_application_onwillupdate_js = __webpack_require__(/*! ./IncidentReporting/Rules/Application/OnWillUpdate.js */ "./build.definitions/IncidentReporting/Rules/Application/OnWillUpdate.js")
let incidentreporting_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./IncidentReporting/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/IncidentReporting/Rules/Application/ResetAppSettingsAndLogout.js")
let incidentreporting_rules_logging_loglevels_js = __webpack_require__(/*! ./IncidentReporting/Rules/Logging/LogLevels.js */ "./build.definitions/IncidentReporting/Rules/Logging/LogLevels.js")
let incidentreporting_rules_logging_settracecategories_js = __webpack_require__(/*! ./IncidentReporting/Rules/Logging/SetTraceCategories.js */ "./build.definitions/IncidentReporting/Rules/Logging/SetTraceCategories.js")
let incidentreporting_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./IncidentReporting/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/IncidentReporting/Rules/Logging/SetUserLogLevel.js")
let incidentreporting_rules_logging_togglelogging_js = __webpack_require__(/*! ./IncidentReporting/Rules/Logging/ToggleLogging.js */ "./build.definitions/IncidentReporting/Rules/Logging/ToggleLogging.js")
let incidentreporting_rules_logging_tracecategories_js = __webpack_require__(/*! ./IncidentReporting/Rules/Logging/TraceCategories.js */ "./build.definitions/IncidentReporting/Rules/Logging/TraceCategories.js")
let incidentreporting_rules_logging_userlogsetting_js = __webpack_require__(/*! ./IncidentReporting/Rules/Logging/UserLogSetting.js */ "./build.definitions/IncidentReporting/Rules/Logging/UserLogSetting.js")
let incidentreporting_rules_pa85839u10_category_category_deleteconfirmation_js = __webpack_require__(/*! ./IncidentReporting/Rules/PA85839U10/Category/Category_DeleteConfirmation.js */ "./build.definitions/IncidentReporting/Rules/PA85839U10/Category/Category_DeleteConfirmation.js")
let incidentreporting_rules_pa85839u10_incidenthistory_incidenthistory_deleteconfirmation_js = __webpack_require__(/*! ./IncidentReporting/Rules/PA85839U10/IncidentHistory/IncidentHistory_DeleteConfirmation.js */ "./build.definitions/IncidentReporting/Rules/PA85839U10/IncidentHistory/IncidentHistory_DeleteConfirmation.js")
let incidentreporting_rules_pa85839u10_incidentphotos_incidentphotos_deleteconfirmation_js = __webpack_require__(/*! ./IncidentReporting/Rules/PA85839U10/IncidentPhotos/IncidentPhotos_DeleteConfirmation.js */ "./build.definitions/IncidentReporting/Rules/PA85839U10/IncidentPhotos/IncidentPhotos_DeleteConfirmation.js")
let incidentreporting_rules_pa85839u10_safetyincidents_safetyincidents_deleteconfirmation_js = __webpack_require__(/*! ./IncidentReporting/Rules/PA85839U10/SafetyIncidents/SafetyIncidents_DeleteConfirmation.js */ "./build.definitions/IncidentReporting/Rules/PA85839U10/SafetyIncidents/SafetyIncidents_DeleteConfirmation.js")
let incidentreporting_rules_service_initialize_js = __webpack_require__(/*! ./IncidentReporting/Rules/Service/Initialize.js */ "./build.definitions/IncidentReporting/Rules/Service/Initialize.js")
let incidentreporting_services_pa85839u10_service = __webpack_require__(/*! ./IncidentReporting/Services/PA85839U10.service */ "./build.definitions/IncidentReporting/Services/PA85839U10.service")
let incidentreporting_styles_styles_css = __webpack_require__(/*! ./IncidentReporting/Styles/Styles.css */ "./build.definitions/IncidentReporting/Styles/Styles.css")
let incidentreporting_styles_styles_less = __webpack_require__(/*! ./IncidentReporting/Styles/Styles.less */ "./build.definitions/IncidentReporting/Styles/Styles.less")
let incidentreporting_styles_styles_light_css = __webpack_require__(/*! ./IncidentReporting/Styles/Styles.light.css */ "./build.definitions/IncidentReporting/Styles/Styles.light.css")
let incidentreporting_styles_styles_light_json = __webpack_require__(/*! ./IncidentReporting/Styles/Styles.light.json */ "./build.definitions/IncidentReporting/Styles/Styles.light.json")
let incidentreporting_styles_styles_light_nss = __webpack_require__(/*! ./IncidentReporting/Styles/Styles.light.nss */ "./build.definitions/IncidentReporting/Styles/Styles.light.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	incidentreporting_actions_application_appupdate_action : incidentreporting_actions_application_appupdate_action,
	incidentreporting_actions_application_appupdatefailuremessage_action : incidentreporting_actions_application_appupdatefailuremessage_action,
	incidentreporting_actions_application_appupdateprogressbanner_action : incidentreporting_actions_application_appupdateprogressbanner_action,
	incidentreporting_actions_application_appupdatesuccessmessage_action : incidentreporting_actions_application_appupdatesuccessmessage_action,
	incidentreporting_actions_application_logout_action : incidentreporting_actions_application_logout_action,
	incidentreporting_actions_application_navtoabout_action : incidentreporting_actions_application_navtoabout_action,
	incidentreporting_actions_application_navtoactivitylog_action : incidentreporting_actions_application_navtoactivitylog_action,
	incidentreporting_actions_application_navtosupport_action : incidentreporting_actions_application_navtosupport_action,
	incidentreporting_actions_application_onwillupdate_action : incidentreporting_actions_application_onwillupdate_action,
	incidentreporting_actions_application_reset_action : incidentreporting_actions_application_reset_action,
	incidentreporting_actions_application_resetmessage_action : incidentreporting_actions_application_resetmessage_action,
	incidentreporting_actions_application_usermenupopover_action : incidentreporting_actions_application_usermenupopover_action,
	incidentreporting_actions_closemodalpage_cancel_action : incidentreporting_actions_closemodalpage_cancel_action,
	incidentreporting_actions_closemodalpage_complete_action : incidentreporting_actions_closemodalpage_complete_action,
	incidentreporting_actions_closepage_action : incidentreporting_actions_closepage_action,
	incidentreporting_actions_createentityfailuremessage_action : incidentreporting_actions_createentityfailuremessage_action,
	incidentreporting_actions_createentitysuccessmessage_action : incidentreporting_actions_createentitysuccessmessage_action,
	incidentreporting_actions_deleteconfirmation_action : incidentreporting_actions_deleteconfirmation_action,
	incidentreporting_actions_deleteentityfailuremessage_action : incidentreporting_actions_deleteentityfailuremessage_action,
	incidentreporting_actions_deleteentitysuccessmessage_action : incidentreporting_actions_deleteentitysuccessmessage_action,
	incidentreporting_actions_genericbannermessage_action : incidentreporting_actions_genericbannermessage_action,
	incidentreporting_actions_genericmessagebox_action : incidentreporting_actions_genericmessagebox_action,
	incidentreporting_actions_genericnavigation_action : incidentreporting_actions_genericnavigation_action,
	incidentreporting_actions_generictoastmessage_action : incidentreporting_actions_generictoastmessage_action,
	incidentreporting_actions_logging_loguploadfailure_action : incidentreporting_actions_logging_loguploadfailure_action,
	incidentreporting_actions_logging_loguploadsuccessful_action : incidentreporting_actions_logging_loguploadsuccessful_action,
	incidentreporting_actions_logging_uploadlog_action : incidentreporting_actions_logging_uploadlog_action,
	incidentreporting_actions_logging_uploadlogprogress_action : incidentreporting_actions_logging_uploadlogprogress_action,
	incidentreporting_actions_pa85839u10_category_category_createentity_action : incidentreporting_actions_pa85839u10_category_category_createentity_action,
	incidentreporting_actions_pa85839u10_category_category_deleteentity_action : incidentreporting_actions_pa85839u10_category_category_deleteentity_action,
	incidentreporting_actions_pa85839u10_category_category_updateentity_action : incidentreporting_actions_pa85839u10_category_category_updateentity_action,
	incidentreporting_actions_pa85839u10_category_navtocategory_create_action : incidentreporting_actions_pa85839u10_category_navtocategory_create_action,
	incidentreporting_actions_pa85839u10_category_navtocategory_detail_action : incidentreporting_actions_pa85839u10_category_navtocategory_detail_action,
	incidentreporting_actions_pa85839u10_category_navtocategory_edit_action : incidentreporting_actions_pa85839u10_category_navtocategory_edit_action,
	incidentreporting_actions_pa85839u10_category_navtocategory_list_action : incidentreporting_actions_pa85839u10_category_navtocategory_list_action,
	incidentreporting_actions_pa85839u10_incidenthistory_incidenthistory_deleteentity_action : incidentreporting_actions_pa85839u10_incidenthistory_incidenthistory_deleteentity_action,
	incidentreporting_actions_pa85839u10_incidenthistory_incidenthistory_updateentity_action : incidentreporting_actions_pa85839u10_incidenthistory_incidenthistory_updateentity_action,
	incidentreporting_actions_pa85839u10_incidenthistory_navtoincidenthistory_detail_action : incidentreporting_actions_pa85839u10_incidenthistory_navtoincidenthistory_detail_action,
	incidentreporting_actions_pa85839u10_incidenthistory_navtoincidenthistory_edit_action : incidentreporting_actions_pa85839u10_incidenthistory_navtoincidenthistory_edit_action,
	incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_deleteentity_action : incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_deleteentity_action,
	incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_detailpopover_action : incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_detailpopover_action,
	incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_opendocument_action : incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_opendocument_action,
	incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_updateentity_action : incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_updateentity_action,
	incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_uploadstream_action : incidentreporting_actions_pa85839u10_incidentphotos_incidentphotos_uploadstream_action,
	incidentreporting_actions_pa85839u10_incidentphotos_navtoincidentphotos_detail_action : incidentreporting_actions_pa85839u10_incidentphotos_navtoincidentphotos_detail_action,
	incidentreporting_actions_pa85839u10_incidentphotos_navtoincidentphotos_edit_action : incidentreporting_actions_pa85839u10_incidentphotos_navtoincidentphotos_edit_action,
	incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_create_action : incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_create_action,
	incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_createincidenthistory_action : incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_createincidenthistory_action,
	incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_createincidentphotos_action : incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_createincidentphotos_action,
	incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_detail_action : incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_detail_action,
	incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_edit_action : incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_edit_action,
	incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_list_action : incidentreporting_actions_pa85839u10_safetyincidents_navtosafetyincidents_list_action,
	incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_createentity_action : incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_createentity_action,
	incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_createincidenthistory_action : incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_createincidenthistory_action,
	incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_createincidentphotos_action : incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_createincidentphotos_action,
	incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_deleteentity_action : incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_deleteentity_action,
	incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_detailpopover_action : incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_detailpopover_action,
	incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_updateentity_action : incidentreporting_actions_pa85839u10_safetyincidents_safetyincidents_updateentity_action,
	incidentreporting_actions_pa85839u10_service_initializeonline_action : incidentreporting_actions_pa85839u10_service_initializeonline_action,
	incidentreporting_actions_pa85839u10_service_initializeonlinefailuremessage_action : incidentreporting_actions_pa85839u10_service_initializeonlinefailuremessage_action,
	incidentreporting_actions_updateentityfailuremessage_action : incidentreporting_actions_updateentityfailuremessage_action,
	incidentreporting_actions_updateentitysuccessmessage_action : incidentreporting_actions_updateentitysuccessmessage_action,
	incidentreporting_actions_uploadstreamfailuremessage_action : incidentreporting_actions_uploadstreamfailuremessage_action,
	incidentreporting_actions_uploadstreamsuccessmessage_action : incidentreporting_actions_uploadstreamsuccessmessage_action,
	incidentreporting_globals_application_appdefinition_version_global : incidentreporting_globals_application_appdefinition_version_global,
	incidentreporting_globals_application_applicationname_global : incidentreporting_globals_application_applicationname_global,
	incidentreporting_globals_application_supportemail_global : incidentreporting_globals_application_supportemail_global,
	incidentreporting_globals_application_supportphone_global : incidentreporting_globals_application_supportphone_global,
	incidentreporting_i18n_i18n_properties : incidentreporting_i18n_i18n_properties,
	incidentreporting_jsconfig_json : incidentreporting_jsconfig_json,
	incidentreporting_pages_application_about_page : incidentreporting_pages_application_about_page,
	incidentreporting_pages_application_support_page : incidentreporting_pages_application_support_page,
	incidentreporting_pages_application_useractivitylog_page : incidentreporting_pages_application_useractivitylog_page,
	incidentreporting_pages_main_page : incidentreporting_pages_main_page,
	incidentreporting_pages_pa85839u10_category_category_create_page : incidentreporting_pages_pa85839u10_category_category_create_page,
	incidentreporting_pages_pa85839u10_category_category_detail_page : incidentreporting_pages_pa85839u10_category_category_detail_page,
	incidentreporting_pages_pa85839u10_category_category_edit_page : incidentreporting_pages_pa85839u10_category_category_edit_page,
	incidentreporting_pages_pa85839u10_category_category_list_page : incidentreporting_pages_pa85839u10_category_category_list_page,
	incidentreporting_pages_pa85839u10_incidenthistory_incidenthistory_detail_page : incidentreporting_pages_pa85839u10_incidenthistory_incidenthistory_detail_page,
	incidentreporting_pages_pa85839u10_incidenthistory_incidenthistory_edit_page : incidentreporting_pages_pa85839u10_incidenthistory_incidenthistory_edit_page,
	incidentreporting_pages_pa85839u10_incidentphotos_incidentphotos_detail_page : incidentreporting_pages_pa85839u10_incidentphotos_incidentphotos_detail_page,
	incidentreporting_pages_pa85839u10_incidentphotos_incidentphotos_edit_page : incidentreporting_pages_pa85839u10_incidentphotos_incidentphotos_edit_page,
	incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_create_page : incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_create_page,
	incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_createincidenthistory_page : incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_createincidenthistory_page,
	incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_createincidentphotos_page : incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_createincidentphotos_page,
	incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_detail_page : incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_detail_page,
	incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_edit_page : incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_edit_page,
	incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_list_page : incidentreporting_pages_pa85839u10_safetyincidents_safetyincidents_list_page,
	incidentreporting_rules_application_appupdatefailure_js : incidentreporting_rules_application_appupdatefailure_js,
	incidentreporting_rules_application_appupdatesuccess_js : incidentreporting_rules_application_appupdatesuccess_js,
	incidentreporting_rules_application_clientismultiusermode_js : incidentreporting_rules_application_clientismultiusermode_js,
	incidentreporting_rules_application_getclientsupportversions_js : incidentreporting_rules_application_getclientsupportversions_js,
	incidentreporting_rules_application_getclientversion_js : incidentreporting_rules_application_getclientversion_js,
	incidentreporting_rules_application_onwillupdate_js : incidentreporting_rules_application_onwillupdate_js,
	incidentreporting_rules_application_resetappsettingsandlogout_js : incidentreporting_rules_application_resetappsettingsandlogout_js,
	incidentreporting_rules_logging_loglevels_js : incidentreporting_rules_logging_loglevels_js,
	incidentreporting_rules_logging_settracecategories_js : incidentreporting_rules_logging_settracecategories_js,
	incidentreporting_rules_logging_setuserloglevel_js : incidentreporting_rules_logging_setuserloglevel_js,
	incidentreporting_rules_logging_togglelogging_js : incidentreporting_rules_logging_togglelogging_js,
	incidentreporting_rules_logging_tracecategories_js : incidentreporting_rules_logging_tracecategories_js,
	incidentreporting_rules_logging_userlogsetting_js : incidentreporting_rules_logging_userlogsetting_js,
	incidentreporting_rules_pa85839u10_category_category_deleteconfirmation_js : incidentreporting_rules_pa85839u10_category_category_deleteconfirmation_js,
	incidentreporting_rules_pa85839u10_incidenthistory_incidenthistory_deleteconfirmation_js : incidentreporting_rules_pa85839u10_incidenthistory_incidenthistory_deleteconfirmation_js,
	incidentreporting_rules_pa85839u10_incidentphotos_incidentphotos_deleteconfirmation_js : incidentreporting_rules_pa85839u10_incidentphotos_incidentphotos_deleteconfirmation_js,
	incidentreporting_rules_pa85839u10_safetyincidents_safetyincidents_deleteconfirmation_js : incidentreporting_rules_pa85839u10_safetyincidents_safetyincidents_deleteconfirmation_js,
	incidentreporting_rules_service_initialize_js : incidentreporting_rules_service_initialize_js,
	incidentreporting_services_pa85839u10_service : incidentreporting_services_pa85839u10_service,
	incidentreporting_styles_styles_css : incidentreporting_styles_styles_css,
	incidentreporting_styles_styles_less : incidentreporting_styles_styles_less,
	incidentreporting_styles_styles_light_css : incidentreporting_styles_styles_light_css,
	incidentreporting_styles_styles_light_json : incidentreporting_styles_styles_light_json,
	incidentreporting_styles_styles_light_nss : incidentreporting_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Styles/Styles.css":
/*!***************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Styles/Styles.css ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, "",{"version":3,"sources":["webpack://./build.definitions/IncidentReporting/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/IncidentReporting/Styles/Styles.less":
/*!****************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Styles/Styles.less ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, "",{"version":3,"sources":["webpack://./build.definitions/IncidentReporting/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/IncidentReporting/Styles/Styles.light.css":
/*!*********************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Styles/Styles.light.css ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/IncidentReporting/Styles/Styles.light.nss":
/*!*********************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Styles/Styles.light.nss ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/Application/About.page":
/*!**************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/Application/About.page ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/IncidentReporting/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/IncidentReporting/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/IncidentReporting/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)"},{"Value":"/IncidentReporting/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/IncidentReporting/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/Application/Support.page":
/*!****************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/Application/Support.page ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/IncidentReporting/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/IncidentReporting/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/IncidentReporting/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"disclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/IncidentReporting/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/IncidentReporting/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/Application/UserActivityLog.page":
/*!************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/Application/UserActivityLog.page ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/IncidentReporting/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/IncidentReporting/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/IncidentReporting/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/IncidentReporting/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/IncidentReporting/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/IncidentReporting/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/IncidentReporting/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/IncidentReporting/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/Main.page":
/*!*************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/Main.page ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[{"Header":{"_Name":"SectionHeader_PA85839U10","AccessoryType":"None","UseTopPadding":true,"Caption":"PA85839U10"},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Buttons":[{"OnPress":"/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_List.action","TextAlignment":"center","Title":"Category"},{"OnPress":"/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_List.action","TextAlignment":"center","Title":"SafetyIncidents"}],"_Name":"SectionButtonTable_PA85839U10","_Type":"Section.Type.ButtonTable"}]}],"_Name":"Main","_Type":"Page","Caption":"Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/IncidentReporting/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_Category/Category_Create.page":
/*!********************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_Category/Category_Create.page ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/IncidentReporting/Actions/CloseModalPage_Cancel.action","Position":"left","SystemItem":"Cancel"},{"OnPress":"/IncidentReporting/Actions/PA85839U10/Category/Category_CreateEntity.action","Position":"right","SystemItem":"Save"}]},"Caption":"Create Category Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Name","_Name":"name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"descr","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"code","_Name":"code","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Category_Create"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_Category/Category_Detail.page":
/*!********************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_Category/Category_Detail.page ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Category Detail","DesignTimeTarget":{"Service":"/IncidentReporting/Services/PA85839U10.service","EntitySet":"Category","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Edit.action","Position":"right","SystemItem":"Edit"},{"OnPress":"/IncidentReporting/Rules/PA85839U10/Category/Category_DeleteConfirmation.js","Position":"right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"DetailImage":"","HeadlineText":"{name}","Subhead":"{descr}","Tags":[],"BodyText":"","Footnote":"","Description":"{code}","StatusText":"","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Name","Value":"{name}"},{"KeyName":"Description","Value":"{descr}"},{"KeyName":"code","Value":"{code}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Category_Detail"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_Category/Category_Edit.page":
/*!******************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_Category/Category_Edit.page ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Category Detail","DesignTimeTarget":{"Service":"/IncidentReporting/Services/PA85839U10.service","EntitySet":"Category","QueryOptions":""},"ActionBar":{"Items":[{"Position":"left","SystemItem":"Cancel","OnPress":"/IncidentReporting/Actions/CloseModalPage_Cancel.action"},{"Position":"right","SystemItem":"Save","OnPress":"/IncidentReporting/Actions/PA85839U10/Category/Category_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Name","_Name":"name","Value":"{name}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Description","_Name":"descr","Value":"{descr}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"code","_Name":"code","Value":"{code}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"Category_Edit"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_Category/Category_List.page":
/*!******************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_Category/Category_List.page ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Category","ActionBar":{"Items":[{"OnPress":"/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Create.action","Position":"right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{code}","DetailImage":"","DetailImageIsCircular":false,"Icons":[],"OnPress":"/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Detail.action","StatusImage":"","Title":"{name}","Footnote":"","PreserveIconStackSpacing":false,"StatusText":"","Subhead":"{descr}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Category","Service":"/IncidentReporting/Services/PA85839U10.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Category_List"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_IncidentHistory/IncidentHistory_Detail.page":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_IncidentHistory/IncidentHistory_Detail.page ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"IncidentHistory Detail","DesignTimeTarget":{"Service":"/IncidentReporting/Services/PA85839U10.service","EntitySet":"IncidentHistory","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/IncidentReporting/Actions/PA85839U10/IncidentHistory/NavToIncidentHistory_Edit.action","Position":"right","SystemItem":"Edit"},{"OnPress":"/IncidentReporting/Rules/PA85839U10/IncidentHistory/IncidentHistory_DeleteConfirmation.js","Position":"right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"DetailImage":"","HeadlineText":"{ID}","Subhead":"{createdAt}","Tags":[],"BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":"{oldStatus_code}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Created On","Value":"{createdAt}"},{"KeyName":"Created By","Value":"{createdBy}"},{"KeyName":"Changed On","Value":"{modifiedAt}"},{"KeyName":"Changed By","Value":"{modifiedBy}"},{"KeyName":"OldCategory","Value":"{oldStatus_code}"},{"KeyName":"NewCategory","Value":"{newStatus_code}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"IncidentHistory_Detail"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_IncidentHistory/IncidentHistory_Edit.page":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_IncidentHistory/IncidentHistory_Edit.page ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update IncidentHistory Detail","DesignTimeTarget":{"Service":"/IncidentReporting/Services/PA85839U10.service","EntitySet":"IncidentHistory","QueryOptions":""},"ActionBar":{"Items":[{"Position":"left","SystemItem":"Cancel","OnPress":"/IncidentReporting/Actions/CloseModalPage_Cancel.action"},{"Position":"right","SystemItem":"Save","OnPress":"/IncidentReporting/Actions/PA85839U10/IncidentHistory/IncidentHistory_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"OldCategory","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{name}","ReturnValue":"{code}","Target":{"EntitySet":"IncidentStatus","Service":"/IncidentReporting/Services/PA85839U10.service"}},"Value":"{oldStatus_code}","_Name":"oldStatus_code","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"NewCategory","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{name}","ReturnValue":"{code}","Target":{"EntitySet":"IncidentStatus","Service":"/IncidentReporting/Services/PA85839U10.service"}},"Value":"{newStatus_code}","_Name":"newStatus_code","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"IncidentHistory_Edit"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_IncidentPhotos/IncidentPhotos_Detail.page":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_IncidentPhotos/IncidentPhotos_Detail.page ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"IncidentPhotos Detail","DesignTimeTarget":{"Service":"/IncidentReporting/Services/PA85839U10.service","EntitySet":"IncidentPhotos","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/IncidentReporting/Actions/PA85839U10/IncidentPhotos/NavToIncidentPhotos_Edit.action","Position":"right","SystemItem":"Edit"},{"OnPress":"/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_DetailPopover.action","Position":"right","Text":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"DetailImage":"/IncidentReporting/Services/PA85839U10.service/{@odata.readLink}/image","HeadlineText":"{ID}","Subhead":"{createdAt}","Tags":[],"BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":"{imageType}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Created On","Value":"{createdAt}"},{"KeyName":"Created By","Value":"{createdBy}"},{"KeyName":"Changed On","Value":"{modifiedAt}"},{"KeyName":"Changed By","Value":"{modifiedBy}"},{"KeyName":"imageType","Value":"{imageType}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"IncidentPhotos_Detail"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_IncidentPhotos/IncidentPhotos_Edit.page":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_IncidentPhotos/IncidentPhotos_Edit.page ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update IncidentPhotos Detail","DesignTimeTarget":{"Service":"/IncidentReporting/Services/PA85839U10.service","EntitySet":"IncidentPhotos","QueryOptions":""},"ActionBar":{"Items":[{"Position":"left","SystemItem":"Cancel","OnPress":"/IncidentReporting/Actions/CloseModalPage_Cancel.action"},{"Position":"right","SystemItem":"Save","OnPress":"/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"imageType","_Name":"imageType","Value":"{imageType}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"IncidentPhotos_Edit"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Create.page":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Create.page ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/IncidentReporting/Actions/CloseModalPage_Cancel.action","Position":"left","SystemItem":"Cancel"},{"OnPress":"/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateEntity.action","Position":"right","SystemItem":"Save"}]},"Caption":"Create SafetyIncidents Detail","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Title","_Name":"title","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Category","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{name}","ReturnValue":"{code}","Target":{"EntitySet":"Category","Service":"/IncidentReporting/Services/PA85839U10.service"}},"_Name":"category_code","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Priority","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{name}","ReturnValue":"{code}","Target":{"EntitySet":"Priority","Service":"/IncidentReporting/Services/PA85839U10.service"}},"_Name":"priority_code","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"IncidentStatus","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{name}","ReturnValue":"{code}","Target":{"EntitySet":"IncidentStatus","Service":"/IncidentReporting/Services/PA85839U10.service"}},"_Name":"incidentStatus_code","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Description","_Name":"description","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"incidentResolutionDate","Caption":"ResolutionDate","_Type":"Control.Type.FormCell.DatePicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SafetyIncidents_Create"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_CreateIncidentHistory.page":
/*!*************************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_CreateIncidentHistory.page ***!
  \*************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/IncidentReporting/Actions/CloseModalPage_Cancel.action","Position":"left","SystemItem":"Cancel"},{"OnPress":"/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateIncidentHistory.action","Position":"right","SystemItem":"Save"}]},"Caption":"Create IncidentHistory","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"OldCategory","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{name}","ReturnValue":"{code}","Target":{"EntitySet":"IncidentStatus","Service":"/IncidentReporting/Services/PA85839U10.service"}},"_Name":"oldStatus_code","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"NewCategory","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{name}","ReturnValue":"{code}","Target":{"EntitySet":"IncidentStatus","Service":"/IncidentReporting/Services/PA85839U10.service"}},"_Name":"newStatus_code","_Type":"Control.Type.FormCell.ListPicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SafetyIncidents_CreateIncidentHistory"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_CreateIncidentPhotos.page":
/*!************************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_CreateIncidentPhotos.page ***!
  \************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/IncidentReporting/Actions/CloseModalPage_Cancel.action","Position":"left","SystemItem":"Cancel"},{"OnPress":"/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateIncidentPhotos.action","Position":"right","SystemItem":"Save"}]},"Caption":"Create IncidentPhotos","Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"imageType","_Name":"imageType","_Type":"Control.Type.FormCell.SimpleProperty"},{"AttachmentTitle":"image","AttachmentAddTitle":"Browse","AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AllowedFileTypes":["jpg","png","gif"],"_Name":"image","_Type":"Control.Type.FormCell.Attachment"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SafetyIncidents_CreateIncidentPhotos"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Detail.page":
/*!**********************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Detail.page ***!
  \**********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"SafetyIncidents Detail","DesignTimeTarget":{"Service":"/IncidentReporting/Services/PA85839U10.service","EntitySet":"SafetyIncidents","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Edit.action","Position":"right","SystemItem":"Edit"},{"OnPress":"/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_DetailPopover.action","Position":"right","Text":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"DetailImage":"","HeadlineText":"{title}","Subhead":"{createdAt}","Tags":[],"BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":"{category_code}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Created On","Value":"{createdAt}"},{"KeyName":"Created By","Value":"{createdBy}"},{"KeyName":"Changed On","Value":"{modifiedAt}"},{"KeyName":"Changed By","Value":"{modifiedBy}"},{"KeyName":"Title","Value":"{title}"},{"KeyName":"Category","Value":"{category_code}"},{"KeyName":"Priority","Value":"{priority_code}"},{"KeyName":"IncidentStatus","Value":"{incidentStatus_code}"},{"KeyName":"Description","Value":"{description}"},{"KeyName":"ResolutionDate","Value":"{incidentResolutionDate}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"incidentPhotos"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{createdBy}","DetailImage":"/IncidentReporting/Services/PA85839U10.service/{@odata.readLink}/image","DetailImageIsCircular":false,"Icons":[],"StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":"{imageType}","OnPress":"/IncidentReporting/Actions/PA85839U10/IncidentPhotos/NavToIncidentPhotos_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/incidentPhotos","Service":"/IncidentReporting/Services/PA85839U10.service"},"_Type":"Section.Type.ObjectTable"},{"Header":{"Caption":"incidentHistory"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{createdBy}","DetailImage":"","DetailImageIsCircular":false,"Icons":[],"StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":"{oldStatus_code}","OnPress":"/IncidentReporting/Actions/PA85839U10/IncidentHistory/NavToIncidentHistory_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/incidentHistory","Service":"/IncidentReporting/Services/PA85839U10.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["IncidentPhotos","IncidentHistory"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"SafetyIncidents_Detail"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Edit.page":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Edit.page ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update SafetyIncidents Detail","DesignTimeTarget":{"Service":"/IncidentReporting/Services/PA85839U10.service","EntitySet":"SafetyIncidents","QueryOptions":""},"ActionBar":{"Items":[{"Position":"left","SystemItem":"Cancel","OnPress":"/IncidentReporting/Actions/CloseModalPage_Cancel.action"},{"Position":"right","SystemItem":"Save","OnPress":"/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_UpdateEntity.action"}]},"Controls":[{"Sections":[{"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0","Visible":true,"Controls":[{"Caption":"Title","_Name":"title","Value":"{title}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Category","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{name}","ReturnValue":"{code}","Target":{"EntitySet":"Category","Service":"/IncidentReporting/Services/PA85839U10.service"}},"Value":"{category_code}","_Name":"category_code","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Priority","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{name}","ReturnValue":"{code}","Target":{"EntitySet":"Priority","Service":"/IncidentReporting/Services/PA85839U10.service"}},"Value":"{priority_code}","_Name":"priority_code","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"IncidentStatus","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{name}","ReturnValue":"{code}","Target":{"EntitySet":"IncidentStatus","Service":"/IncidentReporting/Services/PA85839U10.service"}},"Value":"{incidentStatus_code}","_Name":"incidentStatus_code","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Description","_Name":"description","Value":"{description}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Date","_Name":"incidentResolutionDate","Value":"{incidentResolutionDate}","Caption":"ResolutionDate","_Type":"Control.Type.FormCell.DatePicker"}]}],"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable"}],"_Type":"Page","_Name":"SafetyIncidents_Edit"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_List.page":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_List.page ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Header":{"_Name":"SectionHeader0","AccessoryType":"None","UseTopPadding":false},"_Type":"Section.Type.ObjectTable","Target":{"Service":"/IncidentReporting/Services/PA85839U10.service","EntitySet":"SafetyIncidents","QueryOptions":"$top=10&$expand=category,priority,incidentStatus,incidentPhotos&$orderby=createdAt desc"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"Caption":"No record found!","FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"ObjectCell":{"Title":"{title}","Subhead":"{category/name}","Footnote":"{category/name}","Description":"{createdBy}","StatusText":"{modifiedBy}","SubstatusText":"{category_code}","DetailImageIsCircular":false,"PreserveIconStackSpacing":false,"AccessoryType":"None","Selected":false,"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true,"LeadingItems":[],"TrailingItems":[]}},"HighlightSelectedItem":false}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"SafetyIncidents_List","Caption":"IncidentList","ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"","SystemItem":"Add","Position":"right","IsIconCircular":false,"OnPress":"/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Create.action"}],"_Name":"ActionBar1"},"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"ToolbarItem0","Visible":true,"Caption":"Logout","OnPress":"/IncidentReporting/Actions/Application/Logout.action","Icon":"res://mdk_logo.png","Enabled":true,"Clickable":true,"ItemType":"Normal"}]}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"IncidentReporting","Version":"/IncidentReporting/Globals/Application/AppDefinition_Version.global","MainPage":"/IncidentReporting/Pages/Main.page","OnLaunch":"/IncidentReporting/Rules/Service/Initialize.js","OnWillUpdate":"/IncidentReporting/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/IncidentReporting/Rules/Service/Initialize.js","Styles":"/IncidentReporting/Styles/Styles.css","Localization":"/IncidentReporting/i18n/i18n.properties","StyleSheets":{"Styles":{"css":"/IncidentReporting/Styles/Styles.light.css","ios":"/IncidentReporting/Styles/Styles.light.nss","android":"/IncidentReporting/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/IncidentReporting/Styles/Styles.light.nss","android":"/IncidentReporting/Styles/Styles.light.json"}}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Application/AppUpdate.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Application/AppUpdate.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/IncidentReporting/Rules/Application/AppUpdateFailure.js","OnSuccess":"/IncidentReporting/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Application/AppUpdateFailureMessage.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Application/AppUpdateFailureMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Application/AppUpdateProgressBanner.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Application/AppUpdateProgressBanner.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/IncidentReporting/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Application/AppUpdateSuccessMessage.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Application/AppUpdateSuccessMessage.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Application/Logout.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Application/Logout.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Application/NavToAbout.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Application/NavToAbout.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/IncidentReporting/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Application/NavToActivityLog.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Application/NavToActivityLog.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/IncidentReporting/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Application/NavToSupport.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Application/NavToSupport.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/IncidentReporting/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Application/OnWillUpdate.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Application/OnWillUpdate.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Application/Reset.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Application/Reset.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Application/ResetMessage.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Application/ResetMessage.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/IncidentReporting/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Application/UserMenuPopover.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Application/UserMenuPopover.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/IncidentReporting/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/IncidentReporting/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/IncidentReporting/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/IncidentReporting/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/IncidentReporting/Actions/Application/Logout.action","Title":"Logout","Visible":"/IncidentReporting/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/CloseModalPage_Cancel.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/CloseModalPage_Cancel.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/CloseModalPage_Complete.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/CloseModalPage_Complete.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/ClosePage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/ClosePage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/CreateEntityFailureMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/CreateEntityFailureMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/CreateEntitySuccessMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/CreateEntitySuccessMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/IncidentReporting/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/DeleteConfirmation.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/DeleteConfirmation.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/DeleteEntityFailureMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/DeleteEntityFailureMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/DeleteEntitySuccessMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/DeleteEntitySuccessMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/IncidentReporting/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/GenericBannerMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/GenericBannerMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/GenericMessageBox.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/GenericMessageBox.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/GenericNavigation.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/GenericNavigation.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/IncidentReporting/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/GenericToastMessage.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/GenericToastMessage.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Logging/LogUploadFailure.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Logging/LogUploadFailure.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Logging/LogUploadSuccessful.action":
/*!****************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Logging/LogUploadSuccessful.action ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Logging/UploadLog.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Logging/UploadLog.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/IncidentReporting/Actions/Logging/LogUploadFailure.action","OnSuccess":"/IncidentReporting/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/Logging/UploadLogProgress.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/Logging/UploadLogProgress.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/IncidentReporting/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/Category_CreateEntity.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/Category/Category_CreateEntity.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/IncidentReporting/Actions/CreateEntityFailureMessage.action","OnSuccess":"/IncidentReporting/Actions/CreateEntitySuccessMessage.action","Properties":{"name":"#Control:name/#Value","descr":"#Control:descr/#Value","code":"#Control:code/#Value"},"Target":{"EntitySet":"Category","Service":"/IncidentReporting/Services/PA85839U10.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/Category_DeleteEntity.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/Category/Category_DeleteEntity.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Category","Service":"/IncidentReporting/Services/PA85839U10.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/IncidentReporting/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/IncidentReporting/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/Category_UpdateEntity.action":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/Category/Category_UpdateEntity.action ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Category","Service":"/IncidentReporting/Services/PA85839U10.service","ReadLink":"{@odata.readLink}"},"Properties":{"name":"#Control:name/#Value","descr":"#Control:descr/#Value","code":"#Control:code/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/IncidentReporting/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/IncidentReporting/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Create.action":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Create.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/IncidentReporting/Pages/PA85839U10_Category/Category_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Detail.action":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Detail.action ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/IncidentReporting/Pages/PA85839U10_Category/Category_Detail.page"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Edit.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_Edit.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/IncidentReporting/Pages/PA85839U10_Category/Category_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_List.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/Category/NavToCategory_List.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/IncidentReporting/Pages/PA85839U10_Category/Category_List.page"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentHistory/IncidentHistory_DeleteEntity.action":
/*!********************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentHistory/IncidentHistory_DeleteEntity.action ***!
  \********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"IncidentHistory","Service":"/IncidentReporting/Services/PA85839U10.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/IncidentReporting/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/IncidentReporting/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentHistory/IncidentHistory_UpdateEntity.action":
/*!********************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentHistory/IncidentHistory_UpdateEntity.action ***!
  \********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"IncidentHistory","Service":"/IncidentReporting/Services/PA85839U10.service","ReadLink":"{@odata.readLink}"},"Properties":{"oldStatus_code":"#Control:oldStatus_code/#SelectedValue","newStatus_code":"#Control:newStatus_code/#SelectedValue"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/IncidentReporting/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/IncidentReporting/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentHistory/NavToIncidentHistory_Detail.action":
/*!*******************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentHistory/NavToIncidentHistory_Detail.action ***!
  \*******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/IncidentReporting/Pages/PA85839U10_IncidentHistory/IncidentHistory_Detail.page"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentHistory/NavToIncidentHistory_Edit.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentHistory/NavToIncidentHistory_Edit.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/IncidentReporting/Pages/PA85839U10_IncidentHistory/IncidentHistory_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_DeleteEntity.action":
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_DeleteEntity.action ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"IncidentPhotos","Service":"/IncidentReporting/Services/PA85839U10.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/IncidentReporting/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/IncidentReporting/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_DetailPopover.action":
/*!*******************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_DetailPopover.action ***!
  \*******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Open Document","OnPress":"/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_OpenDocument.action"},{"Title":"Delete","OnPress":"/IncidentReporting/Rules/PA85839U10/IncidentPhotos/IncidentPhotos_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_OpenDocument.action":
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_OpenDocument.action ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OpenDocument","Path":"/IncidentReporting/Services/PA85839U10.service/{@odata.readLink}/image","MimeType":"image/jpeg"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_UpdateEntity.action":
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_UpdateEntity.action ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"IncidentPhotos","Service":"/IncidentReporting/Services/PA85839U10.service","ReadLink":"{@odata.readLink}"},"Properties":{"imageType":"#Control:imageType/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/IncidentReporting/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/IncidentReporting/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_UploadStream.action":
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/IncidentPhotos_UploadStream.action ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UploadStream","Target":{"Service":"/IncidentReporting/Services/PA85839U10.service","EntitySet":"IncidentPhotos","ReadLink":"{@odata.readLink}"},"Properties":{"image":"#Control:image/#Value"},"ShowActivityIndicator":true,"ActionResult":{"_Name":"uploadstream"},"OnSuccess":"/IncidentReporting/Actions/UploadStreamSuccessMessage.action","OnFailure":"/IncidentReporting/Actions/UploadStreamFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/NavToIncidentPhotos_Detail.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/NavToIncidentPhotos_Detail.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/IncidentReporting/Pages/PA85839U10_IncidentPhotos/IncidentPhotos_Detail.page"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/NavToIncidentPhotos_Edit.action":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/IncidentPhotos/NavToIncidentPhotos_Edit.action ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/IncidentReporting/Pages/PA85839U10_IncidentPhotos/IncidentPhotos_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Create.action":
/*!*******************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Create.action ***!
  \*******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_CreateIncidentHistory.action":
/*!**********************************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_CreateIncidentHistory.action ***!
  \**********************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_CreateIncidentHistory.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_CreateIncidentPhotos.action":
/*!*********************************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_CreateIncidentPhotos.action ***!
  \*********************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_CreateIncidentPhotos.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Detail.action":
/*!*******************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Detail.action ***!
  \*******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Detail.page"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Edit.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_Edit.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_List.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_List.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/IncidentReporting/Pages/PA85839U10_SafetyIncidents/SafetyIncidents_List.page"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateEntity.action":
/*!********************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateEntity.action ***!
  \********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/IncidentReporting/Actions/CreateEntityFailureMessage.action","OnSuccess":"/IncidentReporting/Actions/CreateEntitySuccessMessage.action","Properties":{"title":"#Control:title/#Value","category_code":"#Control:category_code/#SelectedValue","priority_code":"#Control:priority_code/#SelectedValue","incidentStatus_code":"#Control:incidentStatus_code/#SelectedValue","description":"#Control:description/#Value","incidentResolutionDate":"#Control:incidentResolutionDate/#Value"},"Target":{"EntitySet":"SafetyIncidents","Service":"/IncidentReporting/Services/PA85839U10.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateIncidentHistory.action":
/*!*****************************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateIncidentHistory.action ***!
  \*****************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"incidentHistory","Target":{"EntitySet":"SafetyIncidents","ReadLink":"{@odata.readLink}"}},"OnFailure":"/IncidentReporting/Actions/CreateEntityFailureMessage.action","OnSuccess":"/IncidentReporting/Actions/CreateEntitySuccessMessage.action","Properties":{"oldStatus_code":"#Control:oldStatus_code/#SelectedValue","newStatus_code":"#Control:newStatus_code/#SelectedValue"},"Target":{"EntitySet":"IncidentHistory","Service":"/IncidentReporting/Services/PA85839U10.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateIncidentPhotos.action":
/*!****************************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_CreateIncidentPhotos.action ***!
  \****************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"incidentPhotos","Target":{"EntitySet":"SafetyIncidents","ReadLink":"{@odata.readLink}"}},"OnFailure":"/IncidentReporting/Actions/CreateEntityFailureMessage.action","OnSuccess":"/IncidentReporting/Actions/CreateEntitySuccessMessage.action","Properties":{"imageType":"#Control:imageType/#Value"},"Target":{"EntitySet":"IncidentPhotos","Service":"/IncidentReporting/Services/PA85839U10.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_DeleteEntity.action":
/*!********************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_DeleteEntity.action ***!
  \********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"SafetyIncidents","Service":"/IncidentReporting/Services/PA85839U10.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/IncidentReporting/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/IncidentReporting/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_DetailPopover.action":
/*!*********************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_DetailPopover.action ***!
  \*********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add IncidentPhotos","OnPress":"/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_CreateIncidentPhotos.action"},{"Title":"Add IncidentHistory","OnPress":"/IncidentReporting/Actions/PA85839U10/SafetyIncidents/NavToSafetyIncidents_CreateIncidentHistory.action"},{"Title":"Delete","OnPress":"/IncidentReporting/Rules/PA85839U10/SafetyIncidents/SafetyIncidents_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_UpdateEntity.action":
/*!********************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/SafetyIncidents/SafetyIncidents_UpdateEntity.action ***!
  \********************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"SafetyIncidents","Service":"/IncidentReporting/Services/PA85839U10.service","ReadLink":"{@odata.readLink}"},"Properties":{"title":"#Control:title/#Value","category_code":"#Control:category_code/#SelectedValue","priority_code":"#Control:priority_code/#SelectedValue","incidentStatus_code":"#Control:incidentStatus_code/#SelectedValue","description":"#Control:description/#Value","incidentResolutionDate":"#Control:incidentResolutionDate/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/IncidentReporting/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/IncidentReporting/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/Service/InitializeOnline.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/Service/InitializeOnline.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/IncidentReporting/Services/PA85839U10.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnFailure":"/IncidentReporting/Actions/PA85839U10/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/PA85839U10/Service/InitializeOnlineFailureMessage.action":
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/PA85839U10/Service/InitializeOnlineFailureMessage.action ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/UpdateEntityFailureMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/UpdateEntityFailureMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/UpdateEntitySuccessMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/UpdateEntitySuccessMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/IncidentReporting/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/UploadStreamFailureMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/UploadStreamFailureMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload stream failure - {#ActionResults:uploadstream/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Actions/UploadStreamSuccessMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Actions/UploadStreamSuccessMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Stream uploaded","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/IncidentReporting/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Globals/Application/AppDefinition_Version.global":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Globals/Application/AppDefinition_Version.global ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Globals/Application/ApplicationName.global":
/*!****************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Globals/Application/ApplicationName.global ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Globals/Application/SupportEmail.global":
/*!*************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Globals/Application/SupportEmail.global ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Globals/Application/SupportPhone.global":
/*!*************************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Globals/Application/SupportPhone.global ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/IncidentReporting/Services/PA85839U10.service":
/*!*************************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Services/PA85839U10.service ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"PA85839U10","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"OfflineOptions":{},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/IncidentReporting/Styles/Styles.light.json":
/*!**********************************************************************!*\
  !*** ./build.definitions/IncidentReporting/Styles/Styles.light.json ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/IncidentReporting/jsconfig.json":
/*!***********************************************************!*\
  !*** ./build.definitions/IncidentReporting/jsconfig.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"module":"commonjs","target":"es5","experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"lib":["es6","dom"],"baseUrl":"."},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map