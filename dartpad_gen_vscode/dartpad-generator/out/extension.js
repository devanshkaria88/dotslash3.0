"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const axios = require("axios");
const authToken_1 = require("./authToken");
function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.dartpad-generator', () => {
        var _a;
        vscode.workspace.openTextDocument((_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri.fsPath).then((document) => {
            const fileContent = document.getText();
            const fullFilePath = document.fileName.split('/');
            const extractedFileName = fullFilePath[fullFilePath.length - 1];
            axios.default.defaults.headers.common['Authorization'] = 'token ' + authToken_1.kAuthToken;
            axios.default.post('https://api.github.com/gists', {
                'public': true,
                'description': 'Gist Generated by DartpadGenerator from VSCode',
                'files': {
                    [extractedFileName]: { 'content': fileContent }
                }
            }).then(function (response) {
                if (response.status == 201) {
                    console.log('https://dartpad.dev/' + response.data.id);
                }
                else {
                    console.log('Something went wrong. Status code - ' + response.status);
                }
                console.log(response.data);
            });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map