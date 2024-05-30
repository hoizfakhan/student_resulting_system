import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function ({auth}) {

 return (

     <AuthenticatedLayout

        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Student list</h2>}

     >

   <Head title="Faculty" />

 <div className="py-12">
 <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
 <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
     <h1>hi</h1>
  </div>
  </div>
  </div>


     </AuthenticatedLayout>

 );

}
