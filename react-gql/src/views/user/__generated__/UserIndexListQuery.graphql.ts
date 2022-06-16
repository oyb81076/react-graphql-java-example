/**
 * @generated SignedSource<<316bce30914a1c589095f95471113b0e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserIndexListQuery$variables = {};
export type UserIndexListQuery$data = {
  readonly users: ReadonlyArray<{
    readonly age: number;
    readonly id: string;
    readonly male: boolean;
    readonly name: string;
  }>;
};
export type UserIndexListQuery = {
  response: UserIndexListQuery$data;
  variables: UserIndexListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "users",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "age",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "male",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserIndexListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UserIndexListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "34523bbea9c13f81613ce1db8516bb1f",
    "id": null,
    "metadata": {},
    "name": "UserIndexListQuery",
    "operationKind": "query",
    "text": "query UserIndexListQuery {\n  users {\n    id\n    name\n    age\n    male\n  }\n}\n"
  }
};
})();

(node as any).hash = "65c8d5c22e4d88c0747d5ca6bf4d9c77";

export default node;
