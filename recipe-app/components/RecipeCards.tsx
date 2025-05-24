import React from "react";
import { Link, LinkText } from "./ui/link";
import { useRouter } from "expo-router";
import { Text } from "./ui/text";
import { Card } from "@/components/ui/card";
import { useRecipes, Recipe } from "@/context/RecipesContext";
import { Heading } from "./ui/heading";
import FavoriteButton from "./FavoriteButton";

const RecipeCards: React.FC<Recipe> = ({
  name,
  description,
  ingredients,
  instructions,
  time,
  rating,
  isFavorite,
}) => {
  const { toggleFavorite } = useRecipes();
  const router = useRouter();

  const handleLinkPress = () => {
    router.push({
      pathname: "/(tabs)/(home)/[title]",
      params: {
        title: name
      },
    });
  };

  return (
    <Card size="md" variant="elevated" className="m-2 rounded-lg">
      <Heading className="mb-2">{name}</Heading>
      <FavoriteButton
        isFavorite={isFavorite}
        handleFavoriteToggle={() => toggleFavorite(name)}
      />
      <Text className="text-md my-1 dark:text-white">
        Description: {description}
      </Text>

      <Text className="text-md my-2 dark:text-white">
        Time: Prep {time.prep} mins, Cook {time.cook} mins
      </Text>

      <Text className="text-md my-2 dark:text-white">Rating: {rating}</Text>

      <Link
        className="flex-row self-center justify-center"
        onPress={handleLinkPress}
      >
        <LinkText className="bg-indigo-400 text-gray-50 rounded-xl p-2 no-underline">
          See Details
        </LinkText>
      </Link>
    </Card>
  );
};

export default RecipeCards;
