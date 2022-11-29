export type RootStackParamList = {
    FrontScreen: undefined;
    SignUp: undefined;
    SignIn: undefined;
    Main: undefined;
};

export type SignUpStackParamList = {
    Identifier: undefined;
    Password: undefined;
    CheckPassword: undefined;
};

export type SignInStackParamList = {
    Identifier: undefined;
    Password: undefined;
};

export type MainTabParamList = {
    HomeNavigator: undefined;
    Settings: undefined;
};

interface BookProps {
    /** key  */
    key: string;
    /** 제목 */
    title: string;
    artist: string;
    url: any;
}

export type HomeStackParamList = {
    Home: undefined;
    Player: { bookData: BookProps };
};
