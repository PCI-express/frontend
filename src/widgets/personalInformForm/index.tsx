import { useState, FormEvent, useEffect } from "react"
import { Input,Button } from "../../ui"
import { User } from "../../models";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../entity";

const initialState = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
}

// setIsLoading: (loading: boolean) => void, setError: (error: string | null) => void
async function fetchProfile(setFormData: (l: (prev: object) => any) => void) {
    // setIsLoading(true);
    // setError(null);

    let attempts = 0;
    const maxAttempts = 5;
    const delay = 1000;

    try {
        while (attempts < maxAttempts) {
            const data = await User.getProfileUser();
            console.log(data)
            if (data && Object.keys(data).length > 0) {
                setFormData((l) => ({ ...l, ...data }));
                // setIsLoading(false);
                return;
            }

            attempts++;
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        // setError('Failed to fetch profile after multiple attempts.');
        // setIsLoading(false);
    } catch (err) {
        // setError('An error occurred while fetching profile.');
        // setIsLoading(false);
        console.error('Fetch profile error:', err);
    }
}

export const PersonalInformForm = () => {
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();

    async function handleSubmit (e: FormEvent) {
        e.preventDefault();
        const data = await User.patchUserProfileData({
            username: formData.username, 
            email: formData.email, 
            first_name: formData.first_name, 
            last_name: formData.last_name,
            phone_number: formData.phone_number,
        });

        setFormData((l) => ({...l, ...data}));
    }

    useEffect(() => {
        fetchProfile(setFormData);
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/user/login');
        }
    }, [navigate, isLoggedIn]);

    return (
        <form onSubmit={handleSubmit} className="m-auto w-200 p-15 border-0 border-solid border-neutral-300 rounded-xl shadow-md shadow-neutral-400 bg-white min-h-[600px] flex flex-col">
            <div>
                <h1 className="font-bold text-3xl mb-16 text-indigo-400 cursor-default">
                   Personal Information 
                </h1>
            </div>
            <div className="flex flex-col justify-between flex-1">
                <div className="w-full">
                    <div className="w-full">
                        <Input 
                            name='username'
                            type='text'
                            value={formData.username}
                            handleChange={(e) => setFormData((l) => ({...l, username: e.target.value}))}
                            className="w-full"
                        />
                    </div>
                    <div className="w-full">
                        <Input 
                            name='email'
                            type='email'
                            value={formData.email}
                            handleChange={(e) => setFormData((l) => ({...l, email: e.target.value}))}
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-2 w-full">
                        <Input 
                            name='first name'
                            type='text'
                            value={formData.first_name}
                            handleChange={(e) => setFormData((l) => ({...l, first_name: e.target.value}))}
                            className="w-[50%]"
                        />
                        <Input 
                            name='last name'
                            type='text'
                            value={formData.last_name}
                            handleChange={(e) => setFormData((l) => ({...l, last_name: e.target.value}))}
                            className="w-[50%]"
                        />
                        
                    </div>
                    <div className="w-full">
                        <Input 
                            name='phone number'
                            type='tel'
                            value={formData.phone_number}
                            handleChange={(e) => setFormData((l) => ({...l, phone_number: e.target.value}))}
                            pattern="^(\+7|8)[\s]\([489][0-9]{2}\)[\s][0-9]{3}[\-][0-9]{2}[\-][0-9]{2}$"
                            className="w-full"
                            placeholder="+7 (___) ___-__-__"
                        />
                    </div>
                </div>
                <div className="flex w-full gap-2">
                    <Button 
                        name='Discover change'
                        type='submit'
                        className="w-[50%] mb-5"
                        inversion={true}
                    />
                    <Button 
                        name='Save change'
                        type='submit'
                        className="w-[50%] mb-5"
                    />
                </div>
                <Link to='/' className="text-indigo-400 hover:text-indigo-500 transition-color duration-300" onClick={() => {
                        User.logoutUser()
                        setIsLoggedIn(false)
                    }}>
                    Logout
                </Link>
            </div>
        </form>
    )
}