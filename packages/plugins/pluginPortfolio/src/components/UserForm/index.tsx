import React from 'react';
import { Button, Input } from '@repo/ui';

const UserForm = () => {

  const [name, setName] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');

  

  return (
    <div className='bg-black p-8 w-[1024px] mt-[20vh] mx-auto'>

      <div>
        <img
          src="/images/jack_banner.png"
          alt="jack"
          className="w-96 h-96 mx-auto"
        />
      </div>
      <div className='grid grid-cols-2 gap-space-200 items-center text-[24px]'>
        <div>
          <p className='mb-2'>Your Name</p>
          <Input
            type="text"
            placeholder="Your name"
            className="p-4 h-14 text-[24px] border rounded-sm border-dividerColorDefault bg-black rounded-[12px]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
        </div>

        <div className='ml-4'>
          <p className='mb-2'>Date of birth</p>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            placeholder="0.0"
            className="p-4 h-14 text-[24px] border rounded-sm border-dividerColorDefault bg-black rounded-[12px]"
          />
        </div>

      </div>

      <Button >Connect</Button>
    </div>
   
  );
}
 
export default UserForm;