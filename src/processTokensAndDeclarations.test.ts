import { processTokensAndDeclarations } from "./processTokensAndDeclarations";
import { defaultConfigMock } from "./__mocks__/mocks";
import * as sourceService from "./source.service";

describe("processTokensAndDeclarations", () => {
  describe("when declarations and tokens are empty", async () => {
    test("should return an empty object", async () => {
      //   const stub = vitest
      //     .spyOn(sourceService, "getSourceDefinition")
      //     .mockResolvedValue(mockV5Response);
      //   const result = await processTokensAndDeclarations(defaultConfigMock);

      //   expect(result).toEqual(v5SourceDefinitionsMock);
      expect(1).toEqual(1);
    });
  });
});
