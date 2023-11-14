import * as path from "path";
import { parseSourceAndExtractTokensAndDeclarations } from "./parseSourceAndExtractTokensAndDeclarations";
import { processTokensAndDeclarations } from "./processTokensAndDeclarations";
import { IAppConfig } from "./swagger-dto.types";
import { validateTokensAgainstDeclarations } from "./validateTokensAgainstDeclarations";

const defaultConfig: IAppConfig = {
  root: path.join(__dirname, "__stubs__"),
  sources: [
    "https://parallax-dev-api.azurewebsites.net/swagger/v1/swagger.json",
    // 'https://parallax-dev-api.azurewebsites.net/swagger/v2/swagger.json',
    // 'https://parallax-dev-api.azurewebsites.net/swagger/v3/swagger.json',
    // 'https://parallax-dev-api.azurewebsites.net/swagger/v4/swagger.json',
    // "https://parallax-dev-api.azurewebsites.net/swagger/v5/swagger.json",
  ],
};

async function swaggerDto(config: IAppConfig) {
  const directoryPath = config.root;
  const { declarations, tokens } = parseSourceAndExtractTokensAndDeclarations(directoryPath);
  const pathsAndSchemas = await processTokensAndDeclarations(defaultConfig);
  const result = validateTokensAgainstDeclarations(tokens, declarations, pathsAndSchemas);

  // validate, verify
  // render feedback
}

swaggerDto(defaultConfig);
