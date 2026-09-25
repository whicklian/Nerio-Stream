# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateStreamCategory, useCreateStream, useCreateChatMessage, useCreateFollow, useUpdateStreamStatus, useDeleteChatMessage, useGetUser, useListStreams, useListChatMessages } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateStreamCategory();

const { data, isPending, isSuccess, isError, error } = useCreateStream(createStreamVars);

const { data, isPending, isSuccess, isError, error } = useCreateChatMessage(createChatMessageVars);

const { data, isPending, isSuccess, isError, error } = useCreateFollow(createFollowVars);

const { data, isPending, isSuccess, isError, error } = useUpdateStreamStatus(updateStreamStatusVars);

const { data, isPending, isSuccess, isError, error } = useDeleteChatMessage(deleteChatMessageVars);

const { data, isPending, isSuccess, isError, error } = useGetUser();

const { data, isPending, isSuccess, isError, error } = useListStreams();

const { data, isPending, isSuccess, isError, error } = useListChatMessages(listChatMessagesVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createStreamCategory, createStream, createChatMessage, createFollow, updateStreamStatus, deleteChatMessage, getUser, listStreams, listChatMessages } from '@dataconnect/generated';


// Operation CreateStreamCategory: 
const { data } = await CreateStreamCategory(dataConnect);

// Operation CreateStream:  For variables, look at type CreateStreamVars in ../index.d.ts
const { data } = await CreateStream(dataConnect, createStreamVars);

// Operation CreateChatMessage:  For variables, look at type CreateChatMessageVars in ../index.d.ts
const { data } = await CreateChatMessage(dataConnect, createChatMessageVars);

// Operation CreateFollow:  For variables, look at type CreateFollowVars in ../index.d.ts
const { data } = await CreateFollow(dataConnect, createFollowVars);

// Operation UpdateStreamStatus:  For variables, look at type UpdateStreamStatusVars in ../index.d.ts
const { data } = await UpdateStreamStatus(dataConnect, updateStreamStatusVars);

// Operation DeleteChatMessage:  For variables, look at type DeleteChatMessageVars in ../index.d.ts
const { data } = await DeleteChatMessage(dataConnect, deleteChatMessageVars);

// Operation GetUser: 
const { data } = await GetUser(dataConnect);

// Operation ListStreams: 
const { data } = await ListStreams(dataConnect);

// Operation ListChatMessages:  For variables, look at type ListChatMessagesVars in ../index.d.ts
const { data } = await ListChatMessages(dataConnect, listChatMessagesVars);


```