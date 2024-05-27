import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({auth,faculty}){

   const {data,setData,post,errors,reset} =  useForm({
    
            name:faculty.name,
            boss:faculty.boss,


        });

    console.log(data.name);
    console.log(faculty);
     const onSubmit = (e) =>{

      e.preventDefault();
      post(route("faculty.update"));

     }

 return (
   <AuthenticatedLayout
   user={auth.user}
   header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit faculty</h2>}
   >
  <Head title=" Edit Faculty" />

   <div className="py-12">
   <pre>
    {JSON.stringify(faculty)}
   </pre>
    <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
     <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
     <div className='mt-4 ms-5'><p className='lead text-gray-600'>Edit Faculty {faculty.name} </p></div>

                        <form
                          onSubmit={onSubmit}
                          className='mb-5 mt-2 ms-4 me-4 w-50 p-3 sm:p-8 bg-white dark:bg-gray-800 '
                          >

                           <div className='mt-3'>
                          <InputLabel htmlFor="faculty_name">Faculty Name: <span className='text-red-300 text-lg'>*</span></InputLabel>
                            <TextInput  className='form-control mt-1'
                               id="faculty_name"
                               type="text"
                               name="name"
                               value={data.name}
                               isFocused={true}
                              onChange={(e) => setData('name',e.target.value)}
                              />
                              <InputError message={errors.name} className='mt-2'/>
                          </div>

                          <div className='mt-3'>
                           <InputLabel htmlFor="faculty_boss">Faculty Boss: <span className='text-red-300 text-lg'>*</span></InputLabel>
                           <TextInput className='form-control mt-1'
                             id="faculty_boss"
                             type="text"
                             name="boss"
                             value={data.boss}
                             onChange={(e) => setData('boss',e.target.value)}

                           />
                             <InputError message={errors.boss} className='mt-2'/>
                          </div>
                           <div className='mt-4 text-right'>
                             <Link
                               href={route('faculty.index')}
                               className='bg-gray-300 py-1 px-3 text-gray-800 rounded  transition-all hover:bg-gray-200 mr-2'
                              >
                              Cancel</Link>
                              <button
                               className='bg-emerald-500 py-1 px-3 text-white rounded transition-all hover:bg-emerald-600'

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
