import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import COLORS from '../constants/colors'
import TodoModal from './TodoModal'

const TodoList = ({ list, updateList }) => {

    const [modalVisible, setModalVisible] = useState(false);

    // count list which completed and not completed.
    const completedCount = list && list.todos && list.todos.filter(item => item.completed).length
    const remainingCount = list && list.todos && list.todos.length - completedCount

    return (
        <View>
            <Modal
                animationType='slide'
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TodoModal
                    list={list}
                    closeMode={() => setModalVisible(false)}
                    updateList={updateList}
                />
            </Modal>

            <TouchableOpacity
                style={[styles.listContainer, { backgroundColor: list.color }]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>

                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.count}>{remainingCount}</Text>
                    <Text style={styles.subtitle}>Remaining</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.count}>{completedCount}</Text>
                    <Text style={styles.subtitle}>Completed</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default TodoList

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: 'center',
        width: 200,
    },
    listTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.withe,
        marginBottom: 18
    },
    count: {
        fontSize: 48,
        fontWeight: '200',
        color: COLORS.withe
    },
    subtitle: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.withe
    }
})