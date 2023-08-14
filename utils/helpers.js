module.exports = {
    get_animal: (type) => {
        switch (type) {
            case 'Dog':
                return '<img src="/assets/images/dog.gif" alt="Placeholder image">';
            case 'Cat':
                return '<img src="/assets/images/cat.png" alt="Placeholder image">';
            case 'Seal':
                return '<img src="/assets/images/seal.gif" alt="Placeholder image">';
            case 'Turtle':
                return '<img src="/assets/images/turtle.gif" alt="Placeholder image">';
            case 'Snail':
                return '<img src="/assets/images/snail.gif" alt="Placeholder image">';
            case 'Mouse':
                return '<img src="/assets/images/mouse.gif" alt="Placeholder image">';
            case 'Parrot':
                return '<img src="/assets/images/parrot.png" alt="Placeholder image">';
            case 'Snake':
                return '<img src="/assets/images/snake.gif" alt="Placeholder image">';
        }
    },

    get_food: (food) => {
        switch (food) {
            case 'Steak':
                return '<img class="dropdown-ietm draggable-button" id="Steak" src="/assets/images/steak.png" alt="steak">';
            case 'Fish':
                return '<img class="dropdown-ietm draggable-button" id="Fish" src="/assets/images/fish.png" alt="fish">';
            case 'Fruit':
                return '<img class="dropdown-ietm draggable-button" id="Fruit" src="/assets/images/apple.png" alt="apple">';
            case 'Vegetable':
                return '<img class="dropdown-ietm draggable-button" id="Vegetable" src="/assets/images/leafy-green.png" alt="vegetable">';
            case 'Cheese':
                return '<img class="dropdown-ietm draggable-button" id="Cheese" src="/assets/images/cheese.png" alt="cheese">';
            case 'Seeds':
                return '<img class="dropdown-ietm draggable-button" id="Seeds" src="/assets/images/seed.png" alt="seeds">';
            case 'Mouse':
                return '<img class="dropdown-ietm draggable-button" id="Mouse" src="/assets/images/mouse.png" alt="mouse">';
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