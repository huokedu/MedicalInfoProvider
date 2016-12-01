
'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native';

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
});

class SearchMedicalInfo extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isLoading: false,
      message: ''
    };
  }
  
  onSearchTextChanged(event) {
    console.log('onSearchTextChanged');
    this.setState({ searchString: event.nativeEvent.text });
    console.log(this.state.searchString);
  }
  
  _executeQuery(query) {
    console.log(query);
    this.setState({ isLoading: true });
    
    var request = new Request(query, {
      method: 'POST',
      body: '{"term":"Naproxeno","avanzado":"0"}',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    
    fetch(request)
      // .then((data) => {
      //   console.log(data.json());
      //   this.setState({
      //     isLoading: false,
      //     message: data.status
      //   })
      // })
      .then(response => response.json())
      .then(json => this._handleResponse(json))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Error ' + error
        }));
  }
  
  onSearchPressed() {
    var baseURL = 'http://observatorio.digemid.minsa.gob.pe/';
    var getMedicineListURI = 'Precios/ProcesoL/Consulta/BusquedaGral.aspx/GetListaMedicamentos';
    var query = baseURL + getMedicineListURI;
    this._executeQuery(query);
  }
  
  _handleResponse(response) {
    
    var count = response.d.length;
    console.log(count);
    
    this.setState({ 
      isLoading: false, 
      message: count + ' resultados'
    });

    console.log(response);
  }
  
  render() {
    
    var spinner = this.state.isLoading ? ( <ActivityIndicator size='large' /> ) : ( <View/> );
    
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Busca el precio de productos farmacéuticos
        </Text>
        <View style={styles.flowRight}>
          <TextInput 
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Ingresa el nombre'
          />
          <TouchableHighlight 
            style={styles.button}
            onPress={this.onSearchPressed.bind(this)}
            >
            <Text style={styles.buttonText}>Buscar</Text>
          </TouchableHighlight>
        </View>
        {spinner}
        <Text style={styles.description}>{this.state.message}</Text>
      </View>
    );
    
  }
}

module.exports = SearchMedicalInfo;
