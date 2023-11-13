import fs from "fs";

export async function getSourceDefinition(sourceUrl: string): Promise<any> {
  // console.log("--- --- Requesting: ", sourceUrl);

  const response = await fetch(sourceUrl);
  const json = await response.json();

  return json;
}
