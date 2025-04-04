import { createBrowserRouter, Navigate } from 'react-router-dom'; 
import { LoginPage, RegistrationPage, ProfilePage, ServiceRequestCreationPage, ServiceRequestsPage, AdminServiceRequestsPage, AdminServiceRequestPatchPage } from '../../pages';
import { Layout, AdminLayout } from '../../layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'user',
                children: [
                    {
                        path: 'login',
                        element: <LoginPage/>,
                    },
                    {
                        path: 'registration',
                        element: <RegistrationPage/>,
                    },
                    {
                        index: true,
                        element: <ProfilePage />
                    }
                ]
            },
            {
                path: 'service-requests',
                children: [
                    {
                        index: true,
                        element: <ServiceRequestsPage />
                    },
                    {
                        path: 'add',
                        element: <ServiceRequestCreationPage />
                    },
                ]
            },
            {
                path: 'admin',
                element: <AdminLayout />,
                children: [
                    {
                        path: 'service-requests',
                        children: [
                            {
                                index: true,
                                element: <AdminServiceRequestsPage/>
                            },
                            {
                                path: ':id',
                                element: <AdminServiceRequestPatchPage />
                            }

                        ]
                    },
                    {
                        path: '*',
                        element: <Navigate to='/admin/service-requests' />
                    }
                ]
            },
        ]    
    },
    {
        path: '*',
        element: <Navigate to='/' />
    }
]);

export default router;
