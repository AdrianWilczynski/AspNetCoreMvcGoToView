import * as path from 'path';
import { ext, dirs, controllerSuffix } from './shared';

export function getViewPath(controllerPath: string, actionName: string, inShared: boolean = false) {
    return path.join(getViewsDir(controllerPath), inShared ? dirs.shared : getControllerName(controllerPath), actionName + ext.cshtml);
}

function getViewsDir(controllerPath: string) {
    return path.join(path.dirname(controllerPath), '..', dirs.views);
}

function getControllerName(controllerPath: string) {
    const baseName = path.basename(controllerPath, ext.cs);
    return baseName.endsWith(controllerSuffix)
        ? baseName.substring(0, baseName.length - controllerSuffix.length)
        : baseName;
}

export function getActionName(line: string) {
    const matches = line.match(/(?<!^\w)(IActionResult|ActionResult|ViewResult|IStatusCodeActionResult)[ \t]*>?[ \t]+(\w+)\(.*$/);
    if (!matches) {
        return;
    }

    return matches[2];
}

export function isController(controllerPath: string) {
    return controllerPath.endsWith(ext.cs) && isLocatedInControllersDir(controllerPath);
}

function isLocatedInControllersDir(controllerPath: string) {
    return path.dirname(controllerPath).split(path.sep).pop() === dirs.controllers;
}