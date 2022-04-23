import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    StyleSheet,
    ScrollView,
    Modal,
    Platform,
    FlatList,
    Alert,
    TouchableWithoutFeedback,
    SafeAreaView,
    VirtualizedList
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { ProgressBar } from "../components"

import { COLORS, SIZES, FONTS, icons, dummyData } from "../constants"
import { useState, useEffect } from "react"

const MovieDetail = ({ navigation, route }) => {

    const [selectedMovie, setSelectedMovie] = useState(null)

    useEffect(() => {
        let { selectedMovie } = route.params;
        setSelectedMovie(selectedMovie)
    }, [])
    const [mem, setmem] = useState(1);
    const [showSeasonModal, setShowSeasonModal] = useState(false);
    const val = Number(mem)
    const handleChange = (i) => {
        setmem(i);
        setShowSeasonModal(false)
    }




    function renderHeaderBar() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: Platform.OS === 'ios' ? 40 : 20,
                    paddingHorizontal: SIZES.padding,
                }}
            >
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: 40,
                        backgroundColor: COLORS.transparentBlack
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.left_arrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.white
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        width: 50,
                        borderRadius: 40,
                        backgroundColor: COLORS.transparentBlack
                    }}
                    onPress={() => console.log('Screen Mirror')}
                >
                    <Image
                        source={icons.upload}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderHeaderSection() {
        return (
            <ImageBackground
                source={selectedMovie?.details?.image}
                resizeMode="cover"
                style={{
                    height: SIZES.height < 700 ? SIZES.height * 0.6 : SIZES.height * 0.7,
                    width: "100%"
                }}
            >
                <View style={{ flex: 1 }}>
                    {renderHeaderBar()}

                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            colors={['transparent', '#000']}
                            style={{
                                width: "100%",
                                height: 150,
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Text
                                style={{
                                    color: COLORS.white,
                                    ...FONTS.body4
                                }}
                            >
                                {selectedMovie?.details.season}
                            </Text>

                            <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.h1 }}>{selectedMovie?.name}</Text>
                        </LinearGradient>
                    </View>
                </View>
            </ImageBackground>
        )
    }

    function renderCategoryAndRatings() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.base,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={[
                        styles.categoryContainer,
                        {
                            marginLeft: 0
                        }
                    ]}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{selectedMovie?.details?.age}</Text>
                </View>

                <View
                    style={[
                        styles.categoryContainer,
                        {
                            paddingHorizontal: SIZES.padding
                        }
                    ]}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.h4 }}>{selectedMovie?.details?.genre}</Text>
                </View>

                <View
                    style={styles.categoryContainer}
                >
                    <Image
                        source={icons.star}
                        resizeMode="contain"
                        style={{
                            width: 15,
                            height: 15
                        }}
                    />
                    <Text style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.h4 }}>{selectedMovie?.details?.ratings}</Text>
                </View>
            </View>
        )
    }

    var leng = selectedMovie?.seasons.items.length;
    const season = selectedMovie?.seasons.items.map((item) => {
        return (
            <>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => handleChange(item.id)}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Season {item.id}</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    })

    function renderEpisodes() {
        return (
            <>
                <View
                    style={{
                        paddingHorizontal: SIZES.padding,
                        marginTop: SIZES.body3,
                        justifyContent: 'space-around',
                    }}
                >
                    <TouchableOpacity>

                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >

                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={showSeasonModal}
                                onRequestClose={() => {
                                    Alert.alert("Modal has been closed.");
                                    setShowSeasonModal(!showSeasonModal);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={{
                                        height: 300,
                                        width: SIZES.width * 0.8,
                                        backgroundColor: COLORS.gray1,
                                        borderRadius: SIZES.radius
                                    }}>


                                        {season}
                                    </View>
                                </View>
                            </Modal>
                            <View>
                                <TouchableOpacity
                                    onPress={() => setShowSeasonModal(true)}
                                >
                                    <Text style={{ color: COLORS.white, ...FONTS.h4, marginBottom: SIZES.body4 }}>Season {mem}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableOpacity>
                </View>

                <View>

                    <FlatList
                        data={selectedMovie?.seasons.items}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item, index }) => {
                            if (item.id === val)
                                return (
                                    <View>
                                        <FlatList
                                            showsHorizontalScrollIndicator={false}
                                            horizontal={true}
                                            data={item.episodes.items}
                                            keyExtractor={item => `${item.id}`}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity>
                                                        <View
                                                            style={{
                                                                marginLeft: index == 0 ? SIZES.padding : 20,
                                                                marginRight: index == dummyData.Trending.length - 1 ? SIZES.padding : 0,
                                                            }}
                                                        >

                                                            <Image
                                                                source={item.poster}
                                                                resizeMode="cover"
                                                                style={{
                                                                    width: 190,
                                                                    height: 120,
                                                                    borderRadius: 10,
                                                                }}
                                                            />
                                                            <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.h4 }} >{item.title}</Text>
                                                        </View>
                                                    </TouchableOpacity>

                                                )
                                            }}
                                        />
                                    </View>
                                )
                            else return <></>
                        }
                        }


                    />

                </View>
            </>
        )
    }


    // render flatlist of episodes of selected season here 

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1, backgroundColor: COLORS.black }}
            style={{ backgroundColor: COLORS.black }}
        >
            {/* Header */}
            {renderHeaderSection()}

            {/* Category & Ratings */}
            {renderCategoryAndRatings()}

            {/* Movie Details */}
            {renderEpisodes()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: SIZES.base,
        paddingHorizontal: SIZES.base,
        paddingVertical: 3,
        borderRadius: SIZES.base,
        backgroundColor: COLORS.gray1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        }
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    }

})

export default MovieDetail;