import * as path from "path";
import { parseSourceAndExtractTokensAndDeclarations } from "./parseSourceAndExtractTokensAndDeclarations";
import { processTokensAndDeclarations } from "./processTokensAndDeclarations";
import { IAppConfig } from "./swagger-dto.types";

const defaultConfig: IAppConfig = {
  root: path.join(__dirname, "__stubs__"),
  sources: [
    // "https://parallax-dev-api.azurewebsites.net/swagger/v1/swagger.json",
    // 'https://parallax-dev-api.azurewebsites.net/swagger/v2/swagger.json',
    // 'https://parallax-dev-api.azurewebsites.net/swagger/v3/swagger.json',
    // 'https://parallax-dev-api.azurewebsites.net/swagger/v4/swagger.json',
    "https://parallax-dev-api.azurewebsites.net/swagger/v5/swagger.json",
  ],
};

async function swaggerDto(config: IAppConfig) {
  const directoryPath = config.root;
  const { declarations, tokens } = parseSourceAndExtractTokensAndDeclarations(directoryPath);
  const pathsAndSchemas = await processTokensAndDeclarations(defaultConfig);

  // console.log("===", declarations);
  // console.log("=== === ===");
  console.log("===", tokens[1][0]?.tags);

  // LOOP
  // console.log(
  //   "--- ---",
  //   pathsAndSchemas.v1.paths["/v1/authenticate"]?.post.requestBody.content["application/json"]
  //     .schema["$ref"],
  // );

  // END LOOP
  // validate, verify
  // render feedback
}

swaggerDto(defaultConfig);
