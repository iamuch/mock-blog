const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const COMMENT_ADDED = 'COMMENT_ADDED'

module.exports = {
  Subscription: {
    commentAdded: {
      subscribe: () => pubsub.asyncIterator([COMMENT_ADDED])
    },
  },
  Query: {
    post: async (_, { id }, { dataSources }) => {
      return dataSources.postAPI.find(id);
    },
    posts: async (_, { pagination }, { dataSources }) => {
      return dataSources.postAPI.findAll(pagination);
    }
  },
  Mutation: {
    addPost: async (_, { post }, { dataSources }) => {
      return dataSources.postAPI.create(post)
    },
    updatePost: async (_, { post }, { dataSources }) => {
      return dataSources.postAPI.update(post)
    },
    addComment: async (_, { postId, content }, { dataSources }) => {
      const comment = dataSources.postAPI.addComment(postId, content);
      pubsub.publish(COMMENT_ADDED, { commentAdded: comment});
      return comment;
    },
    register: async (_, { email, password }, { dataSources }) => {
      return dataSources.userAPI.register(email, password);
    },
    authenticate: async (_, { email, password }, { dataSources }) => {
      return dataSources.userAPI.authenticate(email, password);
    },
  },
  Post: {
    comments: (post, _, { dataSources }) => {
      return dataSources.postAPI.getComments(post.id);
    }
  }
};
