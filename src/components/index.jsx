import React, { useState } from 'react';

function Component(props){
    const [Sudoku, setSudoku] = useState([]);
    const [Solution, setSolution] = useState([]);
    const [Tries, setTries] = useState(0);
    const [Reload, setReload] = useState(false);
    const [Hints, setHints] = useState(false);

    const generateSudoku = () => {
        setTries(0);
        while (true) {
            try {
                const puzzle = Array.from(Array(9).keys()).map(() => Array.from(Array(9).keys()));
                const rows = Array.from(Array(9).keys()).map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
                const columns = Array.from(Array(9).keys()).map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
                const squares = Array.from(Array(9).keys()).map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
                Array.from(Array(9).keys()).forEach((i) => {
                    Array.from(Array(9).keys()).forEach((j) => {
                        const row = rows[i];
                        const column = columns[j];
                        const square = squares[((Math.floor(i / 3)) * 3) + Math.floor(j / 3)];
                        const choices = [...row].filter(x => column.has(x)).filter(x => square.has(x));
                        const choice = choices[Math.floor(Math.random() * choices.length)];
                        if (!choice) {
                            throw new Error("invalid");
                        }
                        puzzle[i][j] = choice;
                        column.delete(choice);
                        row.delete(choice);
                        square.delete(choice);
                    });
                });
                setSolution(JSON.parse(JSON.stringify(puzzle)));
                setSudoku(JSON.parse(JSON.stringify(puzzle)));
                return puzzle;
            } catch (e) {
                continue;
            }
        }
    };

    const randomizeSudoku = (toRemove, arr) => {
        setSudoku(
            arr.map((row) => {
                let removed = 0;
                while(true){
                    try{
                        let itemToRemove = Math.floor(Math.random() * row.length);
                        if(row[itemToRemove] === null){
                            throw new Error("invalid");
                        }
                        if(removed < toRemove){
                            removed = removed + 1;
                            row[itemToRemove] = null;
                        } else {
                            return row;
                        }
                    } catch (e) {
                        continue;
                    }
                }
            })
        );
    }

    const isThree = (index) => {
        return (index % 3 === 0 && index !== 0);
    };

    const generate = (e) => {

        setReload(true);

        if(!window.localStorage.getItem('score') && window.localStorage.getItem('score') !== 0){
            window.localStorage.setItem('score', 0);
        }

        if(e){
            e.preventDefault();
        }

        let filtered = Array.from(document.getElementById("difficulty").querySelectorAll('input')).filter(item =>
            (item.checked === true && typeof(item) === "object")
        )[0].value;

        let toRemove;
        switch(filtered){
            case "medium":
                toRemove = 5;
            break;
            case "hard":
                toRemove = 6;
            break;
            default:
                toRemove = 4;
            break;
        }

        const sudoku = generateSudoku();
        randomizeSudoku(toRemove, sudoku);
    }

    const finish = () => {
        setTries(Tries + 1);
        const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);
        if(equals(Solution, Sudoku)) {
            setSolution(Solution => []);
            setSudoku(Sudoku => []);
            let score = window.localStorage.getItem('score');
            console.log(score);
            window.localStorage.setItem('score', score ++);
            return props.success('You win! Nice one!', 'bottom-left');
        } else {
            switch(Tries){
                case 0:
                    return props.error('You have 2 tries left!', 'bottom-left');
                case 1:
                    return props.error('You have 1 attempt left!', 'bottom-left');
                default:
                    setTries(0);
                    setSolution(Solution => []);
                    setSudoku(Sudoku => []);
                    return props.error('You hit the max attempts, better luck next time!', 'bottom-left');
            }
        }
    };

    const updateArray = (row, col, value, id) => {
        let regex = /^([1-9]|^$)$/;

        if(!value.match(regex)) {
            if(Hints){
                document.getElementById(id).classList.add("bg-red-400");
                document.getElementById(id).classList.remove("bg-secondary");
            }
            return props.error("Numbers must be 1-9");
        }

        if(value === ""){
            document.getElementById(id).classList.remove("bg-green-400", "bg-red-400");
            document.getElementById(id).classList.add("bg-secondary");
            return false;
        }

        Sudoku[row][col] = parseInt(value);

        if(Hints){
            if(Sudoku[row][col] === Solution[row][col]) {
                document.getElementById(id).classList.add("bg-green-400");
                document.getElementById(id).classList.remove("bg-secondary");
            } else {
                document.getElementById(id).classList.add("bg-red-400");
                document.getElementById(id).classList.remove("bg-secondary");
            }
        }

    };

    const reset = (e) => {
        e.preventDefault();
        setSolution(Solution => []);
        setSudoku(Sudoku => []);
        setReload(false);
    };

    const hint = () => {
        setHints(Hints ? false : true);
        if(Hints){
            Array.from(Array(9).keys()).forEach((i) => {
                Array.from(Array(9).keys()).forEach((j) => {
                    document.getElementById(`${i}-${j}`).classList.remove('bg-green-400', 'bg-red-400');
                    document.getElementById(`${i}-${j}`).classList.add("bg-secondary");
                });
            });
        } else {
            Array.from(Array(9).keys()).forEach((i) => {
                Array.from(Array(9).keys()).forEach((j) => {
                    if(document.getElementById(`${i}-${j}`).value === "") {
                        document.getElementById(`${i}-${j}`).classList.remove("bg-green-400", "bg-red-400");
                        document.getElementById(`${i}-${j}`).classList.add("bg-secondary");
                    } else {
                        if(parseInt(document.getElementById(`${i}-${j}`).value) === Solution[i][j]) {
                            document.getElementById(`${i}-${j}`).classList.add("bg-green-400");
                            document.getElementById(`${i}-${j}`).classList.remove("bg-secondary");
                        } else {
                            document.getElementById(`${i}-${j}`).classList.add("bg-red-400");
                            document.getElementById(`${i}-${j}`).classList.remove("bg-secondary");
                        }
                    }
                });
            });
        }
    };

    return (
        <div className="flex flex-col items-center bg-secondary h-full">
            <form id="difficulty" onSubmit={(Reload) ? reset : generate } className="w-1/2 text-center bg-primary p-3 py-5 shadow-lg mt-10">
                <h1 className="uppercase font-bold text-default">Sudoku Generator</h1>
                <p>Select your difficulty and click begin.</p>
                <div className="flex flex-col lg:flex-row justify-around p-4 w-full">
                    <label className="inline-flex items-center cursor-pointer">
                        <input onChange={reset} required type="radio" value="easy" name="difficulty" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        <span className="ml-2">Easy</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input onChange={reset}  required type="radio" value="medium" name="difficulty" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        <span className="ml-2">Medium</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                        <input onChange={reset}  required type="radio" value="hard" name="difficulty" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                        <span className="ml-2">Hard</span>
                    </label>
                </div>
                <button type="submit" className="transition duration-300 ease-in-out bg-gray-900 text-white w-full rounded-md p-2 hover:bg-green-600 shadow-md">{(Reload) ? "Reset!" : "Generate!"}</button>
            </form>
            {(Sudoku.length > 0) ?
                <div className="mt-4 p-4 bg-primary grid grid-rows-9 shadow-lg rounded-md">
                    <div className="flex justify-around">
                        <p className="mx-1 text-center mb-2 bg-gray-900 text-white w-1/2 rounded-full p-2 shadow-md">Current Attempts: {Tries}</p>
                        <label htmlFor="hints" className="select-none cursor-pointer flex justify-center items-center mx-1 text-center mb-2 bg-gray-900 text-white w-1/2 rounded-full p-2 shadow-md">
                            <input type="checkbox" onChange={hint} name="hints" id="hints" />
                            <span className="ml-2">Enable hints?</span>
                        </label>
                    </div>
                    {
                        Sudoku.map((item, rowIndex) => {
                            return (
                                <div key={`item-row-${rowIndex}`} className={(isThree(rowIndex)) ? "grid grid-cols-9 flex justify-around select-none border-t" : "grid grid-cols-9 flex justify-around select-none"}>
                                    {
                                        item.map((number, colIndex) => {
                                            return (
                                                <div key={`item-col-${colIndex}`} className={(isThree(colIndex)) ? "border-l p-2": "p-2"}>
                                                    <input id={`${rowIndex}-${colIndex}`} onKeyUp={e => updateArray(rowIndex, colIndex, e.target.value, e.target.id)} className="items-center transition duration-300 ease-in-out text-xl w-6 h-6 lg:w-8 lg:h-8 text-center bg-secondary rounded" defaultValue={number}/>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            )

                        })
                    }
                    <button onClick={finish} className="my-2 transition duration-300 ease-in-out bg-gray-900 text-white w-full rounded-md p-2 hover:bg-green-600 shadow-md">Submit!</button>
                </div>
                :
                <div></div>
            }
        </div>
    );
}

export default Component;