// /**
//  * @name IPersonDto
//  * @dto PersonDto
//  * @url /v2/people/{id}
//  */
// export interface IPersonDto {
//   name: string;
//   id: number;
//   email: string;
// }

// /**
//  * @name IFamilyDto
//  * @dto FamilyDto
//  * @url /v2/people/
//  */
// export interface IFamilyDto {
//   name: string;
//   id: string;
//   members: IPersonDto[];
// }

/**
 * @name IAuthorizeDto
 * @method POST
 * @dto AuthorizeBody
 * @url v1/authenticate/google
 */
export interface IAuthorizeDto {
  organization_id: string;
}
