import Image from 'next/image';
import React from 'react';

const SongProjectsMock = [
  {
    img: 'https://picsum.photos/id/5/400/200',
    title: 'Ut ut nisl vel sapien hendrerit',
    description: 'Donec placerat dignissim velit quis volutpat',
  },
  {
    img: 'https://picsum.photos/id/100/400/200',
    title: 'Etiam tincidunt sagittis magna, condimentum ullamcorper risus tincidunt sodales',
    description: 'Suspendisse posuere lorem congue felis euismod scelerisque',
  },
  {
    img: 'https://picsum.photos/id/84/400/200',
    title: 'Proin quis mauris eros',
    description:
      'Nulla eu magna purus. Phasellus erat enim, Pellentesque placerat orci vitae est interdum rhoncus',
  },
  {
    img: 'https://picsum.photos/id/9/400/200',
    title: 'Nunc et velit eget leo mollis iaculis',
    description: 'Etiam mollis orci enim, vitae placerat lorem ultrices a',
  },
];

interface SongProjectProps {
  img: string;
  title: string;
  description: string;
}
export const SongProject = ({ img, title, description }: SongProjectProps) => {
  return (
    <div className='max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800'>
      <a href='#'>
        <Image
          className='rounded-t-lg'
          src={img}
          alt=''
          width={400}
          height={200}
        />
      </a>
      <div className='p-5'>
        <a href='#'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {title}
          </h5>
        </a>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {description}
        </p>
      </div>
    </div>
  );
};

const UserProjectsPage = () => {
  return (
    <div className='wrapper'>
      <ul className='flex divide-x text-white'>
        <button className='rounded-l bg-gray-700 px-4'>A-Z</button>
        <button className='border-l border-white bg-gray-700 px-4'>Recent</button>
        <button className='border-l border-white bg-gray-700 px-4'>Oldest</button>
        <button className='rounded-r border-l border-white bg-gray-700 px-4'>
          Archive
        </button>
      </ul>

      <div className='mt-8 grid grid-cols-3 gap-x-6 gap-y-8'>
        {SongProjectsMock.map((project, idx) => (
          <SongProject
            key={idx}
            title={project.title}
            description={project.description}
            img={project.img}
          />
        ))}
      </div>
    </div>
  );
};

export default UserProjectsPage;
