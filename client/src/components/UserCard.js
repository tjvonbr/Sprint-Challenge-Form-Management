import React from 'react';
import { Card } from 'semantic-ui-react';

class UserCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (   
      <Card className="user-card">
        <Card.Content>
          <Card.Header className="dinner-card name">{ this.props.user.name }</Card.Header>
          <Card.Content className="dinner-details">Course: { this.props.user.course }</Card.Content>
          <Card.Content className="dinner-details">{ this.props.user.ingredients }</Card.Content>
          <Card.Content className="dinner-details">{ this.props.user.technique }</Card.Content>
        </Card.Content>
      </Card>
    )
  }
}

export default UserCard;