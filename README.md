## Graphql

## \*.graphql

graphql 的定义文件在 java-gql-server/src/main/resources/graphql/\*.graphql 这个文件群由后端人员维护

## schema.graphql

schema.graphql 更新
当 java-gql-server/src/main/resource/graphql 目录下发生更新之后
后端开发者需要重新生成一下 schema.graphql 给前端使用
更新命令为:

- `cd java-gql-server; gradle bootRun;`
- `cd mock-gql; yarn schema`

## java 服务

`cd java-gql-server; gradle bootRun`

## mock 服务

前端 mock 开发的时候使用
`cd mock-gql; yarn start`

## react

`cd react-gql; yarn start`

jwt 授权部分建议使用 restful, 而不是 graphql, 虽然 gql 也可以
