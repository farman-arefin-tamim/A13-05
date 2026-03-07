console.log("Login Successfully");

document.getElementById('login-btn').addEventListener('click',()=>{
   const usernameInput=document.getElementById('input-username');
   const username=usernameInput.value;
   
   const passwordInput=document.getElementById('input-password');

   const password=passwordInput.value;

   if(username=="admin" && password=="admin123"){
        window.location.assign("./home.html");
        alert("Login Successfully");
   }else{
        alert("Login Failed");
        return;
   }
})