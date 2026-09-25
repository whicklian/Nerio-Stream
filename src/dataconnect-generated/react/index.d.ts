import { CreateStreamCategoryData, CreateStreamData, CreateStreamVariables, CreateChatMessageData, CreateChatMessageVariables, CreateFollowData, CreateFollowVariables, UpdateStreamStatusData, UpdateStreamStatusVariables, DeleteChatMessageData, DeleteChatMessageVariables, GetUserData, ListStreamsData, ListChatMessagesData, ListChatMessagesVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateStreamCategory(options?: useDataConnectMutationOptions<CreateStreamCategoryData, FirebaseError, void>): UseDataConnectMutationResult<CreateStreamCategoryData, undefined>;
export function useCreateStreamCategory(dc: DataConnect, options?: useDataConnectMutationOptions<CreateStreamCategoryData, FirebaseError, void>): UseDataConnectMutationResult<CreateStreamCategoryData, undefined>;

export function useCreateStream(options?: useDataConnectMutationOptions<CreateStreamData, FirebaseError, CreateStreamVariables>): UseDataConnectMutationResult<CreateStreamData, CreateStreamVariables>;
export function useCreateStream(dc: DataConnect, options?: useDataConnectMutationOptions<CreateStreamData, FirebaseError, CreateStreamVariables>): UseDataConnectMutationResult<CreateStreamData, CreateStreamVariables>;

export function useCreateChatMessage(options?: useDataConnectMutationOptions<CreateChatMessageData, FirebaseError, CreateChatMessageVariables>): UseDataConnectMutationResult<CreateChatMessageData, CreateChatMessageVariables>;
export function useCreateChatMessage(dc: DataConnect, options?: useDataConnectMutationOptions<CreateChatMessageData, FirebaseError, CreateChatMessageVariables>): UseDataConnectMutationResult<CreateChatMessageData, CreateChatMessageVariables>;

export function useCreateFollow(options?: useDataConnectMutationOptions<CreateFollowData, FirebaseError, CreateFollowVariables>): UseDataConnectMutationResult<CreateFollowData, CreateFollowVariables>;
export function useCreateFollow(dc: DataConnect, options?: useDataConnectMutationOptions<CreateFollowData, FirebaseError, CreateFollowVariables>): UseDataConnectMutationResult<CreateFollowData, CreateFollowVariables>;

export function useUpdateStreamStatus(options?: useDataConnectMutationOptions<UpdateStreamStatusData, FirebaseError, UpdateStreamStatusVariables>): UseDataConnectMutationResult<UpdateStreamStatusData, UpdateStreamStatusVariables>;
export function useUpdateStreamStatus(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateStreamStatusData, FirebaseError, UpdateStreamStatusVariables>): UseDataConnectMutationResult<UpdateStreamStatusData, UpdateStreamStatusVariables>;

export function useDeleteChatMessage(options?: useDataConnectMutationOptions<DeleteChatMessageData, FirebaseError, DeleteChatMessageVariables>): UseDataConnectMutationResult<DeleteChatMessageData, DeleteChatMessageVariables>;
export function useDeleteChatMessage(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteChatMessageData, FirebaseError, DeleteChatMessageVariables>): UseDataConnectMutationResult<DeleteChatMessageData, DeleteChatMessageVariables>;

export function useGetUser(options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;
export function useGetUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserData>): UseDataConnectQueryResult<GetUserData, undefined>;

export function useListStreams(options?: useDataConnectQueryOptions<ListStreamsData>): UseDataConnectQueryResult<ListStreamsData, undefined>;
export function useListStreams(dc: DataConnect, options?: useDataConnectQueryOptions<ListStreamsData>): UseDataConnectQueryResult<ListStreamsData, undefined>;

export function useListChatMessages(vars: ListChatMessagesVariables, options?: useDataConnectQueryOptions<ListChatMessagesData>): UseDataConnectQueryResult<ListChatMessagesData, ListChatMessagesVariables>;
export function useListChatMessages(dc: DataConnect, vars: ListChatMessagesVariables, options?: useDataConnectQueryOptions<ListChatMessagesData>): UseDataConnectQueryResult<ListChatMessagesData, ListChatMessagesVariables>;
