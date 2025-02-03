
import { allCategories } from '../../database/allCategories';
import { allTags } from '../../database/allTags';
import { createTag } from '../../database/createTag';
import { uploadSound } from '../../database/uploadSound';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { checkIfFilesExist } from '../../database/checkIfFileExists';
import Swal from 'sweetalert2';

const AdminNewSound = (props) => {

    const [name, setName] = useState('');
    const [soundFile, setSoundFile] = useState(null);
    const [color, setColor] = useState('');
    const [categoriesList, setCategoriesList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');
    const [tagsList, setTagsList] = useState([]);
    const [tags, setTags] = useState([]);
    const [soundObj, setSoundObj] = useState();
    const [submitted, setSubmitted] = useState(false)

    async function getCategories() {
        const cat = await allCategories()
        setCategoriesList(cat)
    }

    useEffect(() => {
        getCategories()
    }, [])

    async function getTags() {
        const tag = await allTags()
        setTagsList(tag)
    }

    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {
        setSoundObj({
            name: name,
            color: color ? color : '#4285F4',
            category: categories,
            tags: tags,
            description: description
        })
    }, [name, color, description, tags, categories])


    async function submitClicked(e) {
        e.preventDefault();
        setSubmitted(true);

        const { filesFound, existingFiles } = await checkIfFilesExist([soundObj]);

        if (filesFound) {
            Swal.fire({
                title: `${existingFiles.length} duplicate file found`,
                text: "A file with the same name already exists.",
                confirmButtonText: 'Cancel',
                showCloseButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setSubmitted(false);
                } else if (result.isDismissed) {
                    setSubmitted(false);
                }
            });
        } else {
            try {
                await uploadSound(soundFile, soundObj);
                props.newSoundSubmit();
            } catch (error) {
                console.error('Error uploading file:', error);
            } finally {
                setSubmitted(false);
            }
        }
    }




    return (
        <div id={props.modalId} className="fixed flex opacity-0 justify-center duration-500 bg-black ease-in-out scale-50 items-center inset-0 backdrop-blur-xl bg-opacity-15 ">
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="flex flex-col w-full sm:w-[550px] text-gray-800 bg-white rounded-lg gap-4">
                <div className="flex flex-col relative gap-4 h-min">
                    <div className="flex rounded-t-lg items-center justify-between px-6 py-3 bg-[#F9F7F7]">
                        <h1 className="text-2xl font-semibold">Add New Sound</h1>
                        <svg onClick={() => {
                            props.hideModal()
                            setSubmitted(false)
                        }
                        } className="hover:rotate-90 cursor-pointer duration-150" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill=""><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </div>

                    <div className="p-4 pb-4 pt-0">
                        <form onSubmit={(e) => submitClicked(e)} className="">

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
                                    maxLength={30}
                                />
                            </div>

                            <div className='grid grid-cols-3 gap-5'>

                                <div className="mb-4 col-span-2 w-full">
                                    <label htmlFor="soundFile" className="block text-gray-700 text-sm font-bold mb-2">Sound (.mp3 or .wav)</label>
                                    <input
                                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                        aria-describedby="file_input_help"
                                        type="file"
                                        id="soundFile"
                                        required
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file && file.type === "audio/mpeg") {
                                                setSoundFile(file);
                                            } else {
                                                toast.warn('Only .mp3 or .wav are allowed');
                                                e.target.value = null;
                                            }
                                        }}
                                        accept=".mp3, .wav"
                                    />
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">.mp3 (MAX. 1mb).</p>
                                </div>

                                <div className="">
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

                            <div className="mb-4">
                                <label htmlFor="categories" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                                <Select
                                    id="categories"
                                    required
                                    options={categoriesList}
                                    isMulti
                                    onChange={(selectedOptions) => {
                                        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
                                        setCategories(values);
                                    }}
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="shadow resize-none appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    rows="2"
                                    placeholder="Enter description"
                                    maxLength={70}
                                />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
                                <CreatableSelect

                                    id="tags"
                                    options={tagsList}
                                    isMulti
                                    onChange={(selectedOptions) => {
                                        selectedOptions.forEach(option => {
                                            if (option.__isNew__) {
                                                createTag(option.label);
                                            }
                                        });
                                        const values = selectedOptions ? selectedOptions.map(option => option.label) : [];
                                        setTags(values);
                                    }}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={submitted}
                                    className="bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed
                                    text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default AdminNewSound;
