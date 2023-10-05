import { Routes, Route } from 'react-router-dom';
import { Auth, Users, Blog, Courses, Menu, Newsletter } from '../pages/admin';
import { AdminLayout } from '../layouts';
import { useAuth } from '../hooks';



export function AdminRouter() {

  const { user } = useAuth();

  console.log({user})


  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    )
  }

  return (
    <Routes>
      {
        !user ? (
          <Route path='/admin/*' element={<Auth />} />
        ) : (
          <>
            {['/admin', '/admin/blog'].map((path) => (
              <Route
                path={path}
                element={loadLayout(AdminLayout, Blog)}
                key={path}
              />
            ))}


            <Route path='/admin/users' element={loadLayout(AdminLayout, Users)} />
            <Route path='/admin/courses' element={loadLayout(AdminLayout, Courses)} />
            <Route path='/admin/menu' element={loadLayout(AdminLayout, Menu)} />
            <Route path='/admin/newsletter' element={loadLayout(AdminLayout, Newsletter)} />
          </>
        )
      }


    </Routes>
  )
}