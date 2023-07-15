import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const availableDoctors = [
  { id: 1, name: "Dr. John Doe" },
  { id: 2, name: "Dr. Jane Smith" },
  { id: 3, name: "Dr. Michael Johnson" },
];

export default function BookingPage() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [displayDatePicker, setDisplayDatePicker] = useState(false);
  const [displayTimePicker, setDisplayTimePicker] = useState(false);

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setDisplayDatePicker(false);
    }
  };

  const handleTimeChange = (event, time) => {
    if (time) {
      const selectedHour = new Date(time).getHours();
      const selectedDateTime = new Date(selectedDate);
      selectedDateTime.setHours(selectedHour, 0, 0); // Set minutes and seconds to 0
      setSelectedTime(selectedDateTime);
      setDisplayTimePicker(false);
    }
  };

  const showDatePicker = () => {
    setDisplayDatePicker(true);
  };

  const showTimePicker = () => {
    setDisplayTimePicker(true);
  };

  const bookAppointment = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      Alert.alert(
        "Incomplete Selection",
        "Please select doctor, date, and time"
      );
      return;
    }

    Alert.alert(
      "Confirm Appointment",
      `Doctor: ${
        selectedDoctor.name
      }\nDate: ${selectedDate.toLocaleDateString()}\nTime: ${selectedTime.toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Confirm", onPress: handleConfirmation },
      ]
    );
  };

  const handleConfirmation = () => {
    // Perform the booking logic here
    console.log("Booking confirmed!");
    console.log("Doctor:", selectedDoctor);
    console.log("Date:", selectedDate);
    console.log("Time:", selectedTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Booking Page</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Doctor:</Text>
        {availableDoctors.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            onPress={() => setSelectedDoctor(doctor)}
            style={[
              styles.doctorButton,
              selectedDoctor?.id === doctor.id && styles.selectedDoctorButton,
            ]}
          >
            <Text style={styles.doctorButtonText}>{doctor.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Date:</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
          <Text>
            {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
          </Text>
        </TouchableOpacity>
      </View>

      {displayDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Time:</Text>
        <TouchableOpacity onPress={showTimePicker} style={styles.dateButton}>
          <Text>
            {selectedTime
              ? selectedTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Select Time"}
          </Text>
        </TouchableOpacity>
      </View>

      {displayTimePicker && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          display="default"
          minuteInterval={60} // Set minuteInterval to 60 to restrict minutes selection
          onChange={handleTimeChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={bookAppointment}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  doctorButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  selectedDoctorButton: {
    backgroundColor: "blue",
  },
  doctorButtonText: {
    color: "black",
  },
  dateButton: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
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
