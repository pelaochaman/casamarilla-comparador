import React, { useEffect } from 'react'

function EmailRetailRocket() {
    useEffect(()=>{
        try {
            var inputEmail = document.querySelector(".vtex-login-2-x-emailVerification .vtex-styleguide-9-x-input");
            console.log(inputEmail);
            var btnSubmitEmail = document.querySelector(".vtex-login-2-x-formFooter vtex-login-2-x-sendButton .vtex-button ");
            console.log(btnSubmitEmail);
            btnSubmitEmail.setAttribute("onclick","")
        } catch (error) {
            console.log(error);
        }
        
    },[]);
    return (
        <div>EmailRetailRocket</div>
    )
}

export default EmailRetailRocket