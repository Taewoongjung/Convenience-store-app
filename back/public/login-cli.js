
window.onload = () => {
    const param = (new URL(location.href)).searchParams;
    const error_param = param.get('error');
    if(error_param){
        alert(error_param);
    }
}

const request = document.getElementById('login-form');

const login_btn = document.getElementById('login-form_login-btn');
login_btn.addEventListener('click', () => {
    request.setAttribute('action', '/login');
    request.setAttribute('method', 'POST');
});