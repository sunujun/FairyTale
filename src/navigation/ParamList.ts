export type RootStackParamList = {
    FrontScreen: undefined;
    SignUp: undefined;
    SignIn: undefined;
    Main: undefined;
    Record: undefined;
};

export type SignUpStackParamList = {
    Identifier: undefined;
    Name: undefined;
    Password: undefined;
    CheckPassword: undefined;
};

export type SignInStackParamList = {
    Identifier: undefined;
    Password: undefined;
};

export type MainTabParamList = {
    HomeNavigator: undefined;
    RecordStart: undefined;
    MyPage: undefined;
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
