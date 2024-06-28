import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import DangerButton from "@/Components/DangerButton";
import Pagination from "@/Components/Pagination";

export default function Index({auth,teachers,success,error,queryparams = null,departments,facultys}){

   queryparams = queryparams || {}
   const searchfeildchanged = (name,value) => {
    if(value){

      queryparams[name] = value;

    } else{
      delete queryparams[name];
    }

    router.get(route('teacher.index'),queryparams);
    }

   const onKeyPress = (name,e) =>{

    if(e.key !== 'Enter') return;
    searchfeildchanged(name,e.target.value);

   }


     const deleteTeacher = (teacher) => {

      if(!window.confirm("Are you sure to delete this teacher from system?")){
       return;
      }

      router.delete(route("teacher.destroy",teacher.id));

     }


 return (

  <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Teacher</h2>}

  >

    <Head title="Teacher" />

    <div className="py-12">

    {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-500 py-2 px-4 text-white rounded mb-4">
              {error}
            </div>
          )}
      <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
       <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
       <div className="container mb-4">
          <div className='row'>
           <div className="col-md-12">
            <div className="row">
            <div className='col-md-2'>
              <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">name</h6>
                  <TextInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.name}
                   onBlur={e => searchfeildchanged('name',e.target.value)}
                   onKeyPress={e => onKeyPress('name',e)}

                 />

              </div>
            </div>
            <div className='col-md-2'>
            <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">faculty</h6>
                  <SelectInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.faculty}
                   onChange={(e) => searchfeildchanged('faculty',e.target.value)}

                 >
                    <option>Search..</option>

                      {facultys.map((faculty) => (
                       <option value={faculty.faculty_name} key={faculty.id}>{faculty.faculty_name}</option>

                      ))

                      }

                 </SelectInput>

              </div>
            </div>
            <div className='col-md-2'>
            <div className="p-6 text-gray-900 dark:text-gray-100 flex text-xl d-flex flex-column">
                <h6 className="text-gray-500 mb-1">department</h6>
                  <SelectInput
                   className="form-control"
                   placeholder="Search..."
                   defaultValue={queryparams.department}
                   onChange={(e) => searchfeildchanged('department',e.target.value)}

                 >
                    <option>Search..</option>

                      {departments.map((department) => (
                       <option value={department.name} key={department.id}>{department.name}</option>

                      ))

                      }

                 </SelectInput>

              </div>
            </div>
            <div className="col-md-2 mt-5">
               <Link
                 className="btn btn-outline-secondary"
                 href={route("teacher.index")}
               >
                Reset
               </Link>
            </div>

             <div className='col-md-4 text-end'>
              <div className='me-3 mt-4'>
              <Link
                 href={route('teacher.create')}
                 className="bg-emerald-500 py-1  px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                >
               Add New Teacher
            </Link>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
       <div className='overflow-auto'>
                <table className='w-full text-md text-left rtl:text-right
                     dark:bg-gray-700 dark:text-gray-300 '>
                   <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400
                        border-b-2 border-gray-500'>
                      <tr className='text-nowrap bg-gray-500 text-white align-middle'>
                        <th className='px-3 py-2'>Name</th>
                        <th className='px-3 py-2'>Last Name</th>
                        <th className='px-3 py-2'>Father name</th>
                        <th className='px-3 py-2'>Faculty</th>
                        <th className='px-3 py-2'>Department</th>
                        <th className='px-3 py-2'>Phone Number</th>
                        <th className='px-3 py-2'>Action</th>
                      </tr>
                   </thead>
                    <tbody>
                      {teachers.data.map((teacher) => (

                          <tr className='bg-gray border-b dark:bg-gray-800  dark:border-gray-700 hover:bg-gray-200 align-middle' key={teacher.id}>
                           <td className='px-3 py-2'>{teacher.name}</td>
                           <td className='px-3 py-2'>{teacher.last_name}</td>
                           <td className='px-3 py-2 text-center'>{teacher.father_name}</td>
                           <td className='px-3 py-2 text-center'>{teacher.department.faculty.name}</td>
                           <td className='px-3 py-2 text-center'>{teacher.department.name}</td>
                           <td className='px-3 py-2 text-center'>{teacher.phone}</td>
                           <td className='px-3 py-2 text-nowrap'>
                            <Link
                              href={route("teacher.edit",teacher.id)}
                              className='font-meduim text-blue-600 dark:text-blue-500 hover:bg-gray-300 mx-1 btn btn-outline-primary'
                            >
                             Edit
                            </Link>
                            <DangerButton
                             onClick={(e) => deleteTeacher(teacher)}
                             className='mx-3'
                             >
                              Delete
                            </DangerButton>
                           </td>
                         </tr>

                      ))}
                    </tbody>
                </table>
               <Pagination links={teachers.meta.links}></Pagination>
           </div>
      </div>
     </div>
     </div>
  </AuthenticatedLayout>
 );

}

