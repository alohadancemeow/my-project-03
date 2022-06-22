import { Keyboard, FlatList, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'

import COLORS from '../constants/colors'

const TodoModal = ({ list, closeMode, updateList }) => {

    console.log('todoModal-->', list);
    const { id, name, color, todos } = list

    const [state, setState] = useState({
        newTodo: ''
    })

    const taskCount = todos.length
    const completedCount = todos.filter(item => item.completed).length

    // fx: toggle to complete
    const toggleCompleted = (index) => {
        todos[index].completed = !todos[index].completed
        updateList(list)
    }

    // fx: addTodo
    const addTodo = () => {
        todos.push({
            title: state.newTodo,
            completed: false
        })

        // updateList(list)
        setState({ newTodo: '' })

        Keyboard.dismiss()
    }

    // RenderTodo component
    const RenderTodo = ({ todo, index }) => (
        <View style={styles.todoContainer}>
            <TouchableOpacity onPress={() => toggleCompleted(index)}>
                <Ionicons
                    name={todo.completed ? 'ios-square' : 'ios-square-outline'}
                    size={24} color={COLORS.gray}
                    style={{ width: 32 }}
                />
            </TouchableOpacity>
            <Text style={[
                styles.todo,
                {
                    color: todo.completed ? COLORS.gray : COLORS.black,
                    textDecorationLine: todo.completed ? 'line-through' : 'none'
                }
            ]}>
                {todo.title}
            </Text>
        </View>
    )

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' >
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={{ position: 'absolute', top: 64, right: 32, zIndex: 10 }}
                    onPress={closeMode}
                >
                    <AntDesign name='close' size={24} color={COLORS.black} />
                </TouchableOpacity>

                <View style={[styles.section, styles.header, { borderBottomColor: color }]}>
                    <View>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.taskCount}>{`${completedCount} of ${taskCount} tasks`}</Text>
                    </View>
                </View>

                <View style={[styles.section, { flex: 3 }]}>
                    <FlatList
                        data={list.todos}
                        renderItem={({ item, index }) => <RenderTodo todo={item} index={index} />}
                        keyExtractor={item => item.title}
                        contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <View style={[styles.section, styles.footer]}>
                    <TextInput
                        style={[styles.input, { borderColor: color }]}
                        onChangeText={text => setState({ newTodo: text })}
                        value={state.newTodo}
                    />
                    <TouchableOpacity
                        style={[styles.addTodo, { backgroundColor: color }]}
                        onPress={addTodo}
                    >
                        <AntDesign name='plus' size={16} color={COLORS.withe} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default TodoModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    section: {
        flex: 1,
        alignSelf: 'stretch'
    },
    header: {
        justifyContent: 'flex-end',
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: COLORS.black
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: COLORS.gray,
        fontWeight: '600'
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 48,
        // borderWidth: StyleSheet.hairlineWidth,
        borderWidth: 1,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    todo: {
        color: COLORS.black,
        fontWeight: '600',
        fontSize: 16
    }
})