import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Notes"
          component={Notes}
          options={{
            headerStyle: {
              backgroundColor: "white",
            },
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontSize: 25,
            },
          }}
        />

        <Stack.Screen name="New" component={New} />
        <Stack.Screen name="Description" component={Description} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Notes = (props) => {
  const [aanyaNotes, setAanyaNotes] = useState([]);
  // Always define use state with sensible names and pass value in round brackets

  return (
    <View style={styles.container}>
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
        {aanyaNotes.map((item, index) => {
          return (
            <Block
              title={item.title}
              desc={item.desc}
              props={props}
              aanyaNotes={aanyaNotes}
              setAanyaNotes={setAanyaNotes}
              index={index}
            />
          );
        })}
      </ScrollView>

      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() =>
            props.navigation.navigate("New", {
              aanyaNotes: aanyaNotes,
              setAanyaNotes: (newNotes) => setAanyaNotes(newNotes),
            })
          }
        >
          +
        </Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

const Block = ({ title, desc, props, aanyaNotes, setAanyaNotes, index }) => {
  return (
    <View>
      <View
        style={{
          backgroundColor: "white",
          margin: 10,
          borderRadius: 20,
          paddingVertical: 10,
        }}
      >
        <Text
          style={{
            paddingLeft: 20,
            fontSize: 20,
            fontWeight: 500,
          }}
          onPress={() =>
            props.navigation.navigate("Description", {
              title,
              desc,
              index,
              aanyaNotes,
              setAanyaNotes: (newNotes) => setAanyaNotes(newNotes),
            })
          }
        >
          {title}
        </Text>
        <Text
          style={{
            paddingLeft: 20,
            marginTop: 5,
            fontSize: 14,
            color: "#3e3e31",
          }}
          numberOfLines={2}
        >
          {desc}
        </Text>
      </View>
      <TouchableOpacity>
        <Text
          onPress={() => {
            setAanyaNotes(
              aanyaNotes.filter((item, i) => {
                if (index !== i) {
                  return item;
                }
              })
            );
          }}
          style={{
            marginLeft: 10,
            backgroundColor: "pink",
            width: 60,
            borderRadius: 20,
            textAlign: "center",
            paddingVertical: 5,
          }}
        >
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const New = (props) => {
  const [note, setNote] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <View style={{ marginLeft: 20, marginTop: 20, flex: 1 }}>
      <TextInput
        placeholder="Title"
        style={{ fontSize: 23 }}
        value={note} // Initial value of input box
        onChangeText={(text) => {
          // OnCHanging the value of input this function will call and you will get a paramter as text then you just need to change the state according to that text you're getting
          setNote(text);
        }}
      />
      <TextInput
        placeholder="Start typing..."
        style={{
          fontSize: 19,
          marginTop: 20,
          width: 350,
          textAlignVertical: "top",
        }}
        value={desc}
        onChangeText={(text) => {
          setDesc(text);
        }}
        multiline={true}
        numberOfLines={undefined}
      />
      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: "pink",
          width: 50,
          height: 30,
          alignItems: "center",
          marginTop: 50,
          marginLeft: 150,
          borderRadius: 10,
        }}
      >
        <Text
          style={{ fontWeight: 500, paddingTop: 5 }}
          onPress={() => {
            const obj = { title: note, desc: desc };
            props.route.params.setAanyaNotes([
              ...props.route.params.aanyaNotes,
              obj,
            ]);
            props.navigation.navigate("Notes");
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const Description = (props) => {
  const [note, setNote] = useState({
    title: "",
    desc: "",
  });

  useEffect(() => {
    setNote({
      title: props?.route?.params?.title,
      desc: props?.route?.params?.desc,
    });
  }, []);

  return (
    <View style={{ padding: 10 }}>
      {/* <Text style={{ fontSize: 22, fontWeight: 700 }}>
        {props?.route?.params?.title}
      </Text>
      <Text style={{ fontSize: 18 }}>{props?.route?.params?.desc}</Text> */}
      <TextInput
        placeholder="Title"
        style={{ fontSize: 23 }}
        value={note?.title} // Initial value of input box
        onChangeText={(text) => {
          // OnCHanging the value of input this function will call and you will get a paramter as text then you just need to change the state according to that text you're getting
          setNote({ desc: note.desc, title: text });
        }}
      />
      <TextInput
        placeholder="Start typing..."
        style={{
          fontSize: 19,
          marginTop: 20,
          width: 350,
          textAlignVertical: "top",
        }}
        value={note?.desc}
        onChangeText={(text) => {
          setNote({ desc: text, title: note.title });
        }}
        multiline={true}
        numberOfLines={undefined}
      />
      <TouchableOpacity
        style={{
          marginTop: 10,
          backgroundColor: "pink",
          width: 50,
          height: 30,
          alignItems: "center",
          marginTop: 50,
          marginLeft: 150,
          borderRadius: 10,
        }}
      >
        <Text
          style={{ fontWeight: 500, paddingTop: 5 }}
          onPress={() => {
            props.route?.params?.setAanyaNotes(
              props?.route?.params?.aanyaNotes?.map((item, index) => {
                if (index == props?.route?.params?.index) {
                  return { title: note?.title, desc: note?.desc };
                }
                return item;
              })
            );
            props.navigation.navigate("Notes");
          }}
        >
          Save
        </Text>
      </TouchableOpacity>
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
    borderRadius: 200,
    position: "absolute",
    alignSelf: "flex-end",
    padding: 10,
    marginTop: 600,
    right: 20,
    bottom: 20,
  },
  buttonText: {
    paddingHorizontal: 12,
    color: "white",
    fontSize: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
