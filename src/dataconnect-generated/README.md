# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUser*](#getuser)
  - [*ListStreams*](#liststreams)
  - [*ListChatMessages*](#listchatmessages)
- [**Mutations**](#mutations)
  - [*CreateStreamCategory*](#createstreamcategory)
  - [*CreateStream*](#createstream)
  - [*CreateChatMessage*](#createchatmessage)
  - [*CreateFollow*](#createfollow)
  - [*UpdateStreamStatus*](#updatestreamstatus)
  - [*DeleteChatMessage*](#deletechatmessage)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUser
You can execute the `GetUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface GetUserRef {
  ...
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
}
export const getUserRef: GetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRef:
```typescript
const name = getUserRef.operationName;
console.log(name);
```

### Variables
The `GetUser` query has no variables.
### Return Type
Recall that executing the `GetUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserData {
  user?: {
    username: string;
    email: string;
  };
}
```
### Using `GetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUser } from '@dataconnect/generated';


// Call the `getUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRef } from '@dataconnect/generated';


// Call the `getUserRef()` function to get a reference to the query.
const ref = getUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListStreams
You can execute the `ListStreams` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listStreams(options?: ExecuteQueryOptions): QueryPromise<ListStreamsData, undefined>;

interface ListStreamsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStreamsData, undefined>;
}
export const listStreamsRef: ListStreamsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listStreams(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStreamsData, undefined>;

interface ListStreamsRef {
  ...
  (dc: DataConnect): QueryRef<ListStreamsData, undefined>;
}
export const listStreamsRef: ListStreamsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listStreamsRef:
```typescript
const name = listStreamsRef.operationName;
console.log(name);
```

### Variables
The `ListStreams` query has no variables.
### Return Type
Recall that executing the `ListStreams` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListStreamsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListStreamsData {
  streams: ({
    title: string;
    status: string;
    creator: {
      username: string;
    };
  })[];
}
```
### Using `ListStreams`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listStreams } from '@dataconnect/generated';


// Call the `listStreams()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listStreams();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listStreams(dataConnect);

console.log(data.streams);

// Or, you can use the `Promise` API.
listStreams().then((response) => {
  const data = response.data;
  console.log(data.streams);
});
```

### Using `ListStreams`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listStreamsRef } from '@dataconnect/generated';


// Call the `listStreamsRef()` function to get a reference to the query.
const ref = listStreamsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listStreamsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.streams);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.streams);
});
```

## ListChatMessages
You can execute the `ListChatMessages` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listChatMessages(vars: ListChatMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListChatMessagesData, ListChatMessagesVariables>;

interface ListChatMessagesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListChatMessagesVariables): QueryRef<ListChatMessagesData, ListChatMessagesVariables>;
}
export const listChatMessagesRef: ListChatMessagesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listChatMessages(dc: DataConnect, vars: ListChatMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListChatMessagesData, ListChatMessagesVariables>;

interface ListChatMessagesRef {
  ...
  (dc: DataConnect, vars: ListChatMessagesVariables): QueryRef<ListChatMessagesData, ListChatMessagesVariables>;
}
export const listChatMessagesRef: ListChatMessagesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listChatMessagesRef:
```typescript
const name = listChatMessagesRef.operationName;
console.log(name);
```

### Variables
The `ListChatMessages` query requires an argument of type `ListChatMessagesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListChatMessagesVariables {
  streamId: UUIDString;
}
```
### Return Type
Recall that executing the `ListChatMessages` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListChatMessagesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListChatMessagesData {
  chatMessages: ({
    content: string;
    sender: {
      username: string;
    };
  })[];
}
```
### Using `ListChatMessages`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listChatMessages, ListChatMessagesVariables } from '@dataconnect/generated';

// The `ListChatMessages` query requires an argument of type `ListChatMessagesVariables`:
const listChatMessagesVars: ListChatMessagesVariables = {
  streamId: ..., 
};

// Call the `listChatMessages()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listChatMessages(listChatMessagesVars);
// Variables can be defined inline as well.
const { data } = await listChatMessages({ streamId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listChatMessages(dataConnect, listChatMessagesVars);

console.log(data.chatMessages);

// Or, you can use the `Promise` API.
listChatMessages(listChatMessagesVars).then((response) => {
  const data = response.data;
  console.log(data.chatMessages);
});
```

### Using `ListChatMessages`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listChatMessagesRef, ListChatMessagesVariables } from '@dataconnect/generated';

// The `ListChatMessages` query requires an argument of type `ListChatMessagesVariables`:
const listChatMessagesVars: ListChatMessagesVariables = {
  streamId: ..., 
};

// Call the `listChatMessagesRef()` function to get a reference to the query.
const ref = listChatMessagesRef(listChatMessagesVars);
// Variables can be defined inline as well.
const ref = listChatMessagesRef({ streamId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listChatMessagesRef(dataConnect, listChatMessagesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.chatMessages);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.chatMessages);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateStreamCategory
You can execute the `CreateStreamCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createStreamCategory(): MutationPromise<CreateStreamCategoryData, undefined>;

interface CreateStreamCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateStreamCategoryData, undefined>;
}
export const createStreamCategoryRef: CreateStreamCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStreamCategory(dc: DataConnect): MutationPromise<CreateStreamCategoryData, undefined>;

interface CreateStreamCategoryRef {
  ...
  (dc: DataConnect): MutationRef<CreateStreamCategoryData, undefined>;
}
export const createStreamCategoryRef: CreateStreamCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStreamCategoryRef:
```typescript
const name = createStreamCategoryRef.operationName;
console.log(name);
```

### Variables
The `CreateStreamCategory` mutation has no variables.
### Return Type
Recall that executing the `CreateStreamCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStreamCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStreamCategoryData {
  streamCategory_insert: StreamCategory_Key;
}
```
### Using `CreateStreamCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStreamCategory } from '@dataconnect/generated';


// Call the `createStreamCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStreamCategory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStreamCategory(dataConnect);

console.log(data.streamCategory_insert);

// Or, you can use the `Promise` API.
createStreamCategory().then((response) => {
  const data = response.data;
  console.log(data.streamCategory_insert);
});
```

### Using `CreateStreamCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStreamCategoryRef } from '@dataconnect/generated';


// Call the `createStreamCategoryRef()` function to get a reference to the mutation.
const ref = createStreamCategoryRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStreamCategoryRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.streamCategory_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.streamCategory_insert);
});
```

## CreateStream
You can execute the `CreateStream` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createStream(vars: CreateStreamVariables): MutationPromise<CreateStreamData, CreateStreamVariables>;

interface CreateStreamRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStreamVariables): MutationRef<CreateStreamData, CreateStreamVariables>;
}
export const createStreamRef: CreateStreamRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStream(dc: DataConnect, vars: CreateStreamVariables): MutationPromise<CreateStreamData, CreateStreamVariables>;

interface CreateStreamRef {
  ...
  (dc: DataConnect, vars: CreateStreamVariables): MutationRef<CreateStreamData, CreateStreamVariables>;
}
export const createStreamRef: CreateStreamRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStreamRef:
```typescript
const name = createStreamRef.operationName;
console.log(name);
```

### Variables
The `CreateStream` mutation requires an argument of type `CreateStreamVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateStreamVariables {
  title: string;
}
```
### Return Type
Recall that executing the `CreateStream` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStreamData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStreamData {
  stream_insert: Stream_Key;
}
```
### Using `CreateStream`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStream, CreateStreamVariables } from '@dataconnect/generated';

// The `CreateStream` mutation requires an argument of type `CreateStreamVariables`:
const createStreamVars: CreateStreamVariables = {
  title: ..., 
};

// Call the `createStream()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStream(createStreamVars);
// Variables can be defined inline as well.
const { data } = await createStream({ title: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStream(dataConnect, createStreamVars);

console.log(data.stream_insert);

// Or, you can use the `Promise` API.
createStream(createStreamVars).then((response) => {
  const data = response.data;
  console.log(data.stream_insert);
});
```

### Using `CreateStream`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStreamRef, CreateStreamVariables } from '@dataconnect/generated';

// The `CreateStream` mutation requires an argument of type `CreateStreamVariables`:
const createStreamVars: CreateStreamVariables = {
  title: ..., 
};

// Call the `createStreamRef()` function to get a reference to the mutation.
const ref = createStreamRef(createStreamVars);
// Variables can be defined inline as well.
const ref = createStreamRef({ title: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStreamRef(dataConnect, createStreamVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.stream_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.stream_insert);
});
```

## CreateChatMessage
You can execute the `CreateChatMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createChatMessage(vars: CreateChatMessageVariables): MutationPromise<CreateChatMessageData, CreateChatMessageVariables>;

interface CreateChatMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateChatMessageVariables): MutationRef<CreateChatMessageData, CreateChatMessageVariables>;
}
export const createChatMessageRef: CreateChatMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createChatMessage(dc: DataConnect, vars: CreateChatMessageVariables): MutationPromise<CreateChatMessageData, CreateChatMessageVariables>;

interface CreateChatMessageRef {
  ...
  (dc: DataConnect, vars: CreateChatMessageVariables): MutationRef<CreateChatMessageData, CreateChatMessageVariables>;
}
export const createChatMessageRef: CreateChatMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createChatMessageRef:
```typescript
const name = createChatMessageRef.operationName;
console.log(name);
```

### Variables
The `CreateChatMessage` mutation requires an argument of type `CreateChatMessageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateChatMessageVariables {
  streamId: UUIDString;
  content: string;
}
```
### Return Type
Recall that executing the `CreateChatMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateChatMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateChatMessageData {
  chatMessage_insert: ChatMessage_Key;
}
```
### Using `CreateChatMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createChatMessage, CreateChatMessageVariables } from '@dataconnect/generated';

// The `CreateChatMessage` mutation requires an argument of type `CreateChatMessageVariables`:
const createChatMessageVars: CreateChatMessageVariables = {
  streamId: ..., 
  content: ..., 
};

// Call the `createChatMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createChatMessage(createChatMessageVars);
// Variables can be defined inline as well.
const { data } = await createChatMessage({ streamId: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createChatMessage(dataConnect, createChatMessageVars);

console.log(data.chatMessage_insert);

// Or, you can use the `Promise` API.
createChatMessage(createChatMessageVars).then((response) => {
  const data = response.data;
  console.log(data.chatMessage_insert);
});
```

### Using `CreateChatMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createChatMessageRef, CreateChatMessageVariables } from '@dataconnect/generated';

// The `CreateChatMessage` mutation requires an argument of type `CreateChatMessageVariables`:
const createChatMessageVars: CreateChatMessageVariables = {
  streamId: ..., 
  content: ..., 
};

// Call the `createChatMessageRef()` function to get a reference to the mutation.
const ref = createChatMessageRef(createChatMessageVars);
// Variables can be defined inline as well.
const ref = createChatMessageRef({ streamId: ..., content: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createChatMessageRef(dataConnect, createChatMessageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.chatMessage_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.chatMessage_insert);
});
```

## CreateFollow
You can execute the `CreateFollow` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createFollow(vars: CreateFollowVariables): MutationPromise<CreateFollowData, CreateFollowVariables>;

interface CreateFollowRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFollowVariables): MutationRef<CreateFollowData, CreateFollowVariables>;
}
export const createFollowRef: CreateFollowRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createFollow(dc: DataConnect, vars: CreateFollowVariables): MutationPromise<CreateFollowData, CreateFollowVariables>;

interface CreateFollowRef {
  ...
  (dc: DataConnect, vars: CreateFollowVariables): MutationRef<CreateFollowData, CreateFollowVariables>;
}
export const createFollowRef: CreateFollowRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createFollowRef:
```typescript
const name = createFollowRef.operationName;
console.log(name);
```

### Variables
The `CreateFollow` mutation requires an argument of type `CreateFollowVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateFollowVariables {
  creatorId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateFollow` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateFollowData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateFollowData {
  follow_insert: Follow_Key;
}
```
### Using `CreateFollow`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createFollow, CreateFollowVariables } from '@dataconnect/generated';

// The `CreateFollow` mutation requires an argument of type `CreateFollowVariables`:
const createFollowVars: CreateFollowVariables = {
  creatorId: ..., 
};

// Call the `createFollow()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createFollow(createFollowVars);
// Variables can be defined inline as well.
const { data } = await createFollow({ creatorId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createFollow(dataConnect, createFollowVars);

console.log(data.follow_insert);

// Or, you can use the `Promise` API.
createFollow(createFollowVars).then((response) => {
  const data = response.data;
  console.log(data.follow_insert);
});
```

### Using `CreateFollow`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createFollowRef, CreateFollowVariables } from '@dataconnect/generated';

// The `CreateFollow` mutation requires an argument of type `CreateFollowVariables`:
const createFollowVars: CreateFollowVariables = {
  creatorId: ..., 
};

// Call the `createFollowRef()` function to get a reference to the mutation.
const ref = createFollowRef(createFollowVars);
// Variables can be defined inline as well.
const ref = createFollowRef({ creatorId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createFollowRef(dataConnect, createFollowVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.follow_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.follow_insert);
});
```

## UpdateStreamStatus
You can execute the `UpdateStreamStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateStreamStatus(vars: UpdateStreamStatusVariables): MutationPromise<UpdateStreamStatusData, UpdateStreamStatusVariables>;

interface UpdateStreamStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStreamStatusVariables): MutationRef<UpdateStreamStatusData, UpdateStreamStatusVariables>;
}
export const updateStreamStatusRef: UpdateStreamStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStreamStatus(dc: DataConnect, vars: UpdateStreamStatusVariables): MutationPromise<UpdateStreamStatusData, UpdateStreamStatusVariables>;

interface UpdateStreamStatusRef {
  ...
  (dc: DataConnect, vars: UpdateStreamStatusVariables): MutationRef<UpdateStreamStatusData, UpdateStreamStatusVariables>;
}
export const updateStreamStatusRef: UpdateStreamStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStreamStatusRef:
```typescript
const name = updateStreamStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateStreamStatus` mutation requires an argument of type `UpdateStreamStatusVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateStreamStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateStreamStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStreamStatusData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStreamStatusData {
  stream_update?: Stream_Key | null;
}
```
### Using `UpdateStreamStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStreamStatus, UpdateStreamStatusVariables } from '@dataconnect/generated';

// The `UpdateStreamStatus` mutation requires an argument of type `UpdateStreamStatusVariables`:
const updateStreamStatusVars: UpdateStreamStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateStreamStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStreamStatus(updateStreamStatusVars);
// Variables can be defined inline as well.
const { data } = await updateStreamStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStreamStatus(dataConnect, updateStreamStatusVars);

console.log(data.stream_update);

// Or, you can use the `Promise` API.
updateStreamStatus(updateStreamStatusVars).then((response) => {
  const data = response.data;
  console.log(data.stream_update);
});
```

### Using `UpdateStreamStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStreamStatusRef, UpdateStreamStatusVariables } from '@dataconnect/generated';

// The `UpdateStreamStatus` mutation requires an argument of type `UpdateStreamStatusVariables`:
const updateStreamStatusVars: UpdateStreamStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateStreamStatusRef()` function to get a reference to the mutation.
const ref = updateStreamStatusRef(updateStreamStatusVars);
// Variables can be defined inline as well.
const ref = updateStreamStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStreamStatusRef(dataConnect, updateStreamStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.stream_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.stream_update);
});
```

## DeleteChatMessage
You can execute the `DeleteChatMessage` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteChatMessage(vars: DeleteChatMessageVariables): MutationPromise<DeleteChatMessageData, DeleteChatMessageVariables>;

interface DeleteChatMessageRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteChatMessageVariables): MutationRef<DeleteChatMessageData, DeleteChatMessageVariables>;
}
export const deleteChatMessageRef: DeleteChatMessageRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteChatMessage(dc: DataConnect, vars: DeleteChatMessageVariables): MutationPromise<DeleteChatMessageData, DeleteChatMessageVariables>;

interface DeleteChatMessageRef {
  ...
  (dc: DataConnect, vars: DeleteChatMessageVariables): MutationRef<DeleteChatMessageData, DeleteChatMessageVariables>;
}
export const deleteChatMessageRef: DeleteChatMessageRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteChatMessageRef:
```typescript
const name = deleteChatMessageRef.operationName;
console.log(name);
```

### Variables
The `DeleteChatMessage` mutation requires an argument of type `DeleteChatMessageVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteChatMessageVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteChatMessage` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteChatMessageData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteChatMessageData {
  chatMessage_delete?: ChatMessage_Key | null;
}
```
### Using `DeleteChatMessage`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteChatMessage, DeleteChatMessageVariables } from '@dataconnect/generated';

// The `DeleteChatMessage` mutation requires an argument of type `DeleteChatMessageVariables`:
const deleteChatMessageVars: DeleteChatMessageVariables = {
  id: ..., 
};

// Call the `deleteChatMessage()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteChatMessage(deleteChatMessageVars);
// Variables can be defined inline as well.
const { data } = await deleteChatMessage({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteChatMessage(dataConnect, deleteChatMessageVars);

console.log(data.chatMessage_delete);

// Or, you can use the `Promise` API.
deleteChatMessage(deleteChatMessageVars).then((response) => {
  const data = response.data;
  console.log(data.chatMessage_delete);
});
```

### Using `DeleteChatMessage`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteChatMessageRef, DeleteChatMessageVariables } from '@dataconnect/generated';

// The `DeleteChatMessage` mutation requires an argument of type `DeleteChatMessageVariables`:
const deleteChatMessageVars: DeleteChatMessageVariables = {
  id: ..., 
};

// Call the `deleteChatMessageRef()` function to get a reference to the mutation.
const ref = deleteChatMessageRef(deleteChatMessageVars);
// Variables can be defined inline as well.
const ref = deleteChatMessageRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteChatMessageRef(dataConnect, deleteChatMessageVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.chatMessage_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.chatMessage_delete);
});
```

