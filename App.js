import { StatusBar } from "expo-status-bar";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 25,
          marginTop: 50,
          fontWeight: 500,
        }}
      >
        Notes
      </Text>
      <ScrollView>
        <Text
          style={{
            fontSize: 18,
            marginTop: 30,
            marginLeft: 15,
            fontWeight: 400,
          }}
        >
          My notes
        </Text>

        <Block />
        <Block />
        <Block />
        
      </ScrollView>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}><Image source={require('./')}></Image></Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const Block = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        margin: 10,
        height: 70,
        borderRadius: 20,
      }}
    >
      <Text
        style={{
          paddingLeft: 20,
          paddingTop: 10,
          fontSize: 15,
          fontWeight: 500,
        }}
      >
        Projects to make
      </Text>
      <Text
        style={{
          paddingLeft: 20,
          marginTop: 15,
          fontSize: 13,
          color: "#3e3e31",
        }}
      >
        last edited : 12:38 pm
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eae9e1",

    height: "auto",
  },
  button: {
    backgroundColor: "gray",
    padding: 20,
    borderRadius: 200,
    position: "absolute",
    height: 60,
    alignSelf: "flex-end",
    marginTop: 700,
    
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    width: 20,
  },
});
