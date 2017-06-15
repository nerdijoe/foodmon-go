import React, { Component } from 'react';
import { Image, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { Container, Icon, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Header, Title } from 'native-base';
import imageNotAvailable from '../assets/imageNotAvailable/no-image.jpg';

class Swiper extends Component {

  handleSwiper() {
    if(this.props.user.interestArr){
      const restaurants = [...this.props.restaurants];
      const user = this.props.user.interestArr;
      const card = [];
      if (user) {
        for (let i = 0; i < restaurants.length; i++) {
          for (let j = 0; j < user.length; j++) {
            const regex = new RegExp(user[j].cuisine_name, 'gi')
            if (restaurants[i].restaurant.cuisines.match(regex)) {
              card.push(restaurants[i]);
              restaurants.splice(restaurants.indexOf(restaurants[i]), 1);
              break;
            }
          }
        }
      }
      const interest = user.map((val) => {
        return val.cuisine_name;
      }).join(' ');
      const cards = card.concat(restaurants);
      return (
        <DeckSwiper
          dataSource={cards}
          renderItem={item =>
            (<Card style={{ elevation: 3 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={this.handleImage(item.restaurant.featured_image)} />
                  <Body>
                    <Text>{item.restaurant.name}</Text>
                    <Text note>{item.restaurant.cuisines}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Body style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <TouchableOpacity onPress={() => this.onLink(item.restaurant.url)}>
                    <Image
                      style={{ width: 270, height: 220 }}
                      source={this.handleImage(item.restaurant.featured_image)}
                    />
                  </TouchableOpacity>
                  <Text note style={{ margin: 20, textAlign: 'left' }}>Average cost for two : {item.restaurant.average_cost_for_two} {item.restaurant.currency} {'\n'} {item.restaurant.location.address}</Text>
                </Body>
              </CardItem>
              {this.handleIcon(item.restaurant.cuisines, interest)}
            </Card>)
          }
        />
      );
    } else {
      const restaurants = [...this.props.restaurants];
      return (
        <DeckSwiper
          dataSource={restaurants}
          renderItem={item =>
            (<Card style={{ elevation: 3 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={this.handleImage(item.restaurant.featured_image)} />
                  <Body>
                    <Text>{item.restaurant.name}</Text>
                    <Text note>{item.restaurant.cuisines}</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Body style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                  <TouchableOpacity onPress={() => this.onLink(item.restaurant.url)}>
                    <Image
                      style={{ width: 270, height: 220 }}
                      source={this.handleImage(item.restaurant.featured_image)}
                    />
                  </TouchableOpacity>
                  <Text note style={{ margin: 20, textAlign: 'left' }}>Average cost for two : {item.restaurant.average_cost_for_two} {item.restaurant.currency} {'\n'} {item.restaurant.location.address}</Text>
                </Body>
              </CardItem>
            </Card>)
          }
        />
      );
    }
  }

  onLink(url) {
    return Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  handleImage(image) {
    if (image) {
      return {
        uri: image,
      };
    }
    return imageNotAvailable;
  }

  handleIcon(cuisines, interest) {
    const cuisines2 = cuisines.split(',').map(item => item.trim());
    if ((new RegExp('\\b' + cuisines2.join('\\b|\\b') + '\\b')).test(interest)) {
      return (
        <CardItem>
          <Icon name="md-star" style={{ color: '#F6C90E' }} />
          <Text>{cuisines}</Text>
        </CardItem>
      );
    }
  }

  render() {
    console.log('prop', this.props.restaurants)
    return (
      <Container>
        <Header>
          <Body>
            <Title>Restaurants around you</Title>
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
  user: state.UserReducer,
  restaurants: state.restaurants,
});

export default connect(mapStateToProps)(Swiper);
