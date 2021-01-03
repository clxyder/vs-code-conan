import * as vscode from 'vscode';

export class ConanDataProvider implements vscode.TreeDataProvider<TreeItem> {
    onDidChangeTreeData?: vscode.Event<TreeItem | null | undefined> | undefined;

    data: TreeItem[];

    constructor() {
        this.data = [
            new TreeItem('Recipes', [
                new TreeItem('App', this.conanLocalDevCommands()),
                new TreeItem('Hal', this.conanLocalDevCommands()),
                new TreeItem('Linux-hal', this.conanLocalDevCommands()),
                new TreeItem('stm32wb55-hal', this.conanLocalDevCommands())
            ]),
            new TreeItem('Workspace', [
                new TreeItem('Ws1 (Profile: linux-debug)', [new TreeItem('clean'), new TreeItem('install'),]),
                new TreeItem('Ws2 (Profile: amr-debug)', [new TreeItem('clean'), new TreeItem('install'),]),
            ])
        ];
    }

    private conanLocalDevCommands() {
        return [
            new TreeItem('clean'),
            new TreeItem('source'),
            new TreeItem('install'),
            new TreeItem('build'),
            new TreeItem('package'),
            new TreeItem('exportPkg'),
            new TreeItem('test'),
            new TreeItem('create'),
        ];
    }

    getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: TreeItem | undefined): vscode.ProviderResult<TreeItem[]> {
        return element === undefined ? this.data : element.children;
    }
}

class TreeItem extends vscode.TreeItem {
    children: TreeItem[] | undefined;

    constructor(label: string, children?: TreeItem[]) {
        super(
            label,
            children === undefined ? vscode.TreeItemCollapsibleState.None :
                vscode.TreeItemCollapsibleState.Expanded);
        this.children = children;
    }
}