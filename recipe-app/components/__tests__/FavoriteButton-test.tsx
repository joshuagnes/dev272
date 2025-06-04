import { fireEvent, render, screen } from "@testing-library/react-native";
import FavoriteButton from "../FavoriteButton";


describe('FavoriteButton', () => {
    test('renders button', () => {
        render(<FavoriteButton handleFavoriteToggle={jest.fn()} />);

        expect(screen.getByRole('button')).toBeTruthy();
        // screen.debug();

    })

    test("call handleFavoriteToggle when pressed", () => {
        const mockHandleFavoriteToggle = jest.fn();
        render(
            <FavoriteButton
                isFavorite={false}
                handleFavoriteToggle={mockHandleFavoriteToggle} />
        );

        fireEvent.press(screen.getByRole("button"));
        expect(mockHandleFavoriteToggle).toHaveBeenCalledTimes(1);
    })
});