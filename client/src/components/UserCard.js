import React from 'react';
import { Card } from 'semantic-ui-react';

class UserCard extends React.Component {
  constructor(props) {
    super(props);
  }

    render(props) {
      return (   
        <Card className="user-card">
          <Card.Content>
            <Card.Header className="card-name">{ props.users.username }</Card.Header>
            <Card.Meta className="card-email">{ props.users.password }</Card.Meta>
          </Card.Content>
        </Card>
      )
    }
}

export default UserCard;