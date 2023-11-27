import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  Dimensions,
} from "react-native";
import DuelFavorites from "../components/DuelFavorites";
import DuelAll from "../components/DuelAll";
import DuelHistory from "../components/DuelHistory";

function DuelScreen() {
  const [currentTab, setCurrentTab] = useState("DuelFavorites");

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, currentTab === "DuelFavorites" ? styles.activeTab : null]}
          onPress={() => setCurrentTab("DuelFavorites")}
        >
          <Text style={styles.tabText}>{`Challenge\nFavorites`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, currentTab === "DuelAll" ? styles.activeTab : null]}
          onPress={() => setCurrentTab("DuelAll")}
        >
          <Text style={styles.tabText}>{`Challenge\nAll`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, currentTab === "DuelHistory" ? styles.activeTab : null]}
          onPress={() => setCurrentTab("DuelHistory")}
        >
          <Text style={styles.tabText}>{`Challenges\nList`}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.insideContainer]}>
        {currentTab === "DuelFavorites" && <DuelFavorites />}
        {currentTab === "DuelAll" && <DuelAll />}
        {currentTab === "DuelHistory" && <DuelHistory />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  insideContainer: {
    backgroundColor: "#fff",
    borderWidth: 2,
    flex: 1,
    borderColor: "#29648a",
    padding: 10,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  textHeader: {
    textAlign: "center",
    fontSize: 22,
    color: "#29648a",
    fontWeight: "bold",
    marginBottom: 20,
    textTransform: "uppercase",
    width: "100%",
  },
  textHeader: {
    textAlign: "center",
    fontSize: 24,
    color: "#29648a",
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  closeButton: {
    alignSelf: "center",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#29648a", // Цвет кнопки закрытия
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  userItem: {
    width: "100%",
    height: 54,
    borderColor: "#29648a",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -1,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#29648a",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#29648a",
    gap: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: "#C0C0C0",
    justifyContent: "center",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#29648a", // Цвет активной вкладки
  },
  tabText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
  },
  sectionTitle: {
    color: "#29648a",
    fontSize: 18,
    textAlign: "left",
    textTransform: "uppercase",
    marginVertical: 10,
  },
});

export default DuelScreen;
