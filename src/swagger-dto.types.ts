import { Block } from "comment-parser";

export interface IAppConfig {
  root: string;
  sources: string[];
}

export interface INameAndPath {
  name: string;
  path: string;
}

export interface IDeclarationsAndTokens {
  declarations: INameAndPath[];
  tokens: Block[][];
}

export interface IPathsAndSchema {
  components: { schemas: unknown[] };
  paths: {
    [key: string]: any;
  };
}

export interface IPathsAndSchemasByVersion {
  [key: string]: IPathsAndSchema;
}
