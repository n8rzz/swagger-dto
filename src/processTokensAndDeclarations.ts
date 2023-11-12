import { Block } from "comment-parser";
import merge from "lodash.merge";
import { IAppConfig, INameAndPath, IPathsAndSchemasByVersion } from "./swagger-dto.types";

async function assembleSourceDefinitions(sources: string[]) {
    const sourceDefinitions = sources.map(async (source: string) => {
      console.log('--- --- Requesting: ', source);
      
      const response = await fetch(source);
      const result = await response.json();
      
      return result
    })
  
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
  
          }
        };
      }
  
      return {
        ...sum,
        [version]: {
          components: { schemas: merge(source.components, sum.components) },
          paths: source.paths 
        }
      }
    }, {})
  }
  
  export async function processTokensAndDeclarations(tokens: Block[][], declarations: INameAndPath[], config: IAppConfig): Promise<IPathsAndSchemasByVersion> {
    const rawSourceDefinitions = await assembleSourceDefinitions(config.sources);
    
    return parseSourceDefinitions(rawSourceDefinitions);
  }