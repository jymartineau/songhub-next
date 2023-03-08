import React, { useEffect, useState } from "react";
import {
    faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";

import AudioPlayer from 'react-h5-audio-player';
import * as Yup from "yup";
import Group from "./Form/Group";
import Text from '@/components/Forms/Form/Text'
import UploadDropzone from "../MediaUpload/ImageDropZone";
import StemUploadModal from "../MediaUpload/StemUploadModal";
import { Collaborator, StemUpload } from "@/types";
import SplitsCalculator from '@/components/Splits/SplitsCalculator'
import { XCircleIcon } from "@heroicons/react/24/outline";
import AddCollaboratorModal from '@/components/Forms/AddCollaboratorModal';

const STATUS_OPTIONS = ["DRAFT", "PUBLISHED", "ARCHIVED"]

const TEST_workTypeS = [{ id: 0, workType: "Original Composition" }, { id: 1, workType: "Advertising" }]




const ProjectForm = () => {

    const [openStemsModal, setOpenStemsModal] = useState<boolean>(false);
    const [openCollabModal, setOpenCollabModal] = useState<boolean>(false);
    const [stemDetails, setStemDetails] = useState<StemUpload | undefined>(undefined);
    const [collaboratorDetails, setCollaboratorDetails] = useState<Collaborator | undefined>(undefined);

    const formik = useFormik({
        initialValues: {
            status: "",
            title: "",
            workType: "",
            currentWorkAltTitle: "",
            workTitleAlts: [] as string[],
            leadArtistName: "",
            leadArtistDescription: "",
            leadArtistIsSample: false,
            performedBy: "",
            hrs: 0,
            mins: 0,
            secs: 0,
            stemUploads: [] as StemUpload[],
            splits: [] as Collaborator[],
            artwork: undefined,
            ISWC: "",
            ISRC: "",
            artworkURL: "",
            CPC: false,
        },
        onSubmit: (values) => {
            console.log("submitting", values);

        },
        validationSchema: Yup.object().shape({
            status: Yup.string().required("Status is Required"),
            title: Yup.string().required('Title is required').max(50, 'Max title length is 50'),
            workType: Yup.string().required("workType is Requried"),
            leadArtistName: Yup.string().required("Lead Artist name is required"),
        }),

    })

    useEffect(() => {
        console.log(formik.values);
    }, [formik, formik.values])

    const handleAltTitleRemove = (i: number) => {
        // Create Shallow Copy
        let currentTitles = [...formik.values.workTitleAlts];
        currentTitles.splice(i, 1)
        formik.setFieldValue("workTitleAlts", currentTitles)
    }

    const handleAddStem = async (stem: StemUpload) => {
        let currentStems = formik.values.stemUploads
        await formik.setFieldValue("stemUploads", [...currentStems, stem ])
    }

    const handleAltTitleAdd = (e:any) => {
        e.preventDefault();
        let currentList = formik.values.workTitleAlts
        formik.setFieldValue("workTitleAlts", [...currentList, formik.values.currentWorkAltTitle]).then(() => {
            formik.setFieldValue("currentWorkAltTitle", "");
        });

    }

    const handleCollaboratorAdd = (writer:Collaborator) => {
        let currentSplits = formik.values.splits;
        formik.setFieldValue("splits", [...currentSplits, writer])
    }

    return (
        <>

            <form className="flex flex-col gap-3">
                <div className="border-b border-white pb-3">
                    <Group title="status">
                        <select
                            {...formik.getFieldProps('status')}

                        >
                            <>
                                {
                                    STATUS_OPTIONS.map((o, i) => (
                                        <option key={`${o}-${i}`}>{o}</option>
                                    ))
                                }
                            </>

                        </select>

                        {/* <p>What is the status of the project?</p> */}
                    </Group>

                    <Group title="Working Title">
                        <Text

                            {...formik.getFieldProps("title")}
                            placeholder="Song Title"

                        />
                    </Group>

                    <Group title="alt titles">
                        <>
                            <div className="flex flex-row">
                                <input type="text" placeholder="Add Alt Title.."
                                    {...formik.getFieldProps("currentWorkAltTitle")}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAltTitleAdd(e)
                                        }
                                    }}
                                />
                                <button className="w-20 bg-blue-500" type="button" onClick={handleAltTitleAdd}>Add</button>
                            </div>
                            <div className=" min-h-[50px] mt-2 px-2 bg-slate-700">
                                <Group title="Alt Title List">
                                    {
                                        formik.values.workTitleAlts.length > 0 ?
                                            (<>

                                                <ul>
                                                    {formik.values.workTitleAlts.map((t, i) => (
                                                        <div key={`${t}-${i}`} className="flex flex-row gap-2">
                                                            <p>{t}</p>
                                                            <XCircleIcon className="h-6 w-6 cursor-pointer hover:opacity-100 opacity-80" onClick={() => { handleAltTitleRemove(i) }} />
                                                        </div>
                                                    ))}

                                                </ul>


                                            </>) : (<><p className="opacity-50">Alt Titles Appear Here...</p></>)


                                    }
                                </Group>
                            </div>
                        </>

                    </Group>
                    <Group title="Work Type">
                        <select

                            {...formik.getFieldProps("workType")}
                        >
                            {TEST_workTypeS.map(({ id, workType }) => (
                                <option key={id} value={id}>
                                    {workType}
                                </option>
                            ))}
                        </select>
                    </Group>
                    <div className="flex flex-row w-full gap-8">
                        <div className="">
                            <Group title="CPC">
                                <div className="flex gap-4 px-2 items-center">
                                    <input type="checkbox" value={1} className="w-4  h-4" name="CPC" onChange={(e) => {
                                        formik.setFieldValue('CPC', e.target.checked)
                                    }} />
                                    <p className="text-xs max-w-[300px] font-semibold">
                                        This Work Include Copyright Protected Content Other Than Your Own? i.e. Sampling, Translation
                                    </p>

                                </div>
                            </Group>
                        </div>
                        <Group title="Duration" classname="justify-end">
                            <div className="flex flex-row gap-2 items-end">
                                <div className="flex items-end gap-1">
                                    <label htmlFor="hrs">Hrs.</label>
                                    <input type="number" {...formik.getFieldProps("hrs")} />

                                </div>
                                <div className="flex items-end gap-1">
                                    <label htmlFor="hrs">Mins.</label>
                                    <input type="number" {...formik.getFieldProps("mins")} />

                                </div><div className="flex items-end gap-1">
                                    <label htmlFor="hrs">Secs.</label>
                                    <input type="number" {...formik.getFieldProps("secs")} />

                                </div>
                            </div>
                        </Group>
                    </div>
                    {/* <div className="flex flex-row w-full gap-4">
                        <div className="flex flex-col w-full">

                            <Group title="ISWC">
                                <input
                                    type="text"
                                    {...formik.getFieldProps("ISWC")}
                                    placeholder="Enter Number"
                                />
                            </Group>
                        </div>
                        <div className="flex flex-col w-full">
                            <Group title="ISRC">
                                <input
                                    {...formik.getFieldProps("ISRC")}
                                    placeholder="Enter Number"
                                    type="text"
                                />
                            </Group>
                        </div>
                    </div> */}
                    <Group title="Performed by/Artist">
                        <input type="text" placeholder="Performer or Artist..." />
                    </Group>
                </div>


                <div className="flex flex-col gap-4">
                    <Group title="Project Stems">
                        <div className="flex flex-col gap-2">
                            {formik.values.stemUploads.length > 0 ? (<>{formik.values.stemUploads.map((s, i) => (

                                <div className="flex items-center" key={`${s.title}-${i}`}>
                                    <p className="whitespace-none w-1/4 text-lg">{s.title}</p>
                                    <div className="w-3/4">
                                        <AudioPlayer src={s.fileURL} className="!bg-[#333] !border !rounded-md border-gray-700" showSkipControls={false} showJumpControls={true} customAdditionalControls={[]} layout="horizontal-reverse" />

                                    </div>

                                </div>

                            ))}</>) : (<></>)

                            }


                            <button type="button" className="uppercase bg-gray-700 p-2 rounded-md hover:bg-gray-800" onClick={() => { setOpenStemsModal(true) }}>+ Upload Stem</button>
                        </div>
                    </Group>
                    <Group title="Artwork">
                        <UploadDropzone setFieldValue={formik.setFieldValue} cleanup={false} existingFile={formik.values.artwork} />
                    </Group>
                </div>
                <Group title="Splits">
                    
                    <SplitsCalculator splits={formik.values.splits} setFieldValue={formik.setFieldValue} />
                    <button type="button" className='w-full uppercase text-lg bg-gray-700 py-2 rounded-md' onClick={() => {setOpenCollabModal(true)}}>+ Add Collaborator</button>

                </Group>


                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        disabled={formik.isSubmitting}
                        className="d-flex align-items-center"
                    >
                        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
                        Save Song Project
                    </button>
                </div>





            </form>
            <StemUploadModal open={openStemsModal} setOpen={setOpenStemsModal} handleAdd={handleAddStem} />
            <AddCollaboratorModal open={openCollabModal}  setOpen={setOpenCollabModal} handleAdd={handleCollaboratorAdd} />
        </>
    );
};


export default ProjectForm;
