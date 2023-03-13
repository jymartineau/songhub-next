/* eslint-disable no-unused-vars */
import { Collaborator } from '@/types'
import { FormikErrors } from 'formik';
import React, { useMemo } from 'react'
import Image from 'next/image';
import classNames from 'classnames';
const TOTAL = 100

interface SplitCalculator {
    splits: Array<Collaborator>;
    setCollabValue: React.Dispatch<React.SetStateAction<Collaborator | undefined>>;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void> | Promise<FormikErrors<any>>;
    handleRemove: (id:string) => void;
}

// { writerName:"",
//         writerEmail:"",
//         writerAffiliation:"",
//         writerType:[],
//         publisher:"",
//         publisherAffiliation:"",
//         territory:"",
//         share:"",}

// eslint-disable-next-line no-unused-vars
function SplitsCalculator({ setFieldValue, splits, setCollabValue, handleRemove }: SplitCalculator) {

    const [remainder, totalSplits] = useMemo(() => {
        const totalSplits = splits.reduce((accumulator, c): number => accumulator + c.share, 0)
        return [TOTAL - totalSplits, totalSplits]
    }, [splits])

    return (
        <div className='w-full'>
            <div className='w-full border rounded-md relative '>
                <div className={classNames('flex h-8', `w-[${totalSplits}%]`, totalSplits > 100 ? 'bg-red-500' : 'bg-gray-700')}>

                </div>
                <p style={{ transform: "translateX(calc(50% - 200px))" }} className='absolute left-[50%] w-[200px] top-0 font-semibold'>Total Amount Split: {totalSplits}%</p>
            </div>

            {/* TABLE TODO: make own component */}
            <div className='w-full'>
                <div className="px-4 sm:px-6 lg:px-8">

                    <div className="mt-8 flow-root text-white">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold ">
                                                Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold ">
                                                Publisher
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold ">
                                                Split %
                                            </th>
                                            {/* EDIT */}
                                            <th scope='col'>

                                            </th>
                                            {/* DELETE */}
                                            <th scope='col'>

                                            </th>
                                            {/* <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                <span className="sr-only">Edit</span>
                                            </th> */}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-gray-900">
                                        {splits.map((split, i) => (
                                            <tr key={split.writerEmail}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 flex-shrink-0 rounded-full flex my-auto overflow-hidden relative">
                                                            <Image
                                                                src={`https://ui-avatars.com/api/?name=${split.writerName?.split(" ").join("+") || "John+Doe"}&size=250`}
                                                                fill
                                                                alt=""

                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="font-medium text-white text-lg">{split.writerName}</div>
                                                            <div className="text-gray-100">{split.writerEmail}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-lg">
                                                    <div className="white">{split.publisher}</div>

                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-2xl">
                                                    <div className='w-[90px]'>
                                                        <input type="number" value={split.share} onChange={(e) => {
                                                            let amount = e.target.valueAsNumber;

                                                            if (amount < 0 || amount > 101)
                                                                amount = 0

                                                            let clone = [...splits];

                                                            clone[i].share = Number(amount);

                                                            setFieldValue('splits', clone)
                                                        }} />

                                                    </div>


                                                </td>
                                                <td>
                                                    <button type='button' onClick={() => {
                                                        setCollabValue(split);
                                                    }}>Edit</button>
                                                </td>
                                                <td>
                                                    <button type='button' onClick={() => {
                                                        handleRemove(split.id);
                                                    }}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SplitsCalculator