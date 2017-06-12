import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Container, Icon, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Header, Title } from 'native-base';

class Swiper extends Component {

  handleSwiper() {
    return (
      <DeckSwiper
        dataSource={this.props.restaurants}
        renderItem={item =>
        <Card style={{ elevation: 3 }}>
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: item.restaurant.featured_image }} />
              <Body>
                <Text>{item.restaurant.name}</Text>
                <Text note>{item.restaurant.cuisines}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Body style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Image
                style={{ width: 270, height: 220 }}
                source={{ uri: item.restaurant.featured_image }}
              />
              <Text note style={{ margin: 20, textAlign: 'center' }}>{item.restaurant.location.address}</Text>
            </Body>
          </CardItem>
          <CardItem>
            <Icon name="heart" style={{ color: '#ED4A6A' }} />
            <Text>{item.restaurant.name}</Text>
          </CardItem>
        </Card>
        }
      />
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>List Restaurants</Title>
          </Body>
        </Header>
        <View style={{ padding: 20 }}>
          {this.handleSwiper()}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  restaurants: state.restaurants,
});

export default connect(mapStateToProps)(Swiper);
