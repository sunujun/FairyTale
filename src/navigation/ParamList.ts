export type RootStackParamList = {
    FrontScreen: undefined;
    SignUp: undefined;
    SignIn: undefined;
    Main: undefined;
    Record: undefined;
    BookInformation: { bookData: BookProps };
    Player: { bookData: BookProps };
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
    Home: undefined;
    RecordStart: undefined;
    MyPage: undefined;
};

interface BookProps {
    /** key  */
    key: string;
    /** 제목 */
    title: string;
    /** 아티스트 */
    artist: string;
    /** 줄거리 */
    summary: string;
    url: any;
}
