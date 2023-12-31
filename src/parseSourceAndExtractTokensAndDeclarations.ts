import ts from "typescript";
import fs from "fs";
import path from "path";
import { Block, parse } from "comment-parser";
import flatten from "lodash.flatten";
import { IDeclarationsAndTokens, INameAndPath } from "./swagger-dto.types";

/**
 * Finds all `ts` or `tsx1 files in `#directory`
 *
 * @param directory {string}
 * @returns string[]
 */
function _findTypeScriptFiles(directory: string): string[] {
  const files = fs.readdirSync(directory);

  return files.filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"));
}

/**
 * Uses external library to parse comments in file at `filePath`
 *
 * @param filePath {string}
 * @returns Block[]
 */
function _parseDocBlocks(filePath: string): Block[] {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const parsedContent = parse(fileContent);

  return parsedContent;
}

function _visit(filePath: string, node: ts.Node, declarations: INameAndPath[]) {
  if (
    ts.isInterfaceDeclaration(node) ||
    ts.isEnumDeclaration(node) ||
    ts.isTypeAliasDeclaration(node) ||
    ts.isClassDeclaration(node)
  ) {
    const foundNameAndPath: INameAndPath = {
      name: node?.name?.text || "unknown",
      path: filePath,
    };

    declarations.push(foundNameAndPath);
  }

  ts.forEachChild(node, (node) => _visit(filePath, node, declarations));
}

function _extractTypeDeclarations(filePath: string): INameAndPath[] {
  const foundDeclarations: INameAndPath[] = [];
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest);

  _visit(filePath, sourceFile, foundDeclarations);

  return foundDeclarations;
}

/**
 * Given a `directoryPath`, find all the ts files, loop through them and extract
 * doc blocks only for each item we care about
 *
 * @param directoryPath
 * @returns IDeclarationsAndTokens
 */
export function parseSourceAndExtractTokensAndDeclarations(
  directoryPath: string,
): IDeclarationsAndTokens {
  const declarations: INameAndPath[] = [];
  const tokens: Block[][] = [];
  const tsFiles = _findTypeScriptFiles(directoryPath);

  tsFiles.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const foundDeclarations = _extractTypeDeclarations(filePath);
    const parsedDocBlocks = _parseDocBlocks(filePath);

    if (parsedDocBlocks.length > 0) {
      tokens.push(parsedDocBlocks);
    }

    declarations.push(...foundDeclarations);
  });

  return {
    declarations: flatten(declarations),
    tokens,
  };
}
