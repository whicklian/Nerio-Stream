import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface ChatMessage_Key {
  id: UUIDString;
  __typename?: 'ChatMessage_Key';
}

export interface CreateChatMessageData {
  chatMessage_insert: ChatMessage_Key;
}

export interface CreateChatMessageVariables {
  streamId: UUIDString;
  content: string;
}

export interface CreateFollowData {
  follow_insert: Follow_Key;
}

export interface CreateFollowVariables {
  creatorId: UUIDString;
}

export interface CreateStreamCategoryData {
  streamCategory_insert: StreamCategory_Key;
}

export interface CreateStreamData {
  stream_insert: Stream_Key;
}

export interface CreateStreamVariables {
  title: string;
}

export interface DeleteChatMessageData {
  chatMessage_delete?: ChatMessage_Key | null;
}

export interface DeleteChatMessageVariables {
  id: UUIDString;
}

export interface Follow_Key {
  id: UUIDString;
  __typename?: 'Follow_Key';
}

export interface GetUserData {
  user?: {
    username: string;
    email: string;
  };
}

export interface ListChatMessagesData {
  chatMessages: ({
    content: string;
    sender: {
      username: string;
    };
  })[];
}

export interface ListChatMessagesVariables {
  streamId: UUIDString;
}

export interface ListStreamsData {
  streams: ({
    title: string;
    status: string;
    creator: {
      username: string;
    };
  })[];
}

export interface StreamCategory_Key {
  id: UUIDString;
  __typename?: 'StreamCategory_Key';
}

export interface Stream_Key {
  id: UUIDString;
  __typename?: 'Stream_Key';
}

export interface UpdateStreamStatusData {
  stream_update?: Stream_Key | null;
}

export interface UpdateStreamStatusVariables {
  id: UUIDString;
  status: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateStreamCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateStreamCategoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateStreamCategoryData, undefined>;
  operationName: string;
}
export const createStreamCategoryRef: CreateStreamCategoryRef;

export function createStreamCategory(): MutationPromise<CreateStreamCategoryData, undefined>;
export function createStreamCategory(dc: DataConnect): MutationPromise<CreateStreamCategoryData, undefined>;

interface CreateStreamRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStreamVariables): MutationRef<CreateStreamData, CreateStreamVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateStreamVariables): MutationRef<CreateStreamData, CreateStreamVariables>;
  operationName: string;
}
export const createStreamRef: CreateStreamRef;

export function createStream(vars: CreateStreamVariables): MutationPromise<CreateStreamData, CreateStreamVariables>;
export function createStream(dc: DataConnect, vars: CreateStreamVariables): MutationPromise<CreateStreamData, CreateStreamVariables>;

interface CreateChatMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateChatMessageVariables): MutationRef<CreateChatMessageData, CreateChatMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateChatMessageVariables): MutationRef<CreateChatMessageData, CreateChatMessageVariables>;
  operationName: string;
}
export const createChatMessageRef: CreateChatMessageRef;

export function createChatMessage(vars: CreateChatMessageVariables): MutationPromise<CreateChatMessageData, CreateChatMessageVariables>;
export function createChatMessage(dc: DataConnect, vars: CreateChatMessageVariables): MutationPromise<CreateChatMessageData, CreateChatMessageVariables>;

interface CreateFollowRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateFollowVariables): MutationRef<CreateFollowData, CreateFollowVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateFollowVariables): MutationRef<CreateFollowData, CreateFollowVariables>;
  operationName: string;
}
export const createFollowRef: CreateFollowRef;

export function createFollow(vars: CreateFollowVariables): MutationPromise<CreateFollowData, CreateFollowVariables>;
export function createFollow(dc: DataConnect, vars: CreateFollowVariables): MutationPromise<CreateFollowData, CreateFollowVariables>;

interface UpdateStreamStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStreamStatusVariables): MutationRef<UpdateStreamStatusData, UpdateStreamStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStreamStatusVariables): MutationRef<UpdateStreamStatusData, UpdateStreamStatusVariables>;
  operationName: string;
}
export const updateStreamStatusRef: UpdateStreamStatusRef;

export function updateStreamStatus(vars: UpdateStreamStatusVariables): MutationPromise<UpdateStreamStatusData, UpdateStreamStatusVariables>;
export function updateStreamStatus(dc: DataConnect, vars: UpdateStreamStatusVariables): MutationPromise<UpdateStreamStatusData, UpdateStreamStatusVariables>;

interface DeleteChatMessageRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteChatMessageVariables): MutationRef<DeleteChatMessageData, DeleteChatMessageVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteChatMessageVariables): MutationRef<DeleteChatMessageData, DeleteChatMessageVariables>;
  operationName: string;
}
export const deleteChatMessageRef: DeleteChatMessageRef;

export function deleteChatMessage(vars: DeleteChatMessageVariables): MutationPromise<DeleteChatMessageData, DeleteChatMessageVariables>;
export function deleteChatMessage(dc: DataConnect, vars: DeleteChatMessageVariables): MutationPromise<DeleteChatMessageData, DeleteChatMessageVariables>;

interface GetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserData, undefined>;
  operationName: string;
}
export const getUserRef: GetUserRef;

export function getUser(options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;
export function getUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserData, undefined>;

interface ListStreamsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStreamsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListStreamsData, undefined>;
  operationName: string;
}
export const listStreamsRef: ListStreamsRef;

export function listStreams(options?: ExecuteQueryOptions): QueryPromise<ListStreamsData, undefined>;
export function listStreams(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStreamsData, undefined>;

interface ListChatMessagesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListChatMessagesVariables): QueryRef<ListChatMessagesData, ListChatMessagesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListChatMessagesVariables): QueryRef<ListChatMessagesData, ListChatMessagesVariables>;
  operationName: string;
}
export const listChatMessagesRef: ListChatMessagesRef;

export function listChatMessages(vars: ListChatMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListChatMessagesData, ListChatMessagesVariables>;
export function listChatMessages(dc: DataConnect, vars: ListChatMessagesVariables, options?: ExecuteQueryOptions): QueryPromise<ListChatMessagesData, ListChatMessagesVariables>;

