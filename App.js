import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database'

export default class App extends React.Component{
constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed:false,
      word:"",
      lexicalCategory:"",
      examples:[],
      definition:"",
    };
  }
  getWord=(text)=>{
  //              var url = "https://whitehat-dictionary.glitch.me/?word=" + word;
  //             return fetch(url)
  //             .then((data)=>{
  //               return data.json()
  //             })
  //             .then((response)=>{
  //               var responseObject=JSON.parse(response);
  //               var word=responseObject.word
  //               var lexicalCategory=responseObject.results[0].lexicalEntries[0].lexicalCategory.text
  //               var definition=responseObject.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
  //               this.setState({
  //                 "word":word.trim(),
  //                 "lexicalCategory":lexicalCategory===undefined?"":lexicalCategory.trim(),
  //               definition:definition===undefined?"":definition.trim(),
  //               })

  // })
            var text=text.toLowerCase();
            try{
            var word=dictionary[text]["word"]
            var lexicalCategory=dictionary[text]["lexicalCategory"]
            var definition=dictionary[text]["definition"]
            this.setState({
              "word":word,
              "lexicalCategory":lexicalCategory,
              "definition":definition
            })
            }
            catch(err){
              alert("sorry")
              this.setState({
                text:"",
                isSearchPressed:false
              })
            }
          }

  

 render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'#9c8210'}
          centerComponent={{
            text: 'Monkey Chunky',
            style: { color: '#fff', fontSize: 20 },
          }}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={text => {
            this.setState({ text: text,
            isSearchPressed:false,
            word:"Loading....",
            lexicalCategory:'',
            examples:[],
            definition:"" });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            this.setState({isSearchPressed:true});
            this.getWord(this.state.text)}}>
            <Text>SearchButton</Text>
            </TouchableOpacity>

          <View style={styles.detailsContainer}>
<Text style={styles.detailsTitle}>
Word :{" "}
</Text>
<Text style={{fontSize:18 }}>
{this.state.word}
</Text>
</View>
<View style={styles.detailsContainer}>
<Text style={styles.detailsTitle}>
Type :{" "}
</Text>
<Text style={{fontSize:18}}>
{this.state.lexicalCategory}
</Text>
</View>
            
        </View>
    )
 }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
});
