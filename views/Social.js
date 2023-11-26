import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Loader from "../components/Loader";

const SocialComponent = () => {
  const { updateUser, user, authenticated } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [requestToMe, setRequestToMe] = useState([]);
  const [currentTab, setCurrentTab] = useState("SearchFriends");
  const [isLoading, setIsLoading] = useState(true);

  const userId = user && user._id ? user._id : "";

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/users"
      );
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchMyRequests = async () => {
    try {
      const response = await axios.get(
        `https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/myRequests/${userId}`
      );
      setMyRequests(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const fetchRequestsToMe = async () => {
    try {
      const response = await axios.get(
        `https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/requestsToMe/${userId}`
      );
      setRequestToMe(response.data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const fetchMyFriends = async () => {
    try {
      const response = await axios.get(
        `https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/myFriends/${userId}`
      );
      setMyFriends(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyRequests();
      fetchRequestsToMe();
      fetchUsers();
      fetchMyFriends();
    } else {
      setUsers([]);
      setMyRequests([]);
      setRequestToMe([]);
      setMyFriends([]);
    }
  }, [user]);

  useEffect(() => {
    if (authenticated) {
      fetchMyRequests();
      fetchRequestsToMe();
      fetchMyFriends();
    }
  }, [authenticated]);

  const handleSearch = async (text) => {
    setSearchQuery(text); // Обновляем состояние searchQuery

    try {
      // Выполняем запрос на поиск только если текст не пустой
      if (text.trim() !== "") {
        const response = await axios.get(
          `https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/searchUsers?query=${text}`
        );
        setUsers(response.data);
      } else {
        // Если поле поиска пустое, сбрасываем список пользователей
        fetchUsers();
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const addFriendRequest = async (userId, userFriendId) => {
    try {
      await axios.post(
        "https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/addFriendRequest",
        { userId, userFriendId }
      );

      fetchMyRequests();
      fetchRequestsToMe();
      fetchMyFriends();

      const updatedUserData = await axios.get(
        `https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/user/${userId}`
      );
      updateUser(updatedUserData.data);

      // Можно добавить сообщение об успешной отправке запроса
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const cancelFriendRequest = async (userId, userFriendId) => {
    try {
      await axios.post(
        "https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/cancelFriendRequest",
        { userId, userFriendId }
      );

      fetchMyRequests();
      fetchRequestsToMe();
      fetchMyFriends();

      const updatedUserData = await axios.get(
        `https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/user/${userId}`
      );
      updateUser(updatedUserData.data);
      // Можно добавить сообщение об успешной отправке запроса
    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const approveFriendRequest = async (userId, userFriendId) => {
    try {
      await axios.post(
        "https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/approveFriendRequest",
        { userId, userFriendId }
      );

      fetchMyRequests();
      fetchRequestsToMe();
      fetchMyFriends();

      const updatedUserData = await axios.get(
        `https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/user/${userId}`
      );
      updateUser(updatedUserData.data);
      // Можно добавить сообщение об успешном одобрении запроса
    } catch (error) {
      console.error("Error approving friend request:", error);
    }
  };

  const removeFriend = async (userId, userFriendId) => {
    try {
      await axios.post(
        "https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/removeFriend",
        { userId, userFriendId }
      );
      setMyFriends(myFriends.filter((friend) => friend._id !== userFriendId));

      fetchMyRequests();
      fetchRequestsToMe();
      fetchMyFriends();

      const updatedUserData = await axios.get(
        `https://crispy-umbrella-vx56q44qvwp2p6gv-10000.app.github.dev/user/${userId}`
      );
      updateUser(updatedUserData.data);
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const renderUsersList = (userList) => {
    const filteredList = userList.filter(
      (userFromList) => userFromList._id !== userId
    );
    return (
      <View style={styles.insideContainer}>
        {currentTab === "SearchFriends" && (
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => handleSearch(text)}
          />
        )}
        <>
          {isLoading && <Loader />}
          {!isLoading && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{
                ...styles.userList,
                paddingVertical: currentTab === "MyFriends" ? 0 : 10,
              }}
            >
              {currentTab === "MyFriends" && myRequests.length > 0 && (
                <>
                  <Text style={styles.sectionTitle}>Friendship requests</Text>
                  {myRequests.map((userFromList, index) => (
                    <React.Fragment key={userFromList._id}>
                      <TouchableOpacity
                        style={[
                          styles.userItem,
                          { borderTopWidth: index === 0 ? 0 : 1 }, // Убрать верхнюю границу для первого элемента
                          {
                            borderBottomWidth:
                              index === myRequests.length - 1 ? 0 : 1,
                          }, // Убрать нижнюю границу для последнего элемента
                        ]}
                      >
                        <View>
                          <Text style={styles.username}>
                            {userFromList.username}{" "}
                          </Text>
                          {userFromList.showUserData && (
                            <Text>
                              {userFromList.firstName} {userFromList.lastName}
                            </Text>
                          )}
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            approveFriendRequest(userId, userFromList._id)
                          }
                        >
                          <Feather name="user-plus" size={28} color="#479761" />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </React.Fragment>
                  ))}
                </>
              )}

              {filteredList.length > 0 && (
                <>
                  {currentTab === "MyFriends" && (
                    <Text style={styles.sectionTitle}>Friends list</Text>
                  )}
                  {filteredList.map((userFromList, index) => (
                    <TouchableOpacity
                      key={userFromList._id}
                      style={[
                        styles.userItem,
                        { borderTopWidth: index === 0 ? 0 : 1 }, // Убрать верхнюю границу для первого элемента
                        {
                          borderBottomWidth:
                            index === filteredList.length - 1 ? 0 : 1,
                        }, // Убрать нижнюю границу для последнего элемента
                      ]}
                    >
                      <View>
                        <Text style={styles.username}>
                          {userFromList.username}
                        </Text>
                        {userFromList.showUserData && (
                          <Text>
                            {userFromList.firstName} {userFromList.lastName}
                          </Text>
                        )}
                      </View>
                      {myFriends.find(
                        (friend) => friend._id === userFromList._id
                      ) ? (
                        <TouchableOpacity
                          onPress={() => removeFriend(userId, userFromList._id)}
                        >
                          <Feather
                            name="user-minus"
                            size={28}
                            color="#a16e83"
                          />
                        </TouchableOpacity>
                      ) : requestToMe.find(
                          (friend) => friend._id === userFromList._id
                        ) ? (
                        <TouchableOpacity
                          onPress={() =>
                            cancelFriendRequest(userId, userFromList._id)
                          }
                        >
                          <Feather name="user-x" size={28} color="#ffbf00" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            addFriendRequest(userId, userFromList._id)
                          }
                        >
                          <Feather name="user-plus" size={28} color="#479761" />
                        </TouchableOpacity>
                      )}
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </ScrollView>
          )}
        </>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            currentTab === "SearchFriends" ? styles.activeTab : null,
          ]}
          onPress={() => setCurrentTab("SearchFriends")}
        >
          <Text style={styles.tabText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            currentTab === "MyFriends" ? styles.activeTab : null,
          ]}
          onPress={() => setCurrentTab("MyFriends")}
        >
          <Text style={styles.tabText}>Friends</Text>
        </TouchableOpacity>
      </View>

      {currentTab === "SearchFriends" && renderUsersList(users)}
      {currentTab === "MyFriends" && renderUsersList(myFriends)}
    </View>
  );
};

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
    paddingTop: 0,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#29648a",
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    color: "#555",
    fontSize: 20,
    marginTop: 10,
  },
  userList: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 3,
  },
  userItem: {
    width: "100%",
    height: 54,
    borderColor: "#29648a",
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
  button: {
    color: "blue",
    fontSize: 14,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#29648a",
    gap: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: "#C0C0C0",
  },
  activeTab: {
    backgroundColor: "#29648a", // Цвет активной вкладки
  },
  tabText: {
    color: "#fff",
    fontSize: 14,
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

export default SocialComponent;
