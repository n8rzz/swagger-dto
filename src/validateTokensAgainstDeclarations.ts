import { Block } from "comment-parser";
import { INameAndPath, IPathsAndSchemasByVersion } from "./swagger-dto.types";

function _extractTagsFromDockBlock(
  docBlock: Block[],
  declarations: INameAndPath[],
  pathsAndSchemas: IPathsAndSchemasByVersion,
) {
  console.log("+++", docBlock[0].tags, declarations);

  return;
}

export function validateTokensAgainstDeclarations(
  tokens: Block[][],
  declarations: INameAndPath[],
  pathsAndSchemas: IPathsAndSchemasByVersion,
) {
  tokens.map((token) => {
    const tags = _extractTagsFromDockBlock(token, declarations, pathsAndSchemas);
  });

  return {};
}
