jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-router", () => {
    // Cast React to the correct type so TS knows about Fragment
    const React = require("react");

    return {
        Stack: (props) => <React.Fragment>{ props.children } </React.Fragment>,
        useRouter: () => ({
            back: jest.fn(),
            push: jest.fn(),
            replace: jest.fn(),
            setParams: jest.fn(),
            getState: jest.fn(),
        }),
    };
});
