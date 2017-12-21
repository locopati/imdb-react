import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements'

class WatchableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('http://192.168.0.92:3000/watchables')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          data: responseJson
        }, function() {
          console.log(this.state.data)
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error: error, isLoading: false})
      })
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <Text>Hello?!?</Text>
        <FlatList
          data={this.state.data}
          keyExtractor={(item, index) => index}
          renderItem={ ({item}) => (<WatchableItem w={item}/>) }
        />
      </View>
    );
  }
}

class WatchableItem extends Component {
  render() {
    return (
      <View>
        <Image source={{uri:this.props.w.poster_uri}} style={{width: 66, height: 99}}/>
        <Text>{this.props.w.title}</Text>
        <Text>{this.props.w.rating}</Text>
        <Text>{this.props.w.minutes} minutes</Text>
        <Text>☆ {this.props.w.imdb_rating}</Text>

      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <View>
        <WatchableList/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
