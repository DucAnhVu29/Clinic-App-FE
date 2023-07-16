import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";

export default function DetailScreen({ route }) {
  const { item } = route.params;
//   console.log(recordList);
console.log("item", item)
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState("");

  const submitFeedback = () => {
    // Perform the feedback submission logic here
    console.log("Feedback submitted:", feedback);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
        <View>
            <Text>eeeeeeeeeeeeeeeeeeeeeeee</Text>
          <Text style={styles.title}>{item.doctorName}</Text>
          <Text style={styles.description}>{item.patientName}</Text>
          <Text style={styles.description}>{item.diagnosis}</Text>
          <Text style={styles.description}>{item.medication}</Text>
          <Text style={styles.description}>{item.consultationFee}$</Text>
          {/* <Text style={styles.date}>{item.time}</Text> */}
        </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.plusSign}>+</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Submit Feedback</Text>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Enter your feedback"
              onChangeText={(text) => setFeedback(text)}
              value={feedback}
              multiline
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={submitFeedback}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: "#999999",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
  },
  plusSign: {
    fontSize: 30,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 5,
    height: 100,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#0066FF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
});