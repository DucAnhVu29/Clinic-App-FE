import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");

  const submitFeedback = () => {
    console.log("Feedback submitted:", feedback);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feedback Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your feedback"
        onChangeText={(text) => setFeedback(text)}
        value={feedback}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={submitFeedback}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    margin: 20,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
