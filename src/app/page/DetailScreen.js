import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

export default function DetailScreen({ route }) {
  const { item } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigation = useNavigation();

  const submitFeedback = () => {
    // Perform the feedback submission logic here
    console.log("Feedback submitted:", feedback);
    setModalVisible(false);
  };

  const clearFeedback = () => {
    setFeedback("");
    setModalVisible(false);
  };

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={handleBackButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Doctor Name:</Text>
          <Text style={styles.value}>{item.doctorName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Patient Name:</Text>
          <Text style={styles.value}>{item.patientName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Diagnosis:</Text>
          <Text style={styles.value}>{item.diagnosis}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Medication:</Text>
          <Text style={styles.value}>{item.medication}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Consultation Fee:</Text>
          <Text style={styles.value}>{item.consultationFee}$</Text>
        </View>
      </View>

      <Pressable
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.plusSign}>+</Text>
      </Pressable>

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
              multiline={true}
              numberOfLines={10}
            />
            <View style={styles.modalButtonContainer}>
              <Pressable
                style={[styles.modalButton, styles.submitButton]}
                onPress={submitFeedback}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={clearFeedback}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 42,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
    marginTop: 10,
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
    width: "90%",
    maxHeight: "90%",
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
    height: 150,
    textAlignVertical: "top",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#0066FF",
  },
  cancelButton: {
    backgroundColor: "#0066FF",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    width: 150,
  },
  value: {
    fontSize: 18,
  },
});
