import {FC, FormEvent, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { User } from '../../models'
import { Input, Button, Checkbox } from "../../ui";
import { useAuth } from "../../entity";

const initialState = {
    username: '',
    password: ''
}

export const LoginForm: FC = () => {
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();

        const dataValidated = (): boolean => 
            User.validateForm([formData.username, formData.password])
            ? true : false;

        if (dataValidated()){
            User.loginUser({username: formData.username, password: formData.password});
            setIsLoggedIn(true);
        }
    }

    useEffect(() => {
        const errorListener = (error: string) => {
            setError(error || null);
        };

        User.setErrorListeners(errorListener);

        return () => {
            User.removeErrorListener(errorListener)
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
        <form onSubmit={handleSubmit} className="m-auto p-5 border border-solid border-neutral-200 rounded-md shadow-md w-90 sm:w-110 md:w-130 bg-white">
            <h1 className="text-center font-bold text-5xl mb-16 mt-10 text-indigo-400 cursor-default">
                Sign-in
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
                    name='password' 
                    type={showPassword ? 'text': 'password'}
                    value={formData.password} 
                    handleChange={(e) => setFormData((l) => ({...l, password: e.target.value}))}
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
                    <Link to='/user/registration' className="text-indigo-400 hover:text-indigo-500 transition-color duration-300">
                        Create an account
                    </Link>
                </div>
                <Button 
                    name='Login'
                    type='submit'
                />
                {/* <div className="mb-5 text-center">
                    <a href="" className="text-indigo-400 hover:text-indigo-500 transition-color duration-300">
                        Forget your password?
                    </a>
                </div> */}
            </div>
        </form>
    )
}