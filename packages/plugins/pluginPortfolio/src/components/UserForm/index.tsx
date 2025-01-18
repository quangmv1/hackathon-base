import React from 'react';
import { Button, Input } from '@repo/ui';

const UserForm = () => {

  return (
    <div>
      <div className='flex justify-between items-center text-[24px]'>
        <div>
          <p>Your Name</p>
          <Input
            type="text"
            placeholder="0.0"
            className="flex-1 h-7"
          />
          
        </div>

        <div>
          <p>Date of birth</p>
          <Input
            type="date"
            placeholder="0.0"
            className="flex-1 h-7"
          />
        </div>

      </div>

      <Button >Connect</Button>
    </div>
   
  );
}
 
export default UserForm;