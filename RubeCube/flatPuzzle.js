class FlatPuzzle {	//This object represents the puzzle in flat form. Mainly used to check for solved state
    front=[];		//max slice along X axis, default RED
    back=[];		//min slice along X axis, default ORANGE
    top=[];	//max slice along Y axis, default GREEN
    bottom=[];	//min slice along Y axis, default BLUE
    left=[];		//max slice along Z axis, default YELLOW
    right=[];		//min slice along Z axis, default WHITE
    M=1;N=1;O=1;
    frontWinning={};
    backWinning={};
    topWinning={};
    bottomWinning={};
    leftWinning={};
    rightWinning={};
    constructor(m,n,o){
        this.M=m;this.N=n;this.O=o;
        this.makeFlatPuzzle();
    }
    makeFlatPuzzle(){
        let M = this.M, N = this.N, O = this.O;
        
        this.front = Array.from(Array(this.N), () => Array(this.O).fill('R'));
        this.back = Array.from(Array(this.N), () => Array(this.O).fill('O'));
        this.top = Array.from(Array(this.M), () => Array(this.O).fill('G'));
        this.bottom = Array.from(Array(this.M), () => Array(this.O).fill('B'));
        this.left = Array.from(Array(this.N), () => Array(this.M).fill('Y'));
        this.right = Array.from(Array(this.N), () => Array(this.M).fill('W'));

        this.frontWinning = Array.from(Array(this.N), () => Array(this.O).fill('R'));
        this.backWinning = Array.from(Array(this.N), () => Array(this.O).fill('O'));
        this.topWinning = Array.from(Array(this.M), () => Array(this.O).fill('G'));
        this.bottomWinning = Array.from(Array(this.M), () => Array(this.O).fill('B'));
        this.leftWinning = Array.from(Array(this.N), () => Array(this.M).fill('Y'));
        this.rightWinning = Array.from(Array(this.N), () => Array(this.M).fill('W'));
        
        /*
        this.front = [
            ['O','O','O'],
            ['W','W','W'],
            ['R','R','R'],
        ];
        this.back = [
            ['O','O','O'],
            ['W','W','W'],
            ['R','R','R'],
        ];
        this.top = Array.from(Array(this.M), () => Array(this.O).fill('G'));
        this.bottom = Array.from(Array(this.M), () => Array(this.O).fill('B'));
        this.left = [
            ['O','O','O'],
            ['W','W','W'],
            ['R','R','R'],
        ];
        this.right = [
            ['O','O','O'],
            ['W','W','W'],
            ['R','R','R'],
        ];

        this.frontWinning = [
            ['O','O','O'],
            ['W','W','W'],
            ['R','R','R'],
        ];
        this.backWinning = [
            ['O','O','O'],
            ['W','W','W'],
            ['R','R','R'],
        ];
        this.topWinning = Array.from(Array(this.M), () => Array(this.O).fill('G'));
        this.bottomWinning = Array.from(Array(this.M), () => Array(this.O).fill('B'));
        this.leftWinning = [
            ['O','O','O'],
            ['W','W','W'],
            ['R','R','R'],
        ];
        this.rightWinning = [
            ['O','O','O'],
            ['W','W','W'],
            ['R','R','R'],
        ];
        */
    }

    isWinningState(){
        let lst1 = [this.front,this.back,this.top,this.bottom,this.left,this.right];
        let lst2 = [this.frontWinning,this.backWinning,this.topWinning,this.bottomWinning,this.leftWinning,this.rightWinning];

        for(let i=0;i<lst1.length;i++){
            let flag=false;
            for(let j=0;j<lst2.length && !flag;j++){
                flag = flag || this.compare2DMatrices( lst1[i] , lst2[j] );
            }
            if(!flag) return false;
        }
        return true;

        // return (
        //     (this.compare2DMatrices(this.front,this.topWinning) && this.compare2DMatrices(this.bottom,this.frontWinning) && this.compare2DMatrices(this.back,this.bottomWinning) && this.compare2DMatrices(this.rotate2DMatrix(this.top,false,true),this.backWinning) && this.compare2DMatrices(this.rotate2DMatrix(this.left,false),this.leftWinning) && this.compare2DMatrices(this.rotate2DMatrix(this.right,true),this.rightWinning))
        // );

    }

    puzzleMove(rAxis,sliceIndex,clockwise,isUndoMove){
        return new Promise(function(resolve,reject){
            let tempMat;
            let M = this.M, N = this.N, O = this.O;
            if(rAxis=='x'){
                if(sliceIndex==M-1){ //rotate front
                    this['front'] = this.rotate2DMatrix(this['front'], clockwise);
                }
                if(sliceIndex==0){ //rotate back
                    this['back'] = this.rotate2DMatrix(this['back'], !clockwise);
                }
                //rotate other related faces 
                tempMat = Array(N+2).fill([]);
                tempMat[0] = ['',...this['top'][sliceIndex].slice(0),''];
                tempMat[N-1 + 2] = ['',...this['bottom'][M-1-sliceIndex].slice(0),''];
                for(let i=1;i<=N;i++){
                    tempMat[i]=Array(O+2);
                    tempMat[i][0] = this['left'][i-1][sliceIndex];
                    tempMat[i][O+1] = this['right'][i-1][M-1-sliceIndex];
                }
            } else if(rAxis=='y'){
                if(sliceIndex==N-1){ //rotate top
                    this['top'] = this.rotate2DMatrix(this['top'], clockwise);
                }
                if(sliceIndex==0){ //rotate botom
                    this['bottom'] = this.rotate2DMatrix(this['bottom'], !clockwise);
                }
                //rotate other related faces 
                tempMat = Array(M+2).fill([]);
                tempMat[0] = ['',...this['back'][N-1-sliceIndex].slice(0).reverse(),''];
                tempMat[M-1 + 2] = ['',...this['front'][N-1-sliceIndex].slice(0),''];
                for(let i=1;i<=M;i++){
                    tempMat[i]=Array(O+2);
                    tempMat[i][0] = this['left'][N-1-sliceIndex][i-1];
                    tempMat[i][O+1] = this['right'][N-1-sliceIndex][M-1-(i-1)];
                }
            } else if(rAxis=='z'){
                if(sliceIndex==O-1){ //rotate right
                    this['right'] = this.rotate2DMatrix(this['right'], clockwise);
                }
                if(sliceIndex==0){ //rotate botom
                    this['left'] = this.rotate2DMatrix(this['left'], !clockwise);
                }
                //rotate other related faces 
                tempMat = Array.from(Array(N+2), () => Array(M+2).fill(''));

                for(let i=1;i<=M;i++){//col iter
                    tempMat[0][i] = this['top'][M-1-(i-1)][sliceIndex];
                    tempMat[N+1][i] = this['bottom'][i-1][sliceIndex];
                }

                for(let i=1;i<=N;i++){//row iter
                    tempMat[i][0] = this['front'][i-1][sliceIndex];
                    tempMat[i][M+1] = this['back'][i-1][O-1-sliceIndex];
                }
            }

            //ROTATE FlatPuzzle tempMat
            tempMat = this.rotate2DMatrix(tempMat, clockwise);

            //PUT BACK FlatPuzzle rotated tempMat in this
            if(rAxis=='x'){
                //put back
                this['top'][sliceIndex] = tempMat[0].slice(1,tempMat[0].length - 1).slice(0);
                this['bottom'][M-1-sliceIndex] = tempMat[N-1 + 2].slice(1,tempMat[0].length - 1).slice(0);
                for(let i=1;i<=N;i++){
                    this['left'][i-1][sliceIndex] = tempMat[i][0];
                    this['right'][i-1][M-1-sliceIndex] = tempMat[i][O+1];
                }
            } else if(rAxis=='y'){
                this['back'][N-1-sliceIndex] = tempMat[0].slice(1,tempMat[0].length - 1).reverse().slice(0);
                this['front'][N-1-sliceIndex] = tempMat[M-1 + 2].slice(1,tempMat[0].length - 1).slice(0);
                for(let i=1;i<=M;i++){
                    this['left'][N-1-sliceIndex][i-1] = tempMat[i][0];
                    this['right'][N-1-sliceIndex][M-1-(i-1)] = tempMat[i][O+1];
                }
            } else if(rAxis=='z'){
                for(let i=1;i<=M;i++){//col iter
                    this['top'][M-1-(i-1)][sliceIndex] = tempMat[0][i];
                    this['bottom'][i-1][sliceIndex] = tempMat[N+1][i];
                }

                for(let i=1;i<=N;i++){//row iter
                    this['front'][i-1][sliceIndex] = tempMat[i][0];
                    this['back'][i-1][O-1-sliceIndex] = tempMat[i][M+1];
                }
            }
            resolve(1);
        }.bind(this));
    }

    rotate2DMatrix(mat,clockwise,doubleTurn){
        function rotate(matrix) {          // function statement
            const N = matrix.length - 1;   // use a constant
            // use arrow functions and nested Winning;
            const result = matrix.map((row, i) => 
                 row.map((val, j) => matrix[N - j][i])
            );
            matrix.length = 0;       // hold original array reference
            matrix.push(...result);  // Spread operator
            return matrix;
        }
        
        if(doubleTurn || mat.length!=mat[0].length){
            let A=mat.length;
            let B=mat[0].length;
            let ret=[];
            for(let i=0;i<A;i++){
                ret[i]=[];
                for(let j=0;j<B;j++){
                    ret[i][j] = mat[A-i-1][B-j-1];
                }
            }
            return ret;
        }
        else if(clockwise) return rotate(mat);
        else return rotate(rotate(rotate(mat)));
    }

    compare2DMatrices(mat1, mat2){
        if(mat1.length != mat2.length) return false;
        
        for(let i=0;i<mat1.length;i++){
            if(mat1[i].length != mat2[i].length) return false;
            for(let j=0;j<mat1[i].length;j++){
                if(mat1[i][j]!=mat2[i][j]) return false;
            }
        }
        return true;
    }
}