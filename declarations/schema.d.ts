declare module 'schema' {
  interface IGraphQLResponseRoot {
    data?: IRootQueryType;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    message: string;            // Required for all errors
    locations?: Array<IGraphQLResponseErrorLocation>;
    [propName: string]: any;    // 7.2.2 says 'GraphQL servers may provide additional entries to error'
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }


  interface IRootQueryType {
    status: IStatus | null;
    post: IPost | null;
    posts: IPostConnection | null;
  }


  interface IStatus {
    ping: boolean | null;
  }

  /**
    post model
  */
  interface IPost {
    id: string;
    title: string;
    updatedAt: string | null;
    slug: string;
    body: string;
    date: string;
  }

  /**
    An object with a Globally Unique ID
  */
  interface INode {
    /**
    The ID of the object.
  */
    id: string;
  }


  interface IPostConnection {
    edges: Array<IPostEdge>;
    pageInfo: IPageInfo;
  }


  interface IPostEdge {
    node: IPost | null;
  }

  /**
    Page info for paginated responses
  */
  interface IPageInfo {
    total: number | null;
  }
}
