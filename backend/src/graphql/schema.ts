const typeDefs = `
  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    role: UserRole!
    createdAt: String!
    updatedAt: String!
  }

  enum UserRole {
    STUDENT
    INSTRUCTOR
    ADMIN
  }

  type Classroom {
    id: ID!
    name: String!
    instructor: User!
    description: String!
    students: Int!
    progress: Float!
    nextClass: String
    assignments: Int!
    topics: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type Community {
    id: ID!
    name: String!
    description: String!
    members: Int!
    topics: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  type Post {
    id: ID!
    author: User!
    title: String!
    content: String!
    tags: [String!]!
    likes: Int!
    comments: Int!
    createdAt: String!
    updatedAt: String!
  }

  type ChatMessage {
    id: ID!
    sender: User!
    content: String!
    communityId: ID
    classroomId: ID
    createdAt: String!
  }

  type Query {
    # User queries
    me: User
    user(id: ID!): User
    users: [User!]!

    # Classroom queries
    classroom(id: ID!): Classroom
    classrooms(page: Int, limit: Int): [Classroom!]!
    myClassrooms: [Classroom!]!

    # Community queries
    community(id: ID!): Community
    communities(page: Int, limit: Int): [Community!]!
    myCommunities: [Community!]!

    # Post queries
    post(id: ID!): Post
    posts(page: Int, limit: Int): [Post!]!
    postsByTag(tag: String!, page: Int, limit: Int): [Post!]!

    # Chat queries
    messages(communityId: ID, classroomId: ID, limit: Int): [ChatMessage!]!
  }

  input CreateClassroomInput {
    name: String!
    description: String!
    topics: [String!]!
  }

  input UpdateClassroomInput {
    name: String
    description: String
    topics: [String!]
  }

  input CreateCommunityInput {
    name: String!
    description: String!
    topics: [String!]!
  }

  input UpdateCommunityInput {
    name: String
    description: String
    topics: [String!]
  }

  input CreatePostInput {
    title: String!
    content: String!
    tags: [String!]!
  }

  input UpdatePostInput {
    title: String
    content: String
    tags: [String!]
  }

  type Mutation {
    # Classroom mutations
    createClassroom(input: CreateClassroomInput!): Classroom!
    updateClassroom(id: ID!, input: UpdateClassroomInput!): Classroom!
    deleteClassroom(id: ID!): Boolean!

    # Community mutations
    createCommunity(input: CreateCommunityInput!): Community!
    updateCommunity(id: ID!, input: UpdateCommunityInput!): Community!
    deleteCommunity(id: ID!): Boolean!

    # Post mutations
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post!
    deletePost(id: ID!): Boolean!
    likePost(id: ID!): Post!
    unlikePost(id: ID!): Post!

    # Chat mutations
    sendMessage(content: String!, communityId: ID, classroomId: ID): ChatMessage!
  }

  type Subscription {
    messageReceived(communityId: ID, classroomId: ID): ChatMessage!
    postCreated: Post!
    postLiked: Post!
  }
`;

export default typeDefs;