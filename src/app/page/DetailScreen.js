import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";

export default function DetailScreen({ route }) {
  const recordList = route.params?.recordList;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");

  const submitFeedback = () => {
    console.log("Feedback submitted:", feedback);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.recordContainer}>
        <Text style={styles.label}>Doctor:</Text>
        <Text style={styles.value}>{recordList.doctorName}</Text>

        <Text style={styles.label}>Patient:</Text>
        <Text style={styles.value}>{recordList.patientName}</Text>

        <Text style={styles.label}>Diagnosis:</Text>
        <Text style={styles.value}>{recordList.diagnosis}</Text>

        <Text style={styles.label}>Medication:</Text>
        <Text style={styles.value}>{recordList.medication}</Text>

        <Text style={styles.label}>Fee:</Text>
        <Text style={styles.value}>{recordList.consultationFee}</Text>

        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{recordList.time}</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  recordContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 50,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333333",
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666666",
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
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
    color: "#333333",
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 5,
    height: 100,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "top",
    fontSize: 16,
    color: "#333333",
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
