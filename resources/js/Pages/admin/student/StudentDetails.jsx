import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function StudentDetails({auth,student}){
 console.log(student.name)
 return (

    <AuthenticatedLayout
     user={auth.user}
     header={
      <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
        Student " {student.data.name} {student.data.last_name} " Details
      </h2>
     }
    >
      <Head title="Student Details" />

      <div className="py-12">
       <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
       <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

           <div className="p-6 text-gray-900 dark:text-gray-100">
            <div class="container-fluid">
                     <div class="row">
                         <div class="col text-center bg-secondary h-[200px]">
                          <img src={student.data.image_path} className="img-fluid img-thumbnail object-cover rounded h-[200px] w-64" alt="Thumbnail"></img>
                         </div>
                     </div>
                   </div>
               <div className="grid gap-1 grid-cols-2 mt-3">
                 <div>
                 <div className="mt-2">
                    <label className="font-bold text-lg text-amber-500 text-secondary ">Student ID</label>
                    <p>{student.data.id}</p>
                   </div>
                   <div className="mt-2">
                    <label className="font-bold text-lg text-amber-500 ">Student Name</label>
                    <p>{student.data.name}</p>
                   </div>
                   <div>
                    <label className="font-bold text-lg text-amber-500">Last Name</label>
                    <p>{student.data.last_name}</p>
                   </div>

                   <div className="mt-4">
                    <label className="font-bold text-lg text-amber-500">Father Name</label>
                    <p className="mt-1">{student.data.father_name}</p>
                   </div>

                   <div className="mt-4">
                    <label className="font-bold text-lg text-amber-500">grandfather Name</label>
                    <p className="mt-1">{student.data.grandfather_name}</p>
                   </div>

                   <div className="mt-4">
                    <label className="text-primary font-bold">(Original residence)</label>
                   <div className="mt-2">
                    <label className="font-bold text-lg "> Province</label>
                    <p className="mt-1">{student.data.original_province}</p>
                   </div>
                   <div className="mt-4">
                    <label className="font-bold text-lg "> district</label>
                    <p className="mt-1">{student.data.original_district}</p>
                   </div>
                   <div className="mt-4">
                    <label className="font-bold text-lg "> village</label>
                    <p className="mt-1">{student.data.original_village}</p>
                   </div>
                   </div>

                   <div className="mt-4">
                   <label className="text-primary font-bold">(Current residence)</label>
                   <div className="mt-2">
                    <label className="font-bold text-lg "> Province</label>
                    <p className="mt-1">{student.data.current_province}</p>
                   </div>
                   <div className="mt-4">
                    <label className="font-bold text-lg "> district</label>
                    <p className="mt-1">{student.data.current_district}</p>
                   </div>
                   <div className="mt-4">
                    <label className="font-bold text-lg ">village</label>
                    <p className="mt-1">{student.data.current_village}</p>
                   </div>
                   </div>


                   <div className="mt-4">
                   <label className="font-bold text-lg text-slate-500">Birht date</label>
                   <p className="mt-1">{student.data.birth_date}</p>
                   </div>
                 </div>
                 <div>

                 <div className="mt-4">
                   <label className="font-bold text-lg text-amber-500">School name</label>
                   <p className="mt-1">{student.data.school_name}</p>
                   </div>
                   <div className="mt-4">
                   <label className="font-bold text-lg text-slate-500">School graduation year</label>
                   <p className="mt-1">{student.data.school_graduation_year}</p>
                   </div>

                   <div className="mt-4">
                   <label className="font-bold text-lg  text-secondary">Kankor ID</label>
                   <p className="mt-1">{student.data.kankor_id}</p>
                   </div>

                   <div className="mt-4">
                   <label className="font-bold text-lg  text-secondary">Kankor Marks</label>
                   <p className="mt-1">{student.data.kankor_marks}</p>
                   </div>

                   <div className="mt-4">
                   <label className="font-bold text-lg text-slate-500">Admission date</label>
                   <p className="mt-1">{student.data.admission_date}</p>
                   </div>

                   <div className="mt-4">
                   <label className="font-bold text-lg  text-amber-500">Department</label>
                   <p className="mt-1">{student.data.department.name}</p>
                   </div>

                   <div className="mt-4">
                   <label className="font-bold text-lg text-secondary">Current semester</label>
                   <p className="mt-1">{student.data.current_semester}</p>
                   </div>


                   <div>
                      <label className="font-bold text-lg text-secondary">Phone number</label>
                      <p className="mt-1">{student.data.phone_number}</p>
                   </div>

                   <div className="mt-4">
                    <label className="font-bold text-lg text-secondary">NIC number</label>
                    <p className="mt-1">{student.data.nic_number}</p>
                   </div>

                   <div className="mt-4">
                   <label className="font-bold text-lg text-secondary">Identity cart number</label>
                   <p className="mt-1">{student.data.identity_cart_number}</p>
                   </div>

                   <div className="mt-4">
                   <label className="font-bold text-lg text-secondary">د امتحاناتو ادارې ته د لیږل شوي مکتوب شمیره:</label>
                   <p className="mt-1">{student.data.number_maktob_sent_exam_commettee}</p>
                   </div>

                   <div className="mt-4">
                   <label className="font-bold text-lg text-secondary">تاجیل مکتوب شمیره:</label>
                   <p className="mt-1">{student.data.number_maktob_tajeel}</p>
                   </div>

                   <div className="mt-4">
                   <label className="font-bold text-lg text-secondary">منفک مکتوب شمیره:</label>
                   <p className="mt-1">{student.data.number_maktob_monfak}</p>
                   </div>

                   <div className="mt-4">
                   <label className="font-bold text-lg text-secondary">د لیلیې د مکتوب شمیره:</label>
                   <p className="mt-1">{student.data.number_maktob_lailia}</p>
                   </div>




                 </div>

               </div>
              </div>

       </div>
       </div>
       </div>

    </AuthenticatedLayout>

 );

}
