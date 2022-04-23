import React, { useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    ImageBackground,
    Animated,
} from 'react-native';


import { dummyData, COLORS, SIZES, FONTS, icons, images } from "../constants"
import { ScrollView } from 'react-native-gesture-handler';

const Home = ({ navigation }) => {

    const newSeriesScrollX = useRef(new Animated.Value(0)).current;

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding,
                }}
            >
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                    }}
                    onPress={() => console.log('Profile')}
                >
                    <Image
                        source={images.logo}
                        style={{
                            width: 80,
                            height: 40,
                            borderRadius: 40
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        width: 50,
                    }}
                    onPress={() => console.log('Screen Mirror')}
                >
                    <Image
                        source={icons.airplay}
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.primary
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderNewSeries() {
        return (
            <Animated.FlatList
                horizontal
                pagingEnabled
                snapToAlignment="center"
                snapToInterval={SIZES.width}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={0}
                contentContainerStyle={{
                    marginTop: SIZES.radius,
                }}
                data={dummyData.Series}
                keyExtractor={item => `${item.id}`}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: newSeriesScrollX } } }
                ], { useNativeDriver: false })}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableWithoutFeedback
                            onPress={() => navigation.navigate("MovieDetail", { selectedMovie: item })}
                        >
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <ImageBackground
                                    source={item.thumbnail}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width * 0.85,
                                        height: SIZES.width * 0.85,
                                        justifyContent: 'flex-end'
                                    }}
                                    imageStyle={{
                                        borderRadius: 40
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            height: 60,
                                            width: "100%",
                                            marginBottom: SIZES.radius,
                                            paddingHorizontal: SIZES.radius
                                        }}
                                    >
                                        {/* Play Now */}
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: 20,
                                                    backgroundColor: COLORS.transparentWhite,
                                                }}
                                            >
                                                <Image
                                                    source={icons.play}
                                                    resizeMode="contain"
                                                    style={{
                                                        width: 15,
                                                        height: 15,
                                                        tintColor: COLORS.white,
                                                    }}
                                                />
                                            </View>

                                            <Text style={{ marginLeft: SIZES.base, color: COLORS.white, ...FONTS.h3 }}>Play Now</Text>
                                        </View>
                                        
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableWithoutFeedback>
                    )
                }}
            />
        )
    }

    function renderDots() {
        const dotPosition = Animated.divide(newSeriesScrollX, SIZES.width)

        return (
            <View style={{ marginTop: SIZES.padding }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {dummyData.Series.map((item, index) => {

                        const opacity = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: "clamp"
                        })

                        const dotWidth = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [6, 20, 6],
                            extrapolate: "clamp"
                        })

                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.lightGray, COLORS.primary, COLORS.lightGray],
                            extrapolate: "clamp"
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                opacity={opacity}
                                style={{
                                    borderRadius: SIZES.radius,
                                    marginHorizontal: 3,
                                    width: dotWidth,
                                    height: 6,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }

    function renderTrending() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                {/* Trending */}
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h2 }}>Trending</Text>

                    <Image
                        source={icons.right_arrow}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.primary
                        }}
                    />
                </View>

                {/* Trending List */}
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.padding
                    }}
                    data={dummyData.Trending}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableWithoutFeedback
                                onPress={() => navigation.navigate("MovieDetail", { selectedMovie: item })}
                            >
                                <View
                                    style={{
                                        marginLeft: index == 0 ? SIZES.padding : 20,
                                        marginRight: index == dummyData.Trending.length - 1 ? SIZES.padding : 0
                                    }}
                                >
                                    <Image
                                        source={item.thumbnail}
                                        resizeMode="cover"
                                        style={{
                                            width: SIZES.width / 3,
                                            height: (SIZES.width / 3) + 60,
                                            borderRadius: 20
                                        }}
                                    />
                                    <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.h4 }}>{item.name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.black
            }}
        >
            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                {renderNewSeries()}
                {renderDots()}
                {renderTrending()}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;