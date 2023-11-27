import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loader from "./Loader";
import DuelModal from "./DuelModal";

function DuelFavorites() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [duels, setDuels] = useState([]);
  const [isDuel, setIsDuel] = useState(true);
  const [selectedDuelist, setSelectedDuelist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowGameList, setIsShowGameList] = useState(false);
  const [users, setUsers] = useState([]);
  const [myFavorites, setMyFavorites] = useState([]);
  const userId = user && user._id ? user._id : "";

  const handleToggleModalToDuel = (duel) => {
    setSelectedDuel(duel);
  };

  const handleCloseModal = () => {
    setIsShowGameList(false);
  };

  const handleSelectDuelist = (duelist) => {
    setSelectedDuelist(duelist);
    setIsShowGameList(true);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://caapp-server.onrender.com/users"
      );
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchMyFavorites = async () => {
    try {
      const response = await axios.get(
        `https://caapp-server.onrender.com/myFavorites/${userId}`
      );
      setMyFavorites(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
      fetchMyFavorites();
    } else {
      setUsers([]);
      setMyFavorites([]);
    }
  }, [user]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && myFavorites.length > 0 && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
          }}
        >
          <>
            {myFavorites.map((userFromList, index) => (
              <View
                key={userFromList._id}
                style={[
                  styles.userItem,
                  { borderTopWidth: index === 0 ? 0 : 1 }, // Убрать верхнюю границу для первого элемента
                  { borderBottomWidth: index === myFavorites.length - 1 ? 0 : 1 }, // Убрать нижнюю границу для последнего элемента
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.username}>{userFromList.username}</Text>
                  {userFromList.showUserData && (
                    <Text>
                      {userFromList.firstName} {userFromList.lastName}
                    </Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => handleSelectDuelist(userFromList)}
                >
                  <MaterialCommunityIcons
                    name="sword-cross"
                    size={28}
                    color="#a16e83"
                  />
                </TouchableOpacity>
              </View>
            ))}
          </>
          {isShowGameList && (
            <DuelModal
              user={user}
              isShowGameList={isShowGameList}
              selectedDuelist={selectedDuelist}
              onClose={handleCloseModal}
            />
          )}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
});

export default DuelFavorites;
