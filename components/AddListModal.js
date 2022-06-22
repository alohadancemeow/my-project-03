import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'

import COLORS from '../constants/colors'
import { tempData } from '../tempData'

const AddListModal = ({ closeMode, addList }) => {

    const backgroundColor = ['#5CD859', '#24A6D9', '#595BD9', '#8022D9', '#D159D8', '#D85963', '#D88559']

    const [todo, setTodo] = useState({
        name: '' || 'New',
        color: backgroundColor[0]
    })
    // console.log(todo);

    // renderColor component
    const RenderColor = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
            {
                backgroundColor.map(item => (
                    <TouchableOpacity
                        key={item}
                        style={[styles.colorSelect, { backgroundColor: item }]}
                        onPress={() => setTodo({ ...todo, color: item })}
                    />
                ))
            }
        </View>
    )

    // fx: Create todo list
    const createTodo = () => {
        // tempData.push({
        //     name: todo.name,
        //     color: todo.color,
        //     todos: []
        // })

        addList({
            name: todo.name,
            color: todo.color
        })

        // clear state
        setTodo({ name: '', color: '' })
        closeMode()
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <TouchableOpacity
                style={{ position: 'absolute', top: 64, right: 32 }}
                onPress={closeMode}
            >
                <AntDesign name='close' size={24} color={COLORS.black} />
            </TouchableOpacity>

            <View style={{ alignSelf: 'stretch', marginHorizontal: 32 }}>
                <Text style={styles.title}>Create Todo List</Text>
                <TextInput
                    style={styles.input}
                    placeholder='List name?'
                    onChangeText={text => setTodo({ ...todo, name: text })}
                />
                <RenderColor />
                <TouchableOpacity
                    style={[styles.create, { backgroundColor: todo.color }]}
                    onPress={createTodo}
                >
                    <Text style={{ color: COLORS.withe, fontWeight: '600' }}>Create!</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddListModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.black,
        alignSelf: 'center',
        marginBottom: 16
    },
    input: {
        // borderWidth: StyleSheet.hairlineWidth,
        borderWidth: 1,
        borderColor: COLORS.blue,
        borderRadius: 6,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 18
    },
    create: {
        marginTop: 24,
        height: 50,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    colorSelect: {
        width: 30,
        height: 30,
        borderRadius: 4
    }
})