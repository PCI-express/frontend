import { FC, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from '../../models';
import { Input, Checkbox, Button } from "../../ui";
import { useAuth } from "../../entity";

const initialState = {
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    password: '',
    password2: ''
}

export const RegistrationForm: FC = () => {
    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        const dataValidated = (): boolean => 
            User.validateForm([formData.username, formData.email, formData.password, formData.password2]) 
            && User.validatePassword(formData.password, formData.password2) 
            ? true : false;
        
        if (dataValidated()){
            User.registrationUser({
                username: formData.username, 
                email: formData.email, 
                password: formData.password, 
                first_name: formData.first_name, 
                last_name: formData.last_name,
                phone_number: formData.phone_number,
            }); 
            setIsLoggedIn(true);
        }          
    }

    useEffect(() => {
        const errorListener = (error: string) => {
            setError(error || null);
        };

        User.setErrorListeners(errorListener);

        return () => {
            User.removeErrorListener(errorListener);
        }        
    }, []);

    useEffect(() => {
        setError(null);
    }, [formData]);

    useEffect(() => {
        if(isLoggedIn){
            navigate('/user');
        }
    })
    
    return (
        <form onSubmit={handleSubmit} className="bg-white m-auto p-5 border border-solid border-neutral-200 rounded-md shadow-md w-90 sm:w-110 md:w-130">
            <h1 className="text-center font-bold text-5xl mb-16 mt-10 text-indigo-400 cursor-default">
                Sign-up
            </h1>
            <div className="m-auto w-fit">
                {error && (
                    <div className="text-red-500 mb-5 text-center text-xl">
                        {error}
                    </div>
                )}
                <Input 
                    name='username' 
                    type='text' 
                    value={formData.username} 
                    handleChange={(e) => setFormData((l) => ({...l, username: e.target.value}))}
                    className="w-3xs sm:w-xs md:w-sm"
                />
                <Input 
                    name='email' 
                    type='email'
                    value={formData.email} 
                    handleChange={(e) => setFormData((l) => ({...l, email: e.target.value}))}
                    className="w-3xs sm:w-xs md:w-sm"
                />
                <Input 
                    name='first name' 
                    type='text'
                    value={formData.first_name} 
                    handleChange={(e) => setFormData((l) => ({...l, first_name: e.target.value}))}
                    className="w-3xs sm:w-xs md:w-sm"
                />
                <Input 
                    name='last name' 
                    type='text'
                    value={formData.last_name} 
                    handleChange={(e) => setFormData((l) => ({...l, last_name: e.target.value}))}
                    className="w-3xs sm:w-xs md:w-sm"
                />
                <Input 
                    name='phone number' 
                    type='tel'
                    value={formData.phone_number} 
                    handleChange={(e) => setFormData((l) => ({...l, phone_number: e.target.value}))}
                    className="w-3xs sm:w-xs md:w-sm"
                    pattern="^(\+7|8)[\s]\([489][0-9]{2}\)[\s][0-9]{3}[\-][0-9]{2}[\-][0-9]{2}$"
                />
                <Input 
                    name='password' 
                    type={showPassword ? 'text': 'password'}
                    value={formData.password} 
                    handleChange={(e) => setFormData((l) => ({...l, password: e.target.value}))}
                    className="w-3xs sm:w-xs md:w-sm"
                />
                <Input 
                    name='repeat password' 
                    type={showPassword ? 'text': 'password'}
                    value={formData.password2} 
                    handleChange={(e) => setFormData((l) => ({...l, password2: e.target.value}))}
                    className="w-3xs sm:w-xs md:w-sm"
                />
                <Checkbox 
                    name='show password'
                    type="checkbox"
                    value={showPassword}
                    handleChange={(value: boolean) => setShowPassword(value)}
                />
                <div className="mb-5 flex flex-col sm:justify-between sm:flex-row">
                    <span>
                        Already have an account?
                    </span>
                    <Link to='/user/login' className="text-indigo-400 hover:text-indigo-500 transition-color duration-300">
                        Sign-in
                    </Link>
                </div>
                <Button 
                    name='Registration'
                    type='submit'
                />
            </div>
        </form>
    )
}