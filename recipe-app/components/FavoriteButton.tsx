import { Pressable } from "./ui/pressable";
import { FavouriteIcon, Icon } from "./ui/icon";

type FavoriteButtonProps = {
    isFavorite?: boolean;
    handleFavoriteToggle: () => void;
}

const FavoriteButton = ({ isFavorite = false, handleFavoriteToggle, }: FavoriteButtonProps) => {

    return (
        <Pressable
            accessibilityRole="button"
            className="mb-2"
            onPress={handleFavoriteToggle}>
            <Icon
                as={FavouriteIcon}
                size="xl"
                className={`${isFavorite ? "text-red-500" : "text-gray-500"
                    } absolute right-4 bottom-2`}
            />
        </Pressable>
    )
}

export default FavoriteButton;