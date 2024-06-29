import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import SelectInput from '@/Components/SelectInput';

export default function Edit ({auth,success,error,facultys,department}){

      const {data,setData,post,errors,reset}=  useForm({

             name:department.data.name || "",
             head:department.data.head || "",
             faculty_id:department.data.faculty_id || "",
             _method:'PUT',

          });


       const onSubmit = (e) =>{

         e.preventDefault();
         post(route("department.update",department.data.id));
        }


 return (

   <AuthenticatedLayout

    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Department</h2>}


    >
    <Head title="Edit Department" />
    <div className="py-12">
     <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
      {success && (
           <div className='bg-emerald-500 py-2 px-4 text-white rounded mb-4'>
            {success}
           </div>
       )}

       {error && (
              <div className='bg-red-500 py-2 px-4 text-white rounded mb-4'>
               {error}
               </div>
         )}
     <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
     <div className='mt-4 ms-5'><p className='lead text-gray-600'> Edit "{department.data.name}" department </p></div>
                     <form
                         onSubmit={onSubmit}
                         className='mb-5 mt-2 ms-4 me-4 w-50 p-3 sm:p-8 bg-white dark:bg-gray-800 '
                          >

                           <div className='mt-3'>
                          <InputLabel htmlFor="department_name">Department Name: <span className='text-red-300 text-lg'>*</span></InputLabel>
                            <TextInput  className='form-control mt-1'
                               id="department_name"
                               type="text"
                               name="name"
                               value={data.name}
                              isFocused={true}
                              onChange={(e) => setData("name",e.target.value)}
                              />
                              <InputError message={errors.name} className='mt-2'/>
                          </div>

                          <div className='mt-3'>
                           <InputLabel htmlFor="department_head">Department Head:</InputLabel>
                           <TextInput className='form-control mt-1'
                             id="department_head"
                             type="text"
                             name="head"
                             value={data.head}
                             onChange={(e) => setData("head",e.target.value)}

                           />
                             <InputError message={errors.head} className='mt-2'/>
                          </div>

                          <div className='mt-3'>
                          <InputLabel htmlFor="faculty_id">Faculty: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <SelectInput
                             id="faculty_id"
                             name="faculty_id"
                             defaultValue={data.faculty_id}
                             className="form-control"
                             onChange={(e) => setData("faculty_id",e.target.value)}

                             >
                             <option value="">Select Faculty</option>
                              {facultys.data.map((faculty) => (

                              <option value={faculty.id} key={faculty.id}>{faculty.name}</option>


                               ))}

                           </SelectInput>
                           <InputError message={errors.faculty_id}  className='mt-2'/>
                           <InputError/>

                          </div>
                          <div className='mt-4 text-right bg-gray-300 p-2'>
                             <Link
                               href={route("faculty.index")}
                               className='bg-gray-300 py-1 px-3 mb-2 text-gray-700 rounded-sm bg-gray-400  transition-all hover:bg-gray-100 mr-2'
                              >
                               Cancel
                              </Link>
                              <button
                               className='bg-emerald-500 py-1 px-3 text-white rounded-sm  me-3 transition-all hover:bg-emerald-600'

                              >
                                Update
                              </button>
                           </div>
           </form>
     </div>
    </div>
   </div>

  </AuthenticatedLayout>

 );

}
