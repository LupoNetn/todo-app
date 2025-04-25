import React, { useContext } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { TodoContext } from "../TodoContext";

const Header = () => {
    const { dispatch, theme } = useContext(TodoContext)
    return (
        <>
            <div className={`${theme === 'light' ? 'bg-[url("/images/bg-desktop-light.jpg")]' : 'bg-[url("/images/bg-desktop-dark.jpg")]'} p-15`}>
                <div className="flex justify-center">
                    <div className="max-sm:w-full w-[540px] flex justify-between items-center py-14">
                        <h1 className="text-3xl text-white font-bold">TODO</h1>
                        {theme === 'light' ? (
                            <FaMoon 
                                onClick={() => dispatch({type: 'toggleTheme'})} 
                                className="w-6 h-6 text-white cursor-pointer" 
                            />
                        ) : (
                            <FaSun 
                                onClick={() => dispatch({type: 'toggleTheme'})} 
                                className="w-6 h-6 text-white cursor-pointer" 
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
