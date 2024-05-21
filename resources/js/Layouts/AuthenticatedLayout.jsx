import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import './Layout.css';


export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const {usertype} = usePage().props;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900" dir=''>
            <nav className="bg-gray-200 dark:bg-gray-600 border-b border-gray-200 dark:border-gray-700 ">
                <div className="max-w-8xl  mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="flex justify-between h-20  ">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-red-600 dark:text-gray-200 " />
                                </Link>
                            </div>


                               {header && (
                                     <header className="bg-gray-200 dark:bg-gray-600 text-start max-w-9xl  ms-40">
                                     <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                                     </header>
                                 )}

                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

             <div className='content'>
             <aside className='container-fluid shadow' dir=''>
               <div className='row '>
               <div className='col-auto col-md-6 bg-dark d-flex flex-column justify-content-between  min-vh-100'>

               <div className='mt-2'>
                  <a className='text-decoration-none d-flex align-items-center text-white d-none d-sm-inline' role='button'>

                     <span className='f5-4 ms-5'>
                     <ApplicationLogo className="block h-9 w-auto fill-current text-blue-600 dark:text-gray-200  me-2 d-inline" />
                        {user.name}
                     </span>
                </a>
                <hr className='text-white d-none d-sm-block'></hr>
              {usertype == 1 ? (
                 <ul
                  class="nav nav-pills flex-column  mt-2 mt-sm-0"
                  id='parentM'
                 >

            <li class="nav-item text-white my-1 py-2 py-sm-0">
            <a class="nav-link text-white text-center text-sm-start" aria-current="page"
              >
               <i className='bi bi-speedometer2'></i>
              <NavLink href={route('dashboard')} active={route('').current('dashboard')}  className='fs-6 text-white   ms-3 d-none d-sm-inline'>
                 Dashboard
              </NavLink>
          </a>
          </li>

          <li class="nav-item  my-1 py-2 py-sm-0">
            <a href="#submenu" class="nav-link text-white text-center text-sm-start" data-bs-toggle="collapse" aria-current="page"
              >
               <i className='bi bi-grid'></i>
               <NavLink href={route('teacher')} active={route('').current('teacher')}  className=' fs-6 text-white   ms-3 d-none d-sm-inline'>
                 IS Department
                </NavLink>
               <i className='bi bi-arrow-down-short ms-0 ms-sm-0'></i>

            </a>
            <ul
              class="nav collapse ms-2 flex-column"
              id='submenu'
              data-bs-parent = "#parentM"
            >
              <li class="nav-item">
                <a class="nav-link text-white  " href="#" aria-current="page">
                  <span className='d-none d-sm-inline'>Teacher</span></a>

              </li>
              <li class="nav-item ">
                <a class="nav-link text-white" href="#"><span className='d-none d-sm-inline'>Item 2</span></a>
              </li>

            </ul>

              </li>


          <li class="nav-item  my-1 py-2 py-sm-0">
            <a class="nav-link text-white text-center text-sm-start" aria-current="page"
              >
               <i className='bi bi-house'></i>
               <span className='ms-2 d-none d-sm-inline'>

                <NavLink href={route('teacher')} active={route('').current('dashboard')}   className='fs-6 text-white   ms-2 d-none d-sm-inline'>
                   NE Department
               </NavLink>

                </span>

          </a>
          </li>

          <li class="nav-item  my-1 py-2 py-sm-0">
            <a class="nav-link text-white text-center text-sm-start" aria-current="page"
              >
               <i className='bi bi-people'></i>
               <span className='ms-2 d-none d-sm-inline'>

                <NavLink href={route('teacher')} active={route('').current('dashboard')}   className='fs-6 text-white   ms-2 d-none d-sm-inline'>
                 CE Department
               </NavLink>
           </span>
          </a>
          </li>
          </ul> ): usertype == 0 ? (
           <ul
            class="nav nav-pills flex-column  mt-2 mt-sm-0"
            id='parentM'
           >

         <li class="nav-item text-white my-1 py-2 py-sm-0">
          <a class="nav-link text-white text-center text-sm-start" aria-current="page"
        >
           <i className='bi bi-speedometer2'></i>
             <NavLink href={route('dashboard')} active={route('').current('dashboard')}  className='fs-6 text-white   ms-3 d-none d-sm-inline'>
             MyResults
            </NavLink>
           </a>
          </li>

          <li class="nav-item  my-1 py-2 py-sm-0">
           <a href="#submenu" class="nav-link text-white text-center text-sm-start" data-bs-toggle="collapse" aria-current="page"
         >
          <i className='bi bi-grid'></i>
            <NavLink href={route('teacher')} active={route('').current('teacher')}  className=' fs-6 text-white   ms-3 d-none d-sm-inline'>
             MySubjects
          </NavLink>
         <i className='bi bi-arrow-down-short ms-0 ms-sm-0'></i>

       </a>
     <ul
      class="nav collapse ms-2 flex-column"
      id='submenu'
      data-bs-parent = "#parentM"
     >
    <li class="nav-item">
      <a class="nav-link text-white  " href="#" aria-current="page">
        <span className='d-none d-sm-inline'>Teachers</span></a>

    </li>
    <li class="nav-item ">
      <a class="nav-link text-white" href="#"><span className='d-none d-sm-inline'>Item 2</span></a>
    </li>

    </ul>

    </li>


 <li class="nav-item  my-1 py-2 py-sm-0">
  <a class="nav-link text-white text-center text-sm-start" aria-current="page"
    >
     <i className='bi bi-house'></i>
     <span className='ms-2 d-none d-sm-inline'>

      <NavLink href={route('teacher')} active={route('').current('dashboard')}   className='fs-6 text-white   ms-2 d-none d-sm-inline'>
         Exams
     </NavLink>

      </span>

  </a>
 </li>

<li class="nav-item  my-1 py-2 py-sm-0">
  <a class="nav-link text-white text-center text-sm-start" aria-current="page"
    >
     <i className='bi bi-people'></i>
     <span className='ms-2 d-none d-sm-inline'>

      <NavLink href={route('teacher')} active={route('').current('dashboard')}   className='fs-6 text-white   ms-2 d-none d-sm-inline'>
       Class
     </NavLink>
   </span>
  </a>
   </li>
  </ul> ): usertype == 2 ? (
  <ul
   class="nav nav-pills flex-column  mt-2 mt-sm-0"
   id='parentM'
  >

 <li class="nav-item text-white my-1 py-2 py-sm-0">
  <a class="nav-link text-white text-center text-sm-start" aria-current="page"
    >
     <i className='bi bi-speedometer2'></i>
    <NavLink href={route('dashboard')} active={route('').current('dashboard')}  className='fs-6 text-white   ms-3 d-none d-sm-inline'>
       Dashboard
    </NavLink>
  </a>
 </li>

<li class="nav-item  my-1 py-2 py-sm-0">
  <a href="#submenu" class="nav-link text-white text-center text-sm-start" data-bs-toggle="collapse" aria-current="page"
    >
     <i className='bi bi-grid'></i>
     <NavLink href={route('teacher')} active={route('').current('teacher')}  className=' fs-6 text-white   ms-3 d-none d-sm-inline'>
       Class
      </NavLink>
     <i className='bi bi-arrow-down-short ms-0 ms-sm-0'></i>

  </a>
  <ul
    class="nav collapse ms-2 flex-column"
    id='submenu'
    data-bs-parent = "#parentM"
  >
    <li class="nav-item">
      <a class="nav-link text-white  " href="#" aria-current="page">
        <span className='d-none d-sm-inline'>Teacher</span></a>

    </li>
    <li class="nav-item ">
      <a class="nav-link text-white" href="#"><span className='d-none d-sm-inline'>Item 2</span></a>
    </li>

  </ul>

    </li>


<li class="nav-item  my-1 py-2 py-sm-0">
  <a class="nav-link text-white text-center text-sm-start" aria-current="page"
    >
     <i className='bi bi-house'></i>
     <span className='ms-2 d-none d-sm-inline'>

      <NavLink href={route('teacher')} active={route('').current('dashboard')}   className='fs-6 text-white   ms-2 d-none d-sm-inline'>
         NE Department
     </NavLink>

      </span>

</a>
</li>

 <li class="nav-item  my-1 py-2 py-sm-0">
  <a class="nav-link text-white text-center text-sm-start" aria-current="page"
    >
     <i className='bi bi-people'></i>
     <span className='ms-2 d-none d-sm-inline'>

      <NavLink href={route('teacher')} active={route('').current('dashboard')}   className='fs-6 text-white   ms-2 d-none d-sm-inline'>
       CE Department
     </NavLink>
 </span>
  </a>
  </li>
  </ul>):usertype == 3 ? (

  <ul
    class="nav nav-pills flex-column  mt-2 mt-sm-0"
    id='parentM'
   >

<li class="nav-item text-white my-1 py-2 py-sm-0">
  <a class="nav-link text-white text-center text-sm-start" aria-current="page"
    >
     <i className='bi bi-speedometer2'></i>
    <NavLink href={route('dashboard')} active={route('').current('dashboard')}  className='fs-6 text-white   ms-3 d-none d-sm-inline'>
       Dashboard
    </NavLink>
</a>
</li>

<li class="nav-item  my-1 py-2 py-sm-0">
  <a class="nav-link text-white text-center text-sm-start" aria-current="page"
    >
     <i className='bi bi-house'></i>
     <span className='ms-2 d-none d-sm-inline'>

      <NavLink href={route('faculty.index')} active={route('').current('faculty.index')}   className='fs-6 text-white   ms-2 d-none d-sm-inline'>
         Faculty
     </NavLink>

      </span>

</a>
</li>



<li class="nav-item  my-1 py-2 py-sm-0">
  <a class="nav-link text-white text-center text-sm-start" aria-current="page"
    >
     <i className='bi bi-house'></i>
     <span className='ms-2 d-none d-sm-inline'>

      <NavLink href={route('manager.index')} active={route('').current('manager.index')}   className='fs-6 text-white   ms-2 d-none d-sm-inline'>
         Faculty Manager
     </NavLink>

      </span>

</a>
</li>




</ul> ):null
    }

       </div>

       <div class="dropdown open">
         <a
           class="btn border-none dropdown-toggle text-white"
           type="button"
           id="triggerId"
           data-bs-toggle="dropdown"
           aria-haspopup="true"
           aria-expanded="false"
         >
        <li className='bi bi-person f5-4'></li><span className='fs-5 ms-3 d-none d-sm-inline'>hasibullah</span>
         </a>
         <div class="dropdown-menu" aria-labelledby="triggerId">
           <a class="dropdown-item" href="#">profile</a>
           <a class="dropdown-item" href="#">setting</a>
         </div>
       </div>

         </div>
        </div>
      </aside>

       <main className='mt-5'>{children}</main>
       </div>
   </div>
    );
}
