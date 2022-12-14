module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                alias: {
                    underscore: 'lodash',
                    mp3: './assets/mp3',
                    images: './assets/images',
                },
            },
        ],
    ],
};
