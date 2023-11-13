import fs from "fs";
import merge from "lodash.merge";
import {
  IAppConfig,
  INameAndPath,
  IPathsAndSchemasByVersion,
} from "./swagger-dto.types";
import { getSourceDefinition } from "./source.service";

async function assembleSourceDefinitions(sources: string[]) {
  const sourceDefinitions = sources.map(async (source: string) =>
    getSourceDefinition(source)
  );

  return Promise.all(sourceDefinitions);
}

function parseSourceDefinitions(rawSourceDefinitions: any[]) {
  return rawSourceDefinitions.reduce((sum, source) => {
    const version = source.info.version;

    if (sum[version]) {
      return {
        ...sum,
        [version]: {
          components: { schemas: merge(source.components, sum.components) },
          paths: merge(source.version, sum.version),
        },
      };
    }

    return {
      ...sum,
      [version]: {
        components: { schemas: merge(source.components, sum.components) },
        paths: source.paths,
      },
    };
  }, {});
}

export async function processTokensAndDeclarations(
  config: IAppConfig
): Promise<IPathsAndSchemasByVersion> {
  const rawSourceDefinitions = await assembleSourceDefinitions(config.sources);

  return parseSourceDefinitions(rawSourceDefinitions);
}
