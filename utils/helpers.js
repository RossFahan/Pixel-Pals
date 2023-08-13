module.exports = {
    get_animal: (type) => {
        switch (type) {
            case 'Dog':
                return '<img src="./public/assets/images/dog.gif" alt="Placeholder image">';
            case 'Cat':
                return '<img src="./public/assets/images/cat.png" alt="Placeholder image">';
            case 'Seal':
                return '<img src="./public/assets/images/seal.gif" alt="Placeholder image">';
            case 'Turtle':
                return '<img src="./public/assets/images/turtle.gif" alt="Placeholder image">';
            case 'Snail':
                return '<img src="./public/assets/images/snail.gif" alt="Placeholder image">';
            case 'Mouse':
                return '<img src="./public/assets/images/mouse.gif" alt="Placeholder image">';
            case 'Parrot':
                return '<img src="./public/assets/images/parrot.png" alt="Placeholder image">';
            case 'snake':
                return '<img src="./public/assets/images/snake.gif" alt="Placeholder image">';
        }
    },

    get_food: (food) => {
        switch (food) {
            case 'Steak':
                return '<img src="./public/assets/images/steak.png" alt="steak">';
            case 'Fish':
                return '<img src="./public/assets/images/fish.png" alt="fish">';
            case 'Fruit':
                return '<img src="./public/assets/images/apple.png" alt="apple">';
            case 'Vegetable':
                return '<img src="./public/assets/images/leafy-green.png" alt="vegetable">';
            case 'Cheese':
                return '<img src="./public/assets/images/cheese.png" alt="cheese">';
            case 'Seeds':
                return '<img src="./public/assets/images/seed.png" alt="seeds">';
            case 'Mouse':
                return '<img src="./public/assets/images/mouse.png" alt="mouse">';
        }
    },

    get_activity: (activity) => {
        switch (activity) {
            case 'Running':
                return '<img src="./public/assets/images/running.png" alt="running">';
            case 'Petting':
                return '<img src="./public/assets/images/petting.png" alt="petting">';
            case 'Swimming':
                return '<img src="./public/assets/images/swimming.png" alt="swimming">';
            case 'Reading':
                return '<img src="./public/assets/images/books.png" alt="reading">';
            case 'Brush':
                return '<img src="./public/assets/images/brush.png" alt="brush">';
            case 'Basketball':
                return '<img src="./public/assets/images/basketball.png" alt="basketball">';
            case 'Motorsports':
                return '<img src="./public/assets/images/race-car.png" alt="motorsports">';

        }
    }
}