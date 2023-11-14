import { Block } from "comment-parser";
import { IAppConfig, INameAndPath } from "../swagger-dto.types";

export const defaultConfigMock: IAppConfig = {
  root: "./",
  sources: ["https://www.example.com/v1/people/"],
};

export const declarationsMock: INameAndPath[] = [];

export const tokensMock: Block[][] = [];
