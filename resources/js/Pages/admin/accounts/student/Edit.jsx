import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head,Link,useForm } from "@inertiajs/react";
import React, { useState } from "react";
export default function Edit({ auth,studentaccount }) {

 const [status,setStatus] = useState(studentaccount.data.status);
   console.log("++",status);

   const handleStatusChange = (e) => {
   setStatus(e.target.value);
   console.log("__",status);

   }

  const {data,setData,post,errors,reset}  =   useForm({

          name:studentaccount.data.name || "",
          email:studentaccount.data.email || "",
          password:"",
          password_confirmation:"",
          status:studentaccount.data.status || "",
          _method:'PUT',


      });

      console.log(data.status);

      const onSubmit = (e) =>{

         e.preventDefault();
          console.log("**",status);
        post(route("studentaccount.update",studentaccount.data.id));

       }


  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit Student Account
        </h2>
      }
    >
      <Head title="Create Student Acount" />

      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="mt-4 ms-5">
              <p className="lead text-gray-600"> Edit "{studentaccount.data.name}" Account</p>
            </div>


            <form
              onSubmit={onSubmit}
              className="container mb-5 mt-2 ms-4 me-4 w-75 p-3 sm:p-8 bg-white dark:bg-gray-800"
            >
              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel htmlFor="name">
                      Name:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      id="name"
                      type="text"
                      name="name"
                      value={data.name}
                      isFocused={true}
                      onChange={(e) => setData("name",e.target.value)}
                    />
                    <InputError message={errors.name} className='mt-2'/>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Email:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      id="email"
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={(e) => setData("email",e.target.value)}
                    />
                      <InputError message={errors.email} className='mt-2'/>
                  </div>
                </div>
              </div>
              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Password{" "}
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <span className='mb-1 text-gray-400'>If you want to change the password, create new password here!</span>
                    <TextInput
                      className="form-control mt-1"
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e) => setData("password",e.target.value)}
                    />
                   <InputError message={errors.password} className='mt-2'/>
                  </div>
                </div>
                <div className="form-group col-md-6 mt-5">
                  <div className="mt-3">
                    <InputLabel>
                      Password Confirmation{" "}
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      id="password_confirmaion"
                      name="password_confirmation"
                      type="password"
                      onChange={(e) => setData("password_confirmation",e.target.value)}
                    />
                   <InputError message={errors.password} className='mt-2'/>
                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Status:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <SelectInput
                      className="form-control mt-1"
                      id="status"
                      name="status"
                      value={data.status}
                      onChange={(e) => setData("status",e.target.value)}
                    >
                    <option value="">Select Status</option>
                     <option value="active">Active</option>
                     <option value="inactive">Inactive</option>

                    </SelectInput>
                   <InputError message={errors.status} className='mt-2'/>
                  </div>
                </div>

              </div>



              <div class="text-center mt-4 bg-gray-200">
              <Link
               href={route("studentaccount.index")}
               className='bg-gray-400 py-1  px-3  text-gray-800  rounded transition-all hover:bg-gray-300 mr-2'
              >
                Cancel
              </Link>
              <button className="btn btn-success mb-1 mt-1 mt-1" type="submit">
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
