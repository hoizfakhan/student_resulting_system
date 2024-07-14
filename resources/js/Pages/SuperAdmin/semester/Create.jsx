
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link,useForm } from "@inertiajs/react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';



  export default function Create({auth}){

  const {data,setData,post,errors,reset} =  useForm({

    name:"",

  });

  const onSubmit = (e) =>{

  e.preventDefault();

  post(route("semester.store"));

  }
  
  return(

  <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create Semester </h2>}

  >
  <Head title="Create Semester" />
    <div className="py-12">
     <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
       <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
       <div className='mt-4 ms-5'><p className='lead text-gray-600'>Create New Semester </p></div>
                        <form
                         onSubmit={onSubmit}
                         className='mb-5 mt-2 ms-4 me-4 w-50 p-3 sm:p-8 bg-white dark:bg-gray-800 '
                          >

                           <div className='mt-3'>
                          <InputLabel htmlFor="faculty_name">Semester Name: <span className='text-red-300 text-lg'>*</span></InputLabel>
                            <TextInput  className='form-control mt-1'
                               id="semester_name"
                               type="text"
                               name="name"

                              isFocused={true}
                              onChange={(e) => setData("name",e.target.value)}
                              />
                              <InputError message={errors.name} className='mt-2'/>
                          </div>

                          <div className='mt-4 text-right bg-gray-300 p-2'>
                             <Link
                               href={route("semester.index")}
                               className='bg-gray-300 py-1 px-3 mb-2 text-gray-700 rounded-sm bg-gray-400  transition-all hover:bg-gray-100 mr-2'
                              >
                               Cancel
                              </Link>
                              <button
                               className='bg-emerald-500 py-1 px-3 text-white rounded-sm  me-3 transition-all hover:bg-emerald-600'

                              >
                                Submit
                              </button>
                           </div>
                        </form>
       </div>
       </div>
       </div>

  </AuthenticatedLayout>
);


}
