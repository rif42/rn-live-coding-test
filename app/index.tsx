import { Text, View, FlatList, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { LISTING_SAMPLES } from "@/mock/listing_samples";
import { BOOKING_CATEGORIES_PLACEHOLDER } from "@/mock/category_samples";
import { useRouter } from "expo-router";
const { width } = Dimensions.get("window");

interface Listing {
    id: number;
    category: number;
    imgs: string[];
    price: number;
    area: number;
    address: string;
}

interface Category {
    id: number;
    ar: string;
    en: string;
}

interface CategoryGroup {
    category: Category;
    listings: Listing[];
}

interface ListingsByCategory {
    [key: number]: CategoryGroup;
}

export default function Index() {
    const router = useRouter();

    // Group listings by category
    const listingsByCategory = LISTING_SAMPLES.reduce<ListingsByCategory>((acc, listing) => {
        const category = BOOKING_CATEGORIES_PLACEHOLDER.find((cat) => cat.id === listing.category);
        if (!category) return acc;

        if (!acc[category.id]) {
            acc[category.id] = {
                category: category,
                listings: [],
            };
        }
        acc[category.id].listings.push(listing);
        return acc;
    }, {});

    const toTitleCase = (str: string) => {
        return str
            .toLowerCase()
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const renderListingItem = ({ item }: { item: Listing }) => (
        <Pressable style={styles.listingCard} onPress={() => router.push(`/detail?id=${item.id}`)}>
            <Image
                source={{ uri: `https://images.aqar.fm/webp/original/props/${item.imgs[0]}` }}
                style={styles.listingImage}
                resizeMode='cover'
            />
            <View style={styles.listingInfo}>
                <Text numberOfLines={1} style={styles.category}>
                    {toTitleCase(BOOKING_CATEGORIES_PLACEHOLDER.find((cat) => cat.id === item.category)?.en || "")}
                </Text>
                <Text numberOfLines={1} style={styles.address}>
                    {item.address}
                </Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{item.price.toLocaleString()}</Text>
                    <Text style={styles.area}>{item.area} m²</Text>
                </View>
            </View>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={LISTING_SAMPLES}
                renderItem={renderListingItem}
                keyExtractor={(listing) => listing.id.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listingsContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    categorySection: {
        marginVertical: 10,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 15,
        marginBottom: 10,
    },
    listingsContainer: {
        paddingHorizontal: 10,
    },
    listingCard: {
        height: 150,
        marginHorizontal: 5,
        marginBottom: 10,
        backgroundColor: "white",
        borderRadius: 10,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        display: "flex",
        flexDirection: "row",
    },
    listingImage: {
        width: "50%",
        borderRadius: 10,
        margin: 10,
    },
    listingInfo: {
        padding: 10,
        justifyContent: "space-between",
        flex: 1,
    },
    price: {
        fontSize: 14,
        color: "#2c3e50",
    },
    area: {
        fontSize: 14,
        color: "#7f8c8d",
        marginVertical: 4,
    },
    address: {
        fontSize: 12,
        color: "#95a5a6",
        overflow: "hidden",
    },
    priceContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        justifyContent: "space-between",
    },
    category: {
        fontSize: 16,
        fontWeight: "semibold",
    },
});
