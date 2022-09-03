import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import { useDispatch, useSelector } from "react-redux";
import { isAuth } from "../Redux/Auth-context/action";
import { style } from "@mui/system";


export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthFlg = useSelector((store)=>store.isAuth.isAuth);
    const handlelogin = () => {
        console.log("login clicked")
        let payload = {
            email: email,
            password: pass,
        }

        axios
            .post("https://reqres.in/api/users", payload)
            .then((response) => {
                console.log(response.status)
                if (response.status == 201){
                    dispatch(isAuth(true));
                    alert("login Successfully !");
                    navigate("/"); 
                }else{
                    alert("Went Wrong, Try again !")
                }
            })
            .catch((err) => console.log(err));
    }

    return ( 
        <div>
             {!isAuthFlg ? <h2 >Login first !</h2> : "" }
            <h1>Login Form</h1>
            <div id="formCover">
                <div className="from">
                    <input type="text" name="" id="" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="" id="" value={pass} onChange={(e) => setPass(e.target.value)} />
                    <button onClick={()=>handlelogin()}>Login</button>
                </div>
            </div>
        </div>
    );
}