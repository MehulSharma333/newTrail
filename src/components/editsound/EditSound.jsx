import { createTag } from '../../database/createTag';
import { allCategories } from '../../database/allCategories';
import { allTags } from '../../database/allTags';
import { editSoundObject } from '../../database/editSoundObject';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const EditSound = (props) => {
    // Initializing state with props values
    const [name, setName] = useState(props.soundData.name);
    const [color, setColor] = useState(props.soundData.color || '#4285F4');
    const [categoriesList, setCategoriesList] = useState([]);
    const [categories, setCategories] = useState(props.soundData.category || []);
    const [description, setDescription] = useState(props.soundData.description || '');
    const [tagsList, setTagsList] = useState([]);
    const [tags, setTags] = useState(props.soundData && props.soundData.tags.map(tag => ({ label: tag, value: tag })) || []);
    const [soundObj, setSoundObj] = useState();

    async function getCategories() {
        const cat = await allCategories();
        setCategoriesList(cat);
    }

    useEffect(() => {
        getCategories();
    }, []);

    async function getTags() {
        const tag = await allTags();
        setTagsList(tag);
    }

    useEffect(() => {
        getTags();
    }, []);

    useEffect(() => {
        setSoundObj({
            name: name,
            color: color,
            category: categories,
            tags: tags.map(tag => tag.label),
            description: description
        });
    }, [name, color, description, tags, categories]);

    async function submitClicked(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        await editSoundObject(props.soundData.id, soundObj).then(() => {
            props.editSoundSubmit()
        })

    }

    return (
        <div id={props.editModalId} className="fixed flex -z-50 opacity-0 justify-center duration-500 bg-black ease-in-out scale-50 items-center inset-0 backdrop-blur-xl bg-opacity-15 ">
            <div className="flex flex-col w-full sm:w-[550px] text-gray-800 bg-white rounded-lg gap-4">
                <div className="flex flex-col relative gap-4 h-min">
                    <div className="flex rounded-t-lg items-center justify-between px-6 py-3 bg-[#F9F7F7]">
                        <h1 className="text-2xl font-semibold">Edit Sound</h1>
                        <svg onClick={props.hideEditModal} className="hover:rotate-90 cursor-pointer duration-150" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill=""><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </div>

                    <div className="p-4 pb-4 pt-0">
                        <form onSubmit={(e) => submitClicked(e)} className="">
                            {/* Name input */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter name"
                                />
                            </div>

                            <div className='grid grid-cols-3 gap-5'>
                                {/* Sound input (mp3) */}
                                {/* <div className="mb-4 col-span-2 w-full">
                                    <label htmlFor="soundFile" className="block text-gray-700 text-sm font-bold mb-2">Sound (mp3)</label>
                                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" type="file"
                                        id="soundFile"
                                        value={soundFile}
                                        onChange={(e) => setSoundFile(e.target.files[0])}
                                        accept=".mp3" />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">.mp3 (MAX. 1mb).</p>
                                </div> */}

                                {/* Colour input */}
                                <div className="mb-4">
                                    <label htmlFor="color" className="block text-gray-700 text-sm font-bold mb-2">Color</label>
                                    <div className='flex items-center gap-3'>
                                        <input
                                            className='h-[40px] w-[40px]'
                                            type="color"
                                            id="color"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                        />
                                        {color &&
                                            <p className='font-semibold shadow border px-4 p-1.5 '>{color}</p>
                                        }

                                    </div>
                                </div>
                            </div>

                            {/* Category input (React Select) */}
                            <div className="mb-4">
                                <label htmlFor="categories" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                                <Select
                                    id="categories"
                                    required
                                    options={categoriesList}
                                    isMulti
                                    value={categoriesList.filter(option => categories.includes(option.value))}
                                    onChange={(selectedOptions) => {
                                        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                        setCategories(values);
                                    }}
                                />
                            </div>

                            {/* Description input */}
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea

                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="shadow resize-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="2"
                                    placeholder="Enter description"
                                />
                            </div>

                            {/* Tags input (React Select) */}
                            <div className="mb-6">
                                <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
                                <CreatableSelect

                                    id="tags"
                                    options={tagsList}
                                    isMulti
                                    value={tags}
                                    onChange={(selectedOptions) => {
                                        selectedOptions.forEach(option => {
                                            if (option.__isNew__) {
                                                createTag(option.label);
                                            }
                                        });
                                        const values = selectedOptions ? selectedOptions.map(option => ({ label: option.label, value: option.label })) : [];
                                        setTags(values);
                                    }}
                                />
                            </div>

                            {/* Submit button */}
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSound;
