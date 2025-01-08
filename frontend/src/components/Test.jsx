import React, { useState, useEffect } from 'react';
import '../css/Test.css'

const Test = () => {
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    const colors = [
        { id: 1, color: 'red', image: '', sizes: [{ id: 10, size: 'S', stock: 10 }, { id: 11, size: 'M', stock: 5 }], ids: [{ id: 1 }, { id: 2 },] },
        { id: 2, color: 'blue', image: '', sizes: [{ id: 12, size: 'S', stock: 7 }, { id: 14, size: 'M', stock: 0 }], ids: [{ id: 1 }, { id: 2 },] },
        { id: 3, color: 'green', image: '', sizes: [{ id: 15, size: 'S', stock: 2 }, { id: 17, size: 'M', stock: 3 }], ids: [{ id: 1 }, { id: 2 },] }
    ];


    const array = ['1', '2', '2', '1', '3']

    const compare = [
        {
            id: 1, size: 'S', colorId: [
                { id: 1 },
                { id: 2 },
                { id: 3 }
            ]
        },
        {
            id: 2, size: 'M', colorId: [
                { id: 1 },
                { id: 2 },
                { id: 3 }
            ]
        }
    ]

    const [activeIndex, setActiveIndex] = useState(null); // Track the active div index

    const handleDivClick = (index) => {
        setActiveIndex(index); // Update the active index on click
    };

    const buttonFunction = (size, id) => {


        setIsClicked(isClicked)
        console.log(size);
        setSelectedSize(size)


    };


    const handleColorClick = (size, id) => {
        // console.log(id)
        // console.log(size)
        // setSelectedColor(id)
        setActiveIndex(id); // Update the active index on click
        // for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {

        //     if (colors[colorIndex].id === id) {
        //         console.log(colors[colorIndex])
        //         setSelectedColor(colors[colorIndex])
        //     }
        // }

        const result = compare.filter(comp => {
            const matchingItem = colors.map(item => item.sizes.find((size) => comp.size === size.size));
            // return matchingItem.map(m => m.stock > 0) && matchingItem
            return matchingItem.map(m => m.stock > 0)
        })

        // const matchingItem = compare.find((com) => com.size === size.size ? size.stock > 0: '')
        // return matchingItem



        console.log(result)
        // console.log(result)
    }

    useEffect(() => {
        const f = async () => {
            await fetch('http://localhost:3000/test')
        }
        f()
    }, [])






    const arrayOfObjects = [
        { id: '1', name: 'apple' },
        { id: '2', name: 'banana' },
        { id: '2', name: 'banana' },
        { id: '3', name: 'cherry' },
        { id: '1', name: 'apple' }
    ];

    const uniqueObjects = arrayOfObjects
        .map((obj) => obj.id)  // Map to just the ids
        .map((id, index, self) => self.indexOf(id) === index)  // Keep only first occurrence
        .map((isUnique, index) => isUnique ? arrayOfObjects[index] : null)  // Map back to objects
        .filter((obj) => obj !== null);  // Remove null values


        const [isClick, setIsClick] = useState(false)

        const f = () => {
            setIsClick(!isClick)
        }

    return (
        <div style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>

            <div>
                {/* {selectedSize ? colors.map((color) => (
                    <div key={color.id}>
                        {color.sizes.map((size) => (
                            <div key={size.id} className={` ${activeIndex === size.id ? 'border' : ''}`}>
                                {selectedSize === size.size && <p onClick={() => handleColorClick(size.size, size.id)} className={`${size.stock > 0 ? '' : 'unavailable'}`} >{color.color}</p>}
                            </div>

                        ))}


                    </div>
                )) :
                    colors.map((color) => (
                        <div key={color.id} className={`container ${activeIndex === color.id ? 'border' : ''}`}>
                            <p onClick={() => handleColorClick(color, color.id)}>{color.color}</p>
                        </div>
                    ))
                } */}

                {colors.map((color) => (
                    <div key={color.id} className={` ${activeIndex === color.id ? '' : ''}`}>
                        <p onClick={() => handleColorClick(color, color.id)}>{color.color}</p>
                    </div>
                ))}



                {/* {compare.map((size) => (
                    <button className={`${selectedIndex === size.id ? 'border' : ''}`} onClick={() => buttonFunction(size, size.id)} key={size.id}>{size.size}</button>
                ))} */}

                {selectedColor ? <div>
                    {
                        selectedColor.sizes.map((size) => (
                            <div key={size.id} className={` ${size.stock > 0 ? '' : 'unavailable'}`} onClick={() => buttonFunction(size.size, size.id)}>
                                <p>{size.size}</p>
                            </div>
                        ))
                    }
                </div> :

                    compare.map((size, index) => (
                        <div key={index} className={``} onClick={() => buttonFunction(size.size, size.id)}>
                            <p>{size.size}</p>
                        </div>
                    ))
                }

            </div>
            <input type='checkbox' />
            <button>Hover Me!</button>


            <div class={`container ${isClick ? 'active' : ''} `} onClick={() => f()}>
                <div class="sliding-div"></div>
            </div>
        </div>
    );
};



export default Test;
