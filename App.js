import { StyleSheet, Alert, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'

import COLORS from './constants/colors'
import { tempData } from './tempData'

import TodoList from './components/TodoList'
import AddListModal from './components/AddListModal'

const App = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [lists, setLists] = useState(tempData)
  console.log(lists);
  console.log(lists.length);

  // fx: add to list
  const addList = (list) => {

    setLists([...lists, {
      ...list,
      id: lists.length + 1,
      todos: []
    }])

  }

  // fx: Update list
  const updateList = (list) => {
    const updatedItem = lists.map(item => item.id === list.id ? list : item)
    setLists([...lists, { updatedItem }])
  }

  return (
    <View style={styles.container}>

      <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}
      >
        <AddListModal
          closeMode={() => setModalVisible(false)}
          addList={addList}
        />
      </Modal>

      <View style={{ flexDirection: 'row' }}>
        <View style={styles.divdier} />
        <Text style={styles.title}>
          Todo <Text style={{ fontWeight: '300', color: COLORS.blue }}>Lists</Text>
        </Text>
        <View style={styles.divdier} />
      </View>

      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity
          style={styles.addList}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name='plus' size={16} color={COLORS.blue} />
        </TouchableOpacity>

        <Text style={styles.add}>Add List</Text>
      </View>

      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          data={lists}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps='always'
          renderItem={({ item }) => (
            <TodoList
              list={item}
              updateList={updateList}
            />
          )}
        />
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  divdier: {
    backgroundColor: COLORS.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center'
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: COLORS.black,
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: COLORS.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  add: {
    color: COLORS.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8
  }
})