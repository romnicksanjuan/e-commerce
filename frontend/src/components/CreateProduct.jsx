import React, { useEffect, useState } from 'react'
import style from '../css/CreateProduct.module.css'

const CreateProduct = () => {

    const [colorVariants, setColorVariants] = useState([
        { color: '', image: '', sizes: { size: '', stock: 0 } }
    ]);


    console.log(colorVariants)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [color, setColor] = useState('')
    const [image, setImage] = useState('')
    const [quantity, setQuantity] = useState('')
    const [sizes, setSizes] = useState([])
    const [images, setImages] = useState([])
    const [authorId, setAuthorId] = useState('')

    // Use FormData for file uploads
    const formData = new FormData();

    // formData.append('colorVariants', JSON.stringify(colorVariants))
    colorVariants.forEach((item, index) => {
        formData.append(`variantColor`, JSON.stringify({
            color: item.color,
            sizes: item.sizes,
            image: ''
        }))

        formData.append(`variantImage`, item.image)
    })

    // formData.append('colors', JSON.stringify(colorVariants));


    // console.log('image:', image)
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    // formData.append("color", color);
    formData.append("image", image);
    // formData.append("quantity", quantity);
    // formData.append("sizes", JSON.stringify(sizes));
    formData.append("authorId", authorId);

    for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
    }


    const handleSubmit = async (e) => {

        e.preventDefault()
        try {
            const response = await fetch('http://localhost:3000/create-product', {
                method: 'POST',
                body: formData
            })

            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }



    const colors = [
        { color: 'red', image: '', quantity: 30, sizes: [] },
        { color: 'blue', image: '', quantity: 20, sizes: [] }
    ];
    // console.log(colors[0].color);
    // colors.forEach((item, index) => {
    //     console.log(index); 
    //   });



    // ////////////////////////////////////

    const addColorVariant = () => {
        setColorVariants([
            ...colorVariants,
            { color: "", images: [''], sizes: [{ size: "", stock: 0 }] }
        ]);
    };

    const addSizeToVariant = (index) => {
        const updatedVariants = [...colorVariants];
        updatedVariants[index].sizes.push({ size: "", stock: 0 });
        setColorVariants(updatedVariants);
    };

    const updateColor = (index, newColor) => {
        const updatedVariants = [...colorVariants];
        updatedVariants[index].color = newColor;
        setColorVariants(updatedVariants);
    };

    const updateSizeOrStock = (colorIndex, sizeIndex, field, value) => {
        const updatedVariants = [...colorVariants];
        updatedVariants[colorIndex].sizes[sizeIndex][field] = value;
        setColorVariants(updatedVariants);
    };

    // my code

    const [itemSize, setItemSize] = useState([{ size: "", stock: 0 }])

    const addColor = () => {
        setColorVariants([...colorVariants, { color: "", sizes: { size: "", stock: 0 } }])
    }

    const updateTextColor = (colorIndex, field, value) => {
        const updatedVariants = [...colorVariants]
        updatedVariants[colorIndex][field] = value
        updatedVariants[colorIndex][field] = value
        setColorVariants(updatedVariants)
    }

    const handleAddSize = () => {
        setItemSize([...itemSize, { size: '', stock: 0 }]);
    };

    const handleSizeChange = (index, field, value) => {
        const newItemSize = [...itemSize];
        newItemSize[index][field] = value;
        setItemSize(newItemSize);

        console.log('sdsds', newItemSize)
        // setS(...newItemSize)
        const updatedVariants = [...colorVariants];


        for (let i = 0; i < updatedVariants.length; i++) {
            updatedVariants[i].sizes = [newItemSize];
        }

        setColorVariants(updatedVariants);
    };


    const addSize = (index) => {
        const newItemSize = [...itemSize];
        newItemSize[index].sizes.push({ size: "" }); // Add new size input
        setItemSize(newItemSize);



        // const updatedVariants = [...colorVariants];
        // updatedVariants[index].sizes.push({ size: "", stock: 0 });
        // setColorVariants(updatedVariants);
    }

    const updateItemSize = (index, value) => {
        const updateSize = [...itemSize]
        updateSize[index].sizes[index].size = value

        setItemSize(updateSize)


        // const updatedVariants = [...colorVariants];

        // for (let i = 0; i < updatedVariants.length; i++) {
        //     updatedVariants[i].sizes = [...updateSize];
        // }

        // setColorVariants(updatedVariants);

        // console.log('item size', itemSize)

        // const updatedVariants = colorVariants.map(variant => ({
        //     ...variant,
        //     sizes: [...updateSize]
        // }));

        // Update the state
        // setColorVariants(updatedVariants);
    }

    console.log('items', itemSize)


    return (
        <div style={{backgroundColor:'orange'}}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className={style.label}>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className={style.label}>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label className={style.label}>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className={style.label}>Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                {/* <div>
                    <label className={style.label}>Color:</label>
                    <input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div> */}
                <div>
                    <label className={style.label}>Image:</label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                <div>
                    <label className={style.label}>Quantity:</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label className={style.label}>Sizes (comma-separated):</label>
                    <input
                        type="text"
                        value={sizes}
                        onChange={(e) => setSizes(e.target.value)}
                    />
                </div>
                <div>
                    <label className={style.label}>Additional Images (comma-separated):</label>
                    <input
                        type="file"
                        multiple
                        onChange={(e) => setImages(e.target.files)}
                    />
                </div>
                <div>
                    <label className={style.label}>Author IDs (comma-separated):</label>
                    <input
                        type="text"
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>

            </form>







            {/* ////////////////////// */}
            {/* <div>
                <button onClick={addColorVariant}>Add Color Variant</button>
                {colorVariants.map((variant, colorIndex) => (
                    <div key={colorIndex} style={{ marginBottom: "20px" }}>
                        <input
                            type="text"
                            placeholder="Color"
                            value={variant.color}
                            onChange={(e) => updateColor(colorIndex, e.target.value)}
                        />
                        <button onClick={() => addSizeToVariant(colorIndex)}>Add Size</button>
                        {variant.sizes.map((size, sizeIndex) => (
                            <div key={sizeIndex} style={{ marginLeft: "20px" }}>
                                <input
                                    type="text"
                                    placeholder="Size"
                                    value={size.size}
                                    onChange={(e) =>
                                        updateSizeOrStock(colorIndex, sizeIndex, "size", e.target.value)
                                    }
                                />
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    value={size.stock}
                                    onChange={(e) =>
                                        updateSizeOrStock(colorIndex, sizeIndex, "stock", e.target.value)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div> */}



            <div>
                <button onClick={addColor}>add color</button>
                {
                    colorVariants.map((color, colorIndex) => (
                        <div key={colorIndex}>
                            <input
                                type="text"
                                placeholder="Color"
                                value={color.color}
                                onChange={(e) => updateTextColor(colorIndex, 'color', e.target.value)}
                            />

                            <input
                                type="file"
                                onChange={(e) => updateTextColor(colorIndex, 'image', e.target.files[0])}
                            />
                        </div>
                    ))
                }
            </div>



            <button onClick={() => handleAddSize()}>Add Size</button>
            <div>
                {itemSize.map((item, index) => (
                    <div key={index}>

                        {/* Add inputs for sizes dynamically */}
                        <div>
                            <input
                                type="text"
                                value={item.size}
                                placeholder="Size"
                                onChange={(e) => handleSizeChange(index, "size", e.target.value)}
                            />
                            <input type="number"
                                value={item.stock}
                                placeholder='stock'
                                onChange={(e) => handleSizeChange(index, "stock", e.target.value)} />
                        </div>

                    </div>
                ))}
                {/* <button onClick={handleAddColor}>Add Color</button> */}
            </div>

        </div>
    )
}

export default CreateProduct
