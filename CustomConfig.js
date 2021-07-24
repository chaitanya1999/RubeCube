var CustomConfig = {
    ThreeSlicedCube : Object.freeze({
        name:"ThreeSlicedCube",
        M:3,
        N:3,
        O:3,
        front : [
            ['O','O','O'],
            ['W','W','W'],
            ['R','R','R'],
        ],
        back : [
            ['O','O','O'],
            ['W','W','W'],
            ['R','R','R'],
        ],
        top : Array.from(Array(this.M), () => Array(this.O).fill('G')),
        bottom : Array.from(Array(this.M), () => Array(this.O).fill('B')),
        left : [
            ['O','O','O'],
            ['W','W','W'],
            ['R','R','R'],
        ],
        right : [
            ['O','O','O'],
            ['W','W','W'],
            ['R','R','R'],
        ]
    })
}