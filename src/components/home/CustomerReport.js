import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import 'jspdf-autotable';


const styles = StyleSheet.create({
    page: {
      padding: 40,
      backgroundColor: "#ffffff",
      position: "relative",
      fontSize: 12,
      fontFamily: "Helvetica",
      lineHeight: 1.5,
    },
    header: {
      alignItems: "center",
      marginBottom: 30,
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 10,
    },
    companyName: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      color: "#333",
    },
    companyAddress: {
      fontSize: 12,
      color: "#555",
      textAlign: "center",
    },
    separatorLine: {
      height: 1,
      backgroundColor: "#00A1E4",
      marginVertical: 20,
      width: "100%",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginVertical: 10,
      color: "#333",
    },
    table: {
      display: "table",
      width: "100%",
      marginTop: 20,
    },
    tableRow: {
      flexDirection: "row",
      borderBottom: "1px solid #dcdcdc",
    },
    tableColHeader: {
      width: "50%",
      padding: 10,
      backgroundColor: "#00A1E4",
      color: "#ffffff",
    },
    tableCol: {
      width: "50%",
      padding: 10,
      borderBottomColor: "#FFD700",
    },
    tableCellHeader: {
      fontSize: 12,
      fontWeight: "bold",
    },
    tableCell: {
      fontSize: 12,
    },
    footer: {
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
      borderTopWidth: 1,
      borderTopColor: "#FF4500",
      paddingTop: 10,
      textAlign: "center",
      fontSize: 12,
      color: "#666666",
    },
    watermark: {
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: 100,
      color: "#E0E0E0",
      textAlign: "center",
      opacity: 0.1,
      zIndex: -1,
    },
  });
  
  const Cusreport = ({ customer }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>Exciting Travels Pvt Ltd</Text>
  
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.companyName}>Exciting Travels Pvt Ltd</Text>
          <Text style={styles.companyAddress}>
            No 32, Malabe Rd, Malabe. 0717777777
          </Text>
          <View style={styles.separatorLine} />
        </View>
  
        {/* Title */}
        <Text style={styles.title}>Customer Details Report</Text>
  
        {/* Customer Details Table */}
        <View style={styles.table}>
          {[
            { label: "Name", value: customer.name },
            { label: "Passport Number", value: customer.passportNo },
            { label: "Email", value: customer.email },
            { label: "Phone Number", value: customer.phoneNo },
            { label: "Arrival Date", value: customer.arrivalDate },
            { label: "Departure Date", value: customer.departureDate },
            { label: "Nationality", value: customer.nationality },
            { label: "Emergency Contact Name", value: customer.emergencyContactName },
            { label: "Emergency Contact Phone", value: customer.emergencyContactPhone },
            { label: "Booking Reference", value: customer.bookingReference },
          ].map((row, i) => (
            <View style={styles.tableRow} key={i}>
              <View style={styles.tableColHeader}>
                <Text style={styles.tableCellHeader}>{row.label}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{row.value}</Text>
              </View>
            </View>
          ))}
        </View>
  
        {/* Footer Section */}
        <View style={styles.footer}>
          <Text>Thank you for choosing Exciting Travels Pvt Ltd.</Text>
          <Text>We hope you have a wonderful experience!</Text>
        </View>
      </Page>
    </Document>
  );
  
  export default Cusreport;