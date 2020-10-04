import React, { Component } from 'react';
import { Card, Dimmer, Loader, Image, List } from 'semantic-ui-react';

class AuthorInfo extends Component {

    state = {
        userData: null,
        userAlbums: [],
        isUserDataFetching: false,
        isUserAlbumFetching: false,
    };

    componentDidMount() {
        this.fetchUserData();
        this.fetchUserComments();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.authorId !== this.props.authorId && this.props.authorId !== null) {
            this.fetchUserData();
            this.fetchUserComments();
        }
    }

    fetchUserComments() {
        const { authorId } = this.props;
        if (!authorId) return;
        this.setState({ isUserAlbumFetching: true });
        fetch(`https://jsonplaceholder.typicode.com/users/${authorId}/albums`)
            .then(response => response.json())
            .then(albums => {
                const userAlbums = albums.map(album => album.title);
                this.setState({ userAlbums, isUserAlbumFetching: false });
                console.log(userAlbums);
            })
            .catch(err => this.setState({ isUserAlbumFetching: false }))
    }

    fetchUserData() {
        const { authorId } = this.props;
        if (!authorId) return;
        this.setState({ isUserDataFetching: true });
        fetch(`https://jsonplaceholder.typicode.com/users/${authorId}`)
            .then(response => response.json())
            .then(userData => this.setState({ userData, isUserDataFetching: false }))
            .catch(err => this.setState({ isUserDataFetching: false }))
    }

    render() {
        const { userData, isUserDataFetching, userAlbums, isUserAlbumFetching } = this.state;
        if (userData === null) return null;
        return (
            <Card className='author-card'>
                <Dimmer active={isUserDataFetching || isUserAlbumFetching}>
                    <Loader active={isUserDataFetching || isUserAlbumFetching} />
                </Dimmer>
                <Card.Content>
                    <Card.Header>{userData.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Email: {userData.email}</span>
                    </Card.Meta>
                    <Card.Description>
                        {userData.phone}
                    </Card.Description>
                    <List selection verticalAlign='middle'>
                        {userAlbums.map(album => (
                            <List.Item key={album.id}>
                                <Image avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
                                <List.Content>
                                    <List.Header>{album}</List.Header>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </Card.Content>
            </Card>
        );
    }
}

export default AuthorInfo;