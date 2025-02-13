import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import { LISTING_SAMPLES } from "@/mock/listing_samples";
import { BOOKING_CATEGORIES_PLACEHOLDER } from "@/mock/category_samples";
import { Stack } from "expo-router";

const { width } = Dimensions.get("window");

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    const listing = LISTING_SAMPLES.find((item) => item.id === Number(id));
    const category = BOOKING_CATEGORIES_PLACEHOLDER.find((cat) => cat.id === listing?.category);

    if (!listing) return <Text>Listing not found</Text>;

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    title: category?.en || "Details",
                }}
            />
            <View style={styles.imagesGrid}>
                {listing.imgs.map((img, index) => (
                    <View key={index} style={styles.imageWrapper}>
                        <Image
                            source={{ uri: `https://images.aqar.fm/webp/original/props/${img}` }}
                            style={styles.thumbnailImage}
                            resizeMode='cover'
                        />
                    </View>
                ))}
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.category}>{category?.en}</Text>
                <Text style={styles.address}>{listing.address}</Text>
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Price</Text>
                        <Text style={styles.statValue}>{listing.price} SAR</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statLabel}>Area</Text>
                        <Text style={styles.statValue}>{listing.area} m²</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    detailsContainer: {
        padding: 20,
    },
    category: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    address: {
        fontSize: 16,
        color: "#666",
        marginBottom: 20,
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    statItem: {
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 15,
        borderRadius: 10,
        width: "48%",
    },
    statLabel: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    statValue: {
        fontSize: 18,
        fontWeight: "bold",
    },
    imagesGrid: {
        flexDirection: "column",
        padding: 10,
        gap: 10,
    },
    imageWrapper: {
        width: width - 20, // 30 = padding (20) + gap (10)
        aspectRatio: 1,
    },
    thumbnailImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
});
