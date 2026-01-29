import * as vscode from 'vscode';

let currentPanel: vscode.WebviewPanel | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('baukasten.showLogViewer', () => {
    const columnToShowIn = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (currentPanel) {
      currentPanel.reveal(columnToShowIn);
    } else {
      currentPanel = vscode.window.createWebviewPanel(
        'baukastenLogViewer',
        'Log Viewer',
        columnToShowIn || vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [
            vscode.Uri.joinPath(context.extensionUri, 'dist', 'webview'),
          ],
        }
      );

      currentPanel.webview.html = getWebviewContent(currentPanel.webview, context.extensionUri);

      currentPanel.onDidDispose(
        () => {
          currentPanel = undefined;
        },
        null,
        context.subscriptions
      );
    }
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri): string {
  const webviewPath = vscode.Uri.joinPath(extensionUri, 'dist', 'webview');

  // Get the paths for our bundled assets
  const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(webviewPath, 'assets', 'index.js'));
  const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(webviewPath, 'assets', 'index.css'));

  // Use a nonce to only allow specific scripts to be run
  const nonce = getNonce();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; font-src ${webview.cspSource} data:; img-src ${webview.cspSource} data:;">
  <link href="${styleUri}" rel="stylesheet">
  <title>Log Viewer</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
}

function getNonce(): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function deactivate() {}
