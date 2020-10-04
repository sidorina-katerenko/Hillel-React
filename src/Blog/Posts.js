import React, { Component, Fragment } from 'react';
import { Feed, Loader, Comment, Header } from 'semantic-ui-react';

async function fetchPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    return await response.json();
}

async function fetchComments(post) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
    post.comments =  await response.json();

    return post;
}

async function fetchData() {
    try {
        const posts = await fetchPosts();
        return await Promise.all(posts.map(post => fetchComments(post)));
    } catch (e) {
        return null;
    }
}

class Posts extends Component {

  state = {
    posts: [],
    isPostFetching: false
  };

  async componentDidMount() {
    this.setState({ isPostFetching: true });
    
    try {
        const posts = await fetchData();
        this.setState({ posts });
    } finally {
        this.setState({ isPostFetching: false });
    }
  }

  render() {
    const { posts, isPostFetching } = this.state;
    const { onPostSelect } = this.props;

    return (
      <Fragment>
        <Loader size='small' active={isPostFetching} />
        <Feed>
          {posts.map(post => (
            <Feed.Event key={post.id}>
              <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
              <Feed.Content>
                <Feed.Summary onClick={() => onPostSelect(post)}>
                  <a>{post.title}</a>
                </Feed.Summary>
                <Feed.Extra text>
                  {post.body}
                </Feed.Extra>
              </Feed.Content>
              <Comment.Group minimal>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {post.comments.map(comment => (
                    <Comment key={comment.id}>
                        <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                        <Comment.Content>
                            <Comment.Author as='a'>{comment.name}</Comment.Author>
                            <Comment.Metadata>
                            <span>{comment.email}</span>
                            </Comment.Metadata>
                            <Comment.Text>{comment.body}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                    ))}
              </Comment.Group>
            </Feed.Event>
          ))}
        </Feed>
      </Fragment>
    );
  }
}

export default Posts;