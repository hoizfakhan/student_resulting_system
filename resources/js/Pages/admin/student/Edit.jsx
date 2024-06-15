
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Head,Link,useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";


export default function Create({ auth,departments,student}) {

   const {data,setData,post,errors,reset} =  useForm({

    name:student.data.name ||  "",
    last_name:student.data.last_name ||  "",
    father_name:student.data.father_name ||  "",
    grandfather_name:student.data.grandfather_name ||  "",
    original_province:student.data.original_province ||  "",
    original_district:student.data.original_district ||  "",
    original_village:student.data.original_village ||  "",
    current_province:student.data.current_province ||  "",
    current_district:student.data.current_district ||  "",
    current_village:student.data.current_village ||  "",
    phone_number:student.data.phone_number ||  "",
    nic_number:student.data.nic_number ||  "",
    birth_date:student.data.birth_date ||  "",
    school_name:student.data.school_name ||  "",
    school_graduation_year:student.data.school_graduation_year ||  "",
    kankor_id:student.data.kankor_id ||  "",
    kankor_marks:student.data.kankor_marks ||  "",
    admission_date:student.data.admission_date ||  "",
    current_semester:student.data.current_semester ||  "",
    number_maktob_sent_exam_commettee:student.data. number_maktob_sent_exam_commettee ||  "",
    number_maktob_tajeel:student.data. number_maktob_tajeel || "",
    number_maktob_monfak:student.data. number_maktob_monfak || "",
    number_maktob_lailia:student.data.number_maktob_lailia || "",
    identity_cart_number:student.data.identity_cart_number || " ",
    department_id:student.data.department_id || "",
    image:'',
    _method:'PUT',


     });

     const onSubmit = (e) =>{

      e.preventDefault();
      post(route("student.update",student.data.id));

     }



  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Student Edit Form
        </h2>
      }
    >
      <Head title="Edit Student" />

      <div className="py-12">
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="mt-4 ms-5">
              <p className="lead text-gray-800"> Edit "{student.data.name} {student.data.last_name}" Information</p>
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
                      value={data && data.name}
                      onChange={(e) => setData("name",e.target.value)}
                    />
                    <InputError message={errors.name} className='mt-2'/>

                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Last Name:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      className="form-control mt-1"
                      id="last_name"
                      name="last_name"
                      type="text"
                      value={data && data.last_name}
                      onChange={(e) => setData("last_name",e.target.value)}
                    />
                    <InputError message={errors.last_name} className='mt-2'/>

                  </div>
                </div>
              </div>
              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Father Name: <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                     id="father_name"
                     name="father_name"
                     type="text"
                     value={data && data.father_name}
                      className="form-control mt-1"
                      onChange={(e) => setData("father_name",e.target.value)}
                    />
                    <InputError message={errors.father_name} className='mt-2'/>

                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Grandfather Name:

                    </InputLabel>
                    <TextInput
                     id="grandfather_name"
                     name="grandfather_name"
                     type="text"
                     value={data && data.grandfather_name}
                     className="form-control mt-1"
                      onChange={(e) => setData("grandfather_name",e.target.value)}
                    />
                    <InputError message={errors.grandfather_name} className='mt-2'/>

                  </div>
                </div>
              </div>


               <div class="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Original Province:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                       id="original_province"
                       name="original_province"
                       type="text"
                       value={data && data.original_province}
                      className="form-control mt-1"
                      onChange={(e) => setData("original_province",e.target.value)}
                    />
                     <InputError message={errors.original_province} className='mt-2'/>

                  </div>
                </div>

                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Original District:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                       id="original_district"
                       name="original_district"
                       type="text"
                       value={data && data.original_district}
                      className="form-control mt-1"
                      onChange={(e) => setData("original_district",e.target.value)}
                    />
                     <InputError message={errors.original_district} className='mt-2'/>

                  </div>
                </div>
                </div>


              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Original Village:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                       id="original_village"
                       name="original_village"
                       type="text"
                       value={data && data.original_village}
                      className="form-control mt-1"
                      onChange={(e) => setData("original_village",e.target.value)}
                    />
                   <InputError message={errors.original_village} className='mt-2'/>
                  </div>
                </div>

                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Department:<span className="text-red-300 text-lg">*</span>
                     </InputLabel>
                       <SelectInput
                             id="department_id"
                             name="department_id"
                             className="form-control"
                             value={data && data.department_id}
                             onChange={(e) => setData("department_id",e.target.value)}
                            >

                          <option value="">Select department</option>
                           {departments.map((department) => (
                               <option value={department.id} key={department.id}>{department.name}</option>

                          ))}

                          </SelectInput>
                          <InputError message={errors.department_id} className='mt-2'/>
                  </div>
                </div>

              </div>

              <div className="row form-row">
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Current Province:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                        id="current_province"
                        name="current_province"
                        type="text"
                        value={data && data.current_province}
                      className="form-control mt-1"
                      onChange={(e) => setData("current_province",e.target.value)}
                    />
                    <InputError message={errors.current_province} className='mt-2'/>

                  </div>
                </div>
                <div className="form-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Current District:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                       id="current_district"
                       name="current_district"
                       type="text"
                       value={data && data.current_district}
                      className="form-control mt-1"
                      onChange={(e) => setData("current_district",e.target.value)}
                    />
                    <InputError message={errors.current_district} className='mt-2'/>

                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Current Village:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                       id="current_village"
                       name="current_village"
                       type="text"
                       value={data && data.current_village}
                      className="form-control mt-1"
                      onChange={(e) => setData("current_village",e.target.value)}
                    />
                     <InputError message={errors.current_village} className='mt-2'/>

                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Phone Number:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      id="phone_number"
                      type="text"
                      name="phone_number"
                      value={data && data.phone_number}
                      className="form-control mt-1"
                      onChange={(e) => setData("phone_number",e.target.value)}

                      maxLength={10}
                      inputMode="numeric"
                      pattern="\d*" // Ensures only numeric input is allowed
                    />
                     <InputError message={errors.phone_number} className='mt-2'/>

                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      NIC Number:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <TextInput
                      type="text"
                      id="nic_number"
                      name="nic_number"
                      value={data && data.nic_number}
                      className="form-control mt-1"
                      onChange={(e) => setData("nic_number",e.target.value)}
                    />
                    <InputError message={errors.nic_number} className='mt-2'/>


                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Birth Date:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type="date"
                      name="birth_date"
                      value={data && data.birth_date}
                      className="form-control mt-1"
                      onChange={(e) => setData("birth_date",e.target.value)}
                    />
                     <InputError message={errors.birth_date} className='mt-2'/>


                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      School:
                    </InputLabel>
                    <TextInput
                      id="school_name"
                      type="text"
                      name="school_name"
                      value={data && data.school_name}
                      className="form-control mt-1"
                      onChange={(e) => setData("school_name",e.target.value)}
                    />
                     <InputError message={errors.school_name} className='mt-2'/>

                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      School Graduation Year:
                    </InputLabel>
                    <input
                      type="text"
                      id="school_graduation_year"
                      name="school_graduation_year"
                      value={data && data.school_graduation_year}
                      className="form-control mt-1"
                      onChange={(e) => setData("school_graduation_year",e.target.value)}
                    />
                      <InputError message={errors.school_graduation_year} className='mt-2'/>


                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Kankor ID:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type="number"
                      name="kankor_id"
                      value={data && data.kankor_id}
                      className="form-control mt-1"
                      onChange={(e) => setData("kankor_id",e.target.value)}
                    />
                     <InputError message={errors.kankor_id} className='mt-2'/>

                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Kankor Marks:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type="number"
                      name="kankor_marks"
                      value={data && data.kankor_marks}
                      className="form-control mt-1"
                      onChange={(e) => setData("kankor_marks",e.target.value)}
                    />
                     <InputError message={errors.kankor_marks} className='mt-2'/>

                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Admission Date:
                      <span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <input
                      type="date"
                      name="admission_date"
                      value={data && data.admission_date}
                      className="form-control mt-1"
                      onChange={(e) => setData("admission_date",e.target.value)}
                    />
                      <InputError message={errors.admission_date} className='mt-2'/>


                  </div>
                </div>


                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      Semester:<span className="text-red-300 text-lg">*</span>
                    </InputLabel>
                    <select
                      id="semester"
                      name="current_semester"
                      value={data && data.current_semester}
                      className="form-control mt-1"
                      onChange={(e) => setData("current_semester",e.target.value)}
                    >
                      <option value="">Select a semester</option>
                      {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    <InputError message={errors.current_semester} className='mt-2'/>

                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      د امتحاناتو ادارې ته د لیږل شوي مکتوب شمیره:
                    </InputLabel>
                    <input
                      type="number"
                      name="number_maktob_sent_exam_commettee"
                      value={data && data.number_maktob_sent_exam_commettee}
                      className="form-control mt-1"
                      onChange={(e) => setData("number_maktob_sent_exam_commettee",e.target.value)}
                    />
                      <InputError message={errors.number_maktob_sent_exam_commettee} className='mt-2'/>


                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>تاجیل مکتوب شمیره:</InputLabel>
                    <input
                      type="number"
                      name="number_maktob_tajeel"
                      value={data && data.number_maktob_tajeel}
                      className="form-control mt-1"
                      onChange={(e) => setData("number_maktob_tajeel",e.target.value)}
                    />
                     <InputError message={errors.umber_maktob_tajeel} className='mt-2'/>


                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>منفک مکتوب شمیره:</InputLabel>
                    <input
                      type="number"
                      name="number_maktob_monfak"
                      value={data && data.number_maktob_monfak}
                      className="form-control mt-1"
                      onChange={(e) => setData("number_maktob_monfak",e.target.value)}
                    />
                     <InputError message={errors.number_maktob_monfak} className='mt-2'/>

                  </div>
                </div>
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>د لیلیې د مکتوب شمیره:</InputLabel>
                    <input
                      type="number"
                      name="number_maktob_lailia"
                      value={data && data.number_maktob_lailia}
                      className="form-control mt-1"
                      onChange={(e) => setData("number_maktob_lailia",e.target.value)}
                    />
                     <InputError message={errors.number_maktob_lailia} className='mt-2'/>

                  </div>
                </div>
              </div>

              <div className="row form-row">
                <div className="from-group col-md-6">
                  <div className="mt-3">
                    <InputLabel>
                      دهويا کارت شمیره:

                    </InputLabel>
                    <TextInput
                      type="text"
                      name="identity_cart_number"
                      value={data && data.identity_cart_number}
                      className="form-control mt-1"
                      onChange={(e) => setData("identity_cart_number",e.target.value)}
                    />
                    <InputError message={errors.identity_cart_number} className='mt-2'/>

                  </div>
                </div>
                <div className="from-group col-md-6 mt-3">
                  <div>
                  <InputLabel>
                      Image:
                    </InputLabel>
                    {student.data.image_path && <div>
                      <img src={ student.data.image_path} className="w-64 mb-2"></img>
                      </div>}
                  </div>

                  <div className="mt-3">
                    <InputLabel>
                     Choose new image
                    </InputLabel>
                    <TextInput
                      id="student_image"
                      type="file"
                      name="image"
                      className="form-control mt-1"
                      onChange={(e) => setData('image',e.target.files[0])}


                    />
                    <InputError message={errors.image} className="mt-2"/>

                  </div>
                </div>
              </div>
              <div className="text-end mt-4">
                <Link
                  href={route("student.index")}
                  className='bg-gray-300 py-1  px-3  text-gray-800  rounded transition-all hover:bg-gray-200 mr-2'
                  >
                  Cancel
               </Link>
              <button className="btn btn-success">
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
