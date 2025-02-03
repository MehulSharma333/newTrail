
import { bulkUploadSounds } from '../../database/bulkUploadSounds';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { allCategories } from '../../database/allCategories';
import { checkIfFilesExist } from '../../database/checkIfFileExists';
import Swal from 'sweetalert2';
import { filter } from 'lodash';


const BulkUpload = (props) => {
    const [submitted, setSubmitted] = useState(false)
    const [files, setFiles] = useState()
    const [categoriesList, setCategoriesList] = useState([]);
    const [categories, setCategories] = useState([]);
    const fileInputRef = useRef(null);


    async function getCategories() {
        const cat = await allCategories();
        setCategoriesList(cat);
    }

    useEffect(() => {
        getCategories();
    }, []);



    async function submitClicked(e) {
        e.preventDefault()
        setSubmitted(true)

        const { filesFound, existingFiles } = await checkIfFilesExist(files);
        if (filesFound) {
            Swal.fire({
                title: existingFiles.length + " duplicate files found",
                text: "Files with the same name already exists",
                showDenyButton: true,
                confirmButtonText: "Skip duplicate files",
                denyButtonText: `Cancel`,
                denyButtonColor: '#2A8BD7',
                showCloseButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const existingFileNames = existingFiles.flatMap(file => {
                        const nameWithoutExtension = file.name.replace(/\.(mp3|wav)$/, '');

                        return [
                            nameWithoutExtension,
                            `${nameWithoutExtension}.mp3`,
                            `${nameWithoutExtension}.wav`
                        ];
                    });

                    const filteredFiles = Object.keys(files)
                        .filter(key => !existingFileNames.includes(files[key].name))
                        .map(key => files[key]);
                    const response = await bulkUploadSounds(filteredFiles, props.adminCheck, categories);
                    if (response) {
                        props.bulkSoundSubmit()
                        setFiles()
                        if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                        }
                        setSubmitted(false)

                    }
                } else if (result.isDenied) {
                    props.hideBulkModal()
                    setFiles()
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                    setSubmitted(false)
                    setCategories([])
                }
            });
        } else {
            if (files && files.length > 0) {
                try {
                    const result = await bulkUploadSounds(files, props.adminCheck, categories);
                    if (result) {
                        props.bulkSoundSubmit()
                        setFiles()
                        if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                        }
                        setSubmitted(false)
                        setCategories([])
                    }
                } catch (error) {
                    console.error('Error uploading files:', error);
                }
            } else {
                toast.error('No file selected')
            }
        }

    }


    return (
        <div id={props.modalId} className="fixed flex opacity-0 justify-center duration-500 bg-black ease-in-out scale-50 items-center inset-0 backdrop-blur-xl bg-opacity-15 ">
            <div className="flex flex-col w-full sm:w-[530px] text-gray-800 bg-white rounded-lg gap-4">
                <div className="flex flex-col relative gap-4 h-min">
                    <div className="flex rounded-t-lg items-center justify-between px-6 py-3 bg-[#F9F7F7]">
                        <h1 className="text-2xl font-semibold">Add Bulk Sounds</h1>
                        <svg onClick={props.hideBulkModal} className="hover:rotate-90 cursor-pointer duration-150" xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill=""><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                    </div>

                    <div className="p-4 pb-4 pt-0">
                        <form onSubmit={(e) => submitClicked(e)}>
                            <div className="mb-4">
                                <input
                                    className=""
                                    ref={fileInputRef}
                                    aria-describedby="file_input_help"
                                    type="file"
                                    id="soundFile"
                                    multiple
                                    onChange={(e) => setFiles(e.target.files)}
                                    accept=".mp3, .wav"
                                />
                            </div>

                            <div className="mb-4">
                                <Select
                                    id="categories"
                                    placeholder="Select Categories"
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

                            <div className="flex items-center justify-between">
                                <button
                                    type='submit'
                                    disabled={submitted}
                                    className="bg-blue-500 hover:bg-blue-700 disabled:cursor-not-allowed
                                    text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
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

export default BulkUpload;
