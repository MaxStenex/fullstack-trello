import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me: UserResponse;
  userTaskColumns: UserTaskColumnsResponse;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<Scalars['String']>>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  fullname: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  taskColumns?: Maybe<Array<TaskColumn>>;
};

export type UserTaskColumnsResponse = {
  __typename?: 'UserTaskColumnsResponse';
  taskColumns?: Maybe<Array<TaskColumn>>;
  errors?: Maybe<Array<Scalars['String']>>;
};

export type TaskColumn = {
  __typename?: 'TaskColumn';
  id: Scalars['Int'];
  title: Scalars['String'];
  createdAt: Scalars['String'];
  user: User;
  index: Scalars['Int'];
  tasks?: Maybe<Array<Task>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  createTaskColumn: TaskColumnResponse;
  createTask: TaskResponse;
  updateColumnTitle: TaskColumnResponse;
  logout: LogoutResponse;
  deleteTask: DeleteResponse;
  deleteColumn: DeleteResponse;
  changeColumnsOrder: ChangeColumnsOrderResponse;
  changeTasksOrder: ChangeTasksOrderResponse;
};


export type MutationRegisterArgs = {
  input: RegisterUserInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateTaskColumnArgs = {
  title: Scalars['String'];
  index: Scalars['Int'];
};


export type MutationCreateTaskArgs = {
  text: Scalars['String'];
  columnId: Scalars['Int'];
  index: Scalars['Int'];
};


export type MutationUpdateColumnTitleArgs = {
  title: Scalars['String'];
  columnId: Scalars['Int'];
};


export type MutationDeleteTaskArgs = {
  taskId: Scalars['String'];
};


export type MutationDeleteColumnArgs = {
  columnId: Scalars['Int'];
};


export type MutationChangeColumnsOrderArgs = {
  sourceIndex: Scalars['Int'];
  destinationIndex: Scalars['Int'];
};


export type MutationChangeTasksOrderArgs = {
  input: ChangeTasksOrderInput;
};

export type RegisterUserInput = {
  fullname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type TaskColumnResponse = {
  __typename?: 'TaskColumnResponse';
  taskColumn?: Maybe<TaskColumn>;
  errors?: Maybe<Array<Scalars['String']>>;
};

export type TaskResponse = {
  __typename?: 'TaskResponse';
  task?: Maybe<Task>;
  errors?: Maybe<Array<Scalars['String']>>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['String'];
  text: Scalars['String'];
  createdAt: Scalars['String'];
  index: Scalars['Int'];
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  isSuccess: Scalars['Boolean'];
  errors?: Maybe<Array<Scalars['String']>>;
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  isSuccess: Scalars['Boolean'];
  errors?: Maybe<Array<Scalars['String']>>;
};

export type ChangeColumnsOrderResponse = {
  __typename?: 'ChangeColumnsOrderResponse';
  isSuccess: Scalars['Boolean'];
  errors?: Maybe<Array<Scalars['String']>>;
};

export type ChangeTasksOrderInput = {
  sourceColumnId: Scalars['Int'];
  destinationColumnId: Scalars['Int'];
  sourceTaskIndex: Scalars['Int'];
  destinationTaskIndex: Scalars['Int'];
};

export type ChangeTasksOrderResponse = {
  __typename?: 'ChangeTasksOrderResponse';
  isSuccess: Scalars['Boolean'];
  errors?: Maybe<Array<Scalars['String']>>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  User: ResolverTypeWrapper<User>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  UserTaskColumnsResponse: ResolverTypeWrapper<UserTaskColumnsResponse>;
  TaskColumn: ResolverTypeWrapper<TaskColumn>;
  Mutation: ResolverTypeWrapper<{}>;
  RegisterUserInput: RegisterUserInput;
  TaskColumnResponse: ResolverTypeWrapper<TaskColumnResponse>;
  TaskResponse: ResolverTypeWrapper<TaskResponse>;
  Task: ResolverTypeWrapper<Task>;
  LogoutResponse: ResolverTypeWrapper<LogoutResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DeleteResponse: ResolverTypeWrapper<DeleteResponse>;
  ChangeColumnsOrderResponse: ResolverTypeWrapper<ChangeColumnsOrderResponse>;
  ChangeTasksOrderInput: ChangeTasksOrderInput;
  ChangeTasksOrderResponse: ResolverTypeWrapper<ChangeTasksOrderResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  UserResponse: UserResponse;
  User: User;
  Int: Scalars['Int'];
  UserTaskColumnsResponse: UserTaskColumnsResponse;
  TaskColumn: TaskColumn;
  Mutation: {};
  RegisterUserInput: RegisterUserInput;
  TaskColumnResponse: TaskColumnResponse;
  TaskResponse: TaskResponse;
  Task: Task;
  LogoutResponse: LogoutResponse;
  Boolean: Scalars['Boolean'];
  DeleteResponse: DeleteResponse;
  ChangeColumnsOrderResponse: ChangeColumnsOrderResponse;
  ChangeTasksOrderInput: ChangeTasksOrderInput;
  ChangeTasksOrderResponse: ChangeTasksOrderResponse;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  me?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType>;
  userTaskColumns?: Resolver<ResolversTypes['UserTaskColumnsResponse'], ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  fullname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taskColumns?: Resolver<Maybe<Array<ResolversTypes['TaskColumn']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserTaskColumnsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserTaskColumnsResponse'] = ResolversParentTypes['UserTaskColumnsResponse']> = {
  taskColumns?: Resolver<Maybe<Array<ResolversTypes['TaskColumn']>>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskColumnResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskColumn'] = ResolversParentTypes['TaskColumn']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tasks?: Resolver<Maybe<Array<ResolversTypes['Task']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  register?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  login?: Resolver<ResolversTypes['UserResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  createTaskColumn?: Resolver<ResolversTypes['TaskColumnResponse'], ParentType, ContextType, RequireFields<MutationCreateTaskColumnArgs, 'title' | 'index'>>;
  createTask?: Resolver<ResolversTypes['TaskResponse'], ParentType, ContextType, RequireFields<MutationCreateTaskArgs, 'text' | 'columnId' | 'index'>>;
  updateColumnTitle?: Resolver<ResolversTypes['TaskColumnResponse'], ParentType, ContextType, RequireFields<MutationUpdateColumnTitleArgs, 'title' | 'columnId'>>;
  logout?: Resolver<ResolversTypes['LogoutResponse'], ParentType, ContextType>;
  deleteTask?: Resolver<ResolversTypes['DeleteResponse'], ParentType, ContextType, RequireFields<MutationDeleteTaskArgs, 'taskId'>>;
  deleteColumn?: Resolver<ResolversTypes['DeleteResponse'], ParentType, ContextType, RequireFields<MutationDeleteColumnArgs, 'columnId'>>;
  changeColumnsOrder?: Resolver<ResolversTypes['ChangeColumnsOrderResponse'], ParentType, ContextType, RequireFields<MutationChangeColumnsOrderArgs, 'sourceIndex' | 'destinationIndex'>>;
  changeTasksOrder?: Resolver<ResolversTypes['ChangeTasksOrderResponse'], ParentType, ContextType, RequireFields<MutationChangeTasksOrderArgs, 'input'>>;
};

export type TaskColumnResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskColumnResponse'] = ResolversParentTypes['TaskColumnResponse']> = {
  taskColumn?: Resolver<Maybe<ResolversTypes['TaskColumn']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskResponse'] = ResolversParentTypes['TaskResponse']> = {
  task?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogoutResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogoutResponse'] = ResolversParentTypes['LogoutResponse']> = {
  isSuccess?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteResponse'] = ResolversParentTypes['DeleteResponse']> = {
  isSuccess?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeColumnsOrderResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeColumnsOrderResponse'] = ResolversParentTypes['ChangeColumnsOrderResponse']> = {
  isSuccess?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeTasksOrderResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeTasksOrderResponse'] = ResolversParentTypes['ChangeTasksOrderResponse']> = {
  isSuccess?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserTaskColumnsResponse?: UserTaskColumnsResponseResolvers<ContextType>;
  TaskColumn?: TaskColumnResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  TaskColumnResponse?: TaskColumnResponseResolvers<ContextType>;
  TaskResponse?: TaskResponseResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  LogoutResponse?: LogoutResponseResolvers<ContextType>;
  DeleteResponse?: DeleteResponseResolvers<ContextType>;
  ChangeColumnsOrderResponse?: ChangeColumnsOrderResponseResolvers<ContextType>;
  ChangeTasksOrderResponse?: ChangeTasksOrderResponseResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
